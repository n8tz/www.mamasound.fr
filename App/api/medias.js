/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */


import config from "App/config";

const fs      = require('fs'),
      path    = require('path'),
      webp    = require('webp-converter'),
      express = require('express'),
      request = require('request');

export const name          = "Media service";
export const priorityLevel = 100001;

export function service( server ) {
	//if ( process.env.NODE_ENV === 'production' ) {
	//	let creds = JSON.parse(fs.readFileSync(process.cwd() + '/creds.json'));
	//	server.use(basicAuth(creds.user, creds.pass))
	//}
	//
	//let localMedias = express.static(path.join(process.cwd(), config.UPLOAD_DIR));
	
	
	var upDir       = path.join(process.cwd(), config.UPLOAD_DIR) + '/',
	    staticServe = express.static(upDir);
	
	//server.use("/medias", express.static(path.join(process.cwd(), config.UPLOAD_DIR)));
	
	var download = function ( uri, filename, ext, callback ) {
		console.warn('dld remote img : ', uri, filename);
		request.head(uri, function ( err, res, body ) {
			// !err && console.warn('head : ', res.statusCode, res.headers, res.headers['content-length']);
			err = err || (res.statusCode !== 200) && res.statusCode;
			if ( err ) callback(err, filename);
			else {
				var stream = request(uri), mt;
				stream.on('response', function ( response ) {
					if ( !ext && response.statusCode == 200 ) // 200
					{
						mt = response.headers['content-type'];
						fs.writeFile(filename + '.$mt', response.headers['content-type'])
					}
				});
				stream.pipe(
					fs.createWriteStream(filename)
					  .on('error', function ( err ) {
						  // console.warn('fail : ', err, filename, uri);
						  callback(err, filename, mt);
						  // stream.close();
					  })
				)
				      .on('close', function ( arg ) {
					      console.warn('got : ', filename);
					      // console.log(stream.request.uri.href)
					      setTimeout(() => callback(null, filename, mt));
				      });
			}
		});
	};
	server.use(function loop( req, res, _next ) {
		
		if ( !/^\/medias/ig.test(req.url) && (!req.subdomains || req.subdomains[0] !== 'static') )
			return _next()
		
		var reqDone,
		    fn,
		    oUrl  = req.path.replace(/^\/medias/, ""),
		    asked = oUrl.substr(1);
		req       = {
			...req
		};
		if ( req.query.cache ) {
			var sha256 = createHash('sha256');
			
			var ext   = /(\.\w+)$/.test(req.query.cache) && req.query.cache.replace(/^.*(\.\w+)$/, '$1') || '',
			    cache = req.query.cache;
			fn        = '_' + sha256.update(decodeURIComponent(req.query.cache), 'utf8').digest('hex') + ext;
			
			delete req.query.cache;
			req.doLookInCache = true;
			req.path          = req.url = '/' + fn;
			return loop(req, res, function () {
				console.warn('not found : ', upDir + fn);
				req.doLookInCache = false;
				if ( !reqDone ) {
					
					// if (req.user && (req.user.isAdmin || req.user.isPublisher))
					//     return res.status(403).send();
					console.warn('try 2 dld : ', req.query.cache, upDir + fn);
					return download(
						decodeURIComponent(cache),
						upDir + fn,
						ext,
						function ( err, r, mt ) {
							reqDone = true;
							console.warn('dld say : ', err, r, '/' + fn);
							req.path = req.url = '/' + fn;
							mt && res.set("content-type", mt);
							if ( !err ) loop(req, res, _next);
							else _next();
						}
					);
				}
				else if ( config.ALT_MEDIA_URL && (reqDone || !cache) ) {
					console.warn('redirect to : ', config.ALT_MEDIA_URL + oUrl);
					//return res.redirect(config.ALT_MEDIA_URL + oUrl);
				}
				//_next();
				req.send(404);
				
			});
		}
		else if ( req.query.w || req.query.h ) {
			var id   = req.query.w + 'x' + req.query.h + '.',
			    gm   = require('gm').subClass({});
			req.path = req.url = id + asked;
			return staticServe(req, res, function () {
				
				console.log('resize : ', upDir + asked);
				gm(upDir + asked)
					.resize(req.query.w || null, req.query.h || null)
					.autoOrient()
					.write(upDir + id + asked, function ( err ) {
						if ( req.doLookInCache ) return staticServe(req, res, _next);
						err && console.log('resize failed : ', upDir + asked, err);
						if ( err && config.ALT_MEDIA_URL ) {// try prod..
							console.warn('dld : ', '/' + asked);
							return download(
								config.ALT_MEDIA_URL + oUrl,
								upDir + asked,
								ext,
								function ( err, r, mt ) {
									reqDone = true;
									console.warn('dld say : ', err, r, '/' + fn, req.path);
									//req.path = req.url = '/' + asked;
									mt && res.set("content-type", mt);
									req.path = req.url = '/medias/' + asked;
									if ( !err ) loop(req, res, e => res.send(404));
									else res.send(404);
								}
							);
						}
						if ( !err ) staticServe(req, res, e => res.send(404));
						else
							res.send(404);
						;
					});
			});
		}
		else {
			
			req.path = req.url = '/' + asked;
			return staticServe(
				req, res,
				function () {
					if ( config.ALT_MEDIA_URL ) {// try prod..
						return download(
							config.ALT_MEDIA_URL + oUrl,
							upDir + asked,
							ext,
							function ( err, r, mt ) {
								reqDone = true;
								console.warn('dld say : ', err, r, '/' + fn, req.path);
								//req.path = req.url = '/' + asked;
								mt && res.set("content-type", mt);
								req.path = req.url = '/medias/' + asked;
								if ( !err ) loop(req, res, e => res.send(404));
								else res.send(404);
							}
						);
					}
					//if ( config.ALT_MEDIA_URL ) {// try prod..
					//return res.redirect(
					//	config.ALT_MEDIA_URL + oUrl);
					//}
					//else {
					res.send(404);
					
					//}
				}
			);
		}
	});
	//server.use("/medias", ( req, res, next ) => {
	//	// try to retrieve img from the old server...
	//	//consoleger
	//	superagent.get(config.ALT_MEDIA_URL + req.url)
	//	          .then(
	//		          file => {
	//			          let pathName = path.join(process.cwd(), config.UPLOAD_DIR,
	// path.basename(req.url)).replace(/\?+.*$/, ''); fs.writeFile( pathName, file.body, ( e, r ) => { 
	// //webp.gwebp(pathName, pathName.replace(/(\.\w+$|$)/, '.webp'), "-q 80", //           ( status, error ) => { // 
	//              //if conversion successful status will be '100' //               //if conversion fails status will
	// be '101' //               //console.log(status, error); //               if ( status === 100 ) //               
	//    res.redirect("/medias/" + req.url.replace(/\?+.*$/, // '').replace(/(\.\w+$|$)/, '.webp')); else
	// res.redirect("/medias/" + req.url); //});  }) //consoleger } ) .catch( file => {
	// res.redirect(config.ALT_MEDIA_URL + req.url); } )  });
	server.use("/assets/static", express.static(process.cwd() + '/App/ui/assets/static'));
}
;
