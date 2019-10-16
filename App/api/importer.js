/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
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