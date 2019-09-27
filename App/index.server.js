/*
 * www.mamasound.fr
 * Copyright (C) 2019 Nathanael Braun
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
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



