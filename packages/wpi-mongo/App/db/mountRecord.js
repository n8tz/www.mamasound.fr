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

