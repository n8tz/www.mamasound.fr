/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import {footerMiniHeight, mapHeight} from "../../../vars";

let startPos      = 50,
    openDuration  = 50,
    closeDuration = 50,
    maxHeight     = "150px",
    minHeight     = "30px";

export const style         = {
	position : "absolute",
	width    : ["100%"],
	left     : "0px",
	bottom   : -15,
	height   : "50px",
	zIndex   : 700,
	//backgroundColor: "red",
	transform: {
		translateZ: "0"
	}
};
export const Axis          = [
	{
		from    : 50,
		duration: 50,
		apply   : {
			//top: ["-" + maxHeight, minHeight]
		}
	},
	{
		from    : 100,
		duration: 100,
		apply   : {
			//top: ["-100%", maxHeight]
		}
	},
];
export const SearchBarAxis = [];
export const typesNav      = {
	position : "absolute",
	width    : ["100%"],
	//bottom   : "0px",
	left     : "0px",
	top      : 0,
	height   : "30px",
	transform: {
		//translateY: "85%"
	}
};
export const StretchBox    = {
	width    : "20%",
	minHeight: 30,
	boxStyle : {
		position            : "relative",
		//width               : "20%",
		//maxWidth            : "200px",
		height              : minHeight,
		borderTopLeftRadius : "10px",
		borderTopRightRadius: "10px",
		//paddingLeft         : "20px",
		whiteSpace          : "nowrap",
		textOverflow        : "ellipsis",
		overflow            : "hidden",
		display             : "inline-block",
	},
	rootAxis : [
		//{
		//	from    : startPos,
		//	duration: openDuration,
		//	apply   : {
		//		height   : [maxHeight, "-" + minHeight],
		//		transform: [, , {}],
		//	}
		//},
		//{
		//	from    : startPos + openDuration,
		//	duration: closeDuration,
		//	apply   : {
		//		height   : ["-" + maxHeight, minHeight],
		//		transform: [, , {}],
		//	}
		//}
	],
	iconAxis : [
		//{
		//	from    : startPos,
		//	duration: openDuration,
		//	apply   : {
		//		opacity: -.5,
		//		top    : minHeight,
		//		left   : ["100%", "-" + maxHeight, minHeight],
		//		height : [maxHeight, "-" + minHeight, "-" + minHeight],
		//		width  : [maxHeight, "-" + minHeight, "-" + minHeight],
		//	}
		//}
	]
};
