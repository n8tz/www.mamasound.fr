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

import {Comps}  from 'App/ui';
import Editable from "App/ui/Editable";
import moment   from "moment";
import React    from "react";


let defaultPreview = {
	Concert: require("App/ui/assets/images/mms.png"),
	Theatre: require("App/ui/assets/images/mmt.png"),
	Expo   : require("App/ui/assets/images/mme.png")
};
export default ( { record, refs, selected, onClick, onTap } ) =>
	<div className={"Event Event_headerItem Event" + record._cls + ' ' + (selected ? "selected" : "")}
	     onClick={onClick}
	>
		<Editable id={record._id} etty={record._cls}/>
		<div className="start">
			{moment(record.startTM).format("H:mm")}
		</div>
		<div className="icon">
			{
				record.category && refs[record.category.objId] &&
				<Comps.Image src={refs[record.category.objId].icon}/>
				||
				<Comps.Image src={defaultPreview[record._cls]} style={{ transform: "scale(.8)" }}/>
			}
		</div>
		{/*{ record.previewImage &&*/}
		{/*<div className="preview">*/}
		{/*<img src={ record.previewImage }/>*/}
		{/*</div>*/}
		{/*}*/}
		<div className="title">
			{record.title}
		</div>
		
		<div className="price">
			{
				record.price
			}
		</div>
		{
			record.place && refs[record.place.objId] &&
			<div className="place">
				( <span>{refs[record.place.objId].label}</span> )
			</div>
		}
		
		{!/^\s*$/.test(record.resume || '') &&
		<div className="resume" dangerouslySetInnerHTML={{ __html: record.resume }}/> || ''}
	</div>
;
