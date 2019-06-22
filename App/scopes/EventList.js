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
		query   : {},
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
		//@asRef
		//TagManager: "TagManager",
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
			//this.$scope.mount("TagManager");
			this.$actions.registerTags(
				Object
					.keys(seen)
					.filter(t => (!!styles[t]))
					.sort(( a, b ) => (seen[a] < seen[b]
					                   ? 1
					                   : -1))
					.map(tag => ({
						label: tag,
						style: styles[tag] || {},
						count: seen[tag]
					}))
			);
			
			//return {
			//	available: Object
			//		.keys(seen)
			//		.filter(t => (!!styles[t]))
			//		.sort(( a, b ) => (seen[a] < seen[b]
			//		                   ? 1
			//		                   : -1))
			//		.map(tag => ({
			//			title: tag,
			//			style: styles[tag] || {},
			//			count: seen[tag]
			//		}))
			//};
		},
		
	},
}