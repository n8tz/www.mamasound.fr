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

import React  from "react";
import moment from "moment";

import {NavLink} from "react-router-dom";


let defaultPreview = {
	Concert: require("App/ui/assets/medias/mms.png"),
	Theatre: require("App/ui/assets/medias/mmt.png"),
	Expo   : require("App/ui/assets/medias/mme.png")
};
export default ( { record, refs, selected, onClick } ) =>
	<div className={ "Event Event" + record._cls + ' ' + (selected ? "selected" : "") } onClick={ onClick }>
		<div className="start">
			{ moment(record.startTM).format("H:mm") }
		</div>
		<div className="icon">
			{
				record.category && refs[record.category.objId] &&
				<img src={ refs[record.category.objId].icon }/>
				||
				<img src={ defaultPreview[record._cls] } style={ { transform: "scale(.8)" } }/>
			}
		</div>
		{/*{ record.previewImage &&*/ }
		{/*<div className="preview">*/ }
		{/*<img src={ record.previewImage }/>*/ }
		{/*</div>*/ }
		{/*}*/ }
		<div className="title">
			{ record.title }
		</div>
		
		<div className="price">
			{
				record.price
			}
		</div>
		{
			record.place && refs[record.place.objId] &&
			<div className="place">
				( <span>{ refs[record.place.objId].label }</span> )
			</div>
		}
		
		{ !/^\s*$/.test(record.resume || '') &&
		<div className="resume" dangerouslySetInnerHTML={ { __html: record.resume } }/> || '' }
	</div>
;
