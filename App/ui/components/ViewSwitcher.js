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
import PropTypes                                    from "prop-types";
import React                                        from "react";
import {asTweener, TweenAxis, TweenRef, tweenTools} from "react-voodoo";
import {scopeToProps}                               from "react-scopes";


@scopeToProps("Selected", "DataProvider")
@asTweener({ })
export default class ViewSwitcher extends React.Component {
	static propTypes    = {
		target: PropTypes.object,
	};
	static defaultProps = {
		DefaultView       : ( { style, record } ) => <pre style={style}>!!!</pre>,
		View              : ( { style, record } ) => <pre style={style}>{JSON.stringify(record, null, 2)}</pre>,
		ViewPreview       : ( { style, record } ) => <pre style={style}>{JSON.stringify(record, null, 2)}</pre>,
		getNextTarget     : rec => undefined,
		transitionDuration: 500,
		showAnim          : {
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
		hideAnim          : {
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
		showPreviewAnim   : [],
		hidePreviewAnim   : []
	};
	
	constructor( props ) {
		super(...arguments);
		this._inertia = {
			maxJump     : 1,
			onInertiaEnd: ( i, wp ) => {
				let { curTarget, prevTarget, nextTarget = this.props.getNextTarget(curTarget), history } = this.state;
				if ( wp.at === 0 ) {
					let nHisto = [...history];
					this.setState(
						{
							curTarget : prevTarget,
							nextTarget: curTarget
						},
						s => {
							props.tweener.scrollTo(100, 0, "scrollX");
							this.setState(
								{
									prevTarget: nHisto.pop(),
									history   : nHisto,
								})
						}
					)
				}
				if ( wp.at === 200 ) {
					this.setState(
						{
							prevTarget: curTarget,
						},
						s => {
							props.tweener.scrollTo(100, 0, "scrollX");
							this.setState(
								{
									//history   : prevTarget && [...history, prevTarget] || history,
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
		this.state    = {
			curTarget: props.target,
			history  : []
		};
	}
	
	
	static getDerivedStateFromProps( props, state ) {
		return {
			//
			...props,
			initialPrev       : {
				...props.defaultInitial, pointerEvents: 'none'
			},
			initialPreviewPrev: {
				...props.defaultPreviewInitial, pointerEvents: 'none'
			},
			initialCur        : tweenTools.addCss(
				tweenTools.extractCss(props.showAnim, true)
				, props.defaultInitial
			),
			initialPreviewCur : tweenTools.addCss(
				tweenTools.extractCss(props.showPreviewAnim, true)
				, props.defaultPreviewInitial
			),
			initialNext       : {
				...tweenTools.addCss(
					tweenTools.extractCss(props.showAnim, true)
					, props.defaultInitial
				), pointerEvents: 'none'
			},
			initialPreviewNext: {
				...tweenTools.addCss(
					tweenTools.extractCss(props.showPreviewAnim, true)
					, props.defaultPreviewInitial
				), pointerEvents: 'none'
			},
			scrollableAnims   : [
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
		let { curTarget, nextTarget, prevTarget, history } = this.state;
		if ( prevProps.target !== this.props.target && (!nextTarget && (!curTarget || this.props.target._id !== curTarget._id) || nextTarget && this.props.target._id !== nextTarget._id) ) {
			//console.log("tween new", curTarget, nextTarget, this.props.target)
			this.setState(
				{
					nextTarget: this.props.target
				}
				,
				(( s ) => {
					this.props.tweener.scrollTo(200, this.props.transitionDuration, "scrollX")
					    .then(
						    v => {
							    this.setState(
								    {
									    history   : prevTarget && [...history, prevTarget] || history,
									    prevTarget: curTarget,
									    curTarget : this.props.target,
									    nextTarget: undefined
								    }
								    ,
								    v => {
									    this.props.tweener.scrollTo(100, 0, "scrollX")
								    }
							    )
						    }
					    )
				})
			)
		}
	//
	}
	//
	
	render() {
		let {
			    target, defaultInitial = {}, defaultPreviewInitial,
			    style, DataProvider, View, ViewPreview, getNextTarget, DefaultView
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
					scrollableWindow={100}
					inertia={
						this._inertia
					}
				/>
				<TweenRef id={"prevPreview"}
				          initial={defaultPreviewInitial}>
					<div>
						{
							prevTarget &&
							<ViewPreview record={prevTarget} refs={DataProvider} tweener={this}/>
						}
					</div>
				</TweenRef>
				<TweenRef id={"prev"}
				          initial={defaultInitial}>
					<div>
						{
							prevTarget &&
							<View record={prevTarget} refs={DataProvider} tweener={this}/>
							|| curTarget && <DefaultView/>
						}
					</div>
				</TweenRef>
				<TweenRef id={"fromPreview"}
				          initial={this.state.initialPreviewCur}>
					<div>
						{
							curTarget &&
							<ViewPreview record={curTarget} refs={DataProvider} tweener={this}/>
						}
					</div>
				</TweenRef>
				<TweenRef id={"from"}
				          initial={this.state.initialCur}>
					<div>
						{
							curTarget &&
							<View record={curTarget} refs={DataProvider} isCurrent={true}/>
							|| <DefaultView/>
						}
					</div>
				</TweenRef>
				<TweenRef id={"toPreview"}
				          initial={this.state.initialPreviewNext}>
					<div>
						{
							nextTarget &&
							<ViewPreview record={nextTarget} refs={DataProvider}/>
						}
					</div>
				</TweenRef>
				<TweenRef id={"to"}
				          initial={this.state.initialNext}>
					<div>
						{
							nextTarget &&
							<View record={nextTarget} refs={DataProvider} key={"next_" + nextTarget._id} isNext={true}
							      tweener={this}/>
						}
					</div>
				</TweenRef>
			</div>
		);
	}
};