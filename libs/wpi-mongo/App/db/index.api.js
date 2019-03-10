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
import is           from "is";
import aliasAPI     from "App/db/aliasHelpers";
import typesList    from "App/db/types";
import {pushDbTask} from "App/db/pool";

export const types = typesList;

const defaults = { get, query }
export default defaults;

export function get( obj ) {
	return new Promise(
		( resolve, reject ) => {
			
			let { objId, cls } = obj;
			
			pushDbTask(
				( client, dbRelease ) => {
					var db = client.db("mamasound_fr");
					
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
										  reject(err || 404);
										  return;
									  }
									  resolve(docs)
									
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
			
			let { query, collection, $limit = 1000, $skip, $orderby } = req;
			pushDbTask(
				( client, dbRelease ) => {
					var db = client.db("mamasound_fr");
					
					var data  = {},
					    complete,
					    done  = ( r, ln ) => {
						    data.length = typeof ln == 'number' ? ln : data.length;
						    data.items  = r || data.items;
						    if ( typeof data.length == 'number' && is.array(data.items) ) {
							    done = null;
							    dbRelease();
							    resolve(data)
						    }
						
					    };
					var
						ptr   = db.collection(collection)
						          .find(query || {}),//{$query : {}, $orderby : {updated : -1}}
						count = ptr.count(null, ( e, r ) => {
							done(null, r || 0);
						}),
						
						parse = function ( err, docs ) {
							
							
							done(docs || []);
							
						};
					ptr.sort($orderby)
					   .skip(parseInt($skip) || 0)
					   .limit(parseInt($limit) || 20)
					   .toArray(parse);
					
				}
			)
		}
	);
};