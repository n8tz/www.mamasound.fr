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

let stepAngle = "1.8deg";

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
			translateY : "-20000px",
			rotate     : "-" + stepAngle
		},
		{
			translateY: "20000px",
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
export const defaultEntering = [
	{
		type    : "Tween",
		from    : 0,
		duration: 100,
		//easeFn  : "easePolyIn",
		apply   : {
			transform: {
				//translateX: "-1.25box",
				rotate: stepAngle,
			},
			zIndex   : 150,
		}
	},
	{
		type    : "Tween",
		from    : 0,
		duration: 35,
		apply   : {
			opacity: 1,
		}
	}, {
		type    : "Tween",
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
		type    : "Tween",
		from    : 0,
		duration: 45,
		apply   : {
			transform: [{}, {
				rotateY   : "65deg",
				translateZ: "-500px",
				//rotateX: "90deg",
			}]
		}
	},
	{
		type    : "Tween",
		from    : 65,
		duration: 35,
		apply   : {
			opacity: -1,
		}
	}, {
		type    : "Tween",
		from    : 0,
		duration: 100,
		//easeFn  : "easePolyOut",
		apply   : {
			zIndex: -150,
			
			transform: {
				//translateX: "-1.25box",
				rotate: stepAngle,
			}
		}
	}]
;