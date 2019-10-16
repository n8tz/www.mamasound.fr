/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

/**
 * @author Nathanael BRAUN
 *
 * Date: 12/06/2017
 * Time: 10:32
 */
import rescope, {Store} from "react-scopes";
import jsonQuery        from "json-query";
import is               from "is";
import config           from "../config";

const isBrowserSide = (new Function("try {return this===window;}catch(e){ return false;}"))();

function getSrc( src, dims ) {
	let p = '';
	if ( !src || typeof src != "string" )
		return;
	if ( dims && (dims.w || dims.h) ) {
		p = (dims.h ? "h=" + dims.h + "&" : "") + (dims.w ? "w=" + dims.w + "" : "")
	}
	src = src && src.replace('http://' + config.STATIC_URL + '/', '');
	src = src && src.replace('https://' + config.STATIC_URL + '/', '');
	//src = src && src.replace(/^([^\?]*)(?:\?.*)$/, "$1");
	if ( src && /^[^\/\s\!\?]+$/.test(src) )// not / & ? is local resource
		src = "http://" + config.STATIC_URL + "/" + src + '?' + p;
	//else if ( src && /^\//.test(src) )// starting with / is domain based
	//	src = "http://" + config.PUBLIC_URL + src;
	else if ( src && /^\!/.test(src) )// starting with ! is cached
		src = "http://" + config.STATIC_URL + "/?cache=" + encodeURIComponent(src.substr(1)) + '&' + p;
	
	return src;
}

/**
 * Assets preloader (avoid reload gif to force gif replay)
 */
export default class assetsLoader extends Store {
	static state = {
		query: "/items/mediaUrl",
		data : {}
	};
	
	shouldSerialize() {
		return false;
	}
	
	parseQuery( query, data ) {
		let res = jsonQuery(
			query,
			{
				data,
				
				locals: {
					byId: function ( input, key, idKey = '_id' ) {
						if ( is.array(input) ) {
							return input.reduce(
								( map, item ) => (map[item[idKey]] = item[key], map),
								{}
							)
						}
						return input;
					}
				}
			});
		return res.value;
	}
	
	apply( lastData = {}, nextState, { query, data, remaining = nextState.remaining } ) {
		if ( isBrowserSide && (query || data) ) {
			let _urls  = this.parseQuery(nextState.query, nextState.data),
			    urls   = is.array(_urls) ? _urls.reduce(
				    ( map, item ) => (map[item._id] = item, map),
				    {}
			    ) : _urls,
			    URL    = window.URL || window.webkitURL,
			    urlMap = Object.fromEntries(Object.keys(urls).map(url => ([url, "about:blank"]))),
			    dld    = ( [id, url], i ) => {
				    let req = new XMLHttpRequest();
				    req.open('GET', getSrc(url), true);
				    req.responseType = 'blob';
				    this.wait();
				    req.onload  = () => {
					    let dataBlob = req.response;
					    if ( req.status === 200 ) {
						    urlMap[id] = URL.createObjectURL(dataBlob);
					    }
					    else if ( req.status === 404 ) {
						    urlMap[id] = "about:error";
					    }
					    this.push({ ...urlMap })
					    this.release();
				    };
				    req.onerror = () => {
					    urlMap[id] = "about:error";
					    this.release();
				    };
				
				    req.send();
			    };
			
			Object.entries(urls).forEach(dld);
			return urlMap;
		}
		else if ( !isBrowserSide ) {
			let _urls  = this.parseQuery(nextState.query, nextState.data),
			    urls   = is.array(_urls) ? _urls.reduce(
				    ( map, item ) => (map[item._id] = item, map),
				    {}
			    ) : _urls,
			    urlMap = {};
			
			
			Object.entries(urls).forEach(( [id, url], i ) => {
				urlMap[id] = url;
			});
			return urlMap;
		}
		return lastData;
	}
}