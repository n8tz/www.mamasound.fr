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

import moment                                       from "moment";
import {Views}                                      from 'App/ui';
import {asTweener, TweenAxis, TweenRef, tweenTools} from "react-rtween";


@scopeToProps("Selected", "DataProvider")
@asTweener({ enableMouseDrag: true, dragDirectionLock: true })
export default class ViewSwitcher extends React.Component {
	static propTypes    = {
		target: PropTypes.object,
	};
	static defaultProps = {
		View           : ( { style, record } ) => <pre style={style}>{JSON.stringify(record, null, 2)}</pre>,
		ViewPreview    : ( { style, record } ) => <pre style={style}>{JSON.stringify(record, null, 2)}</pre>,
		getNextTarget  : rec => undefined,
		showAnim       : {
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
		hideAnim       : {
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
		},
		showPreviewAnim: [],
		hidePreviewAnim: []
	};
	state               = {};
	
	reset = () => {
		this.setState(
			{
				lastDay: this.props.day
			})
	}
	
	static getDerivedStateFromProps( props, state ) {
		return {
			curTarget      : state.curTarget || props.target,
			...props,
			scrollableAnims: [
				...tweenTools.scale(tweenTools.target(props.hideAnim, 'prev'), 100),
				...tweenTools.scale(tweenTools.target(props.hidePreviewAnim, 'prevPreview'), 100),
				...tweenTools.scale(tweenTools.target(props.showAnim, 'from'), 100),
				...tweenTools.scale(tweenTools.target(props.showPreviewAnim, 'fromPreview'), 100),
				...tweenTools.offset(
					[
						...tweenTools.scale(tweenTools.target(props.hideAnim, 'from'), 100),
						...tweenTools.scale(tweenTools.target(props.hidePreviewAnim, 'fromPreview'), 100),
						...tweenTools.scale(tweenTools.target(props.showAnim, 'to'), 100),
						...tweenTools.scale(tweenTools.target(props.showPreviewAnim, 'toPreview'), 100),
					], 100)
			]
		}
	}
	
	componentDidUpdate( prevProps, prevState, nextContext ) {
		let { curTarget, nextTarget, hideAnim, showAnim } = this.state;
		if ( prevProps.target !== this.props.target && (!nextTarget && this.props.target._id !== curTarget._id || nextTarget && this.props.target._id !== nextTarget._id) ) {
			//console.log("tween new", curTarget, nextTarget, this.props.target)
			this.setState(
				{
					curTarget : curTarget || this.props.target,
					nextTarget: this.props.target
				}
				,
				(( s ) => {
					this.scrollTo(200, 750, "scrollX")
					    .then(
						    v => {
							    this.setState(
								    {
									    prevTarget: curTarget,
									    curTarget : nextTarget,
									    nextTarget: undefined
								    }
								    ,
								    v => {
									    this.scrollTo(100, 0, "scrollX")
								    }
							    )
						    }
					    )
				})
			)
		}
		
	}
	
	
	render() {
		let {
			    target, defaultInitial = {}, defaultPreviewInitial,
			    style, DataProvider, View, ViewPreview, getNextTarget
		    }                                                                                                            = this.props,
		    { curTarget, prevTarget, nextTarget = getNextTarget(curTarget), showPreviewAnim, showAnim, scrollableAnims } = this.state,
		    selected;
		//console.log("update vs");
		return (
			<div
				className={"ViewSwitcher"}
				style={style}>
				<TweenAxis
					axe={"scrollX"}
					defaultPosition={100}
					items={scrollableAnims}
					scrollableWindow={60}
					inertia={
						{
							maxJump     : 1,
							onInertiaEnd: ( i, wp ) => {
								let { curTarget, prevTarget, nextTarget = getNextTarget(curTarget) } = this.state;
								if ( wp.at === 0 ) {
									this.setState(
										{
											prevTarget,
											curTarget : prevTarget,
											nextTarget: curTarget
										},
										s => {
											this.scrollTo(100, 0, "scrollX");
											this.setState(
												{
													prevTarget: undefined,
												})
										}
									)
								}
								if ( wp.at === 200 ) {
									this.setState(
										{
											prevTarget: curTarget,
											curTarget : nextTarget,
										},
										s => {
											this.scrollTo(100, 0, "scrollX");
											this.setState(
												{
													prevTarget: curTarget,
													curTarget : nextTarget,
													nextTarget: undefined
												})
										}
									)
								}
							},
							wayPoints   : [{ at: 0 }, { at: 100 }, { at: 200 }]
						}
					}
				/>
				<TweenRef id={"prev"}
				          initial={defaultInitial}>
					<div>
						{
							prevTarget &&
							<View record={prevTarget} refs={DataProvider}/>
						}
					</div>
				</TweenRef>
				<TweenRef id={"prevPreview"}
				          initial={defaultPreviewInitial}>
					<div>
						{
							prevTarget &&
							<ViewPreview record={prevTarget} refs={DataProvider}/>
						}
					</div>
				</TweenRef>
				<TweenRef id={"from"}
				          initial={tweenTools.addCss(
					          tweenTools.extractCss(showAnim, true)
					          , defaultInitial
				          )}>
					<div>
						{
							curTarget &&
							<View record={curTarget} refs={DataProvider}/>
						}
					</div>
				</TweenRef>
				<TweenRef id={"fromPreview"}
				          initial={tweenTools.addCss(
					          tweenTools.extractCss(showPreviewAnim, true)
					          , defaultPreviewInitial
				          )}>
					<div>
						{
							curTarget &&
							<ViewPreview record={curTarget} refs={DataProvider}/>
						}
					</div>
				</TweenRef>
				<TweenRef id={"to"}
				          initial={tweenTools.addCss(
					          tweenTools.extractCss(showAnim, true)
					          , defaultInitial
					          , { pointerEvents: 'none' }
				          )}>
					<div>
						{
							nextTarget &&
							<View record={nextTarget} refs={DataProvider}/>
						}
					</div>
				</TweenRef>
				<TweenRef id={"toPreview"}
				          initial={tweenTools.addCss(
					          tweenTools.extractCss(showPreviewAnim, true)
					          , defaultPreviewInitial
					          , { pointerEvents: 'none' }
				          )}>
					<div>
						{
							nextTarget &&
							<ViewPreview record={nextTarget} refs={DataProvider}/>
						}
					</div>
				</TweenRef>
			</div>
		);
	}
};