/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import is  from 'is';
import api from './api/(*).js';

let debug = require('App/console').default("server");
//console.warn(api)
export default ( server, http ) => Object
	.keys(api)
	.map(
		( service ) => (
			is.fn(api[service]) ?
			{
				name         : service,
				priorityLevel: 10,
				service      : api[service]
			} : {
					name         : api[service].name || service,
					priorityLevel: api[service].priorityLevel || 10,
					service      : api[service].service
				}
		)
	)
	.sort(
		( a, b ) => (a.priorityLevel > b.priorityLevel ? -1 : 1)
	)
	.forEach(
		( service ) => {
			try {
				service.service(server, http);
			} catch ( e ) {
				debug.error("Api fail loading service ", service.name, "\n", e)
			}
		})