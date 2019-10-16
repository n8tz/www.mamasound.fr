/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import {floatCut} from "../../cssUtils";

const defaultUnits = {};

function demux( key, tweenable, target, data, box ) {
	target[key] = Math.min(1, Math.max(0, floatCut(tweenable[key])))
}

export default ( key, value, target, data, initials, forceUnits ) => {
	
	
	initials[key] = 1;
	target[key]   = parseFloat(value);
	
	return demux;
}