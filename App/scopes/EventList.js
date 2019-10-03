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

import stores from 'App/stores/(*).js';
import moment from "moment";

import {asRef, asStore, withStateMap} from "react-scopes";
import whichPoly                      from "which-polygon";


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
							...([0].includes(type) && [
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
							...([0, 2].includes(type) && [
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
							...(type === 1 && [{
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
					limit    : 10000,
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
	Queries: stores.MongoQueries,
	
	
	@asStore
	EventList: {
		@asRef
		items       : "!Queries.events.items",
		@asRef
		geoJson     : "Quartiers.data",
		@asRef
		refs        : "Queries.events.refs",
		@asRef
		filter      : "appState.currentSearch",
		@asRef
		selectedTags: "TagManager.selected",
		$apply( data = {}, { items, filter, refs, geoJson, currentArea, selectedTags } ) {
			
			let filterRE     = filter && new RegExp(filter.replace(/[^\w]+/ig, '.+'), 'ig'),
			    geoQuery     = this.geoQuery = this.geoQuery || whichPoly(geoJson),
			    tags         = [],
			    seen         = {},
			    filterArea   = !!selectedTags.find(t => (t.type === "area")),
			    filterPrice  = !!selectedTags.find(t => (t.type === "price")),
			    filterStyles = !!selectedTags.find(t => (t.type === "style")),
			    newItems;
			
			if ( this.tags && this.tags.length ) {
				this.$actions.unRegisterTags(this.tags);
				this.tags = []
			}
			newItems = items.filter(
				item => {
					let place, ll, area,
					    price  = ('' + item.price || '0').split('[\/\s\-]').map(p => p.trim()).map(p => (/grat/ig.test(p)
					                                                                                     ? 0
					                                                                                     : parseInt(p))),
					    doKeep = true;
					place      = item.place && refs[item.place.objId];
					// tag area
					if ( place ) {
						if ( !place.quartier ) {
							ll             = place.address && place.address.geoPoint;
							area           = ll && geoQuery(ll)
							place.quartier = area && area.LIBSQUART || "Périphérie";
						}
						if ( !seen[place.quartier] )
							tags.push(seen[place.quartier] = {
								label: place.quartier,
								type : "area",
								style: {},
								count: 1
							})
						else
							seen[place.quartier].count++
					}
					
					if ( price && price.length ) {
						if ( price.find(p => (0 === p)) !== undefined ) {
							if ( !seen["Gratuit"] )
								tags.push(seen["Gratuit"] = {
									label : "Gratuit",
									type  : "price",
									style : {},
									useSup: false,
									amount: 0,
									count : 1
								})
							else
								seen["Gratuit"].count++
						}
						if ( price.find(p => (5 >= p)) !== undefined ) {
							if ( !seen["inf5"] )
								tags.push(seen["inf5"] = {
									label : "<= 5€",
									type  : "price",
									style : {},
									useSup: false,
									amount: 5,
									count : 1
								})
							else
								seen["inf5"].count++
						}
						
						if ( price.find(p => (10 >= p)) !== undefined ) {
							if ( !seen["<= 10€"] )
								tags.push(seen["<= 10€"] = {
									label : "<= 10€",
									type  : "price",
									style : {},
									useSup: false,
									amount: 10,
									count : 1
								})
							else
								seen["<= 10€"].count++
						}
						if ( price.find(p => (25 >= p)) !== undefined ) {
							if ( !seen["<= 25€"] )
								tags.push(seen["<= 25€"] = {
									label : "<= 25€",
									type  : "price",
									style : {},
									useSup: false,
									amount: 25,
									count : 1
								});
							else
								seen["<= 25€"].count++
						}
						if ( price.find(p => (20 <= p)) !== undefined ) {
							if ( !seen[">= 20€"] )
								tags.push(seen[">= 20€"] = {
									label : ">= 20€",
									type  : "price",
									style : {},
									useSup: true,
									amount: 20,
									count : 1
								})
							else
								seen[">= 20€"].count++
						}
					}
					
					
					if ( filter ) {
						doKeep = doKeep && filterRE.test(item.title);
						if ( item.text )
							doKeep = doKeep && filterRE.test(item.text);
						if ( item.category && refs[item.category.objId] )
							doKeep = doKeep && filterRE.test(refs[item.category.objId].name);
					}
					
					if ( filterPrice ) {
						doKeep = doKeep && selectedTags.find(
							t => (
								t.type === "price"
								&& price.find(p => (t.useSup ? p >= t.amount : p <= t.amount)) !== undefined
							)
						);
					}
					
					if ( place && filterArea ) {
						doKeep = doKeep && selectedTags.find(t => (t.type === "area" && t.label === place.quartier))
					}
					
					if ( filterStyles ) {
						doKeep = doKeep && selectedTags.find(t => (t.type === "style" && refs[item.category.objId].name.includes(t.label)))
					}
					
					
					return doKeep;
				}
			);
			tags.length && this.$actions.registerTags(tags);
			return {
				tags,
				items: newItems,
				refs,
				filter
			}
		}
	},
	
	
	@asStore
	ActiveTags: {
		//@asRef
		//TagManager: "TagManager",
		@asRef
		events: "!Queries.events",
		
		$apply( data = {}, { events: { items = [], refs } }, { events } ) {
			let tags, seen = {}, styles = {};
			if ( !events )
				return data;
			data && data.tags && data.tags.length && this.$actions.unRegisterTags(data.tags);
			
			items.forEach(
				event => {
					let style = event.category && refs[event.category.objId];
					style && style.name
					              .replace(/([\.\(\)\/\\]+)/ig, '|')
					              .split('|')
					              .filter(t => (!/^\s*$/.test(t)))
					              .filter(t => (seen[t] && seen[t]++ || (seen[t] = 1, true)))
					              //.filter(console.log)
					              .forEach(t => (styles[t] = styles[t] || style))
				}
			)
			tags = Object
				.keys(seen)
				//.filter(t => (!!styles[t]))
				.map(tag => ({
					label: tag,
					type : "style",
					style: styles[tag] || {},
					count: seen[tag]
				}));
			//this.$scope.mount("TagManager");
			tags.length && this.$actions.registerTags(tags);
			//console.log(tags, seen)
			return {
				tags,
			};
		},
		
	},
}