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

const config   = require('App/config'),
      aliasAPI = require("App/db/aliasHelpers"),
      is       = require("is");
//multer  = require('multer');

export default ( server, http ) => {
	console.log("wpi-mongo server running ! :D");
	//
	server.post(
		'/query',
		function ( req, res, next ) {
			//res.json(req.body)
			let { query, collection, $limit = 1000, $skip, $orderby } = req.body;
			pushDbTask(
				( client, dbRelease ) => {
					var db = client.db("mamasound_fr");
					
					var data  = {},
					    complete,
					    done  = ( r, ln ) => {
						    data.length = typeof ln == 'number' ? ln : data.length;
						    data.items  = r || data.items;
						    if ( typeof data.length == 'number' && is.array(data.items) ) {
							    done = null;
							    dbRelease();
							    res.json(data)
						    }
						
					    };
					var
						ptr   = db.collection(collection)
						          .find(query || {}),//{$query : {}, $orderby : {updated : -1}}
						count = ptr.count(null, ( e, r ) => {
							done(null, r || 0);
						}),
						
						parse = function ( err, docs ) {
							
							
							done(docs || []);
							
						};
					ptr.sort($orderby)
					   .skip(parseInt($skip) || 0)
					   .limit(parseInt($limit) || 20)
					   .toArray(parse);
					
				}
			)
		}
	);
}