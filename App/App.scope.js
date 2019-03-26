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
		
		selectedEvent  : undefined,
		selectedEventId: undefined,
		selectedEventDT: undefined,
		curDay         : undefined,
		viewType       : 0,
		curTags        : undefined,
		setCurStyleTab( viewType ) {
			return { viewType };
		},
		setPageFocus( _currentPageFocus ) {
			let { currentPageFocus } = this.nextState;
			if ( _currentPageFocus !== currentPageFocus )
				return { currentPageFocus: _currentPageFocus };
		},
		selectEvent( selectedEventId, showPageBlock ) {
			let { currentPageFocus } = this.nextState;
			currentPageFocus         = showPageBlock ? "page" : currentPageFocus;
			if ( !selectedEventId && currentPageFocus === 'page' )
				currentPageFocus = 'events';
			return {
				selectedEventId,
				currentPageFocus,
				selectedEvent: selectedEventId && { id: selectedEventId, etty: "Event" } || null
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
	
	//...scopes.EventList,
	
	@asStore
	ActiveTags: {
		//@asRef
		//events: "EventList",
		
		$apply( data, { events: { items = [], refs } } ) {
			let available = [], seen = {}, styles = {};
			items.forEach(
				event => {
					let style = event.category && refs[event.category.objId];
					style && style.name
					              .replace(/([\.\(\)\/\\]+)/ig, '|')
					              .split('|')
					              .filter(t => (!!t && /\s*/.test(t)))
					              .filter(t => (seen[t] && seen[t]++ || (seen[t] = 1, false)))
					              .forEach(t => (styles[t] = styles[t] || style))
				}
			)
			
			return {
				available: Object
					.keys(seen)
					.filter(t => (!!styles[t]))
					.sort(( a, b ) => (seen[a] < seen[b]
					                   ? 1
					                   : -1))
					.map(tag => ({
						title: tag,
						style: styles[tag] || {},
						count: seen[tag]
					}))
			};
		},
		
	},
	
	@asStore
	widgets: {
		// initial state
		items: [
			//{
			//	"_id"     : "rkUQHZrqM",
			//	"label"   : "Importer de dates",
			//	"type"    : "RecordEditor",
			//	"props"   : {},
			//	"size"    : { "width": 600, "height": 400 },
			//	"position": { "x": 50, "y": 111 },
			//}
		],
		
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