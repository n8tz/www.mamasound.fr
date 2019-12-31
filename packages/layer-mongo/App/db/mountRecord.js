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
	    sema     = 1,
	    done     = () => ((0 === --sema) && (cb(null, refs))),
	    doGetRef = ( ref ) => (
		    !refs.hasOwnProperty(ref.objId) && (
			    sema++,
				    refs[ref.objId] = undefined,
				    db.get(ref.cls, ref.objId,
				           ( err, doc ) => (refs[ref.objId] = doc, done())
				    )
		    )
	    );
	
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
	
	// when all refs are retrieved synchrone or there no refs the sema === 1
	sema--;
	if ( !sema )
		sema++, done();
	
}

