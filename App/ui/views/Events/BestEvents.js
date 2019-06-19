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
import PropTypes                             from "prop-types";
import React                                 from "react";
import {Rnd}                                 from "react-rnd";
import {reScope, scopeToProps, propsToScope} from "rscopes";
import {withStateMap, asRef, asStore}        from "rescope-spells";
import anims                                 from 'App/ui/anims/(*).js';

import {Comps} from 'App/ui';

import Tabs                  from '@material-ui/core/Tabs';
import Tab                   from '@material-ui/core/Tab';
import moment                from "moment";
import stores                from 'App/stores/(*).js';
import {Views}               from 'App/ui';
import {asTweener, TweenRef} from "react-rtween";
import scopes                from 'App/scopes/(*).js';


@reScope(
	scopes.BestEvents
)
@propsToScope(
	[])
@scopeToProps("BestEvents.byDay", "appState")
//@asTweener({ initialScrollPos: { scrollX: 100 }, propagateAxes: { scrollY: true } })
export default class BestEvents extends React.Component {
	static propTypes = {
		day     : PropTypes.number,
		viewType: PropTypes.number,
		filter  : PropTypes.string
	};
	state            = {};
	
	render() {
		let {
			    byDay, appState, day,
			    $actions, onSelect
		    }     = this.props,
		    state = this.state,
		    selected;
		return (
			<div
				className={"BestEvents container"}
			>
				<h1 className={"title"}>A ne pas manquer !</h1>
				
				{/*{events && events.length}*/}
				{/*<div className={"day"}>*/}
				{/*	<Views.SimpleDay day={day}/>*/}
				{/*</div>*/}
				{
					byDay && byDay.items.map(
						( [day, items], i ) => {
							return <div className={"day"}>
								<div className={"date"}>{moment(parseInt(day)).format("dddd DD MMMM")}</div>
								{
									items.map(
										( item, i ) => {
											return <Views.Event.item
												//onClick={e => $actions.selectEvent(item, moment(day).valueOf(), true)}
												key={item._id}
												day={day}
												//selected={appState.selectedEventId === item._id &&
												// moment(appState.selectedEventDT).isSame(day, "day")}
												record={item}
												refs={byDay.refs || {}}/>;
										}
									)
								}
							</div>;
						}
					)
				}
			</div>
		);
	}
};