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

'use strict';

import React from 'react';

import Time from 'react-time'

import Image from 'App/ui/components/Image';


export default class DefaultItem extends React.Component {
	
	render() {
		let record     = this.props.record,
		    background = record.previewUrl;
		
		return <div className={"DefaultItem"}>
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
				{record.label}
			</div>
			<div className="lastModifiedDate">
				<Time value={new Date(record.updated)} format="DD/MM/YYYY HH:mm"/>
			</div>
		</div>
	}
	
}
