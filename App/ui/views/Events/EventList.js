/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import {Comps, Views} from 'App/ui';
import moment         from "moment";
import React          from "react";
import {scopeToProps} from "react-scopes";
import {TweenRef}     from "react-voodoo";

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
		
		let { appState, $actions } = this.props;
		
		let vp   = appState.selectedFocus ? 98 : 70,
		    elem = document.querySelector(" .type_" + this.props.appState.viewType + " .Event_item.selected");
		
		if ( elem ) {
			let offset = 0;//this.props.appState.selectedEventId?180:0;
			//console.log(elem)
			while ( elem ) {
				offset += elem.offsetTop;
				elem = elem.offsetParent;
			}
			if ( this.lastPos && this.lastPos < offset ) {
				this.lastPos = offset;
				offset -= 160;
			}
			else {
				this.lastPos = offset;
				if ( !this.lastPos )
					offset -= 320;
			}
			//document.body.parentElement.scrollTo(offset - 200)
			document.body.parentElement.scrollTo({
				                                     top     : offset - 300,
				                                     behavior: 'smooth'
			                                     })
		}
		else {
			//setTimeout(this.scrollToSelected, 50)
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
					let allDays = document.querySelectorAll(".EventList .type_" + this.props.appState.viewType + " .DayEvents"),
					    cDay, offset,
					    cPos    = element.scrollTop + 275, elem;
					
					for ( let i = 0; i < allDays.length; i++ ) {
						elem   = allDays[i];
						offset = 0
						
						while ( elem ) {
							offset += elem.offsetTop + elem.scrollTop;
							elem = elem.offsetParent;
						}
						if ( !cDay && allDays[i].offsetHeight )
							cDay = allDays[i].dataset.dt;
						
						if ( allDays[i].offsetHeight && (cPos) <= (offset) )
							break;
						
						cDay = allDays[i].dataset.dt;
					}
					//console.log('EventList::_scrollList:82: ', cPos, offset);
					cDay && $actions.updateCurrentVisibleDay(parseInt(cDay));
				}
			);
		}
	};
	
	componentDidMount() {
		//this.isBotListIsInViewport()
		this.watchCurrentDayFromScroll();
		
		if ( this.props.appState.selectedEvent ) {
			
			//this.scrollToSelected();
			setTimeout(this.scrollToSelected, 500)
		}
		
	}
	
	componentDidUpdate( prevProps, prevState, snapshot ) {
		//this.scrollToSelected();
		//this.watchCurrentDayFromScroll();
		//this._scrollList();
		setTimeout(tm => this._scrollList(), 500);
		setTimeout(tm => this._scrollList(), 1000);
		
		if ( prevProps.appState.selectedEvent !== this.props.appState.selectedEvent ) {
			
			//this.scrollToSelected();
			setTimeout(this.scrollToSelected, 50)
		}
		
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
								defaultIndex={appState.viewType}
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
												<div className={"dayList type_" + type} key={type}>
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
																		className={"dayBlock "}
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