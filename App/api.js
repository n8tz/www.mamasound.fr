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

import is  from 'is';
import api from './api/(*).js';

let debug = require('App/console').default("server");
console.warn(api)
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