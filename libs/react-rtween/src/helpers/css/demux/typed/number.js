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

import is from "is";

const
	unitsRe      = new RegExp(
		"([+-]?(?:[0-9]*[.])?[0-9]+)\\s*(" +
		['box', 'em', 'ex', '%', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax'].join('|')
		+ ")"
	),
	floatCut     = function ( v, l ) {
		let p = Math.pow(10, l);
		return Math.round(v * p) / p;
	},
	defaultUnits = {
		left  : 'px',
		right : 'px',
		top   : 'px',
		bottom: 'px',
		width : 'px',
		height: 'px',
	},
	defaultBox   = {
		left  : 'x',
		right : 'x',
		top   : 'y',
		bottom: 'y',
		width : 'x',
		height: 'y',
	};

function demuxOne( key, twVal, baseKey, data, box ) {
	let value = twVal,
	    unit  = data[key] || defaultUnits[baseKey];
	
	if ( unit === 'box' ) {
		value = floatCut(value * (box[defaultBox[baseKey]] || box.x), 3);
		unit  = 'px';
	}
	
	return unit ? value + unit : floatCut(value, 3);
}

function demux( key, tweenable, target, data, box ) {
	let value;
	
	value = demuxOne(key + "_" + 0, tweenable[key + "_" + 0], key, data, box);
	
	if ( data[key] && data[key].length > 1 ) {
		for ( let i = 1; i < data[key].length; i++ ) {
			if ( tweenable[key + "_" + i] < 0 )
				value += " - " + demuxOne(key + "_" + i, -tweenable[key + "_" + i], key, data, box);
			else
				value += " + " + demuxOne(key + "_" + i, tweenable[key + "_" + i], key, data, box);
		}
		value = "calc(" + value + ")";
	}
	
	target[key] = value;
}

function muxer( key, value, target, data, initials, forceUnits ) {
	
	data[key] = data[key] || [];
	if ( is.array(value) ) {
		for ( let i = 0; i < value.length; i++ ) {
			data[key][i] = true;
			if ( value[i] === "-100%" && key === "height" )
				debugger
			muxOne(key + "_" + i, value[i] || 0, target, key, data, initials, forceUnits)
		}
	}
	else {
		data[key][0] = true;
		muxOne(key + "_" + 0, value || 0, target, key, data, initials, forceUnits)
	}
	
	return demux;
}

function muxOne( key, value, target, baseKey, data, initials, forceUnits ) {
	
	
	let match     = is.string(value) ? value.match(unitsRe) : false;
	initials[key] = 0;
	if ( match ) {
		if ( !forceUnits && data[key] && data[key] !== match[2] ) {
			console.warn("Have != units on prop ! Ignore ", key, "present:" + data[key], "new:" + match[2]);
			target[key] = 0;
		}
		else {
			data[key]   = match[2];
			target[key] = parseFloat(match[1]);
		}
	}
	else {
		target[key] = parseFloat(value);
		//if ( !data[key] && baseKey in defaultUnits )
		//	data[key] = defaultUnits[baseKey];
	}
	
	return demux;
};
muxer.demux = demux;
export default muxer;