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

import scopes                                from 'App/scopes/(*).js';
import {Comps, Views}                        from 'App/ui';
import React                                 from 'react';
import {propsToScope, reScope, scopeToProps} from "rscopes";


@reScope(
	scopes.EventList
)
@propsToScope(
	[
		"day:DayEventsQuery.curDay",
		"viewType:DayEventsQuery.viewType"
	])
@scopeToProps("EventList", "ActiveTags", "appState", "Anims")
export default class Admin extends React.Component {
	state = {};
	
	render() {
		let {
			    EventList, appState, day, Anims,
			    $actions, onSelect
		    }     = this.props,
		    state = this.state,
		    selected;
		return (
			<div
				className={"Admin"}
			>
				<Comps.Slider
					{...Anims.EventDaySlider}
					className={"EventNav "}
				>
					
					<div style={{background:'red'}}>
						1
					</div>
					<div>2</div>
					{/*{*/}
					{/*	Array(1)*/}
					{/*		.fill(0)*/}
					{/*		.map(*/}
					{/*			( v, type ) =>*/}
					{/*				<div className={"dayList"} key={type}>*/}
					{/*					<Comps.Slider*/}
					{/*						{...EventDaySlider}*/}
					{/*						className={"EventDay"}*/}
					{/*					>*/}
					{/*						{*/}
					{/*							Array(appState.dayCountByViewType[type])*/}
					{/*								.fill(0)*/}
					{/*								.map(*/}
					{/*									( v, i ) =>*/}
					{/*										<Views.Events.DayEvents*/}
					{/*											className={"dayBlock"}*/}
					{/*											key={i}*/}
					{/*											day={moment(appState.curDay).add(i, 'day').unix() * 1000}*/}
					{/*											viewType={type}/>*/}
					{/*								)*/}
					{/*						}*/}
					{/*					</Comps.Slider>*/}
					{/*					/!*<div id={"endList_" + type}>loading...</div>*!/*/}
					{/*				</div>*/}
					{/*		)*/}
					{/*}*/}
				</Comps.Slider>
			</div>
		);
	}
}


