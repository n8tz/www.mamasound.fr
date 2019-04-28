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

import React           from "react";
import moment          from "moment";
import AddToCalendar   from 'react-add-to-calendar';
import * as shareStuff from 'react-share';
import {NavLink}       from "react-router-dom";


let shareLinks = [
	"Facebook",
	"Linkedin",
	"Twitter",
	"Telegram",
	"Whatsapp",
	"Pinterest",
	"Tumblr",
];

export default (
	{
		event,
		place,
		shareBody = "Yo !\nViens voir " + event.title + " au " + (place && place.label) + ", le " + moment(event.startTM).format("ddd DD/MM à H:mm")
	}
) => {
	//debugger;
	return <div className={ "ShareBox" }>
		<AddToCalendar event={ {
			title      : event.title,
			description: event.title,
			location   : place.label + ',' + (place.address && place.address.address || "Montpellier"),
			startTime  : moment(event.startTM),
			endTime    : moment(event.startTM).add(1, 'hour')
		} }/>
		<a href={ "sms:?body=" + encodeURI(shareBody) }>
			Share via SMS
		</a>
		<br/>
		<a href={ "mailto://?body=" + encodeURI(shareBody) }
		   target={ "_blank" }>
			Share via mail
		</a>
		{
			shareLinks.map(
				id => {
					let ShareLink = shareStuff[id + "ShareButton"],
					    ShareIcon = shareStuff[id + "Icon"];
					return <ShareLink url={ "http://www.mamasound.fr" } key={ id }>
						<ShareIcon
							size={ 32 }
							round/>
					</ShareLink>
				}
			)
		}
	
	</div>
}
;
