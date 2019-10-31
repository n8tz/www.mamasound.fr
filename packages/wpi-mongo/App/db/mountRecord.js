/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
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
	let refsList = is.array(record) && record || [record],
	    refs     = {},
	    sema     = 0,
	    done     = () => ((0 === --sema) && (resolve(refs))),
	    doGetRef = ( ref ) => (
		    !refs.hasOwnProperty(ref.objId) && (
			    sema++,
				    refs[ref.objId] = undefined,
				    db.get(ref.cls, ref.objId,
				           ( err, doc ) => (refs[ref.objId] = doc, done())
				    )
		    )
	    ),
	    resolve,
	    mounting = new Promise(
		    ( r, reject ) => {
			    resolve = r;
		    }
	    )
		    .then(data => (cb && cb(null, refs), refsList))
		    .catch(err => (cb && cb(err, refs)));
	
	refsList.forEach(
		( record ) => {
			toMountKeys.forEach(
				( key ) => (
					is.array(record[key]) ?
					record[key].forEach(doGetRef) :
					record[key] && doGetRef(record[key])
				))
			;
			return refsList;
		},
		[]
	);
	
	
	if ( !sema )
		sema++, done();
	
	return mounting;
}

