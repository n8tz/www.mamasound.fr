/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import {tweenTools} from "react-voodoo";

export const visibleItems = 5;
let area                  = ".8bw",
    itemWidth             = tweenTools.cssMult(area, 1 / (visibleItems)),
    step                  = tweenTools.cssMult(itemWidth, 1),
    zMax                  = tweenTools.cssMult(area, 1.75),
    angle                 = "20deg";


export const enteringSteps = 3;
export const leavingSteps  = 3;
export const infinite      = true;

export const scrollDir = "scrollX";

export const defaultInitial  = {
	position       : "absolute",
	overflow       : "hidden",
	transformOrigin: "50% 50%",
	height         : "100%",
	width          : itemWidth,
	left           : tweenTools.cssAdd(area, ".1bw", tweenTools.cssMult(itemWidth, -1)),
	top            : "0%",
	zIndex         : 500,
	transform      : [
		{
			perspective: zMax,
			translateZ : "-" + zMax
		},
		{
			rotateY: angle,
		},
		{
			translateZ: zMax,
		}]
};
export const scrollAxis      = [
	{
		from    : 0,
		duration: 100,
		apply   : {
			left: "-" + area,
		}
	},
];
export const defaultEntering = [
	{
		from    : 100 - (100 / enteringSteps),
		duration: 100 / enteringSteps,
		apply   : {
			zIndex: 500,
			left  : step,
		}
	},
	{
		from    : 0,
		duration: 100,
		apply   : {
			zIndex: 500,
			
			transform: [
				{},
				{
					rotateY: "-" + angle,
				},
				{}]
		}
	},
];
export const defaultLeaving  = [
	       {
		       from    : 0,
		       duration: 100,
		       apply   : {
			       zIndex   : -500,
			       transform: [
				       {},
				       {
					       rotateY: "-" + angle,
				       }]
		       }
	       }
       ]
;