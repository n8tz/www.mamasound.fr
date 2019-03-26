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

import React                                 from 'react';
import {reScope, scopeToProps, propsToScope} from "rscopes";
import Blocks                                from 'App/ui/containers/(*).js';
import ReactDom                              from "react-dom";

import {withStateMap, asRef, asStore} from "rescope-spells";
import {asTweener, TweenRef}          from "react-rtween";

var easingFn = require('d3-ease');

@scopeToProps("appState")
@asTweener
export default class Home extends React.Component {
	state = {};
	
	static scrollableAnim = [
		
		{
			type    : "Tween",
			target  : "header",
			from    : 0,
			duration: 100,
			easeFn  : easingFn.easePolyInOut,
			apply   : {
				height: -60,
			}
		},
		{
			type    : "Tween",
			target  : "page",
			from    : 0,
			duration: 100,
			easeFn  : easingFn.easePolyInOut,
			apply   : {
				top: -60,
			}
		},
		{
			type    : "Tween",
			target  : "highlighted",
			from    : 0,
			duration: 100,
			//easeFn  : easingFn.easePolyInOut,
			apply   : {
				height: -55,
			}
		},
		{
			type    : "Tween",
			target  : "events",
			from    : 0,
			duration: 100,
			//easeFn  : easingFn.easePolyInOut,
			apply   : {
				height: 55,
			}
		},
		//show map
		{
			type    : "Tween",
			target  : "map",
			from    : 65,
			duration: 35,
			//easeFn  : easingFn.easePolyInOut,
			apply   : {
				height: 30,
			}
		},
		{
			type    : "Tween",
			target  : "events",
			from    : 65,
			duration: 35,
			//easeFn  : easingFn.easePolyInOut,
			apply   : {
				height: -30,
			}
		},
		//show page
		{
			type    : "Tween",
			target  : "map",
			from    : 100,
			duration: 50,
			//easeFn  : easingFn.easePolyInOut,
			apply   : {
				//height: -10,
				//marginLeft: "30%",
				//width     : "-30%",
			}
		},
		{
			type    : "Tween",
			target  : "events",
			from    : 100,
			duration: 50,
			//easeFn  : easingFn.easePolyInOut,
			apply   : {
				height: -50,
			}
		},
		{
			type    : "Tween",
			target  : "PageBlock",
			from    : 100,
			duration: 50,
			//easeFn  : easingFn.easePolyInOut,
			apply   : {
				height: 60,
			}
		}
	];
	
	//shouldApplyScroll( newPos, oldPos, axe ) {
	//	let { $actions } = this.props;
	//
	//	let node = document.getElementById("scrollableEvents");
	//	if ( axe !== "scrollY" )
	//		return true;
	//
	//	if ( newPos > oldPos ) {
	//		if ( (node.scrollTop + node.offsetHeight) > node.scrollHeight - 25 ) {
	//			this.scrollTo(100, 250);
	//			console.log("bot")
	//		}
	//		else
	//			this.scrollTo(100, 250);
	//	}
	//	else if ( newPos < oldPos ) {
	//		if ( node.scrollTop < 25 ) {
	//			this.scrollTo(0, 250);
	//			console.log("top")
	//		}
	//	}
	//}
	
	shouldApplyScroll( newPos, oldPos, axe ) {
		let { $actions, appState } = this.props;

		let node = document.getElementById("scrollableEvents");
		if ( axe !== "scrollY" )
			return true;

		if ( newPos > oldPos ) {
			if ( (node.scrollTop + node.offsetHeight) > node.scrollHeight - 5 ) {
				$actions.setPageFocus('page');
				console.log("bot")
				return true;
			}
			else if(appState.currentPageFocus==='head')
				$actions.setPageFocus('events');
		}
		else if ( newPos < oldPos ) {
			if ( node.scrollTop < 25 ) {
				$actions.setPageFocus('head');
				console.log("top")
			}
			else {
				$actions.setPageFocus('events');
			}
		}
	}
	
	componentDidMount( props = this.props ) {
		let { appState } = props;
		switch ( appState.currentPageFocus ) {
			case 'head' :
				this.scrollTo(0);
				break;
			case 'events' :
				this.scrollTo(100);
				break;
			case 'page' :
				this.scrollTo(150);
				break;
			
		}
	}
	
	componentDidUpdate( props ) {
		let { appState } = this.props;
		console.warn(appState === props.appState)
		if ( props.appState.currentPageFocus !== appState.currentPageFocus ) {
			console.log(appState.currentPageFocus);
			switch ( appState.currentPageFocus ) {
				case 'head' :
					this.scrollTo(0, 250);
					break;
				case 'events' :
					this.scrollTo(100, 250);
					break;
				case 'page' :
					this.scrollTo(150, 250);
					break;
				
			}
		}
	}
	
	render() {
		let { widgets = { items: [] }, appState, $actions } = this.props;
		if ( typeof window !== "undefined" )
			window.$actions = $actions;
		
		return <div className={ "Page Home" }>
			<TweenRef
				id={ "header" }
				initial={ {
					height: "120px"
				} }
			>
				<header
					onClick={ e => this.scrollTo(150, 500) }
					style={ {
						display   : "inline-block",
						width     : "100%",
						background: "red",
					} }>
					<TweenRef
						id={ "logo" }
						initial={ {
							height: "100%"
						} }
					>
						<div className={ "logo" }/>
					</TweenRef>
				</header>
			</TweenRef>
			<TweenRef
				id={ "page" }
				initial={ {
					top   : "120px",
					left  : "0px",
					bottom: "0px",
					width : "100%",
					//paddingTop: "150px"
				} }
			>
				<div
					style={ {
						position: "absolute",
						width   : "100%",
						//background: "blue",
					} }>
					<TweenRef
						id={ "highlighted" }
						initial={ {
							height: "75%"
						} }
					>
						<div
							//onClick={ e => this.scrollTo(0, 500) }
							style={ {
								width     : "100%",
								background: "blue",
							} }>
							<Blocks.Highlighter/>
						</div>
					</TweenRef>
					<TweenRef
						id={ "events" }
						initial={ {
							position: "relative",
							height  : "25%"
						} }
					>
						<div
							//onClick={ e => this.scrollTo(100, 500) }
							style={ {
								width     : "100%",
								background: "green",
								overflow  : 'hidden'
							} }>
							<Blocks.EventList/>
						
						</div>
					</TweenRef>
					<TweenRef
						id={ "map" }
						initial={ {
							width : "100%",
							height: "0%"
						} }
					>
						<div
							//onClick={ e => this.scrollTo(100, 500) }
							style={ {
								background: "cyan",
								overflow  : 'hidden',
							} }>
							{/*<Blocks.EventMap/>*/}
						</div>
					</TweenRef>
					<TweenRef
						id={ "PageBlock" }
						initial={ {
							height: "0%"
						} }
					>
						<div
							//onClick={ e => this.scrollTo(100, 500) }
							style={ {
								width     : "100%",
								background: "green",
								overflow  : 'hidden',
							} }>
							<Blocks.PageBlock/>
						</div>
					</TweenRef>
				</div>
			</TweenRef>
		</div>
	}
}
