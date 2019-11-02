/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

'use strict';

import React    from "react";
import ShareBox from "../../components/ShareBox";
import {Comps}  from "../../index";
import Editable from "App/ui/Editable";


export default ( { record, record: { label, resume, text, previewImage }, onClose, refs, className, style, onClick, ref } ) => {
	const url = "/" + record._cls + "/" + (record._alias || record._id);
	return (
		<div className={"Article_card " + (className || '')} style={{ ...(style || {}) }} ref={ref} onClick={onClick}>
			{/*{JSON.stringify(record)}*/}
			<Editable id={record._id}/>
			<a href={url} className="title" onClick={e => {
				e.preventDefault()
			}}>
				{label}
			</a>
			<div className="preview">
				{/*<Comps.Image src={previewImage} className={"leftGhost"}/>*/}
				{/*<Comps.Image src={previewImage} className={"rightGhost"}/>*/}
				<Comps.Image src={previewImage}/>
			</div>
			{/*<ShareBox event={record} place={place}/>*/}
			{!/^\s*$/.test(record.resume || '') &&
			<div className="resume" dangerouslySetInnerHTML={{ __html: record.resume }}/> || ''}
		</div>
	);
}
	