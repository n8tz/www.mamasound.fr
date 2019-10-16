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
	return new Promise(
		( resolve, reject ) => {
			var r    = is.array(record) && record || [record],
			    refs = {},
			    i    = 1;
			
			Promise.allSettled(
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
			       .catch(r => {
				       resolve(refs)
			       })
		}
	)
}

