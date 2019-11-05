/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

'use strict';
import React, {Component} from "react";
import {ContextMenu}      from "react-inheritable-contextmenu";
import RS                 from "react-scopes";

@RS
@RS.connect("DataProvider", "CurrentUser")
export default class Editable extends Component {
	
	static defaultProps = {}
	
	doEdit = ( e ) => {
		let { $actions, id, $stores: { DataProvider }, etty = DataProvider.data[id] && DataProvider.data[id]._cls } = this.props;
		
		$actions.newWidget("RecordEditor", {
			id,
			etty
		})
	}
	
	render() {
		let { $actions, id, $stores: { DataProvider }, CurrentUser,etty } = this.props;
		
		return (
			CurrentUser && CurrentUser.isAdmin ?
			<ContextMenu>
				<div className={"record_edit_menu"}
				     onClick={this.doEdit}>
					Edit "{DataProvider.getRecord(id) && DataProvider.getRecord(id)._alias || id}"
				</div>
			</ContextMenu> :
			''
		);
	}
	
};
