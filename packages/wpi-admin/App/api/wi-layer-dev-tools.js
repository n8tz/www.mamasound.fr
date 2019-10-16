/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
//
import redis from "App/db/redis.js";
import config from "App/config";

const aliasAPI = require("App/db/aliasHelpers"),
      db       = require("App/db");

export const name          = "dev-tools service";
export const priorityLevel = 1000000;

export function service( server ) {
	server.get(
		'/devTools/clearCache',
		function ( req, res, next ) {
			redis.delWildcard(config.PUBLIC_URL + "_*")
			res.json({ status: 'ok', deleted: config.PUBLIC_URL + "_*" })
			
		}
	);
	//server.get(
	//	'/$docker/restart',
	//	function ( req, res, next ) {
	//		res.json({ status: 'ok' })
	//
	//	}
	//);
}