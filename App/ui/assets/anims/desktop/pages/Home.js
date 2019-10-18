/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import {collWidth, footerMiniHeight, headerHeight, headerMiniHeight} from "../vars";

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
		//translateX: "-50%"
	}
};
export const header    = {
	position : "fixed",
	height   : headerMiniHeight,
	top      : 0,
	left     : "50%",
	//width    : "100%",
	zIndex   : 1200,
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
	height   : headerHeight,
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
	position       : "absolute",
	right          : "0%",
	top            : ["0%"],
	height         : [headerHeight],
	transformOrigin: "center top",
	zIndex         : 650,
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
export const MidMenu           = {
	position       : "absolute",
	left           : "10px",
	height         : "50px",
	width          : collWidth,
	zIndex         : 150,
	//overflow       : 'hidden',
	transformOrigin: "center top",
	top            : [250],
};
export const Footer            = {
	position : "fixed",
	height   : footerMiniHeight,
	left     : "0px",
	top      : ["100%", -footerMiniHeight],
	width    : "100%",
	zIndex   : 3000,
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
	marginTop      : [headerHeight, 50],
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
	left           : "10px",
	height         : ["100vh", "-300px", -310],
	width          : collWidth,
	zIndex         : 150,
	//overflow       : 'hidden',
	transformOrigin: "center top",
	top            : [300],
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
export const YAxis             = [
	// header page to main highlighter
	//{
	//	target  : "logo",
	//	from    : 0,
	//	duration: 50,
	//	apply   : {
	//		right: "-5%",
	//		width: "60%",
	//	}
	//},
	//{
	//	target  : "header",
	//	from    : 0,
	//	duration: 50,
	//	apply   : {
	//		height: ["-100%", headerMiniHeight + "px", sliderHeight],
	//	}
	//},
	//{
	//	target  : "Highlighter",
	//	from    : 0,
	//	duration: 50,
	//	apply   : {
	//		height: ["-50px", 2 * footerMiniHeight]
	//	}
	//},
	//{
	//	target  : "EventsBlock",
	//	from    : 0,
	//	duration: 50,
	//	apply   : {
	//		top: "-50px"
	//	}
	//},
	//{
	//	target  : "Highlighter",
	//	from    : 50,
	//	duration: 50,
	//	apply   : {
	//		height: ["-150px"]
	//	}
	//},
	//{
	//	target  : "EventsBlock",
	//	from    : 50,
	//	duration: 50,
	//	apply   : {
	//		top: [-eventsMiniHeight, 50]
	//	}
	//},
	////// highlighter to EventsBlock
	//{
	//	target  : "Highlighter",
	//	from    : 100,
	//	duration: 100,
	//	apply   : {
	//		height: ["-100%", 200, sliderHeight, 2 * footerMiniHeight],
	//	}
	//},
	//{
	//	target  : "EventsBlock",
	//	from    : 100,
	//	duration: 100,
	//	apply   : {
	//		bottom: ["20%", footerMiniHeight],
	//		top   : ["-100%", (eventsMiniHeight + headerMiniHeight) + "px", sliderHeight, footerMiniHeight, -20]
	//	}
	//},
	//{
	//	target  : "EventMap",
	//	from    : 100,
	//	duration: 100,
	//	apply   : {
	//		height: "20%",
	//		top   : "-20%"
	//	}
	//},
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