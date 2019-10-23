/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

'use strict';

import stores                             from 'App/stores/(*).js';
import {Views}                            from 'App/ui';
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
	render() {
		let { record, DataProvider, selected, className = "", $scope } = this.props;
		if ( !record )
			return <span/>;
		return <span className={"Menu_menu " + className + ' ' + (selected ? "selected" : "")}>
			<Editable id={record._id}/>
			{
				record.childs && record.childs.length ?
				record.childs.map(
					( child ) =>
						<Views.Menu.menu
							//$scope={$scope.parent}
							id={child.objId}
							key={child.objId + '_' + "MenuItem"}
							className={"MenuItem"}/>
				) : <span className="label">{record.label}</span>
			}
		</span>
			;
	}
}
