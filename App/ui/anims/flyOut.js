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
	top  : "500px",
	bot  : "-500px",
	right: "500px",
	left : "-500px"
};
export default function ( tmStart, duration, dir ) {
	dir = dir || 'right';
	
	
	return [
		{
			type    : "Tween",
			from    : tmStart + 0,
			duration: .4 * duration,
			easeFn  : easingFn.easeSinOut,
			apply   : {
				transform: {
					translateZ: '.06box',
					rotateY   : -25,
					rotateX   : 25
				}
			}
		},
		{
			type    : "Tween",
			from    : tmStart + .1 * duration,
			duration: .9 * duration,
			easeFn  : easingFn.easeSinOut,
			apply   : {
				transform: {
					[keys[dir]]: dirs[dir]
				}
			}
		},
		{
			type    : "Tween",
			from    : tmStart + .1 * duration,
			duration: .9 * duration,
			easeFn  : easingFn.easeSinIn,
			apply   : {
				transform: {
					translateY: '-300px',
				}
			}
		},
		{
			type    : "Tween",
			from    : tmStart + .4 * duration,
			duration: .6 * duration,
			easeFn  : easingFn.easeSinIn,
			apply   : {
				
				transform: {
					translateZ: '.12box',
					rotateY   : -20,
					rotateX   : 20
				}
			}
		},
		{
			type    : "Tween",
			from    : tmStart + .4 * duration,
			duration: .5 * duration,
			apply   : {
				opacity: -1
			}
		}
	]
};
