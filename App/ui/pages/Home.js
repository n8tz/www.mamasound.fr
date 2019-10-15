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

import {Comps, Views}                   from 'App/ui';
import React                            from 'react';
import {scopeToProps}                   from "react-scopes";
import {asTweener, TweenAxis, TweenRef} from "react-voodoo";

const wayPoints =
	      {
		      page   : 0,
		      bighead: 50,
		      head   : 100,
		      events : 200,
		      map    : 300
	      };

@scopeToProps("appState", "Styles.pages.Home:Styles", "Styles.currentBrkPts", "appTheme")
@asTweener({ enableMouseDrag: true, dragDirectionLock: true })
export default class Home extends React.Component {
	state = {};
	
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
		//props.tweener.scrollTo(wayPoints[appState.currentPageFocus]);
	}
	
	componentDidUpdate( props ) {
		let { appState, tweener } = this.props;
		if ( appState.doFocus && props.appState.currentPageFocus !== appState.currentPageFocus ) {
			console.log(appState.currentPageFocus);
			//tweener.scrollTo(wayPoints[appState.currentPageFocus], 1000, undefined, "easeQuadInOut");
		}
	}
	
	////hookScrollableTargets( targets, dir ) {
	////	return [this, "EventNav"];
	////}
	render() {
		let { Styles, appState, currentBrkPts, appTheme, $actions } = this.props;
		return <TweenRef id={"page"} initial={Styles.page}>
			<div className={"Home container"}>
				
				<TweenAxis
					axe={"scrollY"}
					items={Styles.YAxis}
					//scrollableWindow={ 225 }
					defaultPosition={wayPoints[appState.currentPageFocus]}
					bounds={Styles.bounds}
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
							wayPoints   : Styles.waypoints,
						}
					}
				/>
				<TweenRef
					id={"header"}
					initial={Styles.header}
				>
					<header>
						<TweenRef
							id={"logo"}
							initial={Styles.logo}
						>
							<div className={"logo"}/>
						</TweenRef>
					</header>
				</TweenRef>
				<TweenRef id={"Highlighter"} initial={Styles.Highlighter}>
					<Views.Block.Highlighter>
					
					</Views.Block.Highlighter>
				</TweenRef>
				{/*{*/}
				{/*	//(currentBrkPts !== "phone") && <TweenRef*/}
				{/*		//id={"SliderBlock"}*/}
				{/*		//initial={Styles.SliderBlock}*/}
				{/*>*/}
				{/*<Views.Block.Slider/>*/}
				{/*</TweenRef>}*/}
				<TweenRef id={"background"} initial={Styles.Background}>
					<Views.Block.Background
						record={appTheme && appTheme.data}/>
				</TweenRef>
				<TweenRef id={"EventsBlock"} initial={Styles.EventsBlock}>
					<Views.Events.EventList
						activeScroll={appState.currentPageFocus !== "map" && appState.currentPageFocus !== "events"}>
						
						<TweenRef id={"EventMap"} initial={Styles.EventMap}>
							<Views.Events.EventMap
								day={appState.currentVisibleDay || appState.curDay}
								viewType={appState.viewType}/>
						</TweenRef>
					</Views.Events.EventList>
				</TweenRef>
				<TweenRef id={"Footer"} initial={Styles.Footer}>
					<Comps.Footer/>
				</TweenRef>
			</div>
		</TweenRef>
	}
}


