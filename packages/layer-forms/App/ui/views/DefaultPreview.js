/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

'use strict';

import Image    from 'App/ui/components/Image';
import Editable from "App/ui/Editable";
import React    from 'react';


export default class DefaultPreview extends React.Component {
	
	render() {
		let record     = this.props.record,
		    background = record.previewUrl;
		
		return <div className={"DefaultPreview"}>
			<Editable id={record._id} etty={record._cls}/>
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
