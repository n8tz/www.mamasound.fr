/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
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
				//default: {
				//	_id : "_Theme",
				//	_cls: "Theme",
				//}
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
		curVisibleDay     : undefined,
		currentSearch     : undefined,
		currentArea       : undefined,
		viewType          : 0,
		viewTypesList     : ["", "Concerts", "Expositions", "Theatres"],
		viewTypeList      : ["Evenement", "Concert", "Exposition", "Theatre"],
		dayCountByViewType: [6, 6, 1, 1],
		curTags           : undefined,
		
		$apply( data, state ) {
			!state.curDay && this.setState({ curDay: moment.utc().startOf('day').valueOf() })
			return state;
		},
		
		// global app actions
		//
		loadStateFromUrl( url = '/' ) {
			let path = url.split('/'), $actions = this.$actions, viewType;
			path.shift();
			if ( path.length === 1 ) {
				viewType = this.state.viewTypesList.indexOf(path[0]);
				if ( viewType < 0 )
					viewType = 0;
				
				return {
					viewType,
					currentSearch  : '',
					selectedEventId: null,
					selectedEventDT: null,
					selectedEvent  : null,
					selectedFocus  : null
				}
			}
			else if ( path.length === 2 ) {
				let target = this.$stores.DataProvider.getRecord(path[1], path[0]);
				$actions.selectFocus(path[1], path[0]);
				return {
					selectedEvent: null,
					//currentSearch: path[0] === "Place" ? target && target.label : this.state.currentSearch
				}
			}
			else if ( path.length === 3 ) {
				let matches = url.match(/^\/([^\/]+)\/([^\/]+)\/([^\/]+)$/);
				//debugger
				viewType    = this.state.viewTypeList.indexOf(path[0]);
				setTimeout(tm => this.setState({
					                               selectedEventId: matches[3],
					                               selectedEventDT: moment(matches[2], "DD-MM-YY").startOf("day").valueOf(),
					                               selectedEvent  : { id: matches[3], etty: "Event" }
				                               })
				)
				//})
				return {
					viewType,
					userSetCDay: true,
					curDay     : moment(matches[2], "DD-MM-YY").startOf("day").valueOf(),
					
					//selectedFocus  : { id: matches[3], etty: "Event" },
				}
			}
		},
		updateCurrentSearch( currentSearch ) {
			return { currentSearch };
		},
		setCurrentArea( currentArea ) {
			return { currentArea };
		},
		setCurStyleTab( viewType ) {
			let { currentPageFocus, viewTypesList } = this.nextState, doFocus;
			if ( currentPageFocus !== "events" ) {
				currentPageFocus = "events";
				doFocus          = true
			}
			
			this.$actions.history_set("/" + viewTypesList[viewType])
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
		updateCurrentVisibleDay( curVisibleDay ) {
			return { curVisibleDay };
		},
		updateCurrentDay( _currentVisibleDay, userSetCDay = true ) {
			let { curDay, selectedEventId } = this.nextState,
			    dt                          = moment(_currentVisibleDay).startOf("day").valueOf();
			
			userSetCDay = userSetCDay && !(moment(_currentVisibleDay).isSame("day", Date.now()));
			
			if ( dt !== curDay ) {
				return { curDay: dt, userSetCDay };
			}
		},
		selectEvent( selectedEvent, selectedEventDT, showPageBlock ) {
			let { viewType, currentPageFocus, viewTypeList } = this.nextState;
			if ( selectedEvent && selectedEvent._id === this.nextState.selectedEventId )
				selectedEvent = undefined;
			//	currentPageFocus = 'map';
			if ( selectedEvent ) {
				this.$actions.history_set("/" + viewTypeList[viewType] + '/' + moment(selectedEventDT).format("DD-MM-YY")
					                          + "/" + (selectedEvent._alias || selectedEvent._id));
			}
			else {
				this.$actions.history_set("/")
			}
			return {
				selectedEventId: selectedEvent && selectedEvent._id,
				selectedEventDT,
				currentPageFocus,
				doFocus        : true,
				selectedEvent  : selectedEvent && { id: selectedEvent._id, etty: selectedEvent._cls } || null,
				//selectedFocus  : selectedEvent && { id: selectedEvent._id, etty: selectedEvent._cls } || null
			};
		},
		selectFocus( selectedFocus, cls ) {
			let { currentPageFocus } = this.nextState;
			if ( selectedFocus ) {
				this.$actions.history_set("/" + cls + '/' + selectedFocus);
				!__IS_SERVER__ && document.body.scrollTo({
					                                                    behavior: 'smooth',
					                                                    top     : 0
				                                                    })
			}
			return {
				//currentPageFocus,
				selectedEventId: null,
				doFocus        : !!selectedFocus,
				selectedFocus  : selectedFocus && { id: selectedFocus || "Page.SkxesB7ugG", etty: cls || "Page" }
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