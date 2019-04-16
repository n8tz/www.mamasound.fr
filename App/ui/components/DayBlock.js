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
import PropTypes                             from "prop-types";
import React                                 from "react";
import {reScope, scopeToProps, propsToScope} from "rscopes";
import {withStateMap, asRef, asStore}        from "rescope-spells";
import anims                                 from 'App/ui/anims/(*).js';

import moment                from "moment";
import {Comps}               from 'App/ui';
import {asTweener, TweenRef} from "react-rtween";


//@scopeToProps("EventList", "appState")
@asTweener
export default class DayBlock extends React.Component {
	static propTypes = {
		day: PropTypes.number,
	};
	state            = {};
	
	reset = () => {
		this.setState(
			{
				lastDay: this.props.day
			})
		
		
	}
	
	shouldComponentUpdate( { day }, { curDay, nextDay }, nextContext ) {
		day = day && moment(day).startOf('day').valueOf();
		if ( day && day !== nextDay ) {
			//console.log("tween new", moment(nextDay).format("dddd DD/MM"), nextDay, moment(day).format("dddd DD/MM"))
			this.setState(
				{
					curDay : nextDay,
					nextDay: day
				}
				,
				s => {
					let dir = day > nextDay;
					if ( !dir )
						this.applyTweenState(
							"to",
							{
								transform: {
									translateY: "-2box"
								}
							}
						);
					this.forceUpdate();
					this.pushAnim(anims.slideOut("from", 0, 500, dir ? "top" : "bot"), null, true);
					this.pushAnim(anims.slideIn("to", 0, 500, !dir ? "top" : "bot"),
					              () => {
						              //console.log("tween done", moment(day).format("dddd DD/MM"))
						              this.setState(
							              {
								              curDay : day,
								              nextDay: day
							              }
							              ,
							              s => {
								              this.forceUpdate();
								
								              this.resetTweenable("from", "to");
							              }
						              )
					              }, true);
				}
			)
			return true;
		}
		
		return false;
	}
	
	render() {
		let {
			    day,
			    $actions, children
		    }                   = this.props,
		    { curDay, nextDay } = this.state,
		    selected;
		return (
			<div
				className={ "DayBlock" }
			>
				<TweenRef id={ "from" }
				          initial={
					          {
						          backgroundColor: 'red',
						          width          : '100%',
						          height         : '100%',
						          top            : '0px',
						          left           : '0px',
						          position       : 'absolute',
						          ...anims.slideOut("from").initial.from,
					          }
				          }>
					<div>
						<Comps.SimpleDay day={ curDay }/>
					</div>
				</TweenRef>
				<TweenRef id={ "to" }
				          initial={
					          {
						          backgroundColor: 'green',
						          width          : '100%',
						          height         : '100%',
						          top            : '0',
						          left           : '0',
						          position       : 'absolute',
						          ...anims.slideIn("to").initial.to
					          }
				          }>
					<div>
						<Comps.SimpleDay day={ nextDay }/>
					</div>
				</TweenRef>
				
				{ children }
			</div>
		);
	}
};