/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */


import config from "App/config";
import redis  from "App/db/redis.js";
import App    from "App/index.js";

const fs          = require('fs'),
      path        = require('path'),
      webp        = require('webp-converter'),
      express     = require('express'),
      superagent  = require('superagent'),
      compression = require('compression'),
      device      = require('express-device'),
      compressor  = compression();

export const name          = "Rendering service";
export const priorityLevel = 100000;

export function service( server ) {
	//if ( process.env.NODE_ENV === 'production' ) {
	//	let creds = JSON.parse(fs.readFileSync(process.cwd() + '/creds.json'));
	//	server.use(basicAuth(creds.user, creds.pass))
	//}
	//
	let publicFiles = express.static(process.cwd() + '/dist/www'),
	    adminFiles  = express.static(process.cwd() + '/dist/admin');
	
	redis.delWildcard(config.PUBLIC_URL + "_*")
	
	server.use(device.capture());
	server.use(
		( req, res, next ) => {
			if ( !(req.user && req.user.isAdmin) )
				return publicFiles(req, res, next);
			return adminFiles(req, res, next);
		}
	);
	
	server.use(express.static(process.cwd() + '/static'));
	server.use("/assets/static", express.static(process.cwd() + '/App/ui/assets/static'));
	
	server.get(
		'*',
		function ( req, res, next ) {
			if ( /^\/medias/ig.test(req.url) )
				return next()
			let key = config.PUBLIC_URL + "_page_" + req.url + "_" + req.device.type + "_" + (req.user && req.user.login);
			redis.get(
				key,
				( err, html ) => {
					if ( html ) {
						console.log("from redis ", key);
						res.send(200, html);
						return;
					}
					let cssPath = (req.user && req.user.isAdmin)
					              ? process.cwd() + "/dist/admin/App.css"
					              : process.cwd() + "/dist/www/App.css";
					App.renderSSR(
						{
							device  : req.device.type,
							location: req.url,
							css     : fs.existsSync(cssPath)
							          ? fs.readFileSync(cssPath)
							          : "/* ... */",
							//state   : currentState,
						},
						( err, html, nstate ) => {
							res.send(200, html);
							redis.set(key, html, 'EX', 1000 * 60 * 60);
						}
					)
					
				}
			)
		}
	);
}
;
