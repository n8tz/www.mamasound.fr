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
export const page        = {
	position: "absolute",
	top     : "0cm",
	left    : "50%",
	bottom  : "0px",
	
	transform: {
		translateX: "-50%"
	}
	//width : "100%",
	//paddingTop: "150px"
};
export const PageBlock   = {
	width    : "100%",
	//background: "green",
	overflow : 'hidden',
	transform: {
		y: "100%"
	},
	height   : "0%"
};
export const Highlighter = {
	//background: "green",
	position : "absolute",
	width    : "100%",
	height   : "85%",
	top      : "0%",
	left     : "0%",
	//overflow : 'hidden',
	transform: {
		//translateY: "1box"
	}
};
export const LeftBox     = {
	height    : "15%",
	left      : "0px",
	top       : "0px",
	width     : "300px",
	background: "green",
	position  : "absolute",
	overflow  : 'hidden',
	transform : {
		translateY: ".85box"
	}
};
export const events      = {
	right    : "0%",
	left     : "300px",
	top      : "0%",
	//background: "green",
	overflow : 'hidden',
	position : "absolute",
	height   : "15%",
	transform: {
		translateY: ".85box"
	}
};
export const map         = {
	//background: "green",
	position : "absolute",
	right    : "0%",
	left     : "0px",
	height   : "0%",
	top      : "0%",
	overflow : 'hidden',
	transform: {
		translateY: "1box"
	}
};
export const YAxis       = [
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
		target  : "LeftBox",
		from    : 0,
		duration: 100,
		apply   : {
			height   : 30,
			transform: {
				translateY: "-.6box"
			},
		}
	},
	{
		type    : "Tween",
		target  : "Highlighter",
		from    : 0,
		duration: 100,
		apply   : {
			height: -60,
		}
	},
	{
		type    : "Tween",
		target  : "events",
		from    : 0,
		duration: 100,
		apply   : {
			height   : 30,
			transform: {
				translateY: "-.6box"
			},
		}
	},
	//show map
	{
		type    : "Tween",
		target  : "map",
		from    : 0,
		duration: 100,
		apply   : {
			height   : 30,
			transform: {
				translateY: -.30
			}
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
	//show page
	{
		type    : "Tween",
		target  : "map",
		from    : 100,
		duration: 50,
		apply   : {
			//height: -10,
			//marginLeft: "30%",
			//width     : "-30%",
		}
	},
	{
		type    : "Tween",
		target  : "events",
		from    : 100,
		duration: 50,
		apply   : {
			height: -30,
		}
	},
	{
		type    : "Tween",
		target  : "PageBlock",
		from    : 100,
		duration: 50,
		apply   : {
			height: 40,
		}
	}
];