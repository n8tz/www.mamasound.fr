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
import Badge                              from '@material-ui/core/Badge';
import React                              from "react";
import {asStore, scopeToProps, withScope} from "react-scopes";
import {ContextMenu}                      from "../../App";
import {Comps}                            from "../index";

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
export default class NavBox extends React.Component {
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
			<div className={"NavBox"}>
				
				<div className={"eventTypeNav"}>
					<Badge badgeContent={4} color="primary">
						<img src={require("App/ui/assets/images/jip/btn-event-on.png")}
						     onClick={e => $actions.setCurStyleTab(0)}
						     className={"typeIcon"}/>
					</Badge>
					<Badge badgeContent={4} color="primary">
						<img src={require("App/ui/assets/images/jip/concert-gif.gif")}
						     onClick={e => $actions.setCurStyleTab(1)}
						     className={"typeIcon"}/>
					</Badge>
					<Badge badgeContent={4} color="primary">
						<img src={require("App/ui/assets/images/jip/expo-gif.gif")} className={"typeIcon"}
						     onClick={e => $actions.setCurStyleTab(2)}
						/>
					</Badge>
					<Badge badgeContent={4} color="primary">
						<img src={require("App/ui/assets/images/jip/theatre-gif.gif")} className={"typeIcon"}
						     onClick={e => $actions.setCurStyleTab(3)}
						/>
					</Badge>
				</div>
				{/*<div className={"cDay"}>*/}
				{/*	Cette semaine :*/}
				{/*	{*/}
				{/*		//(moment(day).format("dddd DD MMMM YYYY"))*/}
				{/*	}*/}
				{/*</div>*/}
				<Comps.SearchBar/>
			</div>
		);
	}
};