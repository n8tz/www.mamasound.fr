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
import RS     from "react-scopes";

@RS
@RS.connect("DataProvider", "CurrentUser")
export default class Editable extends Component {
	
	static defaultProps = {}
	
	doEdit = ( e ) => {
		let { $actions, id, DataProvider, CurrentUser } = this.props;
		
			$actions.newWidget("RecordEditor", {
				record: {
					id,
					etty: DataProvider[id] && DataProvider[id]._cls
				}
			})
	}
	
	render() {
		let { $actions, id, DataProvider, CurrentUser } = this.props;
		
		return (
			CurrentUser && CurrentUser.isAdmin ?
			<ContextMenu>
				<div className={"record_edit_menu"}
				     onClick={this.doEdit}>
					Edit "{DataProvider[id] && DataProvider[id]._alias || id}"
				</div>
			</ContextMenu> :
			''
		);
	}
	
};
