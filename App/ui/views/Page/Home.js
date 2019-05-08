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

const wayPoints = [
	{
		head  : 0,
		event : 100,
		events: 150,
		page  : 250
	}
]

@scopeToProps("appState", "Anims")
@asTweener({ enableMouseDrag: true, dragDirectionLock: true })
export default class Home extends React.Component {
	state = {};
	
	componentDidMount( props = this.props ) {
		window.addEventListener("load", function () {
			// Set a timeout...
			setTimeout(function () {
				// Hide the address bar!
				window.scrollTo(0, 1);
			}, 0);
		});
		let { appState } = props;
		switch ( appState.currentPageFocus ) {
			case 'head' :
				this.scrollTo(0);
				break;
			case 'event' :
				this.scrollTo(100);
				break;
			case 'events' :
				this.scrollTo(150);
				break;
			case 'page' :
				this.scrollTo(250);
				break;
			
		}
	}
	
	componentDidUpdate( props ) {
		let { appState } = this.props;
		//console.warn(appState === props.appState)
		if ( appState.doFocus && props.appState.currentPageFocus !== appState.currentPageFocus ) {
			//console.log(appState.currentPageFocus);
			switch ( appState.currentPageFocus ) {
				case 'head' :
					this.scrollTo(0, 500);
					break;
				case 'event' :
					this.scrollTo(100, 500);
					break;
				case 'events' :
					this.scrollTo(150, 500);
					break;
				case 'page' :
					this.scrollTo(250, 500);
					break;
				
			}
		}
	}
	
	render() {
		let { Anims: { MainPage }, appState, $actions } = this.props;
		if ( typeof window !== "undefined" )
			window.$actions = $actions;
		
		return <TweenRef
			id={ "page" }
			initial={ MainPage.page }
		>
			<div className={ "Home container" }>
				
				<TweenAxis
					axe={ "scrollY" }
					items={ MainPage.YAxis }
					scrollableWindow={ 120 }
					defaultPosition={ wayPoints[appState.currentPageFocus] }
					inertia={
						{
							infinite  : true,
							shouldLoop: ( v ) => {
								if ( (v + 1) > (350) ) {
									//$actions.changeHighlighterBackground();
									return -350;
								}
							},
							willSnap  : ( i, v ) => {
								//$actions.setPageFocus(v.id || "head")
							},
							wayPoints : [
								{ at: 0, id: "head" },
								{ at: 100, id: "events" },
								{
									at: 150,
									id: "event"
								},
								{ at: 250, id: "page", stop: true },
								{ at: 350 }
							],
						}
					}
				/>
				<TweenRef
					id={ "header" }
					initial={ MainPage.header }
				>
					<header
						//onClick={ e => $actions.changeHighlighterBackground() }
						//className={ "container withMask" }
						//onClick={ e => $actions.setPageFocus("head") }
						style={ {
							zIndex : 5000,
							display: "inline-block",
							//width  : "100%",
							//background: "red",
						} }>
						<div className={ "maskContent" }>
							<TweenRef
								id={ "logo" }
								initial={ {
									height: "100%"
								} }
							>
								<div className={ "logo" }/>
							</TweenRef>
						</div>
					</header>
				</TweenRef>
				<TweenRef id={ "Highlighter" } initial={ MainPage.Highlighter }>
					<Views.Block.Highlighter/>
				</TweenRef>
				
				<TweenRef id={ "events" }
				          initial={ MainPage.events }>
					<Views.Events.EventList/>
				</TweenRef>
				<TweenRef
					id={ "EventMap" }
					initial={ MainPage.EventMap }
				>
					<Views.Events.EventMap
						day={ appState.currentVisibleDay || appState.curDay }
						viewType={ appState.viewType }/>
				</TweenRef>
				<TweenRef
					id={ "PageBlock" }
					initial={ MainPage.PageBlock }
				>
					<Views.Block.PageBlock/>
				</TweenRef>
				<TweenRef
					id={ "Footer" }
					initial={ MainPage.Footer }
				>
					<Comps.Footer/>
				</TweenRef>
			</div>
		</TweenRef>
	}
}


