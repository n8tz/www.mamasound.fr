/*
 * The MIT License (MIT)
 * Copyright (c) 2019. Wise Wild Web
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  @author : Nathanael Braun
 *  @contact : n8tz.js@gmail.com
 */

import $super     from "$super";
import moment     from "moment";
import shortid    from "shortid";
import superagent from "superagent";

import {withStateMap, asRef, asStore} from "rescope-spells";
import stores                         from 'App/stores/(*).js';
import scopes                         from 'App/scopes/(*).js';


export default {
	...$super,
	UserGeoLocation: stores.UserGeoLocation,
	@asStore
	appState       : {
		
		currentPageFocus: "head",// head, events, page
		
		selectedEvent     : undefined,
		selectedEventId   : undefined,
		selectedEventDT   : undefined,
		curDay            : undefined,
		viewType          : 0,
		dayCountByViewType: [1, 1, 1, 1, 0],
		curTags           : undefined,
		
		// global app actions
		
		setCurStyleTab( viewType ) {
			return { viewType };
		},
		oneMoreDay( viewType = 0 ) {
			let { dayCountByViewType } = this.nextState;
			dayCountByViewType[viewType]++;
			return { dayCountByViewType: [...dayCountByViewType] };
		},
		setPageFocus( _currentPageFocus ) {
			let { currentPageFocus } = this.nextState;
			if ( _currentPageFocus !== currentPageFocus )
				return { currentPageFocus: _currentPageFocus };
		},
		updateCurrentDay( _currentVisibleDay ) {
			let { currentVisibleDay } = this.nextState;
			if ( _currentVisibleDay !== currentVisibleDay )
				return { currentVisibleDay: _currentVisibleDay };
		},
		selectEvent( selectedEvent, selectedEventDT, showPageBlock ) {
			let { currentPageFocus } = this.nextState;
			currentPageFocus         = showPageBlock ? "page" : currentPageFocus;
			if ( !selectedEvent && currentPageFocus === 'page' )
				currentPageFocus = 'events';
			return {
				selectedEventId: selectedEvent._id,
				selectedEventDT,
				currentPageFocus,
				selectedEvent  : selectedEvent && { id: selectedEvent._id, etty: selectedEvent._cls } || null
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
			record: "appState.selectedEvent"
		}
	)
	Selected: stores.MongoRecords,
	
	@asStore
	widgets: {
		// initial state
		items: [],
		
		// actions
		newWidget( type ) {
			return {
				items: [...this.nextState.items, {
					_id     : shortid.generate(),
					size    : { width: 600, height: 400 },
					type,
					position: {
						x: 50 + ~~(Math.random() * 200),
						y: 50 + ~~(Math.random() * 200)
					},
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
	}
}