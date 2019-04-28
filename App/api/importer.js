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
//
import {pushDbTask} from "App/db/pool";

const wpiConf  = require('App/.wpiConfig'),
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