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
import {eventsMiniHeight, footerMiniHeight, headerMiniHeight, sliderHeight} from "../vars";

export const bounds            = undefined;
export const waypoints         = [
	{ at: 0, id: "page" },
	{
		//direction   : 1,
		at          : 50,
		id          : "bighead",
		stopDuration: 1000
	},
	{
		//direction   : 1,
		at          : 100,
		id          : "head",
		stopDuration: 1000
	},
	{
		//direction: -1,
		at: 200,
		id: "events"
	},
	{
		at: 300,
		id: "map"
	},
];
export const page              = {
	position : "absolute",
	top      : "0cm",
	left     : "50%",
	bottom   : 0,
	transform: {
		translateX: "-50%"
	}
};
export const header            = {
	position : "absolute",
	height   : ["100%", "0px", "-" + sliderHeight],
	top      : "0%",
	zIndex   : 200,
	transform: [
		{
			perspective: "500px",
		},
		{
			//translateX: "-50%",
			translateY: "0%",
			//translateZ : "-50px",
			//rotateX   : "-10deg"
		}
	]
};
export const Highlighter       = {
	position       : "absolute",
	right          : "0%",
	top            : ["0%"],
	height         : ["100%", "0px", "0vh", -2 * footerMiniHeight],
	transformOrigin: "center top",
	zIndex         : 100,
	transform      : [
		{
			//perspective: "500px",
		},
		{
			translateY: "0%",
			//translateZ : "-50px",
			//rotateX   : "-10deg"
		}
	]
};
export const logo              = {
	position : "absolute",
	width    : "40%",
	minWidth : "250px",
	right    : "5%",
	height   : "50px",
	bottom   : "10%",
	zIndex   : 200,
	transform: [
		{
			//perspective: "500px",
		},
		{
			//translateX: "-50%",
			translateY: "0%",
			//translateZ : "-50px",
			//rotateX   : "-10deg"
		}
	]
};
export const Footer            = {
	height   : footerMiniHeight,
	left     : "0px",
	top      : ["100%", -footerMiniHeight],
	width    : "100%",
	position : "absolute",
	zIndex   : 300,
	transform: {
		//translateY: "-100%"
	}
};
export const EventsBlock       = {
	position       : "absolute",
	right          : "0%",
	bottom         : 0,
	top            : "100%",
	zIndex         : 125,
	//overflow       : 'hidden',
	transformOrigin: "center top",
	transform      : [
		{
			perspective: "500px",
		},
		{
			//translateY: "80%",
			//translateZ : "-50px",
			//rotateX   : "-10deg"
		}
	]
};
export const EventMap          = {
	position       : "absolute",
	right          : "0%",
	height         : "0%",
	zIndex         : 150,
	//overflow       : 'hidden',
	transformOrigin: "center top",
	top            : ["100%", -footerMiniHeight],
};
export const PageBlock         = {
	
	position       : "absolute",
	right          : "0%",
	height         : "0%",
	top            : "100%",
	//overflow       : 'hidden',
	transformOrigin: "center top",
	zIndex         : 100,
	transform      : [
		{
			perspective: "500px",
		},
		{
			//translateY: "100%",
			//translateZ : "-50px",
			//rotateX   : "-10deg"
		}
	]
};
export const EventMap_Gradient = {
	opacity: 1
};
export const YAxis             = [
	// header page to main highlighter
	{
		target  : "logo",
		from    : 0,
		duration: 50,
		apply   : {
			right: "-5%",
			width: "60%",
		}
	},
	{
		target  : "header",
		from    : 0,
		duration: 50,
		apply   : {
			height: ["-100%", headerMiniHeight + "px", sliderHeight],
		}
	},
	{
		target  : "Highlighter",
		from    : 0,
		duration: 50,
		apply   : {
			height: ["-50px", 2 * footerMiniHeight]
		}
	},
	{
		target  : "EventsBlock",
		from    : 0,
		duration: 50,
		apply   : {
			top: "-50px"
		}
	},
	{
		target  : "Highlighter",
		from    : 50,
		duration: 50,
		apply   : {
			height: ["-150px"]
		}
	},
	{
		target  : "EventsBlock",
		from    : 50,
		duration: 50,
		apply   : {
			top: [-eventsMiniHeight, 50]
		}
	},
	//// highlighter to EventsBlock
	{
		target  : "Highlighter",
		from    : 100,
		duration: 100,
		apply   : {
			height: ["-100%", 200, sliderHeight, 2 * footerMiniHeight],
		}
	},
	{
		target  : "EventsBlock",
		from    : 100,
		duration: 100,
		apply   : {
			bottom: ["20%", footerMiniHeight],
			top   : ["-100%", (eventsMiniHeight + headerMiniHeight) + "px", sliderHeight, footerMiniHeight, -20]
		}
	},
	{
		target  : "EventMap",
		from    : 100,
		duration: 100,
		apply   : {
			height: "20%",
			top   : "-20%"
		}
	},
	//// EventsBlock to map
	//{
	//	target  : "EventsBlock",
	//	from    : 200,
	//	duration: 100,
	//	apply   : {
	//		bottom: "20%"
	//	}
	//},
	//{
	//	target  : "EventMap",
	//	from    : 200,
	//	duration: 100,
	//	apply   : {
	//		height: "20%",
	//		top   : "-20%"
	//	}
	//},
];