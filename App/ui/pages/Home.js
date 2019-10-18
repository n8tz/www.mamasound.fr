/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import {Comps, Views}                   from 'App/ui';
import normalizeWheel                   from 'normalize-wheel';
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

@scopeToProps("appState", "Styles.pages.Home:Styles", "Styles.views.Events.EventsList.NavBox", "Styles.currentTheme", "appTheme", "appMenu")
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
		document.addEventListener('scroll', this.recordPosition)
		
	}
	
	componentWillUnmount() {
		document.removeEventListener('scroll', this.recordPosition)
	}
	
	recordPosition = event => {
		
		let { appState, tweener, $actions } = this.props;
		let scrollTop, normalizedScrollTop, switchPoint;
		
		if ( document.scrollingElement ) {
			scrollTop = document.scrollingElement.scrollTop
		}
		else {
			if ( event.target === document ) {
				scrollTop = event.target.body.scrollTop
			}
			else {
				scrollTop = event.target.scrollTop
			}
		}
		const normalized = normalizeWheel(event);
		switchPoint      = 70 - (210 / window.innerHeight) * 100;
		console.log(normalized.pixelX, normalized.pixelY);
		normalizedScrollTop = Math.max(0, (((scrollTop) / window.innerHeight).toFixed(4) * 100));
		console.log('scroll :', normalizedScrollTop, switchPoint)
		if ( normalizedScrollTop >= (switchPoint) ) {
			//$actions.loadTheme("desktopFixed")
			tweener.updateRefStyle("Highlighter", { position: 'fixed', height: ["210px", "0vh"] })
			tweener.updateRefStyle("NavBox", { position: 'fixed', top: ["0vh", "250px"] })
		}
		else {
			tweener.updateRefStyle("Highlighter", { position: 'absolute', height: ["70vh", "0px"] })
			tweener.updateRefStyle("NavBox", { position: 'absolute', top: ["70vh", "50px"] })
		}
		//tweener.scrollTo(normalizedScrollTop, 50, "nativeScrollAxis")
		//onScroll(scrollTop, event)
		//this.setState({ scroll: scrollTop })
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
		let { Styles, appState, currentTheme, appTheme, $actions, NavBox, appMenu } = this.props;
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
				<TweenAxis
					axe={"nativeScrollAxis"}
					items={Styles.nativeScrollAxis}
					//scrollableWindow={ 225 }
					//bounds={Styles.bounds}
					inertia={{}}
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
						
						<Views.Menu.menu id={"rootHeaderMenu"}/>
					</header>
				</TweenRef>
				<TweenRef id={"Highlighter"} initial={Styles.Highlighter}>
					<Views.Block.Highlighter>
						
						<TweenRef id={"background"} initial={Styles.Background}>
							<Views.Block.Background
								record={appTheme && appTheme.data}/>
						</TweenRef>
					</Views.Block.Highlighter>
				</TweenRef>
				{/*{*/}
				{/*	//(currentTheme !== "phone") && <TweenRef*/}
				{/*		//id={"SliderBlock"}*/}
				{/*		//initial={Styles.SliderBlock}*/}
				{/*>*/}
				{/*<Views.Block.Slider/>*/}
				{/*</TweenRef>}*/}
				
				<TweenRef id={"NavBox"} initial={NavBox.style}>
					<Comps.NavBox>
						<TweenRef id={"MidMenu"} initial={Styles.MidMenu}>
							<Views.Menu.menu id={"rootmiddlemenu"}/>
						</TweenRef>
						<TweenRef id={"EventMap"} initial={Styles.EventMap}>
							<Views.Events.EventMap
								day={appState.currentVisibleDay || appState.curDay}
								viewType={appState.viewType}/>
						</TweenRef>
					</Comps.NavBox>
				</TweenRef>
				<TweenRef id={"EventsBlock"} initial={Styles.EventsBlock}>
					<Views.Events.EventList
						activeScroll={appState.currentPageFocus !== "map" && appState.currentPageFocus !== "events"}>
					
					</Views.Events.EventList>
				</TweenRef>
				<TweenRef id={"Footer"} initial={Styles.Footer}>
					<Comps.Footer>
						<Views.Menu.menu id={"rootbottommenu"}/>
					</Comps.Footer>
				</TweenRef>
			</div>
		</TweenRef>
	}
}


