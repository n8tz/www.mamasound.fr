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

//export const NavBox = {
//	height   : "120px",
//	left     : "0px",
//	top      : "0px",
//	width    : "100%",
//	position : "absolute",
//	transform: {
//		//translateY: "85%"
//	}
//};
import {collWidth, footerMiniHeight, headerMiniHeight, sliderHeight} from "../../vars";

export const EventCatSliderAxis = {
	scrollY: [
		{
			from    : 100,
			duration: 100,
			apply   : {
				//top: ["-100%", 64]
			}
		},
	]
};
export const EventCatSlider     = {
	       maxJump        : 1,
	       visibleItems   : 1,
	       style          : {
		       position : "relative",
		       width    : ["100%", "-"+collWidth, -30],
		       minHeight: ["100vh", -1 * headerMiniHeight, -footerMiniHeight, -sliderHeight, -25],
		       left     : [collWidth, 10],
		       //marginTop: "50px",
		       //bottom  : "40px",
		       //width   : "auto",
		       //overflow: "auto"
	       },
	       defaultInitial : {
		       position : "absolute",
		       //overflow : "hidden",
		       //backgroundColor: "white",
		       top      : "0%",
		       left     : "0%",
		       //marginRight     : "-100%",
		       //marginBottom     : "-100%",
		       width    : "100%",
		       //height   : "100%",
		       zIndex   : 50,
		       opacity  : 0,
		       transform: [
			       {
				       translateX: "200px",
				       //translateY: "-50%"
			       }]
	       },
	       defaultEntering: [
		       {
			       from    : 0,
			       duration: 100,
			       //easeFn  : "easeSinIn",
			       apply   : {
				       opacity  : 1,
				       transform: {
					       translateX: "-200px",
				       },
				       zIndex   : 150,
			       }
		       },
	       ],
	       defaultLeaving : [
		       {
			       from    : 0,
			       duration: 100,
			       //easeFn  : "easeSinOut",
			       apply   : {
				       opacity  : -1,
				       transform: {
					       translateX: "-200px",
				       },
				       zIndex   : -150,
			       }
		       }]
       }
;