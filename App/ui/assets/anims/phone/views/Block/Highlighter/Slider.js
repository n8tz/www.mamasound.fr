/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

let stepAngle = "1.05deg";
//export const visibleItems    = 3;

export const defaultInitial  = {
	position : "absolute",
	height   : "100%",
	top      : "50%",
	left     : "50%",
	zIndex   : 50,
	opacity  : 0,
	transform: [
		{
			perspective: "1250px",
			translateY : "30000px",
			rotate     : stepAngle
		},
		{
			translateY: "-30010px",
			translateZ: "-500px",
			//translateX: "1.75box",
			//translateY: "-.5box",
			//rotateY   : "-3deg",
			rotateY   : "-65deg",
		},
		{
			translateX: "-50%",
			translateY: "-50%"
		}]
};
export const scrollAxis      = [
	{
		from    : 0,
		duration: 100,
		//easeFn  : "easeSinIn",
		apply   : {
			transform: {
				rotate: stepAngle,
			},
			zIndex   : 150,
		}
	},
];
export const defaultEntering = [
	{
		from    : 0,
		duration: 100,
		easeFn  : "easeSinIn",
		apply   : {
			transform: {
				rotate: "-" + stepAngle,
			},
			zIndex   : 150,
		}
	},
	{
		from    : 0,
		duration: 35,
		apply   : {
			opacity: 1,
		}
	}, {
		from    : 55,
		duration: 45,
		apply   : {
			transform: [{}, {
				rotateY   : "65deg",
				translateZ: "500px",
				//rotateX: "-90deg",
			}],
		}
	},
];
export const defaultLeaving  = [
	{
		from    : 0,
		duration: 45,
		apply   : {
			transform: [{}, {
				rotateY   : "65deg",
				translateZ: "-500px",
			}]
		}
	},
	{
		from    : 65,
		duration: 35,
		apply   : {
			opacity: -1,
		}
	}, {
		from    : 0,
		duration: 100,
		//easeFn  : "easeSinOut",
		easeFn  : "easeSinOut",
		apply   : {
			zIndex: -150,
			
			transform: {
				rotate: "-" + stepAngle,
			}
		}
	}]
;