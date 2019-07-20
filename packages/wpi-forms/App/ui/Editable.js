/*
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
import React, {Component} from "react";
import {ContextMenu}      from "react-inheritable-contextmenu";
import {scopeToProps}     from "rscopes";


@scopeToProps("DataProvider", "CurrentUser")
export default class Editable extends Component {
	
	static defaultProps = {}
	
	doEdit = ( e ) => {
		let { $actions, id, DataProvider, CurrentUser } = this.props;
		if ( CurrentUser && CurrentUser.isAdmin )
			$actions.newWidget("RecordEditor", {
				record: {
					id,
					etty: DataProvider[id] && DataProvider[id]._cls
				}
			})
		else
			alert('Sorry, you must be logged to use editors');
	}
	
	render() {
		let { $actions, id, DataProvider, CurrentUser } = this.props;
		return (
			<ContextMenu>
				<div className={"record_edit_menu"}
				     onClick={this.doEdit}>
					Edit "{DataProvider[id] && DataProvider[id]._alias || id}"
				</div>
			</ContextMenu>
		);
	}
	
};
