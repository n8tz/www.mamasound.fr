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
import PropTypes                             from "prop-types";
import React                                 from "react";
import {reScope, scopeToProps, propsToScope} from "rscopes";
import {withStateMap, asRef, asStore}        from "rescope-spells";
import anims                                 from 'App/ui/anims/(*).js';

import moment                from "moment";
import {Views}               from 'App/ui';
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
						<Views.SimpleDay day={ curDay }/>
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
						<Views.SimpleDay day={ nextDay }/>
					</div>
				</TweenRef>
				
				{ children }
			</div>
		);
	}
};