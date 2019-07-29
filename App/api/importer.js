/*
 * www.mamasound.fr
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
//
import {pushDbTask} from "App/db/pool";

const wpiConf  = require('App/config'),
      aliasAPI = require("App/db/aliasHelpers").default,
      shortid  = require("shortid");

/*
 @todo use insert/remove many
 */
export default ( server, http ) => {
	console.log("Importer service running !");
	
	server.post(
		'/importer',
		function ( req, res, next ) {
			if ( !(req.user && req.user.isAdmin) )
				return res.json({ success: false, error: "Auth required" });
			
			let items   = req.body,
			    running = 0,
			    fails   = 0,
			    done    = () => {
				    !--running && res.json({ success: true, items, fails });
			    };
			items.forEach(
				( _record, i ) => {
					running++;
					pushDbTask(
						( client, dbRelease ) => {
							var db     = client.db("mamasound_fr"),
							    rid    = shortid.generate(),
							    record = {
								    _id     : rid,
								    _cls    : 'Concert',
								    title   : _record.groupe,
								    startTM : _record.timestamp,
								    price   : _record.prix,
								    place   : {
									    cls  : "Place",
									    objId: _record.lieuId
								    },
								    category: {
									    cls  : "EventCategory",
									    objId: _record.styleId
								    }
							    };
							aliasAPI.applyAlias(
								record,
								{ aliasField: 'title' },
								'Event',
								db,
								function ( alias, record ) {
									
									items[i] = record;
									
									db.collection("Event")
									  .insertOne(
										  record,
										  function ( err, docs ) {
											  if ( err ) {
												  fails++;
												  items[i] = { error: (err + ""), ...record };
											  }
											  dbRelease();
											  done()
										  });
								})
						}
					)
				}
			)
		}
	);
	server.post(
		'/delete',
		function ( req, res, next ) {
			if ( !(req.user && req.user.isAdmin) )
				return res.json({ success: false, error: "Auth required" });
			let items   = req.body,
			    running = 0,
			    fails   = 0,
			    done    = () => {
				    !--running && res.json({ success: true });
			    };
			items.forEach(
				( _record, i ) => {
					running++;
					pushDbTask(
						( client, dbRelease ) => {
							var db  = client.db("mamasound_fr"),
							    rid = _record._id;
							aliasAPI.rmAlias(
								"Event." + _record._alias,
								db,
								function () {
									
									//items[i] = record;
									
									db.collection("Event")
									  .deleteOne(
										  _record,
										  function ( err, docs ) {
											  //if ( err ) {
											  //  fails++;
											  //  items[i] = { error: (err + ""), ...record };
											  //}
											  dbRelease();
											  done()
										  });
								})
						}
					)
				}
			)
		}
	);
}