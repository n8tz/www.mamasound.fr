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
	top  : 'translateY',
	bot  : 'translateY',
	right: 'translateX',
	left : 'translateX'
}, dirs      = {
	top  : -1,
	bot  : 1,
	right: -1,
	left : 1
};
export default function ( target, tmStart = 0, duration = 500, dir = "top" ) {
	
	
	return {
		
		initial: {
			[target]: {
				transform: {
					[keys[dir]]: '0box',
				},
			}
		},
		anims  : [
			{
				type    : "Tween",
				target,
				from    : tmStart,
				duration: duration,
				easeFn  : easingFn.easeSinOut,
				apply   : {
					transform: {
						[keys[dir]]: dirs[dir] + 'box'
					}
				}
			},
		]
	}
};
