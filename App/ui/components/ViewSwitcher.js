/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import PropTypes                                    from "prop-types";
import React                                        from "react";
import {scopeToProps}                               from "react-scopes";
import {asTweener, TweenAxis, TweenRef, tweenTools} from "react-voodoo";


@scopeToProps("Selected", "DataProvider")
@asTweener({})
export default class ViewSwitcher extends React.Component {
	static propTypes    = {
		target: PropTypes.object,
	};
	static defaultProps = {
		DefaultView       : ( { style, record } ) => <pre style={style}></pre>,
		DefaultPreview    : ( { style, record } ) => <pre style={style}></pre>,
		View              : ( { style, record } ) => <pre style={style}>{JSON.stringify(record, null, 2)}</pre>,
		ViewPreview       : ( { style, record } ) => <pre style={style}>{JSON.stringify(record, null, 2)}</pre>,
		getNextTarget     : rec => undefined,
		transitionDuration: 1000,
		showAnim          : {
			from    : 0,
			duration: 1500,
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
			duration: 1500,
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
		};
		//debugger
		this.state    = {
			curTarget: props.target,
			history  : []
		};
	}
	
	//hookScrollableTargets( targets, dir ) {
	//	return ["html", this];
	//}
	
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
		if ( prevProps.target !== this.props.target && (!nextTarget && (!curTarget || this.props.target !== curTarget) || nextTarget && this.props.target !== nextTarget) ) {
			//console.log("tween new", curTarget, nextTarget, this.props.target)
			if ( this.props.target && prevProps.target && prevProps.target._id === this.props.target._id ) {
				this.setState(
					{
						curTarget: {...this.props.target}
					})
			}
			else
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
			    style, DataProvider, View, ViewPreview, getNextTarget, DefaultView, DefaultPreview, $stores
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
							<ViewPreview record={prevTarget} refs={$stores.DataProvider.data} tweener={this}/>
							|| curTarget && <DefaultPreview/>
						}
					</div>
				</TweenRef>
				<TweenRef id={"prev"}
				          initial={defaultInitial}>
					<div>
						{
							prevTarget &&
							<View record={prevTarget} refs={$stores.DataProvider.data} tweener={this}/>
							|| curTarget && <DefaultView/>
						}
					</div>
				</TweenRef>
				<TweenRef id={"fromPreview"}
				          initial={this.state.initialPreviewCur}>
					<div>
						{
							curTarget &&
							<ViewPreview record={curTarget} refs={$stores.DataProvider.data} tweener={this}
							             isCurrent={true}/>
							|| <DefaultPreview/>
						}
					</div>
				</TweenRef>
				<TweenRef id={"from"}
				          initial={this.state.initialCur}>
					<div>
						{
							curTarget &&
							<View record={curTarget} refs={$stores.DataProvider.data} isCurrent={true}/>
							|| <DefaultView/>
						}
					</div>
				</TweenRef>
				<TweenRef id={"toPreview"}
				          initial={this.state.initialPreviewNext}>
					<div>
						{
							nextTarget &&
							<ViewPreview record={nextTarget} refs={$stores.DataProvider.data} isNext={true}
							             tweener={this}/>
						}
					</div>
				</TweenRef>
				<TweenRef id={"to"}
				          initial={this.state.initialNext}>
					<div>
						{
							nextTarget &&
							<View record={nextTarget} refs={$stores.DataProvider.data} key={"next_" + nextTarget._id}
							      isNext={true}
							      tweener={this}/>
						}
					</div>
				</TweenRef>
			</div>
		);
	}
};