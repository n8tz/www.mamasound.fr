/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

const defaultUnits = {};

function demux( key, tweenable, target, data, box ) {
	target[key] = ~~(tweenable[key]);
}

export default ( key, value, target, data, initials, forceUnits ) => {
	
	
	initials[key] = 0;
	target[key]   = ~~value;
	if ( !data[key] && key in defaultUnits )
		data[key] = defaultUnits[key];
	
	return demux;
}