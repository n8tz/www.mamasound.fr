/*
 *
 * Copyright (C) 2019 Nathanael Braun
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

import React    from "react";
import config   from "App/config";
// import BSImage from "App/ui/kit/Image";
import ReactDom from "react-dom";


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
	else if ( src && /^\//.test(src) )// starting with / is domain based
		src = "http://" + config.PUBLIC_URL + src;
	else if ( src && /^\!/.test(src) )// starting with ! is cached
		src = "http://" + config.STATIC_URL + "/?cache=" + encodeURIComponent(src.substr(1)) + '&' + p;
	
	return src;
}

export default class Image extends React.Component {
	
	render() {
		return <img {...{
			style    : this.props.style,
			className: this.props.className,
			src      : getSrc(this.props.src, this.props),
		}}/>;
	}
	
	
}
