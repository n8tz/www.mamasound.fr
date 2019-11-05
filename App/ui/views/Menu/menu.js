/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

'use strict';

import stores                             from 'App/stores/(*).js';
import {Comps, Views}                     from 'App/ui';
import Editable                           from "App/ui/Editable";
import React                              from "react";
import RS, {asRef, asScope, withStateMap} from "react-scopes";

@RS(
	{
		@asScope
		dataRecord: {
			@RS.store
			ref   : { etty: 'Menu' },
			@withStateMap(
				{
					@asRef
					data: "ref",
				}
			)
			record: stores.MongoRecords,
		},
	}
)
@RS.fromProps("id:dataRecord.ref.id")
@RS.connect("DataProvider", "dataRecord.record.data:record")
export default class Menu extends React.Component {
	doClick = ( e ) => {
		let { record, $actions } = this.props;
		$actions.history_push(record.path);
		e.preventDefault();
		e.stopPropagation();
	};
	
	render() {
		let { record, DataProvider, selected, className = "", $scope } = this.props;
		if ( !record )
			return <span/>;
		return <span className={"Menu_menu " + className + ' ' + (selected ? "selected" : "")}>
			<Editable id={record._id} etty={"Menu"}/>
			{
				record.childs && record.childs.length ?
				record.childs.map(
					( child ) =>
						<Views.Menu.menu
							//$scope={$scope.parent}
							id={child.objId}
							key={child.objId + '_' + "MenuItem"}
							className={"MenuItem"}/>
				) : <a href={record.path}
				       target={record.outLink ? "_blank" : undefined}
				       onClick={!record.outLink && this.doClick}
				       className="label">
					{!record.hideTitle ? record.label : ""}
					{record.previewImage ? <Comps.Image src={record.previewImage}/> : ""}
				</a>
			}
		</span>
			;
	}
}
