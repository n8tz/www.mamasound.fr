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

var easingFn = require('d3-ease');
var keys     = {
	top  : '_y',
	bot  : '_y',
	right: '_x',
	left : '_x'
}, dirs      = {
	top  : -1,
	bot  : 1,
	right: -1,
	left : 1
};
export default function ( tmStart, duration, dir ) {
	dir = dir || 'right';
	
	
	return [
		{
			type    : "Tween",
			from    : tmStart,
			duration: 1 * duration,
			//easeFn  : easingFn.easeCircleIn,
			apply   : {
				height: "20px",
			}
		},
		{
			type    : "Tween",
			from    : tmStart,
			duration: 1 * duration,
			//easeFn  : easingFn.easeCircleIn,
			apply   : {
				fontSize: "5px"
			}
		},
		//{
		//	type    : "Tween",
		//	from    : tmStart + .1 * duration,
		//	duration: .8 * duration,
		//	easeFn  : easingFn.easeCircle,
		//	apply   : {
		//		rotateY: 180,
		//	}
		//}
	]
};
