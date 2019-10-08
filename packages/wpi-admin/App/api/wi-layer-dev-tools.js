/*
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