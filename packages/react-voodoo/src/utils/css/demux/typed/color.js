/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import rgba from "color-rgba";

function demux( key, tweenable, target, data ) {
	let value = "rgba(" + tweenable[key + '_r'] + ", " + tweenable[key + '_g'] + ", " + tweenable[key + '_b'] + ", " + tweenable[key + '_a'] + ")";
	return target ?
	       target[key] = value : value;
}

function muxer( key, value, target, data, initials ) {
	let vect           = rgba(value);
	target[key + '_r'] = vect[0];
	target[key + '_g'] = vect[1];
	target[key + '_b'] = vect[2];
	target[key + '_a'] = vect[3];
	
	initials[key + '_r'] = 0;
	initials[key + '_g'] = 0;
	initials[key + '_b'] = 0;
	initials[key + '_a'] = 1;
	
	return demux;
}

muxer.demux = demux;
export default muxer;