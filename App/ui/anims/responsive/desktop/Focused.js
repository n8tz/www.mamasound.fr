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

import {sliderHeight, eventsMiniHeight, headerMiniHeight} from "./vars";

export const transitionDuration    = 800;
export const defaultInitial        = {
	position       : "absolute",
	bottom         : "0%",
	right          : "5px",
	top            : "0%",
	left           : "0px",
	//marginLeft     : "300px",
	zIndex         : 50,
	//overflow       : "hidden",
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
			translateY: (parseFloat(sliderHeight) / 2) + "vh",
		},
		{},
		{}]
};
export const showAnim              = [
	{
		from    : 0,
		duration: 1,
		apply   : {
			transform: [{}, {
				//rotateY: "270deg",
			}]
		}
	},
	{
		from    : 25,
		duration: 75,
		easeFn  : "easeSinOut",
		apply   : {
			opacity  : 1,
			transform: [{}, {
				//translateZ: "50px",
				translateX: "-250px",
			}]
		}
	},
	{
		from    : 50,
		duration: 1,
		apply   : {}
	}
];
export const showPreviewAnim       = [
	{
		from    : 0,
		duration: 100,
		//easeFn  : "easeBackOut",
		apply   : {
			opacity: 1,
			//transform: [{}, {
			//	translateX: "150px",
			//}]
		}
	},
];
export const hideAnim              = [
	{
		from    : 0,
		duration: 50, easeFn: "easeSinOut",
		
		apply: {
			opacity  : -1,
			transform: [{}, {
				//rotateY: "90deg",
				//translateZ: "-50px",
				//translateY: "-200px",
				translateX: "-250px",
			}]
		}
	},
	{
		from    : 50,
		duration: 1,
		apply   : {}
	},
	{
		from    : 50,
		duration: 50,
		apply   : {
			//opacity: 1,
		}
	}]
;
export const hidePreviewAnim       = [
	       {
		       from    : 0,
		       duration: 100,
		       apply   : {
			       opacity: -1,
			       //transform: [{}, {
			       //    //rotateY: "90deg",
			       //    translateZ: "-50px",
			       //    //translateY: "-200px",
			       //    //translateX: "-250px",
			       //}]
		       }
	       },
	       {
		       from    : 50,
		       duration: 1,
		       apply   : {}
	       },
	       {
		       from    : 50,
		       duration: 50,
		       apply   : {
			       //opacity: 1,
		       }
	       }
       ]
;