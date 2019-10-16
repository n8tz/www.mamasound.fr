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

import {NavLink} from "react-router-dom";


export default ( { record, refs, selected } ) =>
	<div className={ "Event Event" + record._cls + ' ' + (selected ? "selected" : "") }>
		<div className="start">
			{ moment(record.startTM).format("H:mm") }
		</div>
		<div className="icon">
			{ record.category && refs[record.category.objId] &&
			<img src={ refs[record.category.objId].icon }/>
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
		{ !/^\s*$/.test(record.resume || '') &&
		<div className="resume" dangerouslySetInnerHTML={ { __html: record.resume } }/> || '' }
	</div>
;
