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
import {sliderHeight, eventsMiniHeight, headerMiniHeight} from "./vars";

export const background       = {
	position : "absolute",
	//transformOrigin: "0% 0%",
	opacity  : 0,
	transform: {
		perspective: "200px",
		translateY : '-50%',
		translateX : '-50%',
	}
};
export const backgroundScroll = {
	scrollY: [
		{
			from    : 0,
			duration: 100,
			apply   : {
				opacity: 1,
			}
		},
		{
			from    : 100,
			duration: 100,
			apply   : {
				opacity: -1,
			}
		},
	],
}
export const slider           = {
	position : "absolute",
	bottom   : "0px",
	left     : "0px",
	width    : "100%",
	height   : [sliderHeight, -10],
	zIndex   : "250",
	transform: {
		perspective: "200px",
		translateY : '5px',
		//rotateX    : "2deg"
	}
};
export const sliderScroll     = [
	{
		from    : 0,
		duration: 100,
		apply   : {
			//bottom: "-10px"
			transform: {
				//translateY: '5px',
				//perspective: "100px",
			}
		}
	},
];
export const slide            = {
	top      : "0%",
	height   : "100%",
	transform: {
		perspective: "200px",
		rotateX    : "2deg"
	}
};
export const slideScroll      = {
	scrollY: [
		{
			type    : "Tween",
			from    : 100,
			duration: 100,
			apply   : {
				//opacity  : "-1",
				//height   : 2.5,
				transform: {
					translateY: "-8px",
					translateZ: "30px",
					rotateX   : "-4deg"
				}
			}
		},
	],
}
export const focused          = {
	position : "absolute",
	//backgroundColor: "red",
	bottom   : [sliderHeight, 10],
	left     : "50%",
	top      : headerMiniHeight + 20,
	//width    : "90vw",
	opacity  : 0,
	//height   : "50vh",
	//overflow       : "hidden",
	transform: [{
		translateX: "-50%",
		//translateY: "-50%",
		//perspective: "200px",
		//rotateX    : "2deg"
	}, {}, { translateY: '0%' }]
};
export const focusedScroll    = {
	scrollY: [
		{
			from    : 0,
			duration: 100,
			apply   : {
				opacity: 1,
				//height   : 2.5,
				//top      : -2.5,
				//transform: [{
				//	rotateX: "4deg"
				//}, {
				//	translateY: "-50vh",
				//}]
			}
		},
		{
			from    : 100,
			duration: 100,
			apply   : {
				opacity  : "-1",
				//height   : 2.5,
				//top      : -2.5,
				transform: [{
					rotateX: "4deg"
				}, {
					translateY: "-50vh",
				}]
			}
		},
	],
}