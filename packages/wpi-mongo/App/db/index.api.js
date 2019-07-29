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
import is           from "is";
import aliasAPI     from "App/db/aliasHelpers";
import typesList    from "App/db/types";
import {pushDbTask} from "App/db/pool";
import {mount}      from "App/db/mountRecord";

export const types = typesList;
export {mount}      from "App/db/mountRecord";

const defaults = { get, query }
export default defaults;

export function get( cls, objId ) {
	return new Promise(
		( resolve, reject ) => {
			
			
			pushDbTask(
				( client, dbRelease ) => {
					let db = client.db("mamasound_fr");
					
					aliasAPI.getAlias(
						cls,
						objId,
						db,
						( err, alias ) => {
							//if ( err ) {
							//	dbRelease();
							//	return cb(404);
							//}
							db.collection(cls)
							  .findOne(
								  { _id: alias && alias.target.objId || objId },
								  ( err, docs ) => {
									  dbRelease();
									
									  if ( !docs ) {
										  console.info("Not found ", cls, objId)
										  reject(err || 404);
										  return;
									  }
									  resolve({ ...docs, _cls: cls })
									
								  }
							  );
						}
					);
					
				}
			)
		}
	)
		;
}
;

export function query( req ) {
	return new Promise(
		( resolve, reject ) => {
			
			let { query: _query, etty, limit = 1000, skip, orderby, mountKeys = [] } = req;
			pushDbTask(
				( client, dbRelease ) => {
					let db = client.db("mamasound_fr"),
					    data  = {},
					    complete,
					    done  = ( r, ln ) => {
						    data.length = typeof ln == 'number' ? ln : data.length;
						    data.items  = r && r.items || data.items;
						    data.refs   = r && r.refs || data.refs;
						    if ( typeof data.length == 'number' && is.array(data.items) ) {
							    done = null;
							    dbRelease();
							    resolve(data)
						    }
						
					    },
					    ptr   = db.collection(etty)
					              .find(_query || {}),//{$query : {}, $orderby : {updated : -1}}
					    count = ptr.count(null, ( e, r ) => {
						    done(null, r || 0);
					    }),
					
					    parse = function ( err, items ) {
						    items.forEach(
							    item => {
								    items._cls = items._cls || etty;
							    }
						    )
						    mount({ get, query }, items || [], mountKeys)
							    .then(refs => {
								    done({ refs, items })
							    })
							    .catch(data => {
								    done({ refs, items })
							    })
					    };
					ptr.sort(orderby)
					   .skip(parseInt(skip) || 0)
					   .limit(parseInt(limit) || 20)
					   .toArray(parse);
					
				}
			)
		}
	);
};

export function remove( req ) {
	return new Promise(
		( resolve, reject ) => {
			
			let { query: _query, etty, limit = 1000, skip, orderby, mountKeys = [] } = req;
			pushDbTask(
				( client, dbRelease ) => {
					var db = client.db("mamasound_fr");
					db.collection(etty)
					  .deleteMany(_query || {}).then(function ( r ) {
						resolve(r.result)
					}).catch(e => reject(e + ""));
					
				}
			)
		}
	);
};