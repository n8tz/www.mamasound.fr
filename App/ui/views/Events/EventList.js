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
import Fab            from '@material-ui/core/Fab';
import GpsFixedIcon   from '@material-ui/icons/GpsFixed';
import GpsNoFixedIcon from '@material-ui/icons/GpsNotFixed';
import GpsOffIcon     from '@material-ui/icons/GpsOff';
import {Comps, Views} from 'App/ui';
import moment         from "moment";
import React          from "react";
import {scopeToProps} from "react-scopes";
import {TweenRef}     from "react-voodoo";

@scopeToProps("appState", "Anims", "UserGeoLocation")
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
		
		if ( scrollHeight < (parentPos + parentHeight + 500) ) {
			
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
		    element = document.querySelector(".EventList .EventNav");
		
		if ( element ) {
			this._scrollList && element.removeEventListener("scroll", this._scrollList);
			
			element.addEventListener(
				"scroll",
				this._scrollList = e => {
					let allDays = document.querySelectorAll(".EventList  .EventNav .DayEvents"),
					    cDay,
					    cPos    = element.scrollTop;
					
					for ( let i = 0; i < allDays.length; i++ ) {
						if ( cPos < allDays[i].offsetTop + 50 )
							break;
						cDay = allDays[i].dataset.dt;
					}
					cDay && $actions.updateCurrentDay(parseInt(cDay));
				}
			)
		}
	};
	
	componentDidMount() {
		//this.isBotListIsInViewport()
		this.watchCurrentDayFromScroll()
	}
	
	componentDidUpdate() {
		this.scrollToSelected();
		this.watchCurrentDayFromScroll();
	}
	
	componentWillUnmount() {
		//clearTimeout(this._infinite)
		
		let element = document.querySelector(".EventList *[aria-hidden=false] .EventNav");
		
		if ( element ) {
			this._scrollList && element.removeEventListener("scroll", this._scrollList);
		}
	}
	
	render() {
		let {
			    UserGeoLocation,
			    appState,
			    Anims: { MainPage, EventsBlock: { EventCatSlider }, EventDaySlider },
			    activeScroll,
			    $actions, style
		    }     = this.props,
		    state = this.state;
		console.log('EventList::render:136: ', activeScroll);
		return (
			<div className={"EventList"} style={style}>
				<div className={"maskContent"}>
					<div className={"content container"}>
						<TweenRef
							id={"EventCatSlider"}
							initial={EventCatSlider.style}
						>
							<Comps.Slider
								{...EventCatSlider}
								className={"EventCatSlider "}
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
																		day={moment(appState.curDay).add(i, 'day').unix() * 1000}
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
						<TweenRef
							id={"NavBox"}
							initial={MainPage.NavBox}
						>
							<Comps.SearchBar/>
						</TweenRef>
					</div>
				</div>
				{
					activeScroll && <div className={"noScrollOverlay"}
					                     onClick={e => $actions.setPageFocus('events', true)}></div>
				}
				<div
					className={"NavTools container"}
				>
					<Fab aria-label="edit" className={"newBtn button"}
					     onClick={$actions.toggleUserGeoLocation}>
						{
							UserGeoLocation.activating &&
							<GpsNoFixedIcon/> ||
							UserGeoLocation.active &&
							<GpsFixedIcon/> ||
							<GpsOffIcon/>
						}
					
					</Fab>
				</div>
			</div>
		);
	}
};