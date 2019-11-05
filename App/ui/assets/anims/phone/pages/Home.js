/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import {
	collRightWidth,
	footerMiniHeight,
	headerHeight,
	collLeftWidth,
	headerMiniHeight,
	sliderHeight,
	mapHeight
} from "../vars";

export const bounds    = { min: 100, max: 100 };
export const waypoints = [
//	{ at: 0, id: "page" },
//	{
//		//direction   : 1,
//		at          : 50,
//		id          : "bighead",
//		stopDuration: 1000
//	},
//	{
//		//direction   : 1,
//		at          : 100,
//		id          : "head",
//		stopDuration: 1000
//	},
//	{
//		//direction: -1,
//		at: 200,
//		id: "events"
//	},
//	{
//		at: 300,
//		id: "map"
//	},
];
export const page      = {
	//position : "absolute",
	//top      : headerMiniHeight,
	//left     : "50%",
	//height   : "100%",
	//bottom   : 0,
	//overflowY: "auto",
	//overflowX: "hidden",
	transform: {
		//translateZ: "0px",
		//translateX: "-50%"
	}
};
export const header    = {
	position : "fixed",
	height   : headerMiniHeight,
	top      : 0,
	left     : "50%",
	//width    : "100%",
	zIndex   : 800,
	transform: [
		{
			perspective: "500px",
		},
		{
			//translateX: "-50%",
			//translateY: "-50%",
			//translateZ : "-50px",
			//rotateX   : "-10deg"
		}
	]
};
export const logo      = {
	position : "absolute",
	width    : "100%",
	minWidth : "250px",
	left     : "50%",
	height   : headerMiniHeight,
	bottom   : "0%",
	zIndex   : 200,
	transform: [
		{
			//perspective: "500px",
		},
		{
			translateX: "-50%",
			//translateY: "-50%",
			//translateZ : "-50px",
			//rotateX   : "-10deg"
		}
	]
};

export const Background        = {
	position : "absolute",
	//zIndex  : -1,
	left     : "50%",
	bottom   : "25px",
	width    : "100%",
	height   : "100%",
	//top     : 20,
	transform: [
		{
			//perspective: "500px",
		},
		{
			translateX: "-50%",
			//translateY: "-50%",
			//translateZ : "-50px",
			//rotateX   : "-10deg"
		}
	]
};
export const Highlighter       = {
	//position       : "absolute",
	right          : "0%",
	top            : ["-" + headerHeight, sliderHeight, 100],
	height         : [headerHeight],
	transformOrigin: "center top",
	zIndex         : 650,
	transform      : [
		{
			//perspective: "500px",
		},
		{
			//translateY: "0%",
			translateZ: "0px",
			//rotateX   : "-10deg"
		}
	]
};
export const MidMenu           = {
	position       : "absolute",
	left           : "10px",
	height         : "50px",
	width          : collRightWidth,
	zIndex         : 150,
	//overflow       : 'hidden',
	transformOrigin: "center top",
	top            : [250],
};
export const ArticleList       = {
	position       : "absolute",
	left           : "10px",
	height         : ["100vh", "-300px"],
	width          : collLeftWidth,
	zIndex         : 100,
	display        : 'none',
	transformOrigin: "center top",
	top            : [0],
};
export const Footer            = {
	position : "fixed",
	height   : footerMiniHeight,
	left     : "0px",
	top      : ["100%", -footerMiniHeight],
	width    : "100%",
	zIndex   : 800,
	transform: {
		//translateY: "-100%"
	}
};
export const EventsBlock       = {
	//position       : "relative",
	//right          : "0%",
	//bottom         : 0,
	//top            : "100%",
	//zIndex         : 1250,
	//overflow       : 'hidden',
	marginTop      : [-10],
	transformOrigin: "center top",
	transform      : [
		//{
		//perspective: "500px",
		//},
		{
			//translateY: "80%",
			translateZ: "0px",
			//rotateX   : "-10deg"
		}
	]
};
export const EventMap          = {
	position       : "absolute",
	right          : "-100000px",
	height         : [0],
	width          : collRightWidth,
	zIndex         : 100,
	//overflow       : 'hidden',
	transformOrigin: "center top",
	top            : [50],
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
export const SearchBarProps    = {
	startPos     : 50,
	openDuration : 50,
	closeDuration: 100,
	minBottom    : footerMiniHeight,
	maxBottom    : mapHeight,
	minHeight    : 40,
	
	boxStyle  : {
		position: "fixed",
		width   : ["100%"],
		left    : "0px",
		top     : ["100%", -40],
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
export const EventMap_Gradient = {
	opacity: 1
};
export const nativeScrollAxis  = [
	
	{
		target  : "Highlighter",
		from    : 0,
		duration: 40,
		apply   : {
			//height: ["-50vh", sliderHeight],
			//top   : ["-50vh", sliderHeight]
		}
	},
	{
		target  : "Highlighter",
		from    : 50,
		duration: 1,
		apply   : {
			//position: "fixed"
		}
	},
];
export const YAxis             = undefined;