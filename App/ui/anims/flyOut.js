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

var easingFn = require('d3-ease');
var keys     = {
	top  : '_y',
	bot  : '_y',
	right: '_x',
	left : '_x'
}, dirs      = {
	top  : -1,
	bot  : 1,
	right: -1,
	left : 1
};
export default function ( tmStart, duration, dir ) {
	dir = dir || 'right';
	
	
	return [
		{
			type    : "Tween",
			from    : tmStart + 0,
			duration: .4 * duration,
			easeFn  : easingFn.easeSinOut,
			apply   : {
				_z     : .06,
				rotateY: -25,
				rotateX: 25
			}
		},
		{
			type    : "Tween",
			from    : tmStart + .1 * duration,
			duration: .9 * duration,
			easeFn  : easingFn.easeSinOut,
			apply   : {
				[keys[dir]]: dirs[dir]
			}
		},
		{
			type    : "Tween",
			from    : tmStart + .1 * duration,
			duration: .9 * duration,
			easeFn  : easingFn.easeSinIn,
			apply   : {
				y: -300
			}
		},
		{
			type    : "Tween",
			from    : tmStart + .4 * duration,
			duration: .6 * duration,
			easeFn  : easingFn.easeSinIn,
			apply   : {
				_z     : .12,
				rotateY: -20,
				rotateX: 20,
				// rotate : -50
			}
		},
		{
			type    : "Tween",
			from    : tmStart + .4 * duration,
			duration: .5 * duration,
			apply   : {
				opacity: -1
			}
		}
	]
};
