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
import CloseIcon                             from '@material-ui/icons/Close';
import moment                                from 'moment';
import IconButton                            from '@material-ui/core/IconButton';
import {withStateMap, asRef, asStore}        from "rescope-spells";
import anims                                 from 'App/ui/anims/(*).js';
import Blocks                                from 'App/ui/containers/(*).js';

import stores                from 'App/stores/(*).js';
import Comps                 from 'App/ui/components/(*).js';
import {asTweener, TweenRef} from "react-rtween";


@reScope(
	{
		@asStore
		EventsByDay: {
			@asRef
			events: "EventList",
			$apply( data, { events: { items, refs } } ) {
			
			}
		}
	}
)
@scopeToProps("EventList")
//@asTweener({ initialScrollPos: {}, propagateAxes: { scrollY: true } })
export default class EventList extends React.Component {
	static propTypes = {};
	state            = {};
	
	render() {
		let {
			    record: { position, size } = {},
			    EventList, children, disabled,
			    $actions, onSelect, selected
		    }     = this.props,
		    state = this.state;
		return (
			<div
				className={ "EventList container" }
			>
				
				<div className={ "dayList" } onClick={ e => e.preventDefault() } id={ "scrollableEvents" }>
					{
						EventList && EventList.items && EventList.items.map(
							( item, i ) =>
								<TweenRef key={ item._id + i }
								          initial={ {
									          height         : "2.5em",
									          fontSize       : "20px",
									          width          : "100%",
									          backgroundColor: i % 2 ? "lightgrey" : "white",
									          overflow       : "hidden"
								          } }
								          scrollableAnims={ {
									          //scrollY: anims.expandEvent(0, 50),
								          } }
								>
									<div>
										<Comps.Event record={ item } refs={ EventList.refs || {} }/>
									</div>
								</TweenRef>
						)
					}
				</div>
				<div className={ "LeftBox" }
				     style={ {
					     position  : "absolute",
					     background: "yellow",
					     top       : "10px",
					     left      : "10px",
					     width     : "290px",
					     height    : "250px"
					     //width : "100%",
					     //height: "100%",
				     } }>
					<Blocks.SearchBox/>
				</div>
				<TweenRef
					id={ "searchBar" }
					initial={ {
						position  : "absolute",
						background: "pink",
						overflow  : "hidden",
						bottom    : "0px",
						left      : "0px",
						width     : "100%",
						height    : "50px"
					} }
				>
					<div
						style={ {
							//width : "100%",
							//height: "100%",
						} }>
						<Blocks.SearchBar/>
					</div>
				</TweenRef>
			</div>
		);
	}
};