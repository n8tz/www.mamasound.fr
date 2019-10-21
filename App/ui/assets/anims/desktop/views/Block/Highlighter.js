/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import {headerHeight, headerMiniHeight, sliderHeight} from "../../vars";

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
export const slider           = {
	position : "absolute",
	bottom   : "20px",
	left     : "0px",
	width    : "100%",
	height   : [sliderHeight, -10],
	zIndex   : "250",
	transform: {
		perspective: "200px",
	}
};
export const slide            = {
	top      : "0%",
	height   : "100%",
	transform: {
		perspective: "200px",
		//translateZ: "-20px",
		//rotateX    : "2deg"
	}
};
export const focused          = {
	position : "absolute",
	bottom   : 0,
	//paddingBottom: [sliderHeight, 10],
	//paddingTop   : headerMiniHeight,
	left     : "50%",
	height   : [headerHeight, -50, "-" + headerMiniHeight],
	//width    : '100vw',
	opacity  : 1,
	transform: [{
		translateX: "-50%",
	}, {}, { translateY: '0%' }]
};