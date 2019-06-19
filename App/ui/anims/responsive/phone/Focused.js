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
	bottom         : "0%",
	right          : "0%",
	top            : "15vh",
	left           : "0px",
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
	height         : "14vh",
	width          : "100%",
	top            : ".5vh",
	left           : "0px",
	zIndex         : 50,
	overflow       : "hidden",
	transformOrigin: "50% 50%",
	opacity        : 1,
	transform      : [
		{
			perspective: "700px",
		},
		{},
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
				translateZ: "20px",
				translateX: "-100%",
			}]
		}
	},
];
export const showPreviewAnim       = [
	{
		from    : 0,
		duration: 1,
		apply   : {
			transform: [{}, {
				rotateX: "-270deg",
			}]
		}
	},
	{
		from    : 50,
		duration: 50,
		apply   : {
			transform: [{}, {
				rotateX: "-90deg",
			}]
		}
	},
	{
		from    : 50,
		duration: 1,
		apply   : {
			opacity: 1,
		}
	}
];
export const hideAnim              = [
	{
		from    : 0,
		duration: 700,
		apply   : {
			opacity  : -1,
			transform: [{}, {
				translateZ: "-40px",
				translateX: "-100%",
				//translateX: "-250px",
			}]
		}
	}]
;
export const hidePreviewAnim       = [
	       {
		       from    : 0,
		       duration: 50,
		       apply   : {
			       transform: [{}, {
				       rotateX: "-90deg",
				       //translateY: "-200px",
				       //translateX: "-250px",
			       }]
		       }
	       },
	       {
		       from    : 50,
		       duration: 1,
		       apply   : {
			       opacity: -1,
		       }
	       },
	       {
		       from    : 50,
		       duration: 50,
		       apply   : {
			       //opacity: 1,
		       }
	       },
       ]
;