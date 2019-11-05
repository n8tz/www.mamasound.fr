/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */


import config from "App/config";

const fs             = require('fs'),
      path           = require('path'),
      sharp          = require('sharp'),
      { createHash } = require('crypto'),
      express        = require('express'),
      request        = require('request');

export const name          = "Media service";
export const priorityLevel = 100001;

const download = function ( uri, filename, ext, callback ) {
	console.warn('dld remote img : ', uri, filename);
	request.head(uri, function ( err, res, body ) {
		// !err && console.warn('head : ', res.statusCode, res.headers, res.headers['content-length']);
		err = err || (res.statusCode !== 200) && res.statusCode;
		if ( err ) callback(err, filename);
		else {
			let stream = request(uri), mt;
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

export function service( server ) {
	
	const upDir       = path.join(process.cwd(), config.UPLOAD_DIR) + '/',
	      staticServe = express.static(upDir);
	
	server.use("/assets/static", express.static(process.cwd() + '/App/ui/assets/static'));
	server.use(function loop( req, res, _next ) {
		
		if ( !/^\/medias/ig.test(req.url) && (!req.subdomains || req.subdomains[0] !== 'static') )
			return _next()
		
		var reqDone,
		    fn,
		    oUrl         = req.path.replace(/^\/medias/, ""),
		    asked        = oUrl.substr(1),
		    ext          = /(\.\w+)(?:\?.*)?$/.test(asked) && asked.replace(/^.*(\.\w+)(?:\?.*)?$/, '$1') || '',
		    targetWebpFn = asked;//.replace(/^(.*)\.(\w+)(\?.*)?$/, '$1.jfif$3');
		req              = {
			...req
		};
		if ( req.query.cache ) {
			const sha256 = createHash('sha256'),
			      cache  = req.query.cache;
			fn           = '_' + sha256.update(decodeURIComponent(req.query.cache), 'utf8').digest('hex');
			
			delete req.query.cache;
			req.doLookInCache = true;
			req.path          = req.url = '/medias/' + fn;
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
							req.path = req.url = '/medias/' + fn;
							sharp(upDir + fn)
								.webp({ lossless: false })
								.toBuffer(( err, buffer ) => {
									fs.writeFile(upDir + fn + '.webp', buffer, function ( err ) {
										if ( req.doLookInCache ) return staticServe(req, res, _next);
										err && console.log('convert failed : ', fn + '.webp', err);
										req.path = req.url = "/medias/" + fn + '.webp';
										if ( !err ) staticServe(req, res, e => res.send(404));
										else
											res.send(404);
										;
									})
								})
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
			req.path = req.url = id + targetWebpFn;
			return staticServe(req, res, function () {
				
				console.log('resize : ', upDir + asked);
				sharp(upDir + asked)
					.resize(parseInt(req.query.w) || undefined, parseInt(req.query.h) || undefined, {
						fit       : "contain",
						background: {
							r    : 0,
							g    : 0,
							b    : 0,
							alpha: 0
						}
					})
					.webp({ lossless: false })
					.toBuffer(( err, buffer ) => {
						if ( err && config.ALT_MEDIA_URL ) {// try prod..
							console.warn('convert fail : ', upDir + asked, err);
							return download(
								config.ALT_MEDIA_URL + oUrl,
								upDir + asked,
								ext,
								function ( err, r, mt ) {
									reqDone = true;
									console.warn('dld say : ', err, r, '/' + fn, req.path);
									//req.path = req.url = '/' + asked;
									//res.set("content-type", "image/webp");
									mt && res.set("content-type", mt);
									req.path = req.url = '/medias/' + asked;
									if ( !err ) loop(req, res, e => res.send(404));
									else res.send(404);
								}
							);
						}
						else
							fs.writeFile(upDir + id + targetWebpFn, buffer, function ( err ) {
								if ( req.doLookInCache ) return staticServe(req, res, _next);
								err && console.log('resize failed : ', upDir + targetWebpFn, err);
								req.path = req.url = id + targetWebpFn;
								if ( !err ) staticServe(req, res, e => res.send(404));
								else
									res.send(404);
								;
							})
					});
			});
		}
		else {
			
			req.path = req.url = '/' + targetWebpFn;
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
					res.send(404);
				}
			);
		}
	});
}
;
