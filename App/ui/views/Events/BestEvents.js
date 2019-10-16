/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import PropTypes                             from "prop-types";
import React                                 from "react";
import {Rnd}                                 from "react-rnd";
import {withScope, scopeToProps, propsToScope} from "react-scopes";
import anims                                 from 'App/ui/assets/anims/(*).js';

import {Comps} from 'App/ui';

import Tabs                  from '@material-ui/core/Tabs';
import Tab                   from '@material-ui/core/Tab';
import moment                from "moment";
import stores                from 'App/stores/(*).js';
import {Views}               from 'App/ui';
import {asTweener, TweenRef} from "react-voodoo";
import scopes                from 'App/scopes/(*).js';


@withScope(
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
							return <div className={"day"} key={day}>
								<div className={"date"}>{moment(parseInt(day)).format("dddd DD MMMM")}</div>
								{
									items.map(
										( item, i ) => {
											return <Views.Event.headerItem
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