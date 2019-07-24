/*
 *
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
//let redis       = require("redis"),
//    redisClient = redis && redis.createClient(process.env.redisUrl);
//console.warn(process.env.redisUrl);
//redis.RedisClient.prototype.delWildcard = function ( key, callback ) {
//	var redis = this;
//
//	redis.keys(key, function ( err, rows ) {
//		for ( var i = 0, j = rows.length; i < j; ++i ) {
//			redis.del(rows[i])
//		}
//
//		return callback && callback();
//	});
//};
//export default redisClient;
