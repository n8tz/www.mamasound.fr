/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */


import config from "App/config";

const fs          = require('fs'),
      path        = require('path'),
      webp        = require('webp-converter'),
      express     = require('express'),
      superagent  = require('superagent'),
      compression = require('compression'),
      device      = require('express-device'),
      compressor  = compression();

export const name = "Media service";
export const priorityLevel = 100001;

export function service( server ) {
	//if ( process.env.NODE_ENV === 'production' ) {
	//	let creds = JSON.parse(fs.readFileSync(process.cwd() + '/creds.json'));
	//	server.use(basicAuth(creds.user, creds.pass))
	//}
	//
	//let localMedias = express.static(path.join(process.cwd(), config.UPLOAD_DIR));
	server.use(express.static(process.cwd() + '/static'));
	server.use("/medias", express.static(path.join(process.cwd(), config.UPLOAD_DIR)));
	
	//server.use("/medias", ( req, res, next ) => {
	//	// try to retrieve img from the old server...
	//	//debugger
	//	superagent.get(config.ALT_MEDIA_URL + req.url)
	//	          .then(
	//		          file => {
	//			          let pathName = path.join(process.cwd(), config.UPLOAD_DIR, path.basename(req.url)).replace(/\?+.*$/, '');
	//			          fs.writeFile(
	//				          pathName,
	//				          file.body,
	//				          ( e, r ) => {
	//
	//					          //webp.gwebp(pathName, pathName.replace(/(\.\w+$|$)/, '.webp'), "-q 80",
	//					          //           ( status, error ) => {
	//					          //               //if conversion successful status will be '100'
	//					          //               //if conversion fails status will be '101'
	//					          //               //console.log(status, error);
	//					          //               if ( status === 100 )
	//					          //                   res.redirect("/medias/" + req.url.replace(/\?+.*$/,
	//					          // '').replace(/(\.\w+$|$)/, '.webp')); else
	//					          res.redirect("/medias/" + req.url);
	//					          //});
	//
	//				          })
	//			          //debugger
	//		          }
	//	          )
	//	          .catch(
	//		          file => {
	//			          res.redirect(config.ALT_MEDIA_URL + req.url);
	//		          }
	//	          )
	//
	//});
	server.use("/assets/static", express.static(process.cwd() + '/App/ui/assets/static'));
}
;
