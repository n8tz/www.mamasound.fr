/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import {Comps, Views}       from 'App/ui';
import moment               from "moment";
import React                from "react";
import {scopeToProps}       from "react-scopes";
import {domTools, TweenRef} from "react-voodoo";

@scopeToProps("appState", "ActiveTags", "Styles.views.Events.EventsList:Styles", "UserGeoLocation")
export default class EventList extends React.Component {
	static propTypes = {};
	state            = {};
	
	/**
	 * Infinite loader
	 */
	isBotListIsInViewport     = () => {
		let { $actions, appState, $scope } = this.props;
		let element                        = document.getElementById("endList_" + appState.viewType);
		this._infinite                     = setTimeout(this.isBotListIsInViewport, 2000);
		
		if ( !element )
			return console.warn('Not found infinite loader');
		
		let parent       = element.parentNode,
		    parentHeight = parent.offsetHeight,
		    parentPos    = parent.scrollTop,
		    scrollHeight = parent.scrollHeight;
		
		if ( appState.currentPageFocus === "events" && scrollHeight < (parentPos + parentHeight + 500) ) {
			
			console.log("should do more query", appState.viewType);
			this._running = true;
			$actions.oneMoreDay(appState.viewType)
		}
	};
	/**
	 * scrollTo selected
	 */
	scrollToSelected          = () => {
		let {
			    $actions,
			    appState, $scope
		    }       = this.props,
		    element = document.querySelector(".EventList *[aria-hidden=false] .selected");
		if ( element ) {
			let
				parent       = document.querySelector(".EventList *[aria-hidden=false] .EventNav"),
				elemPos      = element.offsetTop,
				scrollHeight = parent.scrollHeight;
			parent.scrollTo({
				                top     : elemPos - 60,
				                behavior: 'smooth',
			                });
		}
	};
	/**
	 * watchCurrentDayFromScroll
	 */
	watchCurrentDayFromScroll = () => {
		let {
			    $actions,
			    appState, $scope
		    }       = this.props,
		    element = document.body.parentNode;
		
		if ( element ) {
			this._scrollList && document.removeEventListener("scroll", this._scrollList);
			
			document.addEventListener(
				"scroll",
				this._scrollList = ( e ) => {//@todo
					let allDays = document.querySelectorAll(".EventList  .DayEvents"),
					    cDay,
					    cPos    = element.scrollTop;
					
					for ( let i = 0; i < allDays.length; i++ ) {
						if ( (cPos) <= (allDays[i].offsetTop + allDays[i].offsetHeight) )
							break;
						cDay = allDays[i].dataset.dt;
					}
					cDay && $actions.updateCurrentVisibleDay(parseInt(cDay));
				}
			);
		}
	};
	
	componentDidMount() {
		//this.isBotListIsInViewport()
		this.watchCurrentDayFromScroll();
		
	}
	
	componentDidUpdate() {
		this.scrollToSelected();
		this.watchCurrentDayFromScroll();
	}
	
	componentWillUnmount() {
		//clearTimeout(this._infinite)
		
		this._scrollList && document.removeEventListener("scroll", this._scrollList);
	}
	
	render() {
		let {
			    UserGeoLocation,
			    appState,
			    Styles,
			    children,
			    $actions, style
		    }     = this.props,
		    state = this.state;
		//console.log('EventList::render:136: ', activeScroll);
		return (
			<div className={"EventList container"} style={style}>
				<div className={"maskContent"}>
					<div className={"content container"}>
						{children}
						<TweenRef
							id={"EventCatSlider"}
							initial={Styles.EventCatSlider.style}
							tweenAxis={Styles.EventCatSliderAxis}
						>
							<Comps.Slider
								{...Styles.EventCatSlider}
								index={appState.viewType}
								autoHeight={true}
								onChange={$actions.setCurStyleTab}
								className={"EventCatSlider "}
								style={{ height: this.state.listHeight }}
							>
								{
									Array(4)
										.fill(0)
										.map(
											( v, type ) =>
												<div className={"dayList"} key={type}>
													{/*<Comps.Slider*/}
													{/*	{...EventDaySlider}*/}
													{/*	className={"EventDay"}*/}
													{/*>*/}
													{
														Array(appState.dayCountByViewType[type])
															.fill(0)
															.map(
																( v, i ) =>
																	<Views.Events.DayEvents
																		className={"dayBlock"}
																		key={i}
																		day={moment(appState.curDay).add(i, 'day').valueOf()}
																		viewType={type}/>
															)
													}
													{/*</Comps.Slider>*/}
													{/*<div id={"endList_" + type}>loading...</div>*/}
												</div>
										)
								}
							</Comps.Slider>
						</TweenRef>
					</div>
				</div>
				{/*{*/}
				{/*	activeScroll && <div className={"noScrollOverlay"}*/}
				{/*	                     onClick={e => $actions.setPageFocus('events', true)}></div>*/}
				{/*}*/}
			
			</div>
		);
	}
};