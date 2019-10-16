/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import is                  from "is";
import {floatCut, unitsRe} from "../cssUtils";

const
	defaultUnits = {
		blur      : 'px',
		brightness: '%',
		contrast  : '%',
		dropShadow: true,
		grayscale : '%',
		hueRotate : 'deg',
		invert    : "%",
		opacity   : "%",
		saturate  : "%",
		sepia     : "%"
	};
const filters    = {};

function demux( key, tweenable, target, data, box ) {
	
	if ( data["filter_head"] === key ) {
		let filters = "";
		Object.keys(data[key]).forEach(
			fkey => {
				let dkey        = key + '_' + fkey;
				data[key][fkey] = true;
				filters += fkey + "(" + floatCut(tweenable[dkey], 2) + data[dkey] + ") ";
			}
		)
		target.filter = filters;
	}
	
}

export default ( key, value, target, data, initials ) => {
	
	data["filter_head"] = data["filter_head"] || key;
	data[key]           = data[key] || {};
	initials[key]       = 0;
	
	Object.keys(value).forEach(
		fkey => {
			let fValue      = value[fkey],
			    dkey        = key + '_' + fkey,
			    match       = is.string(fValue) ? fValue.match(unitsRe) : false;
			data[key][fkey] = true;
			initials[dkey]  = 0;
			if ( match ) {
				if ( data[dkey] && data[dkey] !== match[2] ) {
					console.warn("Have != units on prop ! Ignore ", dkey, "present:" + data[dkey], "new:" + match[2]);
					target[dkey] = 0;
				}
				else {
					data[dkey]   = match[2];
					target[dkey] = parseFloat(match[1]);
				}
			}
			else {
				target[dkey] = fValue;
				if ( !data[dkey] && fkey in defaultUnits )
					data[dkey] = defaultUnits[fkey];
			}
		}
	)
	return demux;
}