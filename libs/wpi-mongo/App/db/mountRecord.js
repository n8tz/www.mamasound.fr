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

