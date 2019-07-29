#!/usr/bin/env node

'use strict';

const program  = require('commander'),
      express  = require("express"),
      server   = express(),
      http     = require('http').Server(server),
      fs       = require('fs'),
      path     = require('path'),
      fkill    = require('fkill'),
      rimraf   = require('rimraf'),
      chokidar = require('chokidar'),
      exec     = require('child_process').exec;

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
    distDir  = {
	    api  : "dist/api",
	    admin: "dist/admin",
	    www  : "dist/www"
    },
    commands = {
	    dev : {
		    buildApi: "wpi :devApi -w",
		    startApi: "node --inspect=[::]:9229 ./dist/api/App.server.js -p 9701",
		    buildWww: "wpi-dev-server :devClient --hot --host 0.0.0.0"
	    },
	    prod: {
		    buildApi: "wpi :api ",
		    startApi: "node ./dist/api/App.server.js  -p 8080 ",
		    buildWww: "wpi :client&&wpi :admin"
	    }
    },
    apiCmd,
    wpApiCmd,
    wpWwwCmd,
    apiWatcher;


function killCmd( reboot ) {
	if ( apiCmd ) {
		console.log("killing... ");
		apiCmd.kill();
		return fkill([apiCmd.pid, "concurently", ":8080", ":9701"], { tree: true, force: true, silent: true })
			.then(
				logs => {
					apiCmd = null;
					console.log("cleaning... ");
					
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

function killMode( reboot ) {
	let theList = [":8080"];
	
	console.log("killing... ");
	if ( apiCmd ) {
		theList.unshift(apiCmd.pid);
		apiCmd.kill('SIGINT');
		apiCmd = null;
	}
	if ( wpApiCmd ) {
		theList.unshift(wpApiCmd.pid);
		wpApiCmd.kill('SIGINT');
		wpApiCmd = null;
	}
	if ( wpWwwCmd ) {
		theList.unshift(wpWwwCmd.pid);
		wpWwwCmd.kill('SIGINT');
		wpWwwCmd = null;
	}
	return fkill(theList, { tree: true, force: true, silent: true })
		.then(
			logs => {
				reboot && runByMode();
			}
		)
}

function cleanBuilds() {
	try {
		rimraf.sync(path.join(pDir, distDir.api, "**/*.*"));
		rimraf.sync(path.join(pDir, distDir.admin, "**/*.*"));
		rimraf.sync(path.join(pDir, distDir.www, "**/*.*"));
		console.log("Builds cleaned... ");
	} catch ( e ) {
		console.log("Fail cleaning builds... ");
	}
}

function runByMode() {
	if ( wpApiCmd ) {
		return killMode(true);
	}
	apiWatcher && apiWatcher.close();
	apiWatcher = null;
	cleanBuilds();
	
	wpApiCmd = exec(
		commands[mode].buildApi,
		{
			cwd  : pDir,
			stdio: 'inherit'
		},
		function ( err, stdout, stderr ) {
			console.log(stdout, stderr);
			
		});
	wpApiCmd.stdout.on('data', l => process.stdout.write(l))
	wpApiCmd.stderr.on('data', l => process.stderr.write(l))
	wpWwwCmd = exec(
		commands[mode].buildWww,
		{
			cwd  : pDir,
			stdio: 'inherit'
		},
		function ( err, stdout, stderr ) {
			console.log(stdout, stderr);
		});
	wpWwwCmd.stdout.on('data', l => process.stdout.write(l))
	wpWwwCmd.stderr.on('data', l => process.stderr.write(l));
	(apiWatcher = chokidar.watch(path.join(pDir, distDir.api, '*.js'), { ignored: /(^|[\/\\])\../ }))
		.on('all', ( event, path ) => {
			apiCmd && apiCmd.kill('SIGINT');
			(
				apiCmd ?
				fkill([apiCmd.pid, ':8080'], { tree: true, force: true, silent: true })
				       :
				fkill([':8080'], { tree: true, force: true, silent: true })
			)
				.then(
					function runApi( logs ) {
						console.log("Start API", event, path, commands[mode].startApi);
						apiCmd = exec(
							commands[mode].startApi,
							{
								cwd  : pDir,
								stdio: 'inherit'
							},
							function ( err, stdout, stderr ) {
								console.log("Api process has terminate, restart in 3s");
								apiCmd = null;
								setTimeout(
									tm => {
										!apiCmd && runApi()
									},
									3000
								)
							});
						apiCmd.stdout.on('data', l => process.stdout.write(l))
						apiCmd.stderr.on('data', l => process.stderr.write(l))
					}
				)
		});
}

server.use(express.json());       // to support JSON-encoded bodies
server.use(express.urlencoded()); // to support URL-encoded bodies
server.use(
	"/status",
	( req, res ) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.json({ mode })
	}
);
server.use(
	"/restart",
	( req, res ) => {
		
		res.header("Access-Control-Allow-Origin", "*");
		if ( command )
			runCmd();
		else
			runByMode();
		res.json({ success: true })
	}
);

server.use(
	"/switch",
	( req, res ) => {
		res.header("Access-Control-Allow-Origin", "*");
		command = null;
		mode    = req.query.targetMode || mode;
		runByMode();
		res.json({ success: !!req.query.targetMode, mode })
	}
);

server.use(
	"/kill",
	( req, res ) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.json({ success: true })
		killCmd();
		process.exit();
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

if ( command )
	runCmd();
else
	runByMode();
let server_instance = http.listen(parseInt(port), function () {
	console.info('Running on ', server_instance.address(), server_instance.address().port)
});
