/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import {tweenTools} from "react-voodoo";

export const visibleItems = 4;
let area                  = "60vh",
    itemHeight            = tweenTools.cssAdd(tweenTools.cssMult(area, 1 / (visibleItems))),
    step                  = tweenTools.cssMult(itemHeight, 1),
    zMax                  = tweenTools.cssMult(area, 2.05),
    angle                 = "27.5deg";


export const enteringSteps = 4;
export const leavingSteps  = 4;
export const infinite      = true;

export const scrollDir = "scrollY";

export const defaultInitial  = {
	position       : "absolute",
	overflow       : "hidden",
	transformOrigin: "50% 50%",
	width          : "100%",
	height         : itemHeight,
	top            : tweenTools.cssAdd(area, tweenTools.cssMult(step, -1), "10vh"),
	left           : "0%",
	zIndex         : 500,
	transform      : [
		{
			perspective: zMax,
			translateZ : "-" + zMax
		},
		{
			rotateX: "-" + angle,
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
			top: "-" + area,
		}
	},
];
export const defaultEntering = [
	{
		from    : 100 - (100 / enteringSteps),
		duration: 100 / enteringSteps,
		apply   : {
			zIndex: 500,
			top   : step,
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
					rotateX: angle,
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
					       rotateX: angle,
				       }]
		       }
	       }
       ]
;