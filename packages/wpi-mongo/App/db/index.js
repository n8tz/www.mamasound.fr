/*
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

import superagent   from "superagent";
import typesList    from "App/db/types";
import {mount}      from "App/db/mountRecord";
//import {pushDbTask} from "App/db/pool";


export const types = typesList;
export {mount}      from "App/db/mountRecord";
export default { get, query, mount };

export function get( cls, objId, cb ) {
	return new Promise(
		( resolve, reject ) => {
			superagent.post('/db/get', { cls, objId })
			          .then(
				          res => {
					          resolve(res.body)
					          cb && cb(null, res.body)
				          }
			          )
			          .catch(reject)
			          .catch(err => cb && cb(err))
		}
	);
};

export function query( query ) {
	return new Promise(
		( resolve, reject ) => {
			superagent.post('/db/query', query)
			          .then(
				          res => {
					          resolve(res.body)
				          }
			          ).catch(reject)
		}
	);
};

export function remove( query ) {
	return new Promise(
		( resolve, reject ) => {
			superagent.post('/db/remove', query)
			          .then(
				          res => {
					          resolve(res.body)
				          }
			          ).catch(reject)
		}
	);
};