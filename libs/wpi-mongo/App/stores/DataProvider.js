/*
 * The MIT License (MIT)
 * Copyright (c) 2019. Wise Wild Web
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  @author : Nathanael Braun
 *  @contact : n8tz.js@gmail.com
 */

import {Context, Store, scopeToProps} from "rescope";
import React                          from 'react'
import debounce                       from 'debounce'
import is                             from 'is'
import shortid                        from 'shortid'
import xxhashjs                       from 'xxhashjs'
import {types, query}                 from 'App/db';

var H = xxhashjs.h64(0)	// seed = 0xABCD


/**
 * base data provider
 *  - centralize record update & dispatch
 */

export default class DataProvider extends Store {
	/**
	 * The data provider state contain the current API by data type
	 * {
	 *      [entity]:{
	 *          query(query){},
	 *          update(query){},
	 *          remove(query){}
	 *      }
	 * }
	 * The query parameter is as follow
	 * {
	 *   id:(id of the record)
	 * }
	 * or
	 * {
	 *   // query filter
	 *   query:{
	 *     [field]:(value)
	 *     // or
	 *     [field]:{$lt:(int), $gt:(int)}
	 *   }
	 *   // optional order of the results
	 *   order:{
	 *     [field]:(1 || -1)
	 *   }
	 *   // pagination
	 *   skip:(int)
	 *   limit:(int)
	 *
	 *   // distinct field values (autocomplete)
	 *   distinct:[field]
	 * }
	 *
	 *
	 * They return promise with the following results format :
	 *
	 * If this was a single record query :
	 *  {
	 *   result:{} // record
	 *  }
	 * If this was a query :
	 *  {
	 *   results:{
                items : [],   // record
                length: (int),// returned records length
                total : (int) // total items that match in database
	 *   }
	 *  }
	 */
	static singleton = true;
	static state     = {};
	
	static actions = {
		data_create( etty, record, cb ) {
			if ( !this.nextState[etty] )
				return console.error("DataProvider: Unknown data type '" + etty + "'")
			
			if ( !this.nextState[etty].remove )
				return console.error("DataProvider: no create api for data type '" + etty + "'")
			
			this.state[etty]
				.create({ record })
				.then(
					( data ) => {
						cb && cb(null, data.result);
						this.flushAndReload(etty)
					},
					( err ) => {
						if ( err ) {
							cb && cb(err)
						}
					}
				);
		},
		data_save( etty, record, cb ) {
			if ( !this.nextState[etty] )
				return console.error("DataProvider: Unknown data type '" + etty + "'")
			
			if ( !this.nextState[etty].save )
				return console.error("DataProvider: no save api for data type '" + etty + "'")
			
			this.state[etty]
				.save({ id: record.id, record })
				.then(
					( data ) => {
						cb && cb(null, data.result);
						this.flushAndReload(etty)
					},
					( err ) => {
						if ( err ) {
							cb && cb(err)
						}
					}
				);
		},
		data_remove( etty, query, cb ) {
			if ( !this.nextState[etty] )
				return console.error("DataProvider: Unknown data type '" + etty + "'")
			
			if ( !this.nextState[etty].remove )
				return console.error("DataProvider: no remove api for data type '" + etty + "'")
			
			this.state[etty]
				.remove(query)
				.then(
					( data ) => {
						cb && cb(null, data.result || true);
						this.flushAndReload(etty)
					},
					( err ) => {
						if ( err ) {
							cb && cb(err)
						}
					}
				);
		}
	};
	
	constructor() {
		super(...arguments);
		this.retain("keepAlive");
		// data cache
		this.recordsByEttyId = {};
	}
	
	// recently updated records & queries
	updatedRecords = {};
	
	apply( data = this.recordsByEttyId, state, changes ) {
		return data;
	}
	
	/**
	 * Get record by Id if available
	 * @param etty
	 * @param id
	 * @returns {*}
	 */
	getRecord( etty, id ) {
		return this.recordsByEttyId[etty]
			&& this.recordsByEttyId[etty][id];
	}
	
	/**
	 * Get query results if available
	 * @param query
	 * @returns {*}
	 */
	getQuery( query ) {
		let hash = JSON.stringify(query)
		return query && this.recordsByEttyId["__queries"]
			&& this.recordsByEttyId["__queries"][hash];
	}
	
	/**
	 * Update record in the store & dispatch it to the listeners
	 * @param etty
	 * @param id
	 * @param rec
	 */
	pushRemoteRecord( etty, id, rec ) {
		this.recordsByEttyId[etty]     = this.recordsByEttyId[etty] || {};
		this.recordsByEttyId[etty][id] = rec;
		this.updatedRecords[etty]      = this.recordsByEttyId[etty] || {};
		this.updatedRecords[etty][id]  = rec;
		
		this.dispatchUpdates();
	}
	
	/**
	 * Update query results in the store & dispatch it to the listeners
	 * @param etty
	 * @param id
	 * @param rec
	 */
	pushRemoteQuery( etty, query, results ) {
		let hash = H.update(JSON.stringify(query)).digest().toString(32);
		
		this.recordsByEttyId["__queries"]       = this.recordsByEttyId["__queries"] || {};
		this.recordsByEttyId["__queries"][hash] = results;
		this.updatedRecords["__queries"]        = this.recordsByEttyId["__queries"] || {};
		this.updatedRecords["__queries"][hash]  = results;
		
		this.dispatchUpdates();
	}
	
	/**
	 * Order API call to update/get a record
	 * @param etty
	 * @param id
	 */
	syncRemoteRecord( etty, id ) {
		if ( !this.state[etty] ) {
			this.pushRemoteRecord(etty, id, {})
			return console.error("DataProvider: Unknown data type '" + etty + "'")
		}
		if ( !this.state[etty].query ) {
			this.pushRemoteRecord(etty, id, {})
			return console.error("DataProvider: No query API for data type '" + etty + "'")
		}
		this.dispatch('setLoading');
		this.state[etty]
			.query({ id })
			.then(
				( data ) => {
					this.pushRemoteRecord(etty, id, data.result)
					this.dispatch('setLoaded');
				},
				( err ) => {
					this.dispatch('setLoaded');
					if ( err ) {
						this.pushRemoteRecord(etty, id, {})
						return console.error("DataProvider: query fail '", etty, err);
					}
				}
			);
	}
	
	/**
	 * Order API call to update/get a query result
	 * @param query
	 */
	syncRemoteQuery( queryData ) {
		//if ( !this.state[query.etty] ) {
		//	this.pushRemoteQuery(query.etty, query, { items: [], total: 0, length: 0 })
		//	return console.error("DataProvider: Unknown data type '" + query.etty + "'")
		//}
		//if ( !this.state[query.etty].query ) {
		//	this.pushRemoteQuery(query.etty, query, { items: [], total: 0, length: 0 })
		//	return console.error("DataProvider: No query API for data type '" + query.etty + "'")
		//}
		//
		//this.dispatch('setLoading');
		query(queryData)
			.then(
				( data ) => {
					this.pushRemoteQuery(queryData.etty, queryData, data)
					//this.dispatch('setLoaded');
				},
				( err ) => {
					//this.dispatch('setLoaded');
					if ( err ) {
						this.pushRemoteQuery(queryData.etty, queryData, { items: [], total: 0, length: 0 })
						return console.error("DataProvider: query fail '", queryData.etty, err);
					}
				}
			);
	}
	
	/**
	 * re dld all active queries & records (when remove create or update query success)
	 * ( @todo: need optims )
	 * @param types
	 */
	flushAndReload( types ) {
		types = types
			&& (
				is.string(types)
				&& [types]
				|| types
			)
			|| Object.keys(this.recordsByEttyId);
		
		types.forEach(
			etty => {
				this.activeQueries[etty] &&
				Object.keys(this.activeQueries[etty])
				      .map(
					      id => this.syncRemoteQuery(this.activeQueries[etty][id])
				      )
				this.activeRecords[etty] &&
				Object.keys(this.activeRecords[etty])
				      .map(
					      id => this.syncRemoteRecord(etty, id)
				      )
			}
		)
	}
	
	/**
	 * Dispatch last updates to listeners
	 * @type {debounced}
	 */
	dispatchUpdates = debounce(() => {
		let updates  = this.updatedRecords,
		    watchers = this.watchersByEttyId;
		Object
			.keys(updates)
			.forEach(
				etty => {
					Object
						.keys(updates[etty])
						.forEach(
							id => {
								if ( watchers[etty] && watchers[etty][id] )
									watchers[etty][id]
										.forEach(
											watcher => watcher(updates[etty][id])
										)
							}
						)
				}
			)
		this.updatedRecords = {};
	});
	
	_scrapStack = [];
	
	/**
	 * Order auto clean of not used data
	 * @param etty
	 * @param id
	 */
	scrapIt( etty, id ) {
		this._scrapStack.push(
			{
				etty, id, dt: Date.now()
			}
		)
		if ( !this._scraperTm ) {
			this._scraperTm = setTimeout(this._autoClean)
		}
	}
	
	_autoClean = () => {
		let watchers = this.watchersByEttyId,
		    data     = this.recordsByEttyId,
		    item,
		    toClean  = this._scrapStack,
		    dtLimit  = Date.now() - 1000 * 60; // 1mn ttl for unused items
		
		while ( toClean.length ) {
			item = toClean[0];
			if ( watchers[item.etty][item.id]
				&& watchers[item.etty][item.id].length )// was put in scrap then réused, remove from scrap list
				toClean.shift()
			else if ( item.dt < dtLimit ) {// timeout: delete it
				//console.log("clean", item)
				delete data[item.etty][item.id];
				toClean.shift()
			}
			else break;
		}
		
		if ( toClean.length )
			this._scraperTm = setTimeout(this._autoClean, 5000);// clean interval
		else
			this._scraperTm = null;
	};
	
	watchersByEttyId = {};
	activeQueries    = {};
	activeRecords    = {};
	
	/**
	 * Add new record listener & query it if not available
	 * @param etty
	 * @param id
	 * @param watcher
	 */
	bindRecord( etty, id, watcher ) {
		let refs   = this.watchersByEttyId, newRequest,
		    noData = !this.recordsByEttyId[etty] || !this.recordsByEttyId[etty][id];
		
		refs[etty]     = refs[etty] || {};
		newRequest     = !refs[etty][id];
		refs[etty][id] = refs[etty][id] || [];
		
		refs[etty][id].push(watcher);
		
		if ( newRequest ) {
			this.activeRecords[etty]     = this.activeRecords[etty] || {};
			this.activeRecords[etty][id] = id;
		}
		
		console.info("! watch record : ", id)
		// + socket watch record (debounced)
		newRequest && noData && this.syncRemoteRecord(etty, id);
		return id;
	}
	
	unBindRecord( etty, id, watcher ) {
		let refs = this.watchersByEttyId;
		
		refs[etty]     = refs[etty] || {};
		refs[etty][id] = refs[etty][id] || [];
		
		let i = refs[etty][id].indexOf(watcher);
		if ( i != -1 )
			refs[etty][id].splice(i, 1);
		
		if ( !refs[etty][id].length ) {
			delete refs[etty][id];
			delete this.activeRecords[etty][id];
			this.scrapIt(etty, id);
		}
		
		console.info("! unwatch record : ", id)
		// - socket watch record if no more watchers
	}
	
	/**
	 * Add new query listener & query it if not available
	 * @param etty
	 * @param id
	 * @param watcher
	 */
	bindQuery( query, watcher ) {
		let refs   = this.watchersByEttyId,
		    hash   = H.update(JSON.stringify(query)).digest().toString(32),
		    etty   = query.etty,
		    newRequest,
		    noData = !this.recordsByEttyId["__queries"] || !this.recordsByEttyId["__queries"][hash];
		
		refs["__queries"]       = refs["__queries"] || {};
		newRequest       = !refs["__queries"][hash];
		refs["__queries"][hash] = refs["__queries"][hash] || [];
		
		refs["__queries"][hash].push(watcher);
		
		if ( newRequest ) {
			this.activeQueries["__queries"]       = this.activeQueries["__queries"] || {};
			this.activeQueries["__queries"][hash] = query;
		}
		
		// + socket watch / sync query record (debounced)
		console.info("! watch query : ", hash, query)
		newRequest && noData && this.syncRemoteQuery(query);
		
		return hash;
	}
	
	unBindQuery( query, watcher ) {
		let refs = this.watchersByEttyId,
		    hash = JSON.stringify(query),
		    etty = "__queries";
		
		refs[etty]       = refs[etty] || {};
		refs[etty][hash] = refs[etty][hash] || [];
		
		let i = refs[etty][hash].indexOf(watcher);
		if ( i != -1 )
			refs[etty][hash].splice(i, 1);
		
		if ( !refs[etty][hash].length ) {
			delete refs[etty][hash];
			delete this.activeQueries[etty][hash];
			this.scrapIt(etty, hash);
		}
		
		// - socket watch record if no more watchers
		console.info("! unwatch query : ", hash)
	}
}


function walk( obj, path ) {
	if ( is.string(path) )
		path = path.split('.');
	return path.length
	       ? obj[path[0]] && walk(obj[path[0]], path.slice(1))
	       : obj;
}

export function clearWatchers( target, DataProvider, idKeys, isQuery ) {
	let watchKey = !isQuery ? "__recWatchers" : "__queryWatchers",
	    watchs   = target[watchKey] =
		    target[watchKey] || {};
	Object.keys(
		watchs
	).map(
		idKey =>
			!isQuery ? DataProvider.unBindRecord(
				idKeys[idKey].etty,
				watchs[idKey].value,
				watchs[idKey].fn
			) : DataProvider.unBindQuery(
				watchs[idKey].value,
				watchs[idKey].fn
			)
	);
	target.__recWatchers = {};
}

export function updateWatchers( target, DataProvider, idKeys, changes, isQuery ) {
	let watchKey            = !isQuery ? "__recWatchers" : "__queryWatchers",
	    watchs              = target[watchKey] =
		    target[watchKey] || {},
	    hasChanges;
	target.__activeRequests = target.__activeRequests || 0;
	Object.keys(idKeys)
	      .forEach(
		      idKey => {
			      let newValue = walk(changes, idKey);
			      if ( idKeys[idKey] &&
				      (!watchs[idKey] || watchs[idKey].value !== newValue)
			      ) {
				      let initial = newValue &&
					      (
						      isQuery
						      ? !DataProvider.getQuery(newValue)
						      : !DataProvider.getRecord(idKeys[idKey].etty, newValue)
					      );
				      target.__activeRequests++;
				      hasChanges = true;
				      if ( !isQuery )
					      watchs[idKey] && DataProvider.unBindRecord(
						      idKeys[idKey].etty,
						      watchs[idKey].value,
						      watchs[idKey].fn
					      );
				      else
					      watchs[idKey] && DataProvider.unBindQuery(
						      watchs[idKey].value,
						      watchs[idKey].fn
					      );
				
				      delete watchs[idKey];
				      if ( newValue ) {
					      //if ( initial && idKeys[ idKey ].dispatchLoading )
					      //    target.dispatch("setLoading");
					
					      watchs[idKey] = {
						      value: newValue,
						      fn   : ( update ) => {
							      initial && target.__activeRequests--;
							      //if ( initial && idKeys[ idKey ].dispatchLoading )
							      //    target.dispatch("setLoaded");
							      initial = false;
							      !target.dead &&
							      target.push(
								      {
									      [idKeys[idKey].target || idKey]: update
								      })
						      }
					      }
					
					      if ( !isQuery )
						      watchs[idKey].key = DataProvider.bindRecord(
							      idKeys[idKey].etty,
							      watchs[idKey].value,
							      watchs[idKey].fn
						      )
					      else
						      watchs[idKey].key = DataProvider.bindQuery(
							      watchs[idKey].value,
							      watchs[idKey].fn
						      );
				      }
			      }
		      }
	      )
	return hasChanges;
}

export function getRecordsFromIdKeys( DataProvider, idKeys, changes ) {
	let results = {};
	Object.keys(idKeys)
	      .forEach(
		      idKey => {
			      results[idKeys[idKey].target] = DataProvider.getRecord(idKeys[idKey].etty, walk(changes, idKey))
		      }
	      )
	return results;
}

export function getQueriesFromIdKeys( DataProvider, idKeys, changes ) {
	let results = {};
	Object.keys(idKeys)
	      .forEach(
		      idKey => {
			      results[idKeys[idKey].target || idKey] = DataProvider.getQuery(walk(changes, idKey)) || idKeys[idKey].default
		      }
	      )
	return results;
}
