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
import PropTypes                             from "prop-types";
import React                                 from "react";
import {reScope, scopeToProps, propsToScope} from "rscopes";
import {withStateMap, asRef, asStore}        from "rescope-spells";
import anims                                 from 'App/ui/assets/anims/(*).js';

import stores                from 'App/stores/(*).js';
import {Comps, Views}        from 'App/ui';
import {asTweener, TweenRef} from "react-voodoo";


//@reScope(
//	{
//		//@asStore
//		//EventsByDay: {
//		//	@asRef
//		//	events: "EventList",
//		//	$apply( data, { events: { items, refs } } ) {
//		//
//		//	}
//		//}
//	}
//)
@scopeToProps("Selected", "Anims", "DataProvider")
export default class PageBlock extends React.Component {
	static propTypes = {};
	state            = {};
	
	render() {
		let {
			    record: { position, size } = {},
			    Selected, children, DataProvider,
			    $actions, style, Anims
		    }     = this.props,
		    state = this.state;
		return (
			<div style={style}
			     className={"PageBlock container"}
				//onClick={ e => $actions.selectEvent(null) }
			>
				<div className={"maskContent"}>
					
					{children}
					<TweenRef
						initial={Anims.Page.selected}
						tweenLines={Anims.Page.selectedScroll}
					>
						<div className={"selectedPage container"}>
							{
								Selected &&
								Selected.Page &&
								(
									Selected.Page._cls === "Concert" &&
									Selected.Page.place &&
									DataProvider[Selected.Page.place.objId] &&
									<Views.Place.page record={DataProvider[Selected.Page.place.objId]}
									                  refs={DataProvider}/>
									||
									<Views.Page.page record={Selected && Selected.Page} refs={DataProvider}/>
								)
							}
						</div>
					</TweenRef>
				</div>
			</div>
		);
	}
};