/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */


import {pushDbTask} from "App/db/pool";

let express         = require("express"),
    cfg             = require('App/config'),
    { get }         = require('App/db'),
    debug,

    session         = require('express-session'),
    RedisStore      = require('connect-redis')(session),
    sessionStore    = new RedisStore({
	                                     url: process.env.REDIS_URI || 'redis://127.0.0.1:6379'
                                     }),
    passport        = require('passport'),
    shortid         = require('shortid'),
    passportInit    = passport.initialize(),
    passportSession = passport.session(),
    LocalStrategy   = require('passport-local').Strategy,
    passportAuth    = passport.authenticate('local'),
    redis           = require('redis'),
    MongoClient     = require('mongodb').MongoClient,
    getUserFromDb   = ( q, done ) => {
	    pushDbTask(
		    function ( client, release ) {
			    let db = client.db("mamasound_fr");
			    // assert.equal(null, err);
			    //console.log('query', q);
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
    };

let sessionMid =
	    session(
		    {
			    genid            : function ( req ) {
				    var sid = "@" + shortid.generate() + shortid.generate();
				    return sid;
			    },
			    name             : cfg.ROOT_DOMAIN,
			    store            : sessionStore,
			    resave           : false,
			    saveUninitialized: true,
			    secret           : 'secrettokensflklmjkjkdf-' + cfg.PUBLIC_URL,
			    cookie           : {
				    path    : '/',
				    domain  : cfg.ROOT_DOMAIN,
				    //domain  : '.' + cfg.ROOT_DOMAIN,
				    httpOnly: true,
				    maxAge  : 30 * 1000 * 60 * 24 // 24 hours
			    }
		    }
	    );

passport.use(new LocalStrategy(
	function ( username, password, done ) {
		console.warn("getUserFromDb " + username);
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

export const name          = "Auth";
export const priorityLevel = 1000000;


export function service( server, http ) {
	console.log('Auth service running :) ');
	server.use(
		sessionMid,
		passportInit,
		passportSession
	);
	
	server.post(
		"/login",
		( req, res, next ) => {
			console.info("Try Login   ", req.session && req.session.id, req.params);
			passportAuth(req, res, function () {
				console.info("Login   %s  as      %s", req.session && req.session.id, req.user && req.user.login);
				res.set('Content-Type', 'application/json');
				res.status(200).send({ result: { ...req.user, pass: undefined } });
				res.end();
			});
		}
	);
	server.get(
		"/logout",
		( req, res, next ) => {
			console.info("Logout   %s  from      %s", req.session && req.session.id, req.user.login);
			req.logout();
			res.set('Content-Type', 'application/json');
			res.status(200).send({ result: true });
			res.end();
		}
	);
	server.get(
		"/session",
		( req, res, next ) => {
			res.set('Content-Type', 'application/json');
			res.status(200).send({ result: req.user && { ...req.user, pass: undefined } || false });
			res.end();
		}
	);
}
;
