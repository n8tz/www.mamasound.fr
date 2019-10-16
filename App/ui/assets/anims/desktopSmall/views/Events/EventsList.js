/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

//export const NavBox = {
//	height   : "120px",
//	left     : "0px",
//	top      : "0px",
//	width    : "100%",
//	position : "absolute",
//	transform: {
//		//translateY: "85%"
//	}
//};
import {collWidth} from "../../vars";

export const EventCatSliderAxis = {
	scrollY: [
		{
			from    : 100,
			duration: 100,
			apply   : {
				top: ["-100%", 64]
			}
		},
	]
};
export const EventCatSlider     = {
	       maxJump        : 1,
	       visibleItems   : 1,
	       style          : {
		       position: "absolute",
		       right   : "10px",
		       left    : [collWidth, 10],
		       top     : "100%",
		       bottom  : "40px",
		       //width   : "auto",
		       //overflow: "auto"
	       },
	       defaultInitial : {
		       position : "absolute",
		       overflow : "hidden",
		       //backgroundColor: "white",
		       top      : "0%",
		       left     : "0%",
		       width    : "100%",
		       height   : "100%",
		       zIndex   : 50,
		       opacity  : 0,
		       transform: [
			       {
				       translateX: "200px",
				       //translateY: "-50%"
			       }]
	       },
	       defaultEntering: [
		       {
			       from    : 0,
			       duration: 100,
			       //easeFn  : "easeSinIn",
			       apply   : {
				       opacity  : 1,
				       transform: {
					       translateX: "-200px",
				       },
				       zIndex   : 150,
			       }
		       },
	       ],
	       defaultLeaving : [
		       {
			       from    : 0,
			       duration: 100,
			       //easeFn  : "easeSinOut",
			       apply   : {
				       opacity  : -1,
				       transform: {
					       translateX: "-200px",
				       },
				       zIndex   : -150,
			       }
		       }]
       }
;