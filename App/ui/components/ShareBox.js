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
 * Date: 08/12/2015
 * Time: 11:50
 */
'use strict';

import moment          from "moment";
import React           from "react";
import * as shareStuff from 'react-share';


let shareLinks = [
	"Facebook",
	//"Linkedin",
	"Twitter",
	//"Telegram",
	"Whatsapp",
	//"Pinterest",
	//"Tumblr",
];

export default (
	{
		event,
		place,
		shareBody = "Yo !\nViens voir " + event.title + " au " + (place && place.label) + ", le " + moment(event.startTM).format("ddd DD/MM à H:mm")
	}
) => {
	//debugger;
	return <div className={"ShareBox"} onClick={e => e.stopPropagation()}>
		{/*<AddToCalendar*/}
		{/*	buttonLabel={"Ajouter au calendrier"}*/}
		{/*	event={{*/}
		{/*		title      : event.title,*/}
		{/*		description: event.title,*/}
		{/*		location   : place && (place.label + ',' + (place.address && place.address.address || "Montpellier")) || "Vers Montpellier",*/}
		{/*		startTime  : moment(event.startTM),*/}
		{/*		endTime    : moment(event.startTM).add(1, 'hour')*/}
		{/*	}}/>*/}
		<a href={"sms:?body=" + encodeURI(shareBody)}>
			<img src={require('App/ui/assets/icons/sms.png')} className={"sIcon"}/>
		</a>
		<a href={"mailto://?body=" + encodeURI(shareBody)}
		   target={"_blank"}>
			<img src={require('App/ui/assets/icons/email.png')} className={"sIcon"}/>
		</a>
		{
			shareLinks.map(
				id => {
					let ShareLink = shareStuff[id + "ShareButton"],
					    ShareIcon = shareStuff[id + "Icon"];
					return <ShareLink url={"http://www.mamasound.fr"} key={id}>
						<ShareIcon
							size={32}
							round/>
					</ShareLink>
				}
			)
		}
	
	</div>
}
;
