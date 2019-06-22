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

import {withStateMap, asRef, asStore, asScope} from "rescope-spells";
import stores                                  from 'App/stores/(*).js';


export default {
	@asScope
	BestEvents: {
		@asStore
		query: {
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
				    to   = moment(curDay).endOf('week').add(2, 'hour').unix() * 1000;
				return {
					query: {
						mountKeys: ["place", "category"],
						etty     : 'Event',
						query    : {
							$and: [
								{
									price: {
										'$gt': 10,
									}
								},
								{
									$or: [
										{
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
											startTM: {
												'$gt': from,
												'$lt': to
											}
										}
									]
								}
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
				events: "query.query",
			}
		)
		data : stores.MongoQueries,
		@asStore
		byDay: {
			@asRef
			items: "data.events.items",
			@asRef
			refs : "data.events.refs",
			$apply( data, { items = [], refs } ) {
				let byDay = items.reduce(
					( days, event ) => {
						let ts, start;
						//if (event.schedule){
						//	start = event.schedule.find(occ=>)
						//}
						ts       = moment(event.startTM).startOf('day').add(2, 'hour').valueOf()
						days[ts] = days[ts] || [];
						days[ts].push(event);
						return days;
					},
					{}
				);
				return {
					items: Object.entries(byDay).sort(( a, b ) => (a[0] > b[0])),
					refs
				}
			}
		}
	},
}