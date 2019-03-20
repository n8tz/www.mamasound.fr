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

import $super  from "$super";
import moment  from "moment";
import shortid from "shortid";

import {withStateMap, asRef, asStore} from "rescope-spells";
import stores                         from 'App/stores/(*).js';


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
		curEventType   : undefined,
		curTags        : undefined,
		
		selectEvent( selectedEventId, showPageBlock ) {
			let { currentPageFocus } = this.nextState;
			currentPageFocus         = showPageBlock ? "page" : currentPageFocus;
			return { selectedEventId, currentPageFocus, selectedEvent: { id: selectedEventId, etty: "Event" } };
		},
		selectWidget( selectedWidgetId ) {
			return { selectedWidgetId };
		},
		saveState() {
			//localStorage.mama = JSON.stringify(this.scopeObj.serialize());
		},
		clearState() {
			localStorage.mama = null;
			window.location += "";
		}
	},
	
	
	@withStateMap(
		{
			@asRef
			Event: "appState.selectedEvent"
		}
	)
	Selected: stores.MongoRecords,
	
	@asStore
	GlobalEventQuery: {
		etty : 'Event',
		limit: 100,
		$apply( data, state ) {
			if ( !state.query ) {
				this.$actions.updateQuery()
			}
			return state;
		},
		updateQuery( dt = moment(), type ) {
			let from = moment(dt).startOf('day').add(2, 'hour').unix() * 1000,
			    to   = moment(dt).endOf('week').add(2, 'hour').unix() * 1000;
			return {
				query  : {
					$or: [
						
						...([undefined, 'Tout-Montpellier', 'Concerts'].includes(type) && [
							{
								_cls    : 'Concert',
								schedule: {
									$elemMatch: {
										startTM: {
											'$gt': from,
											'$lt': to
										}
									}
								}
							},
							{
								_cls   : 'Concert',
								startTM: {
									'$gt': from,
									'$lt': to
								}
							}]),
						...([undefined, 'Tout-Montpellier', 'Theatres'].includes(type) && [
							{
								_cls    : 'Theatre',
								schedule: {
									$elemMatch: {
										startTM: {
											'$gt': from,
											'$lt': to
										}
									}
								}
							},
							{
								_cls   : 'Theatre',
								startTM: {
									'$gt': from,
									'$lt': to
								}
							}]),
						
						...([undefined, 'Tout-Montpellier'].includes(type) && [
							{
								_cls     : 'Expo',
								haveVerni: true,
								verniTM  : {
									'$gt': from,
									'$lt': to
								}
							}]),
						...(type == 'Expositions' && [{
							_cls    : 'Expo',
							schedule: {
								$elemMatch: {
									startTM: {
										'$lt': from
									},
									endTM  : {
										'$gt': to
									}
								}
							}
						}, {
							$and: [
								{
									_cls   : 'Expo',
									startTM: {
										'$lt': from
									},
									endTM  : {
										'$gt': to
									}
								}
							]
						}] || []),
					]
				},
				limit  : 1000,
				orderby: { startTM: 1 }
				
			};
		}
		
	},
	
	@withStateMap(
		{
			@asRef
			events: "GlobalEventQuery",
		}
	)
	Queries         : stores.MongoQueries,
	@withStateMap(
		{
			@asRef
			items      : "Queries.events.items",
			toMountKeys: ["category", "place"]
		}
	)
	MountedEventList: stores.MongoListRefsLoader,
	@withStateMap(
		{
			@asRef
			items  : "MountedEventList.items",
			@asRef
			refs   : "MountedEventList.refs",
			imgKeys: ["previewImage", "icon"]
		}
	)
	EventList       : stores.ImgFieldsLoader,
	
	
	@asStore
	ActiveTags: {
		@asRef
		events: "EventList",
		
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
		newWidget() {
			return {
				items: [...this.nextState.items, {
					_id     : shortid.generate(),
					size    : { width: 350, height: 200 },
					position: {
						x: 100 + ~~(Math.random() * 600),
						y: 100 + ~~(Math.random() * 600)
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