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
export const LeftBox = {
	height    : "50px",
	left      : "0px",
	bottom    : "0px",
	width     : "100%",
	background: "green",
	position  : "absolute",
	overflow  : 'hidden',
	transform : {
		//translateY: "1box"
	}
};
export const YAxis   = [
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
			height: 350,
		}
	},
	//{
	//	type    : "Tween",
	//	target  : "page",
	//	from    : 0,
	//	duration: 100,
	//	apply   : {
	//		top: -1,
	//	}
	//},
	{
		type    : "Tween",
		target  : "highlighted",
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
			height: 60,
		}
	},
	//show map
	{
		type    : "Tween",
		target  : "map",
		from    : 65,
		duration: 35,
		apply   : {
			height: 30,
		}
	},
	{
		type    : "Tween",
		target  : "events",
		from    : 65,
		duration: 35,
		apply   : {
			height: -30,
		}
	},
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