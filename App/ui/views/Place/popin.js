/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

'use strict';

import React          from "react";
import {Comps, Views} from 'App/ui';


export default ( { record, record: { label, previewImage, address }, event, onClose, refs, className, style, onClick, ref } ) => {
	return (
		<div className={"Popin " + (className || '')} style={{ ...(style || {}) }} ref={ref} onClick={onClick}>
			{/*<div className="closeBtn" onClick={ onClose }/>*/}
			<div className="topBlock">
				<Comps.Image className="logo"
				             src={(previewImage || record.previewImage || event && event.category && refs[event.category.objId] && refs[event.category.objId].icon)}/>
				<div className="name">
					{label}
				</div>
				<div className="address">
					{address.address},<br/>
				</div>
			</div>
		</div>
	);
}
	