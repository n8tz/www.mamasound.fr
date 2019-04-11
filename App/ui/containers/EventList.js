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
import PropTypes             from "prop-types";
import React                 from "react";
import {
	reScope, scopeToProps, propsToScope
}                            from "rscopes";
import {
	withStateMap, asRef, asStore
}                            from "rescope-spells";
import anims                 from 'App/ui/anims/(*).js';
import Blocks                from 'App/ui/containers/(*).js';
import Tabs                  from '@material-ui/core/Tabs';
import Tab                   from '@material-ui/core/Tab';
import moment                from "moment";
import stores                from 'App/stores/(*).js';
import Comps                 from 'App/ui/components/(*).js';
import {asTweener, TweenRef} from "react-rtween";
import SwipeableViews        from 'react-swipeable-views';

@reScope(
	{}
)
@scopeToProps("appState")
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
		
		var parent       = element.parentNode,
		    parentHeight = parent.offsetHeight,
		    parentPos    = parent.scrollTop,
		    scrollHeight = parent.scrollHeight;
		
		if ( scrollHeight < (parentPos + parentHeight + 500) ) {
			
			console.log("should do more query", appState.viewType);
			this._running = true;
			$actions.oneMoreDay(appState.viewType)
		}
	}
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
				parent       = document.querySelector(".EventList *[aria-hidden=false] .slide"),
				elemPos      = element.offsetTop,
				scrollHeight = parent.scrollHeight;
			parent.scrollTo({
				                top     : elemPos - 60,
				                behavior: 'smooth',
			                });
		}
	}
	/**
	 * watchCurrentDayFromScroll
	 */
	watchCurrentDayFromScroll = () => {
		let {
			    $actions,
			    appState, $scope
		    }       = this.props,
		    element = document.querySelector(".EventList *[aria-hidden=false] .slide");
		
		if ( element ) {
			this._scrollList && element.removeEventListener("scroll", this._scrollList);
			
			element.addEventListener(
				"scroll",
				this._scrollList = e => {
					let allDays = document.querySelectorAll(".EventList *[aria-hidden=false] .slide .DayEvents"),
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
	}
	
	componentDidMount() {
		this.isBotListIsInViewport()
		this.watchCurrentDayFromScroll()
	}
	
	componentDidUpdate() {
		this.scrollToSelected();
		this.watchCurrentDayFromScroll();
	}
	
	componentWillUnmount() {
		clearTimeout(this._infinite)
		
		let element = document.querySelector(".EventList *[aria-hidden=false] .slide");
		
		if ( element ) {
			this._scrollList && element.removeEventListener("scroll", this._scrollList);
		}
	}
	
	render() {
		let {
			    record: { position, size } = {},
			    EventList, appState, disabled,
			    $actions,
		    }     = this.props,
		    state = this.state;
		return (
			<div
				className={ "EventList container" }
			>
				<Comps.DayBlock day={ appState.currentVisibleDay || appState.curDay }/>
				<Tabs
					value={ appState.viewType }
					onChange={ ( e, v ) => {
						$actions.setCurStyleTab(v)
					} }
					height={ 50 }
					variant="fullWidth"
					indicatorColor="primary"
					textColor="primary"
					className={ "typeEventsTab" }
				>
					<Tab label={ "Tous" }/>
					<Tab label={ "Concerts" }/>
					<Tab label={ "Expos" }/>
					<Tab label={ "Theatre" }/>
					{/*<Tab label={ "Cinéma" }/>*/ }
				</Tabs>
				<SwipeableViews index={ appState.viewType }
				                onChangeIndex={ $actions.setCurStyleTab }
				                className={ "dayList" }
				                onClick={ e => e.preventDefault() }
				                id={ "scrollableEvents" }>
					{
						Array(4)
							.fill(0)
							.map(
								( v, type ) =>
									<div className={ "slide" } key={ type }>
										{
											Array(appState.dayCountByViewType[type])
												.fill(0)
												.map(
													( v, i ) =>
														<Blocks.DayEvents
															className={ "dayBlock" }
															key={ i }
															day={ moment(appState.curDay).add(i, 'day').unix() * 1000 }
															viewType={ type }/>
												)
										}
										<div id={ "endList_" + type }>loading...</div>
									</div>
							)
					}
				</SwipeableViews>
			</div>
		);
	}
};