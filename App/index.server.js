/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import React from "react";
import api   from "./api";

const express     = require("express"),
      server      = express(),
      http        = require('http').Server(server),
      argz        = require('minimist')(process.argv.slice(2)),
      bodyParser  = require('body-parser'),
      compression = require('compression'),
      wpiConf     = require('App/.wpiConfig'),
      debug       = require('App/console').default("server");

const busboy = require('connect-busboy');


process.title = wpiConf.project.name + '::server';

debug.warn("process.env.DEBUG : ", process.env.DEBUG);

server.use(compression());
server.use(express.json({ limit: '10mb' }));       // to support JSON-encoded bodies
server.use(express.urlencoded({ extended: true, limit: '10mb' })); // to support URL-encoded bodies
server.use(bodyParser({ limit: '50mb' }));
server.use(busboy({
	                  highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
                  })); // Insert the busboy middle-ware
api(server, http);

var server_instance = http.listen(parseInt(argz.p || argz.port || 8080), function () {
	debug.info('Running on ', server_instance.address().port)
});



