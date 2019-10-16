/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

'use strict';

import React from "react";


export default ( { record, record: { title, place, category }, onClose, refs, className, style, onClick, ref } ) =>
{
	return (
		<div className={"Popin " + (className || '')} style={{ ...(style || {}) }} ref={ref} onClick={onClick}>
			{/*<div className="closeBtn" onClick={ onClose }/>*/}
			<div className="topBlock">
				<img className="logo"
				     src={"http://static.mamasound.fr/" + (refs[place.objId].previewImage || record.previewImage || category && refs[category.objId] && refs[category.objId].icon)}/>
				<div className="name">
					{refs[place.objId].label}
				</div>
				<div className="address">
					{refs[record.place.objId] && refs[place.objId].address.address},<br/>
				</div>
			</div>
		</div>
	);
}
	