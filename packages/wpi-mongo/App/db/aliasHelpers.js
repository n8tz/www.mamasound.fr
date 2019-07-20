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
var getSlug = require('speakingurl');


var aliasUtils = {
	
	rmAlias   : ( id, db, cb ) => {
		db.collection("Alias")
		  .remove(
			  { _id: id },
			  function ( err, docs ) {
				  cb && cb();
			  });
	},
	applyAlias: ( record, def, etty, db, cb ) => {
		
		if ( !def.aliasField || !record[def.aliasField] )
			return cb(null, record);
		
		aliasUtils.checkAlias(record, def, etty, db, cb);
	},
	checkAlias: ( record, def, etty, db, cb, i ) => {
		var cAlias = getSlug(record[def.aliasField]) + (i && ('_' + i) || '');
		db.collection("Alias").findOne(
			{ _id: etty + '_' + cAlias },
			function ( err, alias ) {
				if ( err || !alias ) {
					db.collection("Alias")// dont exist : create
					  .insertOne(
						  alias = {
							  _id   : etty + '_' + cAlias,
							  alias : cAlias,
							  url   : '/' + (def.apiRoute || etty) + '/' + cAlias,
							  target: { cls: etty, objId: record._id }
						  }, function ( err, docs ) {
							
							  if ( record._alias != cAlias )
								  aliasUtils.rmAlias(etty + '_' + record._alias, db);
							  record._alias = cAlias;
							  cb(alias, record);
						  });
				}
				else if ( alias.target.objId == record._id ) cb(alias, record);//ok this is the right one
				else {
					aliasUtils.checkAlias(record, def, etty, db, cb, (i || 0) + 1);
				}
			}
		);
	},
	getAlias  : ( etty, alias, db, cb ) => {
		db.collection("Alias").findOne(
			{ _id: etty + '_' + alias },
			cb
		);
	}
};

export default aliasUtils;
