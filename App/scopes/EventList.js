/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import stores                         from 'App/stores/(*).js';
import moment                         from "moment";
import {asRef, asStore, withStateMap} from "react-scopes";
import striptags                      from "striptags";
import whichPoly                      from "which-polygon";

const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();


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
			    from = moment(curDay).startOf('day').add(2, 'hour').valueOf(),
			    to   = moment(curDay).endOf('day').add(2, 'hour').valueOf();
			//console.log(moment(curDay).startOf('day').add(2, 'hour').format())
			//console.log(moment(curDay).endOf('day').add(2, 'hour').format())
			return {
				curDay: from,
				type,
				query : {
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
								},
								{
									_cls    : 'Event',
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
									_cls   : 'Event',
									startTM: {
										'$gt': from,
										'$lt': to
									}
								}] || []),
							...([1].includes(type) && [
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
								},
								{
									_cls    : 'Event',
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
									_cls   : 'Event',
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
	Queries: stores.MongoQueries,
	
	
	@asStore
	EventList: {
		@asRef
		items        : "!Queries.events.items",
		@asRef
		curDay       : "DayEventsQuery.curDay",
		@asRef
		type         : "DayEventsQuery.type",
		@asRef
		geoJson      : "Quartiers.data",
		@asRef
		refs         : "Queries.events.refs",
		@asRef
		filter       : "appState.currentSearch",
		@asRef
		selectedFocus: "appState.selectedFocus",
		@asRef
		selectedTags : "TagManager.selected",
		$apply( data = {}, { items, filter, refs, geoJson, curDay, type, selectedTags, selectedFocus } ) {
			
			let filterRE     = filter && new RegExp(filter.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w]+/ig, '.+'), 'ig'),
			    geoQuery     = this.geoQuery = this.geoQuery || whichPoly(geoJson),
			    tags         = [],
			    seen         = {},
			    filterArea   = !!selectedTags.find(t => (t.type === "area")),
			    filterPrice  = !!selectedTags.find(t => (t.type === "price")),
			    filterStyles = !!selectedTags.find(t => (t.type === "style")),
			    selectedDay  = moment(curDay),
			    newItems;
			
			if ( this.tags && this.tags.length ) {
				this.$actions.unRegisterTags(this.tags);
				this.tags = []
			}
			newItems = items.map(
				record => {
					let start, end;
					if ( record.schedule ) {
						// find the right tm
						for ( let i = 0; record.schedule.length > i; i++ ) {
							if ( selectedDay && record.schedule[i] && record.schedule[i].startTM && selectedDay.isSame(record.schedule[i].startTM, "day") ) {
								start = record.schedule[i].startTM;
								end   = record.schedule[i].endTM;
								break;
							}
						}
					}
					
					return {
						...record,
						realPeriod: {
							startTM: start || record.startTM, endTM: end || record.endTM
						}
					}
				}
			).filter(
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
							//area           = ll && geoQuery(ll)
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
					
					
					if ( selectedFocus && selectedFocus.etty === "Place" ) {
						doKeep    = doKeep && (selectedFocus.id === place._id || selectedFocus.id === place._alias);
					}
					
					
					if ( filter ) {
						let text = entities.decode(striptags(item.title + ' ' + item.resume + ' ' + item.description + ' '
							                                     + (item.category && refs[item.category.objId]
							                                        ? refs[item.category.objId].name
							                                        : "") + ' '
						)).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[\n\r]/g, " ");
						doKeep   = doKeep && filterRE.test(text);
					}
					
					if ( filterPrice ) {
						doKeep = doKeep && selectedTags.find(
							t => (
								t.type === "price"
								&& price.find(p => (t.useSup ? p >= t.amount : p <= t.amount)) !== undefined
							)
						);
					}
					
					if ( place && filterArea
					) {
						doKeep = doKeep && selectedTags.find(t => (t.type === "area" && t.label === place.quartier))
					}
					
					if ( filterStyles ) {
						doKeep = doKeep && selectedTags.find(t => (t.type === "style" && refs[item.category.objId].name.includes(t.label)))
					}
					
					
					return doKeep;
				}
			).map(
				record => {
					let start, end;
					if ( record.schedule ) {
						// find the right tm
						for ( let i = 0; record.schedule.length > i; i++ ) {
							if ( selectedDay && record.schedule[i] && record.schedule[i].startTM && selectedDay.isSame(record.schedule[i].startTM, "day") ) {
								start = record.schedule[i].startTM;
								end   = record.schedule[i].endTM;
								break;
							}
						}
					}
					
					return {
						...record,
						realPeriod: {
							startTM: start || record.startTM, endTM: end || record.endTM
						}
					}
				}
			).sort(( a, b ) => {// sort by duration
				if ( type === 2 ) {
					if (
						a.haveVerni && moment(selectedDay).isSame(a.verniTM, 'day')
						&&
						b.haveVerni && moment(selectedDay).isSame(b.verniTM, 'day')
					)
						return a.verniTM - b.verniTM;
					
					if ( a.haveVerni && moment(selectedDay).isSame(a.verniTM, 'day') )
						return -1;
					if ( b.haveVerni && moment(selectedDay).isSame(b.verniTM, 'day') )
						return 1;
					
					return (a.endTM - a.startTM) - (b.endTM - b.startTM);//durée
				}
				
				a = a.haveVerni && a.verniTM || a.realPeriod.startTM;
				b = b.haveVerni && b.verniTM || b.realPeriod.startTM;
				return a - b;
			});
//debugger
			tags.length && this.$actions.registerTags(tags);
//newItems
			return {
				tags,
				items: newItems,
				refs,
				filter
			}
		}
	},
	
	
	@asStore
	ActiveTags:
		{
			//@asRef
			//TagManager: "TagManager",
			@asRef
			events:
				"!Queries.events",
			
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
			}
			,
			
		}
	,
}