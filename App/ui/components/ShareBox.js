/*
 * www.mamasound.fr
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
