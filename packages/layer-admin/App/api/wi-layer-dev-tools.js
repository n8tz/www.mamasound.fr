/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import config        from "App/config";
import redis         from "App/db/redis.js";
import {memoryCache} from "App/db/index";
import moment        from "moment";
import backup        from "mongodb-backup";
import restore       from "mongodb-restore";

const aliasAPI = require("App/db/aliasHelpers"),
      fs       = require("fs");

export const name          = "dev-tools service";
export const priorityLevel = 100000;

export function service( server ) {
	server.get(
		'/devTools/clearCache',
		function ( req, res, next ) {
			if ( !(req.user && req.user.isAdmin) )
				return res.json({ error: 'Auth required' }, 500);
			
			memoryCache.flushAll();
			redis.delWildcard(config.PUBLIC_URL + "_*")
			res.json({ status: 'ok', deleted: config.PUBLIC_URL + "_*" })
			
		}
	);
	server.get(
		'/devTools/dbDump',
		function ( req, res, next ) {
			if ( !(req.user && req.user.isAdmin) )
				return res.json({ error: 'Auth required' }, 500);
			
			res.writeHead(200, {
				"Content-Disposition": "attachment;filename=dump_" + moment().format("DD-MM-YY_hh-mm") + ".tar.gz",
			});
			backup({
				       uri     : process.env.MONGO_URI + '/mamasound_fr', // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
				       stream  : res, // send stream into client response
				       metadata: true
			       });
		}
	);
	server.post(
		'/devTools/dbRestore',
		function ( req, res, next ) {
			if ( !(req.user && req.user.isAdmin) )
				return res.json({ error: 'Auth required' }, 500);
			
			req.pipe(req.busboy); // Pipe it trough busboy
			
			req.busboy.on('file', ( fieldname, file, filename ) => {
				console.log(`Upload of '${filename}' started`);
				
				// Create a write stream of the new file
				//const fstream = fs.createReadStream('download.tar');
				// Pipe it trough
				//file.pipe(fstream);
				
				restore({
					        uri     : process.env.MONGO_URI + '/mamasound_fr', // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
					        stream  : file, // send this stream into db
					        metadata: true,
					        tar     : true,
					        callback: function ( err ) { // callback after restore
						
						        console.log(`Upload of '${filename}' finished`);
						        console.log('done');
						        res.json({ status: 'ok' })
					        }
				        });
				// On finish of the upload
				//fstream.on('close', () => {
				//
				//});
			});
		}
	);
	//server.get(
	//	'/$docker/restart',
	//	function ( req, res, next ) {
	//		res.json({ status: 'ok' })
	//
	//	}
	//);
}