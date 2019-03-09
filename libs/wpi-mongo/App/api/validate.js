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
      aliasAPI = require("App/db/aliasHelpers"),
      shortid  = require("shortid");
//multer  = require('multer');

export default ( server, http ) => {
	console.log("Importer server running ! :D");
	
	server.post(
		'/validate',
		function ( req, res, next ) {
			//res.json(req.body)
			let items   = req.body,
			    running = 0,
			    done    = () => {
				    !--running && res.json(items)
			    };
			items.forEach(
				_record => {
					running++;
					pushDbTask(
						( client, dbRelease ) => {
							var db  = client.db("mamasound_fr"),
							    rid = shortid.generate();
							
							db.collection("EventCategory").find(
								{
									name: new RegExp(".*" + _record.style.replace(/[^\w]/g, '.*') + ".*")
								}
							).toArray(function ( err, items ) {
								dbRelease();
								if ( err || !items.length ) {
									_record.styleId = null;
									done()
								}
								else {
									_record.styleId    = items[0]._id;
									_record.validStyle = true;
									done()
								}
							});
							
						}
					)
				}
			)
			items.forEach(
				_record => {
					running++;
					pushDbTask(
						( client, dbRelease ) => {
							var db  = client.db("mamasound_fr"),
							    rid = shortid.generate();
							
							db.collection("Place").find(
								{
									label: new RegExp(".*" + _record.lieu.replace(/[^\w]/g, '.*') + ".*")
								}
							).toArray(function ( err, items ) {
								dbRelease();
								if ( err || !items.length ) {
									_record.lieuId = null;
									done()
								}
								else {
									_record.lieuId     = items[0]._id;
									_record.validPlace = true;
									done()
								}
							});
							
						}
					)
				}
			)
		}
	);
}