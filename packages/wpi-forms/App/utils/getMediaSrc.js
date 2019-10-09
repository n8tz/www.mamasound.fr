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

import config from "App/config";

export default function ( src, dims ) {
	let p = '';
	if ( !src || typeof src != "string" )
		return;
	if ( dims && (dims.w || dims.h) ) {
		p = (dims.h ? "h=" + dims.h + "&" : "") + (dims.w ? "w=" + dims.w + "" : "")
	}
	src = src && src.replace('http://' + config.MEDIA_URL + '/', '');
	src = src && src.replace('https://' + config.MEDIA_URL + '/', '');
	//src = src && src.replace(/^([^\?]*)(?:\?.*)$/, "$1");
	if ( /^https?\:/.test(src) )
		return src;
	if ( src && /^[^\/\s\!\?]/.test(src) )// not / & ? is local resource
		src = "http://" + config.MEDIA_URL + "/" + src + (p ? '?' + p : '');
	else if ( src && /^\//.test(src) )// starting with / is domain based
		src = "http://" + config.MEDIA_URL + src;
	else if ( src && /^\!/.test(src) )// starting with ! is cached
		src = "http://" + config.MEDIA_URL + "/?cache=" + encodeURIComponent(src.substr(1)) + '&' + p;
	
	return src;
}