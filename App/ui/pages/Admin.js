/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import scopes                                from 'App/scopes/(*).js';
import {Comps, Views}                        from 'App/ui';
import React                                 from 'react';
import {propsToScope, withScope, scopeToProps} from "react-scopes";


@withScope(
	scopes.EventList
)
@propsToScope(
	[
		"day:DayEventsQuery.curDay",
		"viewType:DayEventsQuery.viewType"
	])
@scopeToProps("EventList", "ActiveTags", "appState", "Styles")
export default class Admin extends React.Component {
	state = {};
	
	render() {
		let {
			    EventList, appState, day, Styles,
			    $actions, onSelect
		    }     = this.props,
		    state = this.state,
		    selected;
		return (
			<div
				className={"Admin"}
			>
				<Comps.Slider
					{...Styles.EventDaySlider}
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


