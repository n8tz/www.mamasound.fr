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

import moment  from "moment";
import shortid from "shortid";

import {withStateMap, asRef, asStore} from "rescope-spells";
import stores                         from 'App/stores/(*).js';


export default {
	@asStore
	DayEventsQuery: {
		//@asRef
		//curDay     : "appState.curDay",
		//@asRef
		viewType: 0,
		//@asRef
		//nbDays     : "appState.nbDays",
		query: {},
		$apply( data, state ) {
			let {
				    curDay, nbDays = 0,
				    viewType: type = 0
			    }    = state,
			    from = moment(curDay).startOf('day').add(2, 'hour').unix() * 1000,
			    to   = moment(curDay).endOf('day').add(2, 'hour').unix() * 1000;
			return {
				query: {
					mountKeys: ["place", "category"],
					etty     : 'Event',
					query    : {
						$or: [
							...([0, 1].includes(type) && [
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
								}] || []),
							...([0, 3].includes(type) && [
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
								}] || []),
							
							...([0].includes(type) && [
								{
									_cls     : 'Expo',
									haveVerni: true,
									verniTM  : {
										'$gt': from,
										'$lt': to
									}
								}] || []),
							...(type === 2 && [{
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
					limit    : 1000,
					orderby  : { startTM: 1 }
					
				}
			};
		}
		
	},
	
	@withStateMap(
		{
			@asRef
			events: "DayEventsQuery.query",
		}
	)
	Queries  : stores.MongoQueries,
	@withStateMap(
		{
			@asRef
			items  : "Queries.events.items",
			@asRef
			refs   : "Queries.events.refs",
			imgKeys: ["previewImage", "icon"]
		}
	)
	EventList: stores.ImgFieldsLoader,
	
	
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
}