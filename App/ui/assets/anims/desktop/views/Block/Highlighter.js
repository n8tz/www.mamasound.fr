/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import {headerMiniHeight, sliderHeight} from "../../vars";

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
export const backgroundScroll = {
	scrollY: [
		{
			from    : 0,
			duration: 50,
			apply   : {
				//opacity: 1,
			}
		},
		{
			from    : 100,
			duration: 100,
			apply   : {
				//opacity: -1,
			}
		},
	],
}
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
export const sliderScroll     = [
	{
		from    : 0,
		duration: 50,
		apply   : {
			transform: {
				//translateY : '50px'
			}
		}
	},
	{
		from    : 50,
		duration: 50,
		apply   : {
			transform: {
				//translateY: '-50px',
				//translateZ: "20px",
			}
		}
	},
];
export const slide            = {
	top      : "0%",
	height   : "100%",
	transform: {
		perspective: "200px",
		//translateZ: "-20px",
		//rotateX    : "2deg"
	}
};
export const slideScroll      = {
	scrollY: [
		{
			type    : "Tween",
			from    : 50,
			duration: 50,
			apply   : {
				transform: {}
			}
		},
		{
			type    : "Tween",
			from    : 100,
			duration: 100,
			apply   : {
				transform: {
					//translateY: "-8px",
					//translateZ: "20px",
					rotateX: "-2deg"
				}
			}
		},
	],
}
export const focused          = {
	position : "absolute",
	bottom   : 0,
	//paddingBottom: [sliderHeight, 10],
	//paddingTop   : headerMiniHeight,
	left     : "50%",
	top      : headerMiniHeight,
	//width    : '100vw',
	opacity  : 0,
	transform: [{
		translateX: "-50%",
	}, {}, { translateY: '0%' }]
};
export const focusedScroll    = {
	scrollY: [
		{
			from    : 0,
			duration: 50,
			apply   : {
				opacity: 1,
			}
		},
		{
			from    : 100,
			duration: 100,
			apply   : {
				opacity  : "-1",
				//height   : 2.5,
				//top      : -2.5,
				transform: [{
					rotateX: "4deg"
				}, {
					translateY: "-50vh",
				}]
			}
		},
	],
}