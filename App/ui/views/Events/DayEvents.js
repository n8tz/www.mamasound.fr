/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import scopes from 'App/scopes/(*).js';

import {Views}                                 from 'App/ui';
import moment                                  from "moment";
import PropTypes                               from "prop-types";
import React                                   from "react";
import {propsToScope, scopeToProps, withScope} from "react-scopes";


@withScope(
	scopes.EventList
)
@propsToScope(
	[
		"day:DayEventsQuery.curDay",
		//"filter:EventList.filter",
		"viewType:DayEventsQuery.viewType"
	])
@scopeToProps("EventList", "ActiveTags", "appState", "Styles")
//@asTweener({ initialScrollPos: { scrollX: 100 }, propagateAxes: { scrollY: true } })
export default class DayEvents extends React.Component {
	static propTypes    = {
		day     : PropTypes.number,
		viewType: PropTypes.number,
		filter  : PropTypes.string
	};
	static defaultProps = {
		//ViewItem:
	};
	state               = {};
	
	render() {
		let {
			    EventList, appState, day, Styles, ViewItem = Views.Event.item,
			    $actions, viewType
		    }     = this.props,
		    state = this.state,
		    selected;
		return (
			<div
				className={"DayEvents"}
				data-dt={moment(day).valueOf()}
			>
				{
					EventList && EventList.items && EventList.items.length
					&& <div className={"day"}>
						<Views.SimpleDay day={day}/>
					</div> || ''
				}
				{/*{appState.selectedEventId}*/}
				{
					EventList && EventList.items && EventList.items.map(
						( item, i ) => {
							return <ViewItem
								onClick={e => $actions.selectEvent(item, moment(day).valueOf(), true)}
								key={item._id}
								day={day}
								appState={appState}
								$actions={$actions}
								selected={(appState.selectedEventId === item._id || appState.selectedEventId === item._alias) && moment(appState.selectedEventDT).isSame(day, "day")}
								record={item}
								refs={EventList.refs || {}}/>;
						}
					) || ''
				}
				{/*</Comps.SlidableList>*/}
			</div>
		);
	}
};