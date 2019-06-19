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
import {Comps, Views}                        from 'App/ui';
import ReactDom                              from "react-dom";

import {withStateMap, asRef, asStore}   from "rescope-spells";
import {asTweener, TweenRef, TweenAxis} from "react-rtween";

const wayPoints =
	      {
		      page : 0,
		      head : 100,
		      event: 200,
		      map  : 300
	      };

@scopeToProps("appState", "Anims")
@asTweener({ enableMouseDrag: true, dragDirectionLock: true })
export default class Home extends React.Component {
	state = {};
	
	//hookScrollableTargets( targets, dir ) {
	//	return [this, "EventNav"];
	//}
	componentDidMount( props = this.props ) {
		setTimeout(
			tm => window.addEventListener("load", function () {
				// Set a timeout...
				setTimeout(function () {
					// Hide the address bar!
					window.scrollTo(0, 1);
				}, 0);
			})
		)
		let { appState } = props;
		this.scrollTo(wayPoints[appState.currentPageFocus]);
	}
	
	componentDidUpdate( props ) {
		let { appState, $actions } = this.props;
		//console.warn(appState === props.appState)
		if ( appState.doFocus && props.appState.currentPageFocus !== appState.currentPageFocus ) {
			//console.log(appState.currentPageFocus);
			this.scrollTo(wayPoints[appState.currentPageFocus], 500, undefined, "easeBackIn");
		}
	}
	
	//
	render() {
		let { Anims: { MainPage }, appState, $actions } = this.props;
		if ( typeof window !== "undefined" )
			window.$actions = $actions;
		console.log('render snap', appState.currentPageFocus, wayPoints[appState.currentPageFocus])
		return <TweenRef
			id={"page"}
			initial={MainPage.page}>
			<div className={"Home container"}>
				
				<TweenAxis
					axe={"scrollY"}
					items={MainPage.YAxis}
					//scrollableWindow={ 225 }
					defaultPosition={wayPoints[appState.currentPageFocus]}
					//defaultPosition={100}
					inertia={
						{
							maxJump     : 1,
							//shouldLoop  : ( v ) => {
							//	if ( (v + 1) > (350) ) {
							//		return -350;
							//	}
							//},
							onInertiaEnd: ( i, v ) => {
								if ( v ) {
									
									//if ( this.props.appState.currentPageFocus === "head" && v.id !== "head" )
									//	$actions.selectFocus()
									//if ( v.id === "loop" ) {
									//	this.scrollTo(0)
									//	$actions.setPageFocus("head")
									//}
									//else
									$actions.setPageFocus(v.id || "head")
								}
								
							},
							willSnap    : ( i, v ) => {
								//$actions.setPageFocus(v.id)// do not trigger redraw just before inertia
								//console.log(i % nbItems, v)
							},
							wayPoints   : [
								{ at: 0, id: "page" },
								{
									//direction   : 1,
									at          : 100,
									id          : "head",
									stopDuration: 1000
								},
								{
									//direction: -1,
									at: 200,
									id: "events"
								},
								{
									at: 300,
									id: "map"
								},
							],
						}
					}
				/>
				<TweenRef
					id={"header"}
					initial={MainPage.header}
				>
					<header
						style={{
							zIndex : 5000,
							display: "inline-block",
							//width  : "100%",
							//background: "red",
						}}>
						<Views.Block.PageBlock>
							<TweenRef
								id={"logo"}
								initial={MainPage.logo}
							>
								<div className={"logo"}/>
							</TweenRef>
						</Views.Block.PageBlock>
					
					</header>
				</TweenRef>
				<TweenRef id={"Highlighter"} initial={MainPage.Highlighter}>
					<Views.Block.Highlighter/>
				</TweenRef>
				
				<TweenRef id={"events"}
				          initial={MainPage.events}>
					<Views.Events.EventList/>
				</TweenRef>
				<TweenRef
					id={"EventMap"}
					initial={MainPage.EventMap}
				>
					<Views.Events.EventMap
						day={appState.currentVisibleDay || appState.curDay}
						viewType={appState.viewType}/>
				</TweenRef>
				<TweenRef
					id={"Footer"}
					initial={MainPage.Footer}
				>
					<Comps.Footer/>
				</TweenRef>
			</div>
		</TweenRef>
	}
}


