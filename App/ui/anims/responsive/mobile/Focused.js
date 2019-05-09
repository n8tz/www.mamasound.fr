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

let stepAngle = "1deg";

export const defaultInitial = {
	position       : "absolute",
	height         : "100%",
	width          : "100%",
	top            : "50%",
	left           : "50%",
	zIndex         : 50,
	overflow       : "hidden",
	transformOrigin: "50% 50%",
	//opacity        : 1,
	transform      : [
		{
			translateX: "-50%",
			translateY: "-50%"
			//perspective: "1250px",
			//translateY : "-18000px",
		},
		{
			//rotate: 0
		},
		{
			//translateY: "18000px",
			//translateZ: "0px",
			//rotateY   : "-65deg",
		},
		{}]
};
export const showAnim       = [
	{
		type    : "Tween",
		from    : 100,
		duration: 400,
		easeFn  : "easeSinIn",
		apply   : {
			opacity  : 1,
			transform: [{}, {
				//rotate: stepAngle,
				//}, {
				translateZ: "-250px",
				translateX: "-250px",
			}]
		}
	}
];
export const hideAnim       = [
	{
		type    : "Tween",
		from    : 0,
		duration: 500,
		easeFn  : "easeSinOut",
		apply   : {
			opacity  : -1,
			transform: [{}, {
				//rotate: stepAngle,
				//}, {
				//translateZ: "-250px",
				translateX: "-250px",
			}]
		}
	}]
;