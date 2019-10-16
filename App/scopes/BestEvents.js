/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import moment  from "moment";
import shortid from "shortid";

import {withStateMap, asRef, asStore, asScope} from "react-scopes";
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
				    from = moment(curDay).startOf('day').add(2, 'hour').valueOf(),
				    to   = moment(curDay).endOf('week').add(2, 'hour').valueOf();
				return {
					query: {
						mountKeys: ["place", "category"],
						etty     : 'Event',
						query    : {
							$and: [
								{
									price: {
										'$gt': 1,
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
						limit    : 10,
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