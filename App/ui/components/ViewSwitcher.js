/*
 *
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
import is                                    from "is";
import PropTypes                             from "prop-types";
import React                                 from "react";
import {reScope, scopeToProps, propsToScope} from "rscopes";
import {withStateMap, asRef, asStore}        from "rescope-spells";
import anims                                 from 'App/ui/anims/(*).js';

import moment                            from "moment";
import {Views}                           from 'App/ui';
import {asTweener, TweenRef, tweenTools} from "react-rtween";


@scopeToProps("Selected", "DataProvider")
@asTweener
export default class ViewSwitcher extends React.Component {
	static propTypes    = {
		target: PropTypes.object,
	};
	static defaultProps = {
		showAnim: {
			from    : 0,
			duration: 500,
			easeFn  : "easeSinOut",
			apply   : {
				opacity  : 1,
				transform: [{
					perspective: '200px'
				}, {
					translateZ: '50px'
				}]
			}
		},
		hideAnim: {
			from    : 0,
			duration: 500,
			easeFn  : "easeSinOut",
			apply   : {
				opacity  : -1,
				transform: [{
					perspective: '200px'
				}, {
					translateZ: '-50px'
				}]
			}
		}
	};
	state               = {};
	
	reset = () => {
		this.setState(
			{
				lastDay: this.props.day
			})
	}
	
	static getDerivedStateFromProps( props, state ) {
		let {
			    hideAnim, showAnim
		    } = props;
		return {
			hideAnim: tweenTools.target(hideAnim, 'from'),
			showAnim: tweenTools.target(showAnim, 'to')
		}
	}
	
	
	shouldComponentUpdate( { target }, { curTarget, nextTarget, hideAnim, showAnim }, nextContext ) {
		if ( target && (!nextTarget || target._id !== nextTarget._id) ) {
			console.log("tween new")
			this.setState(
				{
					curTarget : nextTarget || target,
					nextTarget: target
				}
				,
				curTarget && (( s ) => {
						//this.forceUpdate();
						this.pushAnim(hideAnim, null, true);
						this.pushAnim(showAnim,
						              () => {
							              console.log("tween done")
							              this.setState(
								              {
									              curTarget : target,
									              nextTarget: target
								              }
								              ,
								              s => {
									              this.resetTweenable("from", "to");
								              }
							              )
						              }, true);
					})
			)
		}
		
		return true;
	}
	
	render() {
		let {
			    target, defaultInitial = {},
			    $actions, DataProvider
		    }                                                      = this.props,
		    { curTarget = target, nextTarget, hideAnim, showAnim } = this.state,
		    selected;
		return (
			<div
				className={ "ViewSwitcher" }
				style={
					{
						position: 'relative',
						width   : '100%',
						height  : '100%',
					} }>
				<TweenRef id={ "from" }
				          initial={ defaultInitial }>
					<div>
						{/*{ curTarget && curTarget._id }*/ }
						{
							curTarget &&
							<Views.Page.page record={ curTarget } refs={ DataProvider }/>
						}
					</div>
				</TweenRef>
				<TweenRef id={ "to" }
				          initial={ tweenTools.addCss(
					          tweenTools.extractCss(showAnim, true)
					          , defaultInitial
				          ) }>
					<div>
						{/*{ nextTarget && nextTarget._id }*/ }
						{
							nextTarget &&
							<Views.Page.page record={ nextTarget } refs={ DataProvider }/>
						}
					</div>
				</TweenRef>
			</div>
		);
	}
};