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
import {collRightWidth, collLeftWidth, footerMiniHeight, headerMiniHeight, sliderHeight} from "../../vars";

export const EventCatSliderAxis = {
	//scrollY: [
	//	{
	//		from    : 100,
	//		duration: 100,
	//		apply   : {
	//			//top: ["-100%", 64]
	//		}
	//	},
	//]
};
export const EventCatSlider     = {
	       maxJump        : 1,
	       visibleItems   : 1,
	       style          : {
		       position : "relative",
		       width    : ["100%", "-" + collRightWidth, -30, "-" + collLeftWidth],
		       minHeight: ["100vh", -1 * headerMiniHeight, -footerMiniHeight, -sliderHeight, -65],
		       left     : [10, collLeftWidth],
		       //marginTop: "50px",
		       //bottom  : "40px",
		       //width   : "auto",
		       //overflow: "auto"
	       },
	       defaultInitial : {
		       position : "absolute",
		       //overflow : "hidden",
		       //backgroundColor: "white",
		       top      : "0%",
		       left     : "0%",
		       //marginRight     : "-100%",
		       //marginBottom     : "-100%",
		       width    : "100%",
		       //height   : "100%",
		       zIndex   : 50,
		       opacity  : 0,
		       transform: [
			       {
				       translateX: "200px",
				       translateZ: "0"
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