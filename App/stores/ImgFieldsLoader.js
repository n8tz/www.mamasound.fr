/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import {Scope, Store} from "react-scopes";
import db, {mount}    from "App/db";


import config           from 'App/config';
import {types, query}   from 'App/db';

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
	
	static state      = { items: [], imgKeys: [] };
	//data         = {
	//	results: {},
	//
	//};
	//
	shouldSerialize(){
		return false;
	}
	apply( d = {}, state, { items, refs } ) {
		//debugger
		items = items && items.map(
			item => state.imgKeys.reduce(( item, key ) => ({ ...item, [key]: getSrc(item[key]) }), item)
		) || state.items;
		
		
		items && items.forEach(
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