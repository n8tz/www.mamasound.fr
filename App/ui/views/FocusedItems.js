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

/**
 * @author Nathanael BRAUN
 *
 * Date: 08/12/2015
 * Time: 11:50
 */
'use strict';

import React    from "react";
import Editable from "App/ui/Editable";

import {NavLink}          from "react-router-dom";
import moment, {TweenRef} from "./DayBlock";

export default class FocusedItems extends React.Component {
	render() {
		let {
			    record, style, className, onClick
		    } = this.props;
		return (
			<div className="FocusedItems" style={ style } onClick={onClick}>
				<Editable id={ record._id }/>
				
				{ record.previewImage &&
				<div className="preview">
					<img src={ record.previewImage + "w=420" } draggable="false"/>
				</div>
				}
				<div className="title">
					{ record.label }
				</div>
				{ !/^\s*$/.test(record.resume || '') &&
				<div className="resume" dangerouslySetInnerHTML={ { __html: record.resume } }/> || '' }
			</div>
		);
	}
};
