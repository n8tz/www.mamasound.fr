/*
 *
 * Copyright (C) 2019 Nathanael Braun
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import $super                         from "$super";
import stores                         from 'App/stores/(*).js';
import moment                         from "moment";
import {asRef, asStore, withStateMap} from "react-scopes";
import shortid                        from "shortid";

export default {
	...$super,
	Styles         : stores.Styles,
	UserGeoLocation: stores.UserGeoLocation,
	Quartiers      : stores.Quartiers,
	$history       : stores.$history,
	
	@withStateMap(
		{
			data: {
				id  : "Theme.ghTOlod-",
				etty: "Theme",
			}
		}
	)
	appTheme: stores.MongoRecords,
	
	@asStore
	appState: {
		
		currentPageFocus  : "head",// head, events, page
		selectedFocus     : undefined,//{ id: "Page.9HB7Gr4V", etty: 'Page' },
		selectedEvent     : undefined,
		selectedEventId   : undefined,
		selectedEventDT   : undefined,
		curDay            : undefined,
		currentSearch     : undefined,
		currentArea       : undefined,
		viewType          : 0,
		dayCountByViewType: [6, 1, 1],
		curTags           : undefined,
		
		$apply( data, state ) {
			!state.curDay && this.setState({ curDay: moment().startOf('day').valueOf() })
			return state;
		},
		
		// global app actions
		
		loadStateFromUrl( url = !__IS_SERVER__ && location.pathname || '/' ) {
			if ( url ) {
				let matches = url.match(/^\/([^\/]+)\/([^\/]+)\/([^\/]+)$/);
				return matches && {
					curDay          : moment(matches[2], "DD-MM-YY").startOf("day").valueOf(),
					selectedEventId : matches[3],
					selectedEventDT : moment(matches[2], "DD-MM-YY").startOf("day").valueOf(),
					selectedEvent   : { id: matches[3], etty: "Event" },
					currentPageFocus: "events"
				}
			}
			//debugger;
			//return {};
		},
		updateCurrentSearch( currentSearch ) {
			return { currentSearch };
		},
		setCurrentArea( currentArea ) {
			return { currentArea };
		},
		setCurStyleTab( viewType ) {
			let { currentPageFocus, selectedEventId } = this.nextState, doFocus;
			if ( currentPageFocus !== "events" ) {
				currentPageFocus = "events";
				doFocus          = true
			}
			return { viewType, currentPageFocus, doFocus };
		},
		oneMoreDay( viewType = 0 ) {
			let { dayCountByViewType } = this.nextState;
			dayCountByViewType[viewType]++;
			return { dayCountByViewType: [...dayCountByViewType] };
		},
		setPageFocus( _currentPageFocus, doFocus ) {
			let { currentPageFocus, selectedEventId } = this.nextState;
			if ( _currentPageFocus !== currentPageFocus || doFocus ) {
				if ( selectedEventId && _currentPageFocus !== 'events' )
					this.$actions.selectEvent();
				return { currentPageFocus: _currentPageFocus, doFocus };
			}
		},
		updateCurrentDay( _currentVisibleDay, userSetCDay = true ) {
			let { curDay, selectedEventId } = this.nextState,
			    dt                          = moment(_currentVisibleDay).startOf("day").valueOf();
			if ( dt !== curDay ) {
				return { curDay: dt, userSetCDay };
			}
		},
		selectEvent( selectedEvent, selectedEventDT, showPageBlock ) {
			let { curDay, currentPageFocus } = this.nextState;
			if ( selectedEvent && selectedEvent._id === this.nextState.selectedEventId )
				selectedEvent = undefined;
			//	currentPageFocus = 'map';
			if ( selectedEvent ) {
				this.$actions.history_set("/" + selectedEvent._cls + '/' + moment(selectedEventDT).format("DD-MM-YY") + "/" + (selectedEvent._alias || selectedEvent._id))
			}
			else {
				this.$actions.history_set("/")
			}
			return {
				selectedEventId: selectedEvent && selectedEvent._id,
				selectedEventDT,
				currentPageFocus,
				doFocus        : true,
				selectedEvent  : selectedEvent && { id: selectedEvent._id, etty: selectedEvent._cls } || null
			};
		},
		selectFocus( selectedFocus, cls ) {
			let { currentPageFocus } = this.nextState;
			if ( selectedFocus && currentPageFocus === 'page' )
				currentPageFocus = "loop";
			else if ( selectedFocus )
			//currentPageFocus = "bighead";
				this.then(() => this.setState({ currentPageFocus: 'bighead' }));
			return {
				//currentPageFocus,
				selectedEventId: null,
				doFocus        : !!selectedFocus,
				selectedFocus  : { id: selectedFocus || "Page.SkxesB7ugG", etty: cls || "Page" }
			};
		},
		selectWidget( selectedWidgetId ) {
			return { selectedWidgetId };
		},
		clearWebSiteCache() {
			window.open("http://api.mamasound.fr/cleanCache")
		},
		saveState() {
			localStorage.mama = JSON.stringify(this.scopeObj.serialize());
		},
		clearState() {
			localStorage.mama = null;
			window.location += "";
		}
	},
	
	@withStateMap(
		{
			@asRef
			Focused: "appState.selectedFocus",
			@asRef
			Event  : "appState.selectedEvent",
		}
	)
	Selected: stores.MongoRecords,
	
	@asStore
	TagManager: {
		// initial state
		selected    : [],
		selectedTags: {},
		available   : {},
		
		// actions
		$apply( data, state, { selectedTags, available } ) {
			//debugger
			//console.log('TagManager::$apply:154: ', state.available);
			return {
				...state,
				available: available
				           ? Object.keys(state.available).map(tag => state.available[tag])
				           : data.available || state.available,
				selected : selectedTags
				           ? Object.keys(state.selectedTags).map(tag => state.available[tag])
				           : data.selected || state.selected
			}
		},
		toggleTag( tag ) {
			this.state.selectedTags[tag]
			? this.$actions.unSelectTag(tag)
			: this.$actions.selectTag(tag)
		},
		selectTag: ( tag ) => state => ({
			selectedTags: {
				...state.selectedTags,
				[tag]: state.available[tag] = state.available[tag] || { label: tag, count: 0, style: {} }
			},
		}),
		unSelectTag( tag ) {
			let selectedTags = {
				...this.nextState.selectedTags
			};
			delete selectedTags[tag]
			return {
				selectedTags
			}
		},
		registerTags( tags ) {
			//debugger
			return ( { available } ) => ({
				available: tags.reduce(
					( h, tag ) => {
						if ( h[tag.label] )
							h[tag.label].count += tag.count;
						else h[tag.label] = tag;
						return h;
					},
					{
						...available
					}
				)
			})
		},
		unRegisterTags( tags ) {
			//debugger
			return ( { available } ) => ({
				available: tags.reduce(
					( h, tag ) => {
						if ( h[tag.label] )
							h[tag.label].count -= tag.count;
						
						return h;
					},
					{
						...available
					}
				)
			})
		},
	},
	@asStore
	widgets   : {
		// initial state
		items: [],
		
		// actions
		newWidget( type, props = {}, Default ) {
			let _id = shortid.generate();
			this.$actions.selectWidget(_id)
			return {
				items: [...this.nextState.items, {
					_id,
					size    : { width: 600, height: 800 },
					type,
					props,
					position: {
						x: 50 + ~~(Math.random() * 200),
						y: 50 + ~~(Math.random() * 200)
					},
					...Default
				}]
			}
		},
		updateWidget( widget ) {
			return {
				items: this.nextState.items
				           .map(
					           it => (it._id === widget._id)
					                 ? widget
					                 : it
				           )
			}
		},
		rmWidget( id ) {
			return {
				items: this.nextState.items
				           .filter(
					           it => (it._id !== id)
				           )
			}
		}
	},
	
	
	@withStateMap(
		{
			query: ":byId(mediaUrl)",
			data : [
				{
					_id     : "test1",
					mediaUrl: require("App/ui/assets/images/couvs/test.jpg")
				},
				{
					_id     : "test2",
					mediaUrl: require("App/ui/assets/images/couvs/test2.jpg")
				},
				{
					_id     : "test3",
					mediaUrl: require("App/ui/assets/images/couvs/chat-ninja-photos-hisakata-hiroyuki-4.jpg")
				}
			]
		}
	)
	BackgroundLib: stores.assetsLoader,
	
	@asStore
	HighlighterBackground: {
		@asRef
		BackgroundLib: "BackgroundLib",
		current      : "test3",
		$apply( url, { BackgroundLib, current } ) {
			return current && BackgroundLib[current] || url;
		},
		changeHighlighterBackground( id ) {
			let lib = Object.keys(this.state.BackgroundLib);
			return {
				current: id || lib[~~(Math.random() * lib.length)]
			}
		},
	},
}