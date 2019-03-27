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

import is from "is";


/**
 * Load related records according the entities autoMount property
 * @param record
 * @param etty
 * @param cb
 * @param required
 * @param mounted
 */
export function mount( db, record, toMountKeys, cb ) {
	return new Promise(
		( resolve, reject ) => {
			var r    = is.array(record) && record || [record],
			    refs = {},
			    i    = 1;
			
			Promise.all(
				r.reduce(
					( refsList, record ) => {
						toMountKeys.forEach(
							key => (
								record[key]
								&&
								refsList.push(
									db.get(
										record[key].cls,
										record[key].objId
									).then(doc => (refs[record[key].objId] = doc))
								)
							))
						;
						return refsList;
					},
					[]
				)
			)
			       .then(r => resolve(refs))
			       .catch(r => resolve(refs))
		}
	)
}

export function mountRecord( record, etty, toMountKeys, cb, required, mounted, db ) {
	var toMount = [], sema = 0, failed, v, key;
	db          = db || this;
	required    = required || {};
	
	if ( !record ) return cb && cb("Mounting a null record :" + record);
	if ( !mounted ) {
		mounted             = {};
		mounted[record._id] = true;
	}
	
	
	if ( toMountKeys )
		toMountKeys.forEach(( fieldId ) => {
			if ( !record[fieldId] ) return;
			
			if ( is.array(record[fieldId]) ) {
				record[fieldId].map(function ( v ) {
					                    var e = v.objId;
					                    if ( !mounted[e] )
						                    toMount.push(required[e] = v);
					
				                    }
				);
			}
			else {
				var e = record[fieldId].objId;
				if ( !mounted[e] )
					toMount.push(required[e] = record[fieldId]);
			}
		});
	
	while ( toMount.length ) {
		v   = toMount.pop();
		key = v.objId;
		
		if ( !v.cls || !v.objId ) {
			console.warn("Mount record fail on " + v);
			continue;
		}
		sema++;
		
		// console.warn("Mount ",v.cls, v.objId);
		db.get(v.cls, v.objId,
		       (function ( v, key ) {
			       return function ( err, docs ) {
				       if ( err ) {
					       mounted[key] = {
						       _id        : v.objId,
						       _cls       : v.cls,
						       __error    : true,
						       label      : 'error',
						       description: err + ''
					       };
					       // console.warn("not found while mounting", key, err);
					       if ( !--sema ) cb && cb(null, mounted);// still send mounted record..
					       return;
				       }
				       docs._cls    = v.cls;
				       mounted[key] = docs;
				       mountRecord.call(this, docs, v.cls, toMountKeys,
				                        function ( e, r ) {
					
					                        if ( !--sema ) {
						                        cb && cb(null, mounted);
						                        cb = null;
						                        // console.log("mounted ", key, sema);
					                        }
					
				                        }, required, mounted, db)
			       };
		       })(v, key),
		       true
		);
		
		
	}
	if ( !sema ) cb && cb(null, mounted);
	
}
