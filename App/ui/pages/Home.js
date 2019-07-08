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

import React                                 from 'react';
import {reScope, scopeToProps, propsToScope} from "rscopes";
import {Comps, Views}                        from 'App/ui';
import ReactDom                              from "react-dom";

import {withStateMap, asRef, asStore}   from "rescope-spells";
import {asTweener, TweenRef, TweenAxis} from "react-voodoo";

const wayPoints =
	      {
		      page  : 0,
		      head  : 100,
		      events: 200,
		      map   : 300
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
			console.log(appState.currentPageFocus);
			this.scrollTo(wayPoints[appState.currentPageFocus], 500, undefined, "easeSinIn");
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
				<TweenRef id={"Highlighter"} initial={MainPage.Highlighter}>
					<Views.Block.Highlighter/>
				</TweenRef>
				
				<TweenRef id={"events"}
				          initial={MainPage.events}>
					<Views.Events.EventList
						activeScroll={appState.currentPageFocus !== "map" && appState.currentPageFocus !== "events"}/>
				</TweenRef>
				<TweenRef
					id={"EventMap"}
					initial={MainPage.EventMap}
				>
					<Views.Events.EventMap
						day={appState.currentVisibleDay || appState.curDay}
						viewType={appState.viewType}/>
				</TweenRef>
				{/*<TweenRef*/}
				{/*	id={"Footer"}*/}
				{/*	initial={MainPage.Footer}*/}
				{/*>*/}
				{/*	<Comps.Footer/>*/}
				{/*</TweenRef>*/}
			</div>
		</TweenRef>
	}
}


