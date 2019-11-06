/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import {Comps, Views}                   from 'App/ui';
import React                            from 'react';
import {scopeToProps}                   from "react-scopes";
import {asTweener, TweenAxis, TweenRef} from "react-voodoo";
import getMediaSrc                      from "../../../packages/wpi-forms/App/utils/getMediaSrc";

const wayPoints =
	      {
		      page   : 0,
		      bighead: 50,
		      head   : 100,
		      events : 200,
		      map    : 300
	      };

@scopeToProps("appState", "Styles.pages.Home:Styles", "Styles.views.Events.EventsList.NavBox", "Styles.currentTheme", "appTheme")
@asTweener({ enableMouseDrag: true, dragDirectionLock: true })
export default class Home extends React.Component {
	state = {};
	
	componentDidMount( props = this.props ) {
		//setTimeout(
		//	tm => window.addEventListener("load", function () {
		//		// Set a timeout...
		//		setTimeout(function () {
		//			// Hide the address bar!
		//			window.scrollTo(0, 1);
		//		}, 0);
		//	})
		//)
		let { appState } = props;
		//props.tweener.scrollTo(wayPoints[appState.currentPageFocus]);
		document.body.classList.remove("SSR");
		document.addEventListener('scroll', this.recordPosition, { passive: false })
		this._rpTm = setInterval(this.recordPosition, 300)
	}
	
	componentWillUnmount() {
		document.removeEventListener('scroll', this.recordPosition)
		clearInterval(this._rpTm)
	}
	
	recordPosition = event => {
		
		let {
			    appState, $actions
		    }  = this.props;
		let scrollTop,
		    normalizedScrollTop,
		    switchPoint,
		    vp = appState.selectedFocus ? 98 : 60;
		
		scrollTop           = document.body.scrollTop;
		switchPoint         = vp - (185 / document.body.offsetHeight) * 100;
		normalizedScrollTop = Math.max(0, (((scrollTop) / document.body.offsetHeight) * 100));
		//console.log('scroll :', normalizedScrollTop, switchPoint)
		
		
		if ( ~~normalizedScrollTop === 0 ) {
			//$actions.loadTheme("desktopFixed")
			if ( !this._head ) {
				this._head = true;
				document.body.classList.add("onTop");
			}
		}
		else if ( this._head ) {
			this._head = false;
			document.body.classList.remove("onTop");
		}
		
		if ( normalizedScrollTop >= (switchPoint) ) {
			//$actions.loadTheme("desktopFixed")
			if ( !this._fixed ) {
				//$actions.selectFocus();
				this._fixed = true;
				document.body.classList.add("fixedHead");
			}
		}
		else if ( this._fixed ) {
			this._fixed = false;
			document.body.classList.remove("fixedHead");
		}
		//tweener.scrollTo(normalizedScrollTop, 50, "nativeScrollAxis")
		//onScroll(scrollTop, event)
	}
	
	componentDidUpdate( props ) {
		let { appState, tweener } = this.props;
		if ( appState.doFocus && props.appState.currentPageFocus !== appState.currentPageFocus ) {
			console.log(appState.currentPageFocus);
			//tweener.scrollTo(wayPoints[appState.currentPageFocus], 1000, undefined, "easeQuadInOut");
		}
	}
	
	//hookScrollableTargets( targets, dir ) {
	//	return [this, "EventNav"];
	//}
	render() {
		let { Styles, appState, currentTheme, appTheme, $actions, NavBox, appMenu } = this.props,
		    useBig                                                                  = appState.selectedFocus &&
			    (appState.selectedFocus.etty !== "Place");
		return <div>
			<TweenRef
				id={"header"}
				initial={Styles.header}
			>
				<header>
					<div className={"container"}>
						<TweenRef
							id={"logo"}
							initial={Styles.logo}
						>
							<a className={"logo"} href={'/'}
							   style={appTheme && appTheme.data && appTheme.data.logo && {
								   background    : "url('" + getMediaSrc(appTheme.data.logo) + "') center no-repeat",
								   backgroundSize: "auto 100%"
							   }}
							   onClick={e => (e.stopPropagation(), e.preventDefault(), $actions.history_push('/'))}/>
						</TweenRef>
						{appTheme && appTheme.data && appTheme.data.menuTop &&
						<Views.Menu.menu id={appTheme.data.menuTop.objId} className={"topMenu"}/>}
						{appTheme && appTheme.data && appTheme.data.menuSocial &&
						<Views.Menu.menu id={appTheme.data.menuSocial.objId} className={"socialMenu"}/>}
					</div>
				</header>
			</TweenRef>
			<TweenRef id={"Highlighter"} initial={Styles.Highlighter}>
				<Views.Block.Highlighter key={"Highlighter"}
				                         navBox={
					                         <TweenRef id={"NavBox"} initial={NavBox.style}>
						                         <Comps.NavBox key={"NavBox"}>
							                         {/*<TweenRef id={"MidMenu"} initial={Styles.MidMenu}>*/}
							                         {/*<Views.Menu.menu id={"rootmiddlemenu"}/>*/}
							                         {/*</TweenRef>*/}
							
							                         {currentTheme !== "phone" &&
							                         <Comps.SearchBar {...Styles.SearchBarProps}/>
							                         }
							                         <TweenRef id={"EventMap"} initial={Styles.EventMap}>
								                         <Views.Events.EventMap
									                         day={appState.curVisibleDay || appState.curDay}
									                         viewType={appState.viewType}/>
							                         </TweenRef>
							                         {currentTheme.startsWith("desktop") &&
							                         <TweenRef id={"ArticleList"} initial={Styles.ArticleList}>
								                         <Views.Articles.ArticleList
									                         day={appState.curVisibleDay || appState.curDay}
									                         viewType={appState.viewType}/>
							                         </TweenRef>
							                         }
						                         </Comps.NavBox>
					                         </TweenRef>
				                         }>
					<TweenRef id={"background"} initial={Styles.Background}>
						<Views.Block.Background
							record={appTheme && appTheme.data}/>
					</TweenRef>
				</Views.Block.Highlighter>
			</TweenRef>
			{currentTheme === "phone" &&
			<Comps.SearchBar {...Styles.SearchBarProps}/>
			}
			<TweenRef id={"page"} initial={Styles.page}>
				<div className={"Home container " + (useBig ? "bigHead" : "") + (__IS_SERVER__
				                                                                 ? " SSR"
				                                                                 : "")}>
					
					<TweenAxis
						axe={"scrollY"}
						items={Styles.YAxis}
						//scrollableWindow={ 225 }
						defaultPosition={wayPoints[appState.currentPageFocus]}
						bounds={Styles.bounds}
						inertia={
							{
								maxJump     : 1,
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
					
					<TweenRef id={"EventsBlock"} initial={Styles.EventsBlock}>
						<Views.Events.EventList
							activeScroll={appState.currentPageFocus !== "map" && appState.currentPageFocus !== "events"}>
						
						</Views.Events.EventList>
					</TweenRef>
					<TweenRef id={"Footer"} initial={Styles.Footer}>
						<Comps.Footer>
							{/*{appTheme && appTheme.data && appTheme.data.menuBot &&*/}
							{/*<Views.Menu.menu id={appTheme.data.menuBot.objId}/>}*/}
						</Comps.Footer>
					</TweenRef>
				</div>
			</TweenRef>
		</div>
	}
}


