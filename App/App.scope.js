/*
 * www.mamasound.fr
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
import {Views}                        from "App/ui";
import moment                         from "moment";
import {asRef, asStore, withStateMap} from "react-scopes";
import shortid                        from "shortid";

export default {
	...$super,
	Anims          : stores.Anims,
	//CurrentUser    : stores.CurrentUser,
	UserGeoLocation: stores.UserGeoLocation,
	
	@asStore
	appState: {
		
		currentPageFocus: "head",// head, events, page
		
		//selectedFocus     : { id: "Page.SkxesB7ugG", etty: 'Page' },
		selectedPage      : { id: "Page.SkxesB7ugG", etty: 'Page' },
		selectedEvent     : undefined,
		selectedEventId   : undefined,
		selectedEventDT   : undefined,
		curDay            : undefined,
		viewType          : 0,
		dayCountByViewType: [3, 1, 1, 1, 0],
		curTags           : undefined,
		
		$apply( data, state ) {
			!state.curDay && this.setState({ curDay: moment().startOf('day').valueOf() })
			return state;
		},
		
		// global app actions
		
		setCurStyleTab( viewType ) {
			return { viewType };
		},
		oneMoreDay( viewType = 0 ) {
			let { dayCountByViewType } = this.nextState;
			dayCountByViewType[viewType]++;
			return { dayCountByViewType: [...dayCountByViewType] };
		},
		setPageFocus( _currentPageFocus, doFocus ) {
			let { currentPageFocus, selectedEventId } = this.nextState;
			if ( _currentPageFocus !== currentPageFocus || doFocus ) {
				if ( selectedEventId && _currentPageFocus === 'events' )
					this.$actions.selectEvent();
				console.log(_currentPageFocus)
				return { currentPageFocus: _currentPageFocus, doFocus };
			}
		},
		updateCurrentDay( _currentVisibleDay ) {
			let { currentVisibleDay, selectedEventId } = this.nextState;
			if ( _currentVisibleDay !== currentVisibleDay ) {
				//selectedEventId && this.$actions.selectEvent();
				return { currentVisibleDay: moment(_currentVisibleDay).startOf("day").valueOf() };
			}
		},
		selectEvent( selectedEvent, selectedEventDT, showPageBlock ) {
			let { currentPageFocus } = this.nextState;
			if ( selectedEvent )
				currentPageFocus = 'map';
			return {
				selectedEventId: selectedEvent && selectedEvent._id,
				selectedEventDT,
				currentPageFocus,
				doFocus        : true,
				selectedPage   : selectedEvent && { id: selectedEvent._id, etty: selectedEvent._cls } || null
			};
		},
		selectPage( selectedPage ) {
			let { currentPageFocus } = this.nextState;
			if ( selectedPage )
				currentPageFocus = 'page';
			return {
				currentPageFocus,
				doFocus        : true,
				selectedEventId: null,
				selectedPage   : selectedPage && { id: selectedPage, etty: "Page" } || null
			};
		},
		selectFocus( selectedFocus, cls ) {
			let { currentPageFocus } = this.nextState;
			if ( selectedFocus && currentPageFocus === 'page' )
				currentPageFocus = "loop";
			else if ( selectedFocus )
				currentPageFocus = 'head';
			return {
				currentPageFocus,
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
			@asRef
			Page   : "appState.selectedPage"
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
		$apply( data, state ) {
			return {
				...state,
				selected: Object.keys(state.selectedTags)
			}
		},
		selectTag( tag ) {
			return {
				selectedTags: {
					...this.nextState.selected,
					[tag]: true
				}
			}
		},
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
			return {
				available: tags.reduce(
					( h, tag ) => {
						h[tag.label] = h[tag.label] || tag;
						return h;
					},
					{
						...this.nextState.available
					}
				)
			}
		},
	},
	@asStore
	widgets   : {
		// initial state
		items: __IS_DEV__ ? [
			{
				"_id"     : "FfseOEKpm",
				"size"    : { "width": 200, "height": 200 },
				"title"   : "DevTools",
				"type"    : "DevTools",
				"position": { "x": 0, "y": 0 }
			}
		] : [],
		
		// actions
		newWidget( type, props = {} ) {
			let Default = Views.Widget[type] && Views.Widget[type].defaultWindow;
			return {
				items: [...this.nextState.items, {
					_id     : shortid.generate(),
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