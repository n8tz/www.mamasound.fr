/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
export const initialPage   = {
	width    : "100%",
	transform: {
		translateY: "250px"
	},
};
export const initialFooter = {
	position : "fixed",
	left     : "0%",
	right    : "0%",
	bottom   : "0px",
	height   : "50px",
	transform: {
		translateY: "50px"
	},
};

export function pushIn( target ) {
	return {
		anims: [
			{
				type    : "Tween",
				target  : target,
				from    : 0,
				duration: 500,
				easeFn  : "easeCircleIn",
				apply   : {
					transform: {
						translateZ: "-.2box"
					},
					filter   : {
						sepia: 100
					}
				}
			},
			{
				type    : "Tween",
				target  : target,
				from    : 500,
				duration: 500,
				easeFn  : "easeCircleIn",
				apply   : {
					transform: {
						translateZ: ".2box"
					},
					filter   : {
						sepia: -100
					}
				}
			},
			{
				type    : "Tween",
				target  : target,
				from    : 250,
				duration: 500,
				easeFn  : "easeCircle",
				apply   : {
					transform: {
						rotateY: 180,
					},
				}
			}
		]
	};
};
export const scrollY = [
	{
		target  : "body",
		from    : 0,
		duration: 50,
		apply   : {
			transform: {
				translateY: "-130px"
			}
		}
	},
	{
		target  : "header",
		from    : 0,
		duration: 50,
		apply   : {
			height: "-130px",
		}
	},
	{
		target  : "headerBackground",
		from    : 0,
		duration: 50,
		apply   : {
			transform: { scale: 1.1 }
		}
	},
	{
		target  : "logo",
		from    : 0,
		duration: 50,
		apply   : {
			left      : "-50%",
			height    : "-50px",
			marginLeft: "110px",
		}
	},
	
	{
		target  : "body",
		from    : 50,
		duration: 50,
		apply   : {
			transform: {
				translateY: "-170px"
			}
		}
	},
	{
		target  : "footer",
		from    : 50,
		duration: 50,
		//easeFn  : "easePolyOut",
		apply   : {
			transform: {
				translateY: "-50px"
			}
		}
	},
	{
		target  : "header",
		from    : 50,
		duration: 50,
		apply   : {
			height: -50,
		}
	},
	{
		target  : "logo",
		from    : 50,
		duration: 50,
		apply   : {
			bottom: -50
		}
	},
];