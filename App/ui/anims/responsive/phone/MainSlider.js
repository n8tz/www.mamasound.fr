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

let stepAngle = "1.8deg";

export const defaultInitial  = {
	position : "absolute",
	height   : "100%",
	top      : "50%",
	left     : "50%",
	zIndex   : 50,
	opacity  : 0,
	transform: [
		{
			perspective: "1250px",
			translateY : "-20000px",
			rotate     : "-" + stepAngle
		},
		{
			translateY: "20000px",
			translateZ: "-500px",
			//translateX: "1.75box",
			//translateY: "-.5box",
			//rotateY   : "-3deg",
			rotateY   : "-65deg",
		},
		{
			translateX: "-50%",
			translateY: "-50%"
		}]
};
export const defaultEntering = [
	{
		type    : "Tween",
		from    : 0,
		duration: 100,
		//easeFn  : "easePolyIn",
		apply   : {
			transform: {
				//translateX: "-1.25box",
				rotate: stepAngle,
			},
			zIndex   : 150,
		}
	},
	{
		type    : "Tween",
		from    : 0,
		duration: 35,
		apply   : {
			opacity: 1,
		}
	}, {
		type    : "Tween",
		from    : 55,
		duration: 45,
		apply   : {
			transform: [{}, {
				rotateY   : "65deg",
				translateZ: "500px",
				//rotateX: "-90deg",
			}],
		}
	},
];
export const defaultLeaving  = [
	{
		type    : "Tween",
		from    : 0,
		duration: 45,
		apply   : {
			transform: [{}, {
				rotateY   : "65deg",
				translateZ: "-500px",
				//rotateX: "90deg",
			}]
		}
	},
	{
		type    : "Tween",
		from    : 65,
		duration: 35,
		apply   : {
			opacity: -1,
		}
	}, {
		type    : "Tween",
		from    : 0,
		duration: 100,
		//easeFn  : "easePolyOut",
		apply   : {
			zIndex: -150,
			
			transform: {
				//translateX: "-1.25box",
				rotate: stepAngle,
			}
		}
	}]
;