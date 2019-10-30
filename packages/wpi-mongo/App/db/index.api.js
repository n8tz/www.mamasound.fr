/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import config       from "App/config";
import aliasAPI     from "App/db/aliasHelpers";
import entities     from "App/db/entities";
import {mount}      from "App/db/mountRecord";
import {pushDbTask} from "App/db/pool";

import redis        from "App/db/redis.js";
import typesList    from "App/db/types";
import is           from "is";
import cacheManager from "node-cache";
import shortid      from "shortid";
import xxhashjs     from 'xxhashjs'

var H = xxhashjs.h64(0)	// seed = 0xABCD

function mkQueryH( query ) {
	//return JSON.stringify(query)
	return H.update(JSON.stringify(query)).digest().toString(32)
}

export const types = typesList;
export {mount}      from "App/db/mountRecord";
const memoryCache = new cacheManager({ stdTTL: 60 * 60, checkperiod: 60 * 10, useClone: false });
const defaults    = { get, query, remove, create, save }
export default defaults;

export function get( cls, objId, cb ) {
	let key       = cls + "_/_" + objId,
	    syncCache = memoryCache.get(key);
	
	if ( syncCache && cb )
		return cb(null, syncCache);
	
	return new Promise(
		( resolve, reject ) => {
			if ( syncCache && !cb )
				return resolve(syncCache);
			
			
			pushDbTask(
				( client, dbRelease ) => {
					let db    = client.db("mamasound_fr");
					let _etty = cls;
					while ( entities[_etty].targetCollection )
						_etty = entities[_etty].targetCollection;
					aliasAPI.getAlias(
						cls,
						objId,
						db,
						( err, alias ) => {
							let query = { _id: alias && alias.target.objId || objId };
							if ( _etty !== cls )
								query._cls = cls;
							db.collection(_etty)
							  .findOne(
								  query,
								  ( err, docs ) => {
									  dbRelease();
									
									  if ( !docs ) {
										  console.info("Not found ", cls, objId);
										  //debugger
										  query, alias, _etty;
										  reject(err || 404);
										  cb && cb(err || 404, null)
										  return;
									  }
									  else {
										  let doc = { ...docs, _cls: cls };
										  cb && cb(null, doc)
										  memoryCache.set(key, doc)
										  resolve(doc)
									  }
									
									
								  }
							  );
						}
					);
					
				}
			)
		}
	);
}
;

export function query( req, cb ) {
	let key       = mkQueryH(req),
	    syncCache = memoryCache.get(key);
	
	if ( syncCache && cb )
		return cb(null, syncCache);
	return new Promise(
		( resolve, reject ) => {
			if ( syncCache && !cb )
				return resolve(syncCache);
			
			let { query: _query, etty, limit = 1000, skip, orderby, mountKeys = [] } = req;
			pushDbTask(
				( client, dbRelease ) => {
					try {
						let db    = client.db("mamasound_fr"),
						    data  = {},
						    complete,
						    done  = ( r, ln ) => {
							    data.length = typeof ln == 'number' ? ln : data.length;
							    data.items  = r && r.items || data.items;
							    data.refs   = r && r.refs || data.refs;
							    if ( typeof data.length == 'number' && is.array(data.items) ) {
								    done = null;
								    dbRelease();
								    try {
									    memoryCache.set(key, data)
									    //memoryCache.flushAll();
									    //redis.delWildcard(config.PUBLIC_URL + "_*");
									    resolve(data)
								    } catch ( e ) {
									    console.warn(e);
								    }
							    }
							
						    },
						    ptr   = db.collection(etty)
						              .find(_query || {}),//{$query : {}, $orderby : {updated : -1}}
						    count = ptr.count(null, ( e, r ) => {
							    done(null, r || 0);
						    }),
						
						    parse = function ( err, items = [] ) {
							    err && console.warn(err);
							    items.forEach(
								    item => {
									    item._cls = item._cls || etty;
								    }
							    )
							    mount({ get, query }, items || [], mountKeys,
							          ( err, refs = {} ) => {
								          done({ refs, items })
							          })
						    };
						ptr.sort(orderby)
						   .skip(parseInt(skip) || 0)
						   .limit(parseInt(limit) || 20)
						   .toArray(parse);
						
					} catch ( e ) {
						console.warn(e);
					}
				}
			)
		}
	)
		.then(data => (cb && cb(null, data)))
		.catch(err => (cb && cb(err, null)));
};

export function create( etty, data, id = etty + '.' + shortid.generate() ) {
	//memoryCache.flushAll()
	return new Promise(
		( resolve, reject ) => {
			
			
			pushDbTask(
				( client, dbRelease ) => {
					let db     = client.db("mamasound_fr"),
					    table  = entities[etty].targetCollection || etty,
					    record = { ...data, _id: id, _cls: etty, updated: Date.now(), created: Date.now() };
					
					// assert.equal(null, err);
					aliasAPI.applyAlias(
						record,
						entities[etty],
						etty, db,
						( alias, datas ) => {
							//delete datas._id;
							db.collection(table)
							  .insertOne(
								  record
								  , ( err, docs ) => {
									  if ( err ) console.warn("save failed ", err);
									  dbRelease();
									  memoryCache.flushAll();
									  redis.delWildcard(config.PUBLIC_URL + "_*");
									  !err && resolve({ id, etty });
									  err && reject(err);
								  });
						}
					)
				});
		}
	)
}

export function save( etty, id, data ) {
	return new Promise(
		( resolve, reject ) => {
			
			
			pushDbTask(
				( client, dbRelease ) => {
					let db    = client.db("mamasound_fr"),
					    table = entities[etty].targetCollection || etty;
					
					// assert.equal(null, err);
					aliasAPI.applyAlias(
						data,
						entities[etty],
						etty, db,
						( alias, datas ) => {
							let record = {}
							Object.assign(record, data)
							alias && (record._alias = alias.alias);
							record.updated = Date.now();
							delete record._id;
							db.collection(table)
							  .update(
								  { _id: id },
								  { $set: record }
								  , ( err, docs ) => {
									  if ( err ) console.warn("save failed ", err);
									  memoryCache.flushAll();
									  redis.delWildcard(config.PUBLIC_URL + "_*");
									  dbRelease();
									  !err && resolve(data);
									  err && reject(err);
								  });
						}
					)
				});
		}
	)
}
;


export function remove( req ) {
	return new Promise(
		( resolve, reject ) => {
			
			let { query: _query, etty, limit = 1000, skip, orderby, mountKeys = [] } = req;
			
			pushDbTask(
				( client, dbRelease ) => {
					var db = client.db("mamasound_fr");
					db.collection(etty)
					  .deleteMany(_query || {}).then(function ( r ) {
						redis.delWildcard(config.PUBLIC_URL + "_*")
						memoryCache.flushAll()
						resolve(r.result)
					}).catch(e => reject(e + ""));
					
				}
			)
		}
	);
};