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
process.title     = wpiConf.project.name + '::server';

debug.warn("process.env.DEBUG : ", process.env.DEBUG);

server.use(compression());
server.use(express.json({ limit: '10mb' }));       // to support JSON-encoded bodies
server.use(express.urlencoded({ extended: true, limit: '10mb' })); // to support URL-encoded bodies
server.use(bodyParser({ limit: '50mb' }));

api(server, http);

var server_instance = http.listen(parseInt(argz.p || argz.port || 8080), function () {
	debug.info('Running on ', server_instance.address().port)
});



