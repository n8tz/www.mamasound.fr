/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import {mount}      from "App/db/mountRecord";
import typesList    from "App/db/types";
import superagent   from "superagent";
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

export function query( query, cb ) {
	return new Promise(
		( resolve, reject ) => {
			superagent.post('/db/query', query)
			          .then(
				          res => {
					          cb && cb(null, res.body);
					          resolve(res.body)
				          }
			          )
			          .catch(err => {
				          cb && cb(err, null);
				          reject(err)
			          })
		}
	);
};

export function remove( query ) {
	return new Promise(
		( resolve, reject ) => {
			superagent.post('/db/remove', query._id && {
				query: { _id: query._id },
				limit: 1,
				etty : query._cls
			} || query)
			          .then(
				          res => {
					          resolve(res.body)
				          }
			          ).catch(reject)
		}
	);
};

export function create( record, cb ) {
	return new Promise(
		( resolve, reject ) => {
			superagent.post('/db/create', record)
			          .then(
				          res => {
					          resolve(res.body);
					          cb && cb(res.body);
				          }
			          ).catch(reject)
		}
	);
};

export function save( record, cb ) {
	return new Promise(
		( resolve, reject ) => {
			superagent.post('/db/save', record)
			          .then(
				          res => {
					          resolve(res.body);
					          cb && cb(res.body);
				          }
			          ).catch(reject)
		}
	);
};