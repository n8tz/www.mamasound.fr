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
import {reScope, scopeToProps, propsToScope} from "rscopes";
import {withStateMap, asRef, asStore}        from "rescope-spells";
import anims                                 from 'App/ui/anims/(*).js';

import stores                from 'App/stores/(*).js';
import {Comps, Views}        from 'App/ui';
import {asTweener, TweenRef} from "react-rtween";


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