/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import is     from "is";
import number from "./number";

const
	alias    = {
		top   : '0%',
		bottom: '100%',
		center: '50%',
		left  : '0%',
		right : '100%'
	};

function demux( key, tweenable, target, data, box, offset ) {
	
	let count = data[key], v = '', nowhere = {};
	
	for ( let i = 0; i < count; i++ ) {
		number.demux(key + '_' + i, tweenable, nowhere, data, box, offset);
		v += nowhere[key + '_' + i] + ' ';
	}
	
	target[key] = v;
}

export default ( count ) => ( key, value, target, data, initials ) => {
	let values = value.split(' '), v;
	
	data[key] = count;
	
	for ( let i = 0; i < count; i++ ) {
		v = values[i % values.length];
		v = is.string(v) && alias[v] || v;
		number(key + '_' + i, v, target, data, initials)
	}
	
	return demux;
}