/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import {tweenTools} from "react-voodoo";

export const pushIn    = [
	{
		from    : 0,
		duration: 500,
		easeFn  : "easeCircleIn",
		apply   : {
			transform: [{}, {
				translateZ: "-.2box"
			}],
			filter   : {
				sepia: 100
			}
		}
	},
	{
		from    : 500,
		duration: 500,
		easeFn  : "easeCircleIn",
		apply   : {
			transform: [{}, {
				translateZ: ".2box"
			}],
			filter   : {
				sepia: -100
			}
		}
	},
	{
		from    : 250,
		duration: 500,
		apply   : {
			transform: [{}, {
				rotateY: "180deg",
			}],
		}
	}
];
let goDown             = ( rotateDir = "rotateY", angle = 5, deepness = 30 ) => [
	{
		from    : 0,
		duration: 50,
		apply   : {
			boxShadow: {
				[rotateDir === "rotateY" ? "offsetX" : "offsetY"]: 20,
				
			},
			
			transform: {
				translateZ: -deepness
			},
		}
	},
	{
		from    : 0,
		duration: 25,
		apply   : {
			transform: {
				[rotateDir]: angle,
			},
		}
	},
	{
		from    : 25,
		duration: 25,
		apply   : {
			transform: {
				[rotateDir]: -angle,
			},
		}
	},
	{
		from    : 50,
		duration: 50,
		apply   : {
			boxShadow: {
				[rotateDir === "rotateY" ? "offsetX" : "offsetY"]: 20,
			},
			transform: {
				translateZ: deepness
			},
		}
	},
	{
		from    : 50,
		duration: 25,
		apply   : {
			transform: {
				[rotateDir]: -angle,
			},
		}
	},
	{
		from    : 75,
		duration: 25,
		apply   : {
			transform: {
				[rotateDir]: angle,
			},
		}
	}];
export const tweenAxis = {
	scrollX: [
		{
			from    : 0,
			duration: 200,
			apply   : {
				transform: {
					translateX: "-.8box"
				},
			}
		},
		
		...tweenTools.scale(goDown("rotateY", -3), 200, 0),
		//...tweenTools.scale(goDown("rotateY", -4), 50, 0),
		//...tweenTools.scale(goDown("rotateY", -4), 50, 50),
		//...tweenTools.scale(goDown("rotateY", -4), 50, 100),
		//...tweenTools.scale(goDown("rotateY", -4), 50, 150),
	],
	scrollY: [
		{
			from    : 0,
			duration: 200,
			apply   : {
				transform: {
					translateY: "-.8box"
				},
			}
		},
		...tweenTools.scale(goDown("rotateX", 3), 200, 0),
		//...tweenTools.scale(goDown("rotateX", 4), 50, 0),
		//...tweenTools.scale(goDown("rotateX", 4), 50, 50),
		//...tweenTools.scale(goDown("rotateX", 4), 50, 100),
		//...tweenTools.scale(goDown("rotateX", 4), 50, 150),
	]
};