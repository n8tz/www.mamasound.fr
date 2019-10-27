/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

'use strict';

import React from "react";


export default ( { record, record: { title, place, category }, onClose, refs, className, style, onClick, ref } ) => {
	//debugger
	return (
		<div className={"Event_overlay " + (className || '')} style={{ ...(style || {}) }} ref={ref} onClick={onClick}>
			{/*<div className="closeBtn" onClick={ onClose }/>*/}
			{place && <div className="topBlock">
				<div className="name">
					{refs[place.objId].label}
				</div>
				<div className="preview">
					<img className="logo"
					     src={"http://static.mamasound.fr/" + (place && refs[place.objId] && refs[place.objId].previewImage || record.previewImage || category && refs[category.objId] && refs[category.objId].icon)}/>
				</div>
				<div className="address">
					{place && refs[place.objId] && refs[place.objId].address.address},<br/>
				</div>
			</div>}
			<div className="botBlock">
				<div className="title">
					{record.title}
				</div>
				<div className="details">
					description
				</div>
			</div>
		</div>
	);
}
	