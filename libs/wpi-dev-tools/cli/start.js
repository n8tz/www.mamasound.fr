#!/usr/bin/env node

'use strict';

const program = require('commander'),
      express = require("express"),
      server  = express(),
      http    = require('http').Server(server),
      fs      = require('fs'),
      path    = require('path'),
      fkill   = require('fkill'),
      resolve = require('resolve'),
      //npm     = require('global-npm'),
      exec    = require('child_process').exec;

program
	.option('-m, --mode [mode]', 'active mode')
	.option('-c, --cmd [cmd]', 'active command')
	.option('-s, --source [dir]', 'Project directory')
	.option('-p, --port [port=9090]', 'Docker control')
	.parse(process.argv);

let port     = program.port || 9090,
    command  = program.cmd,
    mode     = program.mode || !command && "prod",
    pDir     = program.source || process.cwd(),
    baseDir  = __dirname,
    commands = {
	    dev : {
		    api: "wpi :devApi -w",
		    www: "wpi :devClient --hot --host 0.0.0.0"
	    },
	    prod: {
		    api: "wpi :api ",
		    www: "wpi :client&&wpi :admin"
	    }
    },
    apiCmd,
    wpApiCmd,
    wpWwwCmd;


function killCmd( reboot ) {
	if ( apiCmd ) {
		console.log("killing... ");
		apiCmd.kill();
		return fkill([apiCmd.pid, "concurently", ":8080", ":9701"], { tree: true, force: true, silent: true })
			.then(
				logs => {
					apiCmd = null;
					reboot && runCmd();
				}
			)
	}
}

function runCmd() {
	if ( apiCmd ) {
		return killCmd(true);
	}
	console.log("npm run " + command + " --colors");
	apiCmd = exec(
		"npm run " + command + " --colors",
		{
			cwd  : pDir,
			stdio: 'inherit'
		},
		function ( err, stdout, stderr ) {
			console.log(stdout, stderr);
			
		});
	apiCmd.stdout.on('data', l => process.stdout.write(l))
	apiCmd.stderr.on('data', l => process.stderr.write(l))
}

function runByMode() {
	if ( apiCmd ) {
		return killCmd(true);
	}
	
	wpApiCmd = exec(
		commands.api,
		{
			cwd  : pDir,
			stdio: 'inherit'
		},
		function ( err, stdout, stderr ) {
			console.log(stdout, stderr);
			
		});
	wpWwwCmd = exec(
		commands.www,
		{
			cwd  : pDir,
			stdio: 'inherit'
		},
		function ( err, stdout, stderr ) {
			console.log(stdout, stderr);
			
		});
	apiCmd.stdout.on('data', l => process.stdout.write(l))
	apiCmd.stderr.on('data', l => process.stderr.write(l))
}

server.use(express.json());       // to support JSON-encoded bodies
server.use(express.urlencoded()); // to support URL-encoded bodies
server.get(
	"/restart",
	( req, res ) => {
		runCmd();
		res.json({ success: true })
	}
);

server.get(
	"/switch",
	( req, res ) => {
		command = req.query.targetMode || command;
		runCmd();
		res.json({ success: !!req.query.targetMode })
	}
);
server.get(
	"/kill",
	( req, res ) => {
		res.json({ success: true })
		killCmd();
		process.exit();
	}
);

if ( command )
	runCmd();
else
	runByMode();
let server_instance = http.listen(parseInt(port), function () {
	console.info('Running on ', server_instance.address(), server_instance.address().port)
});
