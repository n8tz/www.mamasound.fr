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


import {eventsMiniHeight, sliderHeight} from "../desktop/vars";

export const transitionDuration    = 500;
export const defaultInitial        = {
	position       : "absolute",
	bottom         : "0%",
	right          : "2.5vw",
	top            : "32%",
	left           : "2.5vw",
	zIndex         : 75,
	//overflow       : "hidden",
	transformOrigin: "50% 50%",
	opacity        : 1,
	transform      : [
		{
			perspective: "250px",
		},
		{},
		{},
		{}]
};
export const defaultPreviewInitial = {
	position       : "absolute",
	height         : ["100vh", -eventsMiniHeight],
	width          : "100vw",
	top            : "50%",
	left           : "50%",
	zIndex         : 40,
	overflow       : "hidden",
	transformOrigin: "50% 50%",
	opacity        : 1,
	transform      : [
		{
			translateX : "-50%",
			translateY : "-50%",
			perspective: "700px",
		},
		{
			translateY: sliderHeight / 2,
		},
		{},
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
				//translateZ: "20px",
				translateX: "-100%",
			}]
		}
	},
];
export const showPreviewAnim       = [
	{
		from    : 0,
		duration: 100,
		apply   : {
			opacity: 1,
		}
	},
];
export const hideAnim              = [
	{
		from    : 0,
		duration: 700,
		easeFn  : "easeSinIn",
		apply   : {
			opacity  : -1,
			transform: [{}, {
				//translateZ: "-40px",
				translateX: "-100%",
				//translateX: "-250px",
			}]
		}
	}]
;
export const hidePreviewAnim       = [
	       {
		       from    : 0,
		       duration: 100,
		       apply   : {
			       opacity: -1,
		       }
	       },
       ]
;