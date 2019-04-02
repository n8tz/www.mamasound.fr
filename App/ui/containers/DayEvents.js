/*
 * The MIT License (MIT)
 * Copyright (c) 2019. Wise Wild Web
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  @author : Nathanael Braun
 *  @contact : n8tz.js@gmail.com
 */
import PropTypes                             from "prop-types";
import React                                 from "react";
import {Rnd}                                 from "react-rnd";
import {reScope, scopeToProps, propsToScope} from "rscopes";
import {withStateMap, asRef, asStore}        from "rescope-spells";
import anims                                 from 'App/ui/anims/(*).js';
import Blocks                                from 'App/ui/containers/(*).js';

import Tabs                  from '@material-ui/core/Tabs';
import Tab                   from '@material-ui/core/Tab';
import moment                from "moment";
import stores                from 'App/stores/(*).js';
import Comps                 from 'App/ui/components/(*).js';
import {asTweener, TweenRef} from "react-rtween";
import scopes                from 'App/scopes/(*).js';


@reScope(
	scopes.EventList
)
@propsToScope(
	[
		"day:DayEventsQuery.curDay",
		"viewType:DayEventsQuery.viewType"
	])
@scopeToProps("EventList", "appState")
export default class DayEvents extends React.Component {
	static propTypes = {
		day     : PropTypes.number,
		viewType: PropTypes.number,
		filter  : PropTypes.string
	};
	state            = {};
	
	render() {
		let {
			    record: { position, size } = {},
			    EventList, appState, day,
			    $actions, onSelect
		    }     = this.props,
		    state = this.state,
		    selected;
		return (
			<div
				className={ "DayEvents" }
				data-dt={ moment(day).valueOf() }
			>
				<div className={ "day" }>
					<Comps.SimpleDay day={ day }/>
				</div>
				{
					EventList && EventList.items && EventList.items.map(
						( item, i ) => {
							return <Comps.Event_item
								onClick={ e => $actions.selectEvent(item, moment(day).valueOf(), true) }
								key={ item._id }
								day={ day }
								selected={ appState.selectedEventId === item._id && moment(appState.selectedEventDT).isSame(day, "day") }
								record={ item }
								refs={ EventList.refs || {} }/>;
						}
					)
				}
			</div>
		);
	}
};