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