/*
 *
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
import React                              from "react";
import {asStore, scopeToProps, withScope} from "react-scopes";
import {TweenRef}                         from "react-voodoo";

@withScope(
	{
		@asStore
		SearchValues: {
			tags  : [],
			search: undefined,
			updateSearch( str ) {
			
			},
			addTag( str ) {
			
			},
			rmTag( str ) {
			
			}
			
		},
		
	}
)
@scopeToProps("appState")
export default class MiniSearch extends React.Component {
	static propTypes = {};
	state            = {};
	
	render() {
		let {
			    record  : { position, size } = {},
			    appState: { curDay: day, viewType },
			    $actions
		    }     = this.props,
		    state = this.state;
		return (
			<TweenRef.div className={"MiniSearch"}
			              initial={
				              {
				              	//border:
				              }
			              }
			>
				<div className={"title"}>Test</div>
				<div className={"results"}>
					jhbkjhkjh
				</div>
			</TweenRef.div>
		);
	}
};