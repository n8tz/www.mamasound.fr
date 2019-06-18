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

export const defaultInitial        = {
	position       : "absolute",
	height         : "100%",
	right          : "0%",
	top            : "0%",
	left           : "300px",
	zIndex         : 50,
	overflow       : "hidden",
	transformOrigin: "50% 50%",
	opacity        : 1,
	transform      : [
		{
			//translateX : "-50%",
			//translateY : "-50%",
			perspective: "250px",
		},
		{
			//translateX: "-200px",
			//translateY : "-18000px",
			//rotate: 0
		},
		{
			//translateY: "18000px",
			//translateZ: "0px",
			//rotateY   : "-65deg",
		},
		{}]
};
export const defaultPreviewInitial = {
	position       : "absolute",
	height         : "100%",
	width          : "280px",
	top            : "0%",
	left           : "10px",
	zIndex         : 50,
	overflow       : "hidden",
	transformOrigin: "50% 50%",
	opacity        : 1,
	transform      : [
		{
			//translateX : "-50%",
			//translateY : "-50%",
			perspective: "250px",
		},
		{
			//translateY: "-200px",
			//translateY : "-18000px",
			//rotate: 0
		},
		{
			//translateY: "18000px",
			//translateZ: "0px",
			//rotateY   : "-65deg",
		},
		{}]
};
export const showAnim              = [
	{
		from    : 0,
		duration: 800,
		easeFn  : "easeSinIn",
		//easeFn  : "easeBackOut",
		apply   : {
			opacity  : 1,
			transform: [{}, {
				//rotate: stepAngle,
				//}, {
				//translateZ: "-50px",
				translateX: "-200px",
			}]
		}
	},
];
export const showPreviewAnim       = [
	{
		from    : 0,
		duration: 800,
		easeFn  : "easeSinIn",
		//easeFn  : "easeBackOut",
		apply   : {
			opacity  : 1,
			transform: [{}, {
				//rotate: stepAngle,
				//}, {
				//translateZ: "-50px",
				translateY: "-200px",
			}]
		}
	},
];
export const hideAnim              = [
	{
		type    : "Tween",
		from    : 0,
		duration: 700,
		apply   : {
			opacity  : -1,
			transform: [{}, {
				//rotate: stepAngle,
				//}, {
				//translateZ: "-250px",
				translateX: "-200px",
				//translateX: "-250px",
			}]
		}
	}]
;
export const hidePreviewAnim       = [
	{
		type    : "Tween",
		from    : 0,
		duration: 700,
		apply   : {
			opacity  : -1,
			transform: [{}, {
				//rotate: stepAngle,
				//}, {
				//translateZ: "-250px",
				translateY: "-200px",
				//translateX: "-250px",
			}]
		}
	}]
;