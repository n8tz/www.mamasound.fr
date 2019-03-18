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

import {Scope, Store} from "rscopes";
import db, {mount}    from "App/db";


import config         from 'App/config';
import {types, query} from 'App/db';

function getSrc( src, dims ) {
	var p = '';
	if ( !src || typeof src != "string" )
		return;
	if ( dims && (dims.w || dims.h) ) {
		p = (dims.h ? "h=" + dims.h + "&" : "") + (dims.w ? "w=" + dims.w + "" : "")
	}
	src = src && src.replace('http://' + config.STATIC_URL + '/', '');
	src = src && src.replace('https://' + config.STATIC_URL + '/', '');
	if ( src && /^[^\/\s\!]+(?=\/[^\/\s\!]|$)/.test(src) )// static
		src = "http://" + config.STATIC_URL + "/" + src + '?' + p;
	else if ( src && /^\//.test(src) )// static
		src = "http://" + config.PUBLIC_URL + src;
	else if ( src && /^\!/.test(src) )// static
		src = "http://" + config.STATIC_URL + "/?cache=" + encodeURIComponent(src.substr(1)) + '&' + p;
	
	return src;
}

export default class ImgFieldsLoader extends Store {
	
	
	static state = { items: [], imgKeys: [] };
	//data         = {
	//	results: {},
	//
	//};
	
	
	apply( d = {}, state, { items, refs } ) {
		//debugger
		items = items && items.map(
			item => state.imgKeys.reduce(( item, key ) => ({ ...item, [key]: getSrc(item[key]) }), item)
		) || state.items;
		
		
		items&&items.forEach(
			event => {
				let style = event.category && refs[event.category.objId];
				if ( style )
					refs[event.category.objId] = state.imgKeys.reduce(( item, key ) => ({
						...item,
						[key]: getSrc(item[key])
					}), refs[event.category.objId])
			}
		)
		
		return { items, refs };
	}
	
}