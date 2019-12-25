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
	let publicFiles = express.static(process.cwd() + '/dist/www'),
	    adminFiles  = express.static(process.cwd() + '/dist/admin');
	
	redis.delWildcard(config.PUBLIC_URL + "_*")
	
	const cssAdmin  = fs.existsSync(process.cwd() + "/dist/admin/App.css")
	                  ? fs.readFileSync(process.cwd() + "/dist/admin/App.css")
	                  : "/* ... */",
	      cssPublic = fs.existsSync(process.cwd() + "/dist/www/App.css")
	                  ? fs.readFileSync(process.cwd() + "/dist/www/App.css")
	                  : "/* ... */";
	
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
			if ( /^\/assets/ig.test(req.url) )
				return next()
			if ( /^\/devTools/ig.test(req.url) )
				return next()
			if ( /^\/upload/ig.test(req.url) )
				return next()
			if ( /^\/socket/ig.test(req.url) )
				return next()
			if ( /^\/tout\-montpellier/ig.test(req.url) )
				return next()
			let key = config.PUBLIC_URL + "_page_" + req.url + "_" + req.device.type + "_" + (req.user && req.user.login);
			if (req.device.type==="bot")
				return res.send(404, "404");;
			console.warn("get", key)
			redis.get(
				key,
				( err, html ) => {
					if ( html ) {
						console.log("from redis ", key);
						res.send(200, html);
						return;
					}
					let cssContent = (req.user && req.user.isAdmin)
					                 ? cssAdmin
					                 : cssPublic;
					App.renderSSR(
						{
							device  : req.device.type,
							location: req.url,
							css     : cssContent,
							//state   : currentState,
						},
						( err, html, nstate ) => {
							console.warn("set", key)
							redis.set(key, html, 'EX', 1000 * 60 * 60, console.log);
							res.send(200, html);
						}
					)
					
				}
			)
		}
	);
}
;
