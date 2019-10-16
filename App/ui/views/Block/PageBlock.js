/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import PropTypes                             from "prop-types";
import React                                 from "react";
import {withScope, scopeToProps, propsToScope} from "react-scopes";
import anims                                 from 'App/ui/assets/anims/(*).js';

import stores                from 'App/stores/(*).js';
import {Comps, Views}        from 'App/ui';
import {asTweener, TweenRef} from "react-voodoo";


//@withScope(
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
@scopeToProps("Selected", "Styles.views.Block.PageBlock:Styles", "DataProvider")
export default class PageBlock extends React.Component {
	static propTypes = {};
	state            = {};
	
	render() {
		let {
			    record: { position, size } = {},
			    Selected, children, DataProvider,
			    $actions, style, Styles
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
						initial={Styles.selected}
						tweenLines={Styles.selectedScroll}
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