/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
//
let redis       = require("redis"),
    redisClient = redis && redis.createClient(process.env.REDIS_URI);
console.warn(process.env.REDIS_URI);
redis.RedisClient.prototype.delWildcard = function ( key, callback ) {
	var redis = this;
	
	redis.keys(key, function ( err, rows ) {
		for ( var i = 0, j = rows.length; i < j; ++i ) {
			redis.del(rows[i])
		}
		
		return callback && callback();
	});
};

export default redisClient;
