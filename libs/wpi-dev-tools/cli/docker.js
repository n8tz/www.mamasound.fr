#!/usr/bin/env node

'use strict';

const program = require('commander'),
      express = require("express"),
      server  = express(),
      http    = require('http').Server(server),
      fs      = require('fs'),
      path    = require('path'),
      resolve = require('resolve'),
      exec    = require('child_process').exec;

program
	.option('-c, --cmd [cmd]', 'active command')
	.option('-s, --source [dir]', 'Project directory')
	.option('-p, --port [port=9090]', 'Docker control')
	.parse(process.argv);

let port    = program.port || 9090,
    command = program.cmd || "start",
    pDir    = program.source || process.cwd(),
    baseDir = __dirname,
    cmd;

console.log("npm run " + command + " --colors")
cmd = exec("npm run " + command + " --colors", {
	cwd  : pDir,
	stdio: 'inherit'
}, function(err, stdout, stderr) {
	console.log(stdout);
});
cmd.stdout.on('data', l => process.stdout.write(l))
cmd.stderr.on('data', l => process.stderr.write(l))
let server_instance = http.listen(parseInt(port), function () {
	console.info('Running on ', server_instance.address().port)
});
