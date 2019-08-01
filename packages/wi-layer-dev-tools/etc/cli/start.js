#!/usr/bin/env node

'use strict';

const program = require('commander'),
      express = require("express"),
      server  = express(),
      http    = require('http').Server(server),
      exec    = require('child_process').exec,
      argz    = process.argv.slice(2),
      Profile = require('../utils/Profile');

let profileId = process.env.__WPI_PROFILE__ || "default";

if ( argz[0] && /^\:.*$/.test(argz[0]) )
	profileId = argz.shift().replace(/^\:(.*)$/, '$1');

program
	.option('-p, --port [port=9090]', 'Build control')
	.parse(process.argv);

let port = program.port || 9090,
    pDir = program.source || process.cwd();

let profile = new Profile(profileId);

profile.start();
profile.onComplete(e => process.exit());

server.use(express.json());       // to support JSON-encoded bodies
server.use(express.urlencoded()); // to support URL-encoded bodies
//server.use(
//	"/status",
//	( req, res ) => {
//		res.header("Access-Control-Allow-Origin", "*");
//		res.json({ mode })
//	}
//);
server.use(
	"/restart",
	( req, res ) => {
		
		res.header("Access-Control-Allow-Origin", "*");
		profile.start();
		
		res.json({ success: true })
	}
);

server.use(
	"/switch",
	( req, res ) => {
		res.header("Access-Control-Allow-Origin", "*");
		profileId = req.query.to || "prod";
		console.log(':::59: ', profileId);
		profile.stop().then(
			e => {
				profile = new Profile(profileId);
				profile.start();
				res.json({ success: true, profileId })
			}
		);
		
		
	}
);

server.use(
	"/kill",
	( req, res ) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.json({ success: true });
		
		profile.stop().then(e => process.exit());
	}
);
server.use(
	"/dbRestore",
	( req, res ) => {
		res.header("Access-Control-Allow-Origin", "*");
		exec(
			"mongorestore --uri ${mongoUrl}",
			{
				cwd  : pDir,
				stdio: 'inherit'
			},
			function ( err, stdout, stderr ) {
				res.json({ success: !err, stdout, stderr })
			});
		
	}
);

let server_instance = http.listen(parseInt(port), function () {
	console.info('Running on ', server_instance.address(), server_instance.address().port)
});

process.on('SIGINT', e => profile.stop()); // catch ctrl-c
process.on('SIGTERM', e => profile.stop()); // catch kill
