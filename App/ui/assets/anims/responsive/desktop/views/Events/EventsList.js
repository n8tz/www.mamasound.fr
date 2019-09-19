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

export const NavBox            = {
	height   : "80px",
	left     : "0px",
	top      : "0px",
	width    : "100%",
	position : "absolute",
	transform: {
		//translateY: "85%"
	}
};

export const EventCatSlider = {
	       maxJump        : 1,
	       visibleItems   : 1,
	       style          : {
		       position: "absolute",
		       right   : "0%",
		       //left    : "300px",
		       top     : "100px",
		       bottom  : "0%",
		       width   : ["100%"],
		       //overflow: "auto"
	       },
	       defaultInitial : {
		       position       : "absolute",
		       overflow       : "hidden",
		       //backgroundColor: "white",
		       top            : "0%",
		       left           : "0%",
		       width          : "100%",
		       height         : "100%",
		       zIndex         : 50,
		       //opacity  : 0,
		       transform      : [
			       {
				       translateX: "100%",
				       //translateY: "-50%"
			       }]
	       },
	       defaultEntering: [
		       {
			       from    : 0,
			       duration: 100,
			       //easeFn  : "easeSinIn",
			       apply   : {
				       transform: {
					       translateX: "-100%",
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
				       transform: {
					       translateX: "-100%",
				       },
				       zIndex   : -150,
			       }
		       }]
       }
;