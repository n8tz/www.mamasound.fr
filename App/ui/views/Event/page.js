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

import React  from "react";
import moment from "moment";
import ShareBox from "App/ui/components/ShareBox";

import {NavLink} from "react-router-dom";


export default (
	{
		record,
		refs,
		selected,
		place = record.place
		&& refs
		&& refs[record.place.objId],
		category = record.category
		&& refs[record.category.objId]
	}
) => {
	//debugger;
	return <div className={ "Event Event" + record._cls + ' ' + (selected ? "selected" : "") }>
		<div className="start">
			{ moment(record.startTM).format("H:mm") }
		</div>
		<div className="icon">
			{
				category
				&& <img src={ category.icon }/>
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
		<ShareBox event={record} place={place}/>
		{ !/^\s*$/.test(record.resume || '') &&
		<div className="resume" dangerouslySetInnerHTML={ { __html: record.resume } }/> || '' }
	</div>
}
;
