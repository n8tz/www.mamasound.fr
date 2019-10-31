/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import stores                                  from 'App/stores/(*).js';
import moment                                  from "moment";
import {asRef, asStore, asScope, withStateMap} from "react-scopes";
import striptags                               from "striptags";
import whichPoly                               from "which-polygon";

const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();


export default {
	
	@asScope
	Articles: {
		@asStore
		query: {
			query: {
				mountKeys: ["linkedMedia"],
				etty     : 'Article',
				query    : {},
				limit    : 10,
				//orderby  : { created: 1 }
				
			},
			//$apply( data, state ) {
			//	return {};
			//}
			
		},
		
		@withStateMap(
			{
				@asRef
				articles: "query.query",
			}
		)
		data: stores.MongoQueries,
	},
}