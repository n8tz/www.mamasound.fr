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
// es6 require
require       = require('@std/esm')(module, {
	cjs: true
});

program
	.version(packageCfg.version)
	.option('-c, --command [cmd]', 'active command')
	.option('-s, --source [dir]', 'Project directory')
	.option('-p, --port [port=9090]', 'Docker control')
	.parse(process.argv);

let port    = program.port || 9090,
    command = program.command || "start",
    pDir    = program.source || process.cwd(),
    baseDir = __dirname,
    cmd;

console.log('"' + path.normalize(baseDir) + "\" npm run " + command)
//cmd = exec('"' + path.normalize(baseDir) + "\" " + command +
//	           argz.join(' '), { stdio: 'inherit' });

let server_instance = http.listen(parseInt(port), function () {
	console.info('Running on ', server_instance.address().port)
});
