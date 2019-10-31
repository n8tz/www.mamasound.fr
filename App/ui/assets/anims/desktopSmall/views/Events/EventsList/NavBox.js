/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import {collRightWidth, footerMiniHeight, mapHeight, collLeftWidth} from "../../../vars";

let startPos      = 50,
    openDuration  = 50,
    closeDuration = 50,
    maxHeight     = "150px",
    minHeight     = "40px";

export const style          = {
	position : "absolute",
	width    : ["100%"],
	left     : "0px",
	bottom   : -60,
	height   : "40px",
	zIndex   : 700,
	//backgroundColor: "red",
	transform: {
		translateZ: "0"
	}
};
export const Axis           = [
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
export const SearchBarAxis  = [];
export const typesNav       = {
	position : "absolute",
	width    : ["100%", "-" + collRightWidth, -30, "-" + collLeftWidth],
	//bottom   : "0px",
	left     : ["10px", collLeftWidth],
	bottom   : 0,
	height   : "40px",
	transform: {
		//translateY: "85%"
	}
};
export const SearchBarProps = {
	startPos     : 50,
	openDuration : 50,
	closeDuration: 100,
	minBottom    : footerMiniHeight,
	maxBottom    : mapHeight,
	minHeight    : 40,
	
	boxStyle  : {
		position: "absolute",
		width   : ["100%", "-" + collRightWidth, -30, "-" + collLeftWidth],
		//bottom   : "0px",
		left    : ["10px", collLeftWidth],
		top     : ["-" + 40, 10],
		height  : "40px",
	},
	titleStyle: {
		//paddingLeft: "3em"
	},
	titleAxis : [
		//{
		//	from    : startPos,
		//	duration: openDuration,
		//	apply   : {
		//		paddingLeft: "3em"
		//	}
		//},
		//{
		//	from    : startPos + openDuration,
		//	duration: closeDuration,
		//	apply   : {
		//		paddingLeft: "-3em"
		//	}
		//}
	],
	rootAxis  : [
		//{
		//	from    : 50,
		//	duration: 50,
		//	apply   : {
		//		top: ["-" + maxHeight, minHeight]
		//	}
		//},
		//{
		//	from    : 100,
		//	duration: 100,
		//	apply   : {
		//		top: ["-100%", maxHeight]
		//	}
		//},
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
		//		height   : ["-" + maxHeight, "100%", "-" + mapHeight, -50],
		//		transform: [, , {}],
		//	}
		//}
	]
};
export const StretchBox     = {
	width    : "20%",
	boxStyle : {
		position            : "relative",
		//width               : "20%",
		//maxWidth            : "200px",
		height              : minHeight,
		borderTopLeftRadius : "10px",
		borderTopRightRadius: "10px",
		fontSize            : "12px",
		whiteSpace          : "nowrap",
		textOverflow        : "ellipsis",
		//overflow            : "hidden",
		display             : "inline-block",
	},
	iconStyle: {
		display: "none",
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
