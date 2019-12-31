/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

'use strict';

import React    from "react";
import config   from "App/config";
// import BSImage from "App/ui/kit/Image";
import getMediaSrc from "App/utils/getMediaSrc";


export default class Image extends React.Component {
	
	render() {
		return <img {...{
			style    : this.props.style,
			className: this.props.className,
			src      : getMediaSrc(this.props.src, this.props),
		}}/>;
	}
	
	
}
