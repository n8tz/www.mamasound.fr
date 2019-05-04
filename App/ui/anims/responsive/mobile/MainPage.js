/*
 * The MIT License (MIT)
 * Copyright (c) 2019. Wise Wild Web
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  @author : Nathanael Braun
 *  @contact : n8tz.js@gmail.com
 */
export const page              = {
	position: "absolute",
	top     : "0cm",
	left    : "50%",
	bottom  : "0px",
	
	transform: {
		translateX: "-50%"
	}
};
export const Highlighter       = {
	position : "absolute",
	width    : "100%",
	height   : ".8box",
	top      : "0%",
	transform: {
		//translateY: "1box"
	}
};
export const PageBlock         = {
	width    : "100%",
	overflow : 'hidden',
	transform: {
		y: "100%"
	},
	height   : "0%"
};
export const NavBox            = {
	height    : "100%",
	left      : "0px",
	top       : "0px",
	width     : "0px",
	background: "green",
	position  : "absolute",
	transform : {
		//translateY: ".85box"
	}
};
export const Footer            = {
	height    : "50px",
	left      : "0px",
	top       : "-0px",
	width     : "100%",
	background: "green",
	position  : "absolute",
	overflow  : 'hidden',
	transform : {
		translateY: "1box"
	}
};
export const EventNav          = {
	position: "absolute",
	right   : "0%",
	left    : "0px",
	top     : "0%",
	height  : "100%",
};
export const events            = {
	right    : "0%",
	//left     : "0px",
	top      : "0%",
	position : "absolute",
	height   : ".15box",
	transform: {
		translateX: "-50%",
		translateY: ".8box"
	}
};
export const EventMap          = {
	position       : "absolute",
	right          : "0%",
	height         : ".05box",
	top            : "0%",
	overflow       : 'hidden',
	transformOrigin: "center top",
	transform      : [
		{
			perspective: "500px",
		},
		{
			translateY: ".95box",
			//translateZ : "-50px",
			//rotateX   : "-10deg"
		}
	]
};
export const EventMap_Gradient = {
	opacity: 1
};
export const YAxis             = [
	{
		type    : "Tween",
		target  : "header",
		from    : 0,
		duration: 100,
		apply   : {
			height: -1,
		}
	},
	{
		type    : "Tween",
		target  : "Highlighter",
		from    : 0,
		duration: 100,
		apply   : {
			height: -.6,
		}
	},
	{
		type    : "Tween",
		target  : "events",
		from    : 0,
		duration: 100,
		apply   : {
			height   : .45,
			transform: {
				translateY: "-.6box"
			},
		}
	},
	//{
	//	type    : "Tween",
	//	target  : "Footer",
	//	from    : 0,
	//	duration: 100,
	//	apply   : {
	//		top: -50,
	//	}
	//},
	//show map
	{
		type    : "Tween",
		target  : "EventMap",
		from    : 0,
		duration: 100,
		apply   : {
			height   : .30,
			transform: [{}, {
				translateY: -.20
			}]
		}
	},
	//{
	//	type    : "Tween",
	//	target  : "events",
	//	from    : 65,
	//	duration: 35,
	//	apply   : {
	//		height: -30,
	//	}
	//},
	//full map
	
	{
		type    : "Tween",
		target  : "EventMap",
		from    : 100,
		duration: 50,
		apply   : {
			transform: [{}, {
				//rotateX   : 10,
				translateY: -.10
			}],
			//height   : 10,
			//marginLeft: "30%",
			//width     : "-30%",
		}
	},
	//{
	//	type    : "Tween",
	//	target  : "NavBox",
	//	from    : 100,
	//	duration: 50,
	//	apply   : {
	//		height: -10,
	//	}
	//},
	//{
	//	type    : "Tween",
	//	target  : "EventMap_Gradient",
	//	from    : 100,
	//	duration: 50,
	//	apply   : {
	//		opacity: -1,
	//	}
	//},
	{
		type    : "Tween",
		target  : "events",
		from    : 100,
		duration: 50,
		apply   : {
			height: -.10,
		}
	},
	//full map
	
	{
		type    : "Tween",
		target  : "EventMap",
		from    : 150,
		duration: 50,
		apply   : {
			transform: [{}, {
				translateY: -.15,
				//translateZ: "150px"
			}],
			height   : .15,
			//marginLeft: "30%",
			//width     : "-30%",
		}
	},
	//{
	//	type    : "Tween",
	//	target  : "Footer",
	//	from    : 150,
	//	duration: 50,
	//	apply   : {
	//		top   : -100,
	//		height: 100,
	//	}
	//},
	//{
	//	type    : "Tween",
	//	target  : "NavBox",
	//	from    : 150,
	//	duration: 50,
	//	apply   : {
	//		height: -15,
	//	}
	//},
	{
		type    : "Tween",
		target  : "events",
		from    : 150,
		duration: 50,
		apply   : {
			height: -.15,
		}
	},
	//{
	//	type    : "Tween",
	//	target  : "PageBlock",
	//	from    : 100,
	//	duration: 50,
	//	apply   : {
	//		height: 40,
	//	}
	//}
];