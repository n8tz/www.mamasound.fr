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

var express         = require("express"),
    cfg             = require('App/config'),
    db              = require('App/db'),
    debug,

    passport        = require('passport'),
    passportInit    = passport.initialize(),
    passportSession = passport.session(),
    LocalStrategy   = require('passport-local').Strategy,
    getUserFromDb   = ( q, done ) => {
	
	    db.pushDbTask(
		    function ( db, release ) {
			    // assert.equal(null, err);
			    return db.collection("User")
			             .findOne(
				             q,
				             ( e, r ) => {
					             release();
					             done(e, r);
				             }
			             );
		    }
	    );
    }
;
setTimeout(() => {
	debug = require('App/console')('Auth')
});


export const priorityLevel = Infinity;

export function service( server ) {
	
	server.use(
		passportInit,
		passportSession
	);
	
	passport.use(new LocalStrategy(
		function ( username, password, done ) {
			debug.warn("getUserFromDb " + username);
			getUserFromDb(
				{ login: username },
				function ( err, user ) {
					// var user = res[0];
					if ( err ) {
						return done(err);
					}
					if ( !user ) {
						return done(null, false, { message: 'Incorrect username.' });
					}
					if ( user.pass !== password ) {
						return done(null, false, { message: 'Incorrect password.' });
					}
					return done(null, user);
					
				}
			);
		}
	));
	
	//server.use(
	//	function ( req, res, next ) {
	//		//console.warn("-----------------------------------------------------------------------------\n", req.user,
	//		// req.sessionID || "no_session", req.session)
	//		//req.AppDB = db.su(req.user || { login: "anonymous" }, req.sessionID || "no_session");
	//		next(req, res)
	//	}
	//)
	
	passport.serializeUser(function ( user, done ) {
		done(null, user._id);
	});
	
	passport.deserializeUser(function ( user, done ) {
		
		getUserFromDb(
			{ _id: user },
			( e, r ) => {
				// console.log("restore", user, r);
				done(e, r);
			});
	});

//authAPI.use(
//    commonServer
//);
//	authAPI.post(
//		"/login",
//		( req, res, next ) => {
//			debug.info("Try Login   ", req.session && req.session.id, req.params);
//			passportAuth(req, res, function () {
//				debug.info("Login   %s  as      %s", req.session && req.session.id, req.user.login);
//				res.set('Content-Type', 'application/json');
//				res.status(200).send({ result: { ...req.user, pass: undefined } });
//				res.end();
//			});
//		}
//	);
//	authAPI.get(
//		"/logout",
//		( req, res, next ) => {
//			debug.info("Logout   %s  from      %s", req.session && req.session.id, req.user.login);
//			req.logout();
//			res.set('Content-Type', 'application/json');
//			res.status(200).send({ result: true });
//			res.end();
//		}
//	);
//	authAPI.get(
//		"/session",
//		( req, res, next ) => {
//			res.set('Content-Type', 'application/json');
//			res.status(200).send({ result: { cuser: req.user && { ...req.user, pass: undefined } || false } });
//			res.end();
//		}
//	);
};