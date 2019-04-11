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

import {withStateMap, asRef, asStore}   from "rescope-spells";
import {asTweener, TweenRef, TweenAxis} from "react-rtween";
import SwipeableViews                   from "../containers/EventList";


@scopeToProps("appState", "Anims")
@asTweener({})
export default class Home extends React.Component {
	state = {};
	
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
					setTimeout(tm => this.scrollTo(0, 300), 50);
					break;
				case 'events' :
					setTimeout(tm => this.scrollTo(100, 300), 50);
					break;
				case 'page' :
					this.scrollTo(150, 250);
					break;
				
			}
		}
	}
	
	render() {
		let { Anims: { MainPage }, appState, $actions } = this.props;
		if ( typeof window !== "undefined" )
			window.$actions = $actions;
		
		return <div className={ "Page Home" }>
			<TweenAxis
				axe={ "scrollY" }
				items={ MainPage.YAxis }
				inertia={
					{
						stops: [0, 100]
					}
				}
			/>
			
			<TweenRef
				id={ "page" }
				initial={ MainPage.page }
			>
				<div
					className={ "mainPageBlock" }
					style={ {
						position: "absolute",
						width   : "100%",
					} }>
					
					<TweenRef id={ "highlighted" } initial={ { height: "85%" } }>
						<Blocks.Highlighter/>
					</TweenRef>
					
					
					<TweenRef id={ "events" }
					          initial={ MainPage.events }>
						<Blocks.EventList/>
					</TweenRef>
					<TweenRef
						id={ "map" }
						initial={ MainPage.map }
					>
						<Blocks.EventMap
							day={ appState.currentVisibleDay || appState.curDay }
							viewType={ appState.viewType }/>
					</TweenRef>
					<TweenRef
						id={ "PageBlock" }
						initial={ MainPage.PageBlock }
					>
						<Blocks.PageBlock/>
					</TweenRef>
				</div>
			</TweenRef>
			<TweenRef
				id={ "LeftBox" }
				initial={ MainPage.LeftBox }
				reset={ true }
			>
				<Blocks.LeftBox/>
			</TweenRef>
		</div>
	}
}


