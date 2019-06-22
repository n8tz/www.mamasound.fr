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


import Image from 'App/ui/components/Image';


export default class DefaultPreview extends React.Component {
	
	render() {
		let record     = this.props.record,
		    background = record.previewUrl;
		
		return <div className={"DefaultPreview"}>
			{
				background &&
				<Image src={background} w={250} h={250}
				       className="preview"/> || ''
			}
			<div className="type" style={{ opacity: background ? .5 : .9 }}>
				{record._cls}
			</div>
			<pre style={{ opacity: background ? .5 : .9 }}>
                    {JSON.stringify(record, null, 2)}
            </pre>
			<div className="title">
				{record.label}
			</div>
		</div>
	}
	
}
