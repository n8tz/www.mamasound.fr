/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import {headerMiniHeight, sliderHeight} from "../../../vars";

export const transitionDuration    = 1500;
export const defaultInitial        = {
	position       : "absolute",
	bottom         : "0%",
	right          : "5px",
	top            : "0%",
	left           : "0px",
	//marginLeft     : "300px",
	zIndex         : 50,
	//backgroundColor       : "red",
	transformOrigin: "50% 50%",
	opacity        : 1,
	transform      : [
		{
			//translateX : "-50%",
			//translateY : "-50%",
			perspective: "250px",
		},
		{
			//translateX: "-200px",
			//translateY : "-18000px",
			//rotate: 0
		},
		{
			//translateY: "18000px",
			//translateZ: "0px",
			//rotateY   : "-65deg",
		},
		{}]
};
export const defaultPreviewInitial = {
	position       : "absolute",
	height         : ["100vh"],
	width          : "100vw",
	top            : "0%",
	left           : "50%",
	zIndex         : 40,
	overflow       : "hidden",
	transformOrigin: "50% 50%",
	//display        : "none",
	opacity        : 1,
	transform      : [
		{
			translateX : "-50%",
			//translateY : "-50%",
			perspective: "700px",
		},
		{
			translateY: -headerMiniHeight,
		},
		{},
		{}]
};
export const showAnim              = [
	{
		from    : 0,
		duration: 1,
		apply   : {
			transform: [{}, {
				//rotateY: "270deg",
			}]
		}
	},
	{
		from    : 25,
		duration: 75,
		easeFn  : "easeSinOut",
		apply   : {
			opacity  : 1,
			transform: [{}, {
				//translateZ: "50px",
				translateX: "-250px",
			}]
		}
	},
	{
		from    : 50,
		duration: 1,
		apply   : {}
	}
];
export const showPreviewAnim       = [
	{
		from    : 0,
		duration: 100,
		//easeFn  : "easeBackOut",
		apply   : {
			opacity: 1,
			//transform: [{}, {
			//	translateX: "150px",
			//}]
		}
	},
];
export const hideAnim              = [
	{
		from    : 0,
		duration: 50, easeFn: "easeSinOut",
		
		apply: {
			opacity  : -1,
			transform: [{}, {
				//rotateY: "90deg",
				//translateZ: "-50px",
				//translateY: "-200px",
				translateX: "-250px",
			}]
		}
	},
	{
		from    : 50,
		duration: 1,
		apply   : {}
	},
	{
		from    : 50,
		duration: 50,
		apply   : {
			//opacity: 1,
		}
	}]
;
export const hidePreviewAnim       = [
	       {
		       from    : 0,
		       duration: 100,
		       apply   : {
			       opacity: -1,
			       //transform: [{}, {
			       //    //rotateY: "90deg",
			       //    translateZ: "-50px",
			       //    //translateY: "-200px",
			       //    //translateX: "-250px",
			       //}]
		       }
	       },
	       {
		       from    : 50,
		       duration: 1,
		       apply   : {}
	       },
	       {
		       from    : 50,
		       duration: 50,
		       apply   : {
			       //opacity: 1,
		       }
	       }
       ]
;