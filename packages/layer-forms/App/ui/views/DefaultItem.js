/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

'use strict';

import entities from 'App/db/entities';

import Image from 'App/ui/components/Image';
import React from 'react';
import Time  from 'react-time'


export default class DefaultItem extends React.Component {
	
	render() {
		let { record, onClick } = this.props,
		    background          = record.previewUrl;
		
		return <div className={"DefaultItem"} onClick={onClick}>
			{
				background &&
				<Image src={background} w={250} h={250}
				       className="preview"/> || ''
			}
			<div className="toolbar">
				{this.props.children}
			</div>
			<div className="type">
				{record._cls}
			</div>
			<div className="title">
				{record[entities[record._cls].labelField || 'label']}
			</div>
			<div className="lastModifiedDate">
				<Time value={new Date(record.updated)} format="DD/MM/YYYY HH:mm"/>
			</div>
		</div>
	}
	
}
