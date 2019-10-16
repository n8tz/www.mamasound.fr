/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import is                                           from "is";
import React                                        from "react";
import {asTweener, TweenAxis, TweenRef, tweenTools} from "react-voodoo";

@asTweener({ enableMouseDrag: true })
export default class SlidableList extends React.Component {
	static defaultProps = {
		defaultIndex   : 0,
		visibleItems   : 4,
		maxJump        : undefined,
		infinite       : false,
		defaultInitial : {},
		defaultEntering: [],
		defaultLeaving : [],
		enteringSteps  : 1,
		leavingSteps   : 1,
		scrollAxis     : [],
		windowSize     : 100,
		scrollDir      : "scrollY"
	};
	state               = {};
	
	componentDidMount() {
		let { autoScroll, defaultIndex = 0 } = this.props;
		if ( autoScroll ) {
			this._updater = setTimeout(
				tm => this.goNext(),
				autoScroll
			)
		}
	}
	
	goNext() {
		let { autoScroll, scrollDir } = this.props,
		    { step, dec, nbItems }    = this.state,
		    nextIndex                 = ((nbItems + this.state.index + 1) % nbItems);
		
		if ( this.state.index > nextIndex )
			this.scrollTo(dec + 100 - step, 0, scrollDir);
		
		//console.log(nextIndex)
		this.setState({ index: nextIndex })
	}
	
	goTo( index ) {
		
		this.setState({ index })
	}
	
	componentDidUpdate( prevProps, prevState, snapshot ) {
		let { autoScroll, scrollDir }                                                   = this.props,
		    { index = this.props.defaultIndex, step, windowSize, nbClones, jumpLength } = this.state;
		
		if ( prevState.index !== index ) {
			if ( this._wasUserSnap ) {
				this._wasUserSnap = false;
			}
			else {
				this.scrollTo(windowSize + index * step + nbClones * jumpLength + 2 * windowSize, 500, scrollDir);
			}
			if ( autoScroll ) {
				clearTimeout(this._updater);
				this._updater = setTimeout(
					tm => this.goNext(),
					autoScroll
				)
			}
		}
	}
	
	componentWillUnmount() {
		clearTimeout(this._updater);
	}
	
	static getDerivedStateFromProps( props, state ) {
		let {
			    defaultIndex = 0,
			    visibleItems,
			    overlaps     = 1 / (visibleItems || 1),
			    children: _childs,
			    scrollAxis,
			    enteringSteps,
			    leavingSteps,
			    defaultEntering,
			    defaultLeaving,
			    scrollDir,
			    windowSize,
			    infinite
		    }                        = props,
		    children                 = is.array(_childs) ? _childs : [],
		    { index = defaultIndex } = state,
		    allItems                 = [...children],
		    nbGhostItems             = allItems.length,
		    step                     = 100 * overlaps,
		    nbClones                 = 0,
		    enteringSize             = enteringSteps * step;
		
		if ( infinite && children.length ) {
			while ( (visibleItems + enteringSteps + leavingSteps) > (nbGhostItems - visibleItems) ) {
				allItems.unshift(...children);
				allItems.push(...children);
				nbGhostItems += children.length * 2;
				nbClones++;
			}
		}
		allItems = allItems.map(( elem, i ) => React.cloneElement(elem, { key: i }));
		
		return {
			allItems,
			nbGhostItems,
			nbItems   : children.length,
			step,
			nbClones,
			tweenLines: allItems.map(( e, i ) => ({
				[scrollDir]: [
					//{
					//	type    : "Event",
					//	from    : i * step + enteringSize,
					//	duration: step,
					//	entering( pos, sens ) {
					//		console.warn(i,"entering", pos, sens)
					//	},
					//	leaving( pos, sens ) {
					//		console.warn(i,"leaving", pos, sens)
					//	}
					//},
					...tweenTools.offset(
						tweenTools.scale(defaultEntering, enteringSize)
						,
						i * step + step
					),
					...tweenTools.offset(
						[
							...tweenTools.scale(scrollAxis, windowSize),
						],
						i * step + enteringSize
					),
					...tweenTools.offset(
						tweenTools.scale(defaultLeaving, step * leavingSteps)
						,
						i * step + enteringSize + windowSize
					),
				],
			})),
			windowSize,
			enteringSize,
			jumpLength: (children.length) * step,
			index
		}
	}
	
	render() {
		let {
			    defaultIndex = 0,
			    defaultInitial,
			    style        = {},
			    onClick,
			    infinite, windowSize,
			    maxJump, enteringSteps,
			    visibleItems, scrollDir,
			    className    = ""
		    }                                                                                                      = this.props,
		    { index = defaultIndex, nbClones, allItems, enteringSize, step, dec, tweenLines, nbItems, jumpLength } = this.state;
		return (
			<div
				className={"SlidableList " + className}
				style={
					{
						userSelect: "none",
						...style
					}
				}
			>
				<TweenAxis
					axe={scrollDir}
					defaultPosition={index * step + nbClones * jumpLength + enteringSize + windowSize}
					scrollableWindow={visibleItems * step}
					bounds={
						!infinite && {
							min: enteringSize + nbClones * jumpLength + windowSize,
							max: enteringSize + nbClones * jumpLength + jumpLength,
						}
					}
					inertia={
						{
							maxJump,
							shouldLoop: infinite && (( v ) => {
								let { windowSize } = this.state;
								
								if ( Math.round(v) >= (nbClones * jumpLength + enteringSize + jumpLength) )
									return -jumpLength;
								
								if ( Math.round(v) < (nbClones * jumpLength + enteringSize) )
									return jumpLength;
							}),
							willSnap  : ( i, v ) => {
								let { nbItems }   = this.state;
								this._wasUserSnap = true;
								//this.setState({ index: (i) % nbItems })
								//console.log((i - visibleItems + nbItems) % nbItems, v)
							},
							wayPoints : allItems.map(( child, i ) => ({ at: i * step + enteringSize + windowSize }))
						}
					}
				/>
				{
					allItems.map(
						( Child, i ) =>
							<TweenRef
								key={i}
								//id={"s_" + i}
								initial={
									defaultInitial
								}
								tweenLines={
									tweenLines[i]
								}
							>
								<div className={"slide"} onClick={onClick && (e => onClick(e, i % nbItems, this))}>
									{Child}
								</div>
							</TweenRef>
					)
				}
			</div>
		);
	}
};