/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
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