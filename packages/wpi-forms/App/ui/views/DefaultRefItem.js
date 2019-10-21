/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

'use strict';

import entities from 'App/db/entities';
import stores   from 'App/stores/(*).js';

import Image                              from 'App/ui/components/Image';
import React                              from 'react';
import RS, {asRef, asScope, withStateMap} from "react-scopes";
import Time                               from 'react-time'


@RS(
	{
		@asScope
		item: {
			@RS.store
			ref   : {
				$apply( data, { ref } ) {
					return {
						ref: ref && {
							id  : ref.objId,
							etty: ref.cls
						}
					}
				}
			},
			@withStateMap(
				{
					@asRef
					data: "ref.ref",
				}
			)
			record: stores.MongoRecords,
		},
	}
)
@RS.fromProps("recordRef:item.ref.ref")
@RS.connect("item.record.data:refRecord")
export default class DefaultRefItem extends React.Component {
	
	render() {
		let { refRecord = {}, record = refRecord || {}, onClick } = this.props,
		    background                                            = record.previewUrl;
		
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
				{entities[record._cls] && record[entities[record._cls].labelField || 'label']}
			</div>
			<div className="lastModifiedDate">
				<Time value={new Date(record.updated)} format="DD/MM/YYYY HH:mm"/>
			</div>
		</div>
	}
	
}
