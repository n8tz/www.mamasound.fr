/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import is                                           from "is";
import React                                        from "react";
import ReactDOM                                     from "react-dom";
import {asTweener, TweenAxis, TweenRef, tweenTools} from "react-voodoo";

@asTweener({ enableMouseDrag: true })
export default class Slider extends React.Component {
	static defaultProps = {
		defaultIndex   : 0,
		visibleItems   : 4,
		maxJump        : undefined,
		infinite       : false,
		autoHeight     : false,
		//overlaps       : 1 / 6,
		defaultInitial : {},
		defaultEntering: [],
		defaultLeaving : [],
		scrollY        : [],
		scrollDir      : "scrollX"
	};
	state               = {};
	
	componentDidMount() {
		let { autoScroll, index = 0, autoHeight } = this.props;
		if ( autoScroll ) {
			this._updater = setTimeout(
				tm => this.goNext(),
				autoScroll
			)
		}
		if ( autoHeight ) {
			this.updateHeight()
		}
	}
	
	updateHeight = () => {
		let { index = this.props.defaultIndex, sliderHeight } = this.state;
		clearTimeout(this._autoHeightTm);
		try {
			let h = ReactDOM.findDOMNode(this.slideRefs[index]);
			if ( sliderHeight !== (h.offsetHeight + 'px') )
				this.setState({ sliderHeight: h.offsetHeight + 'px' })
		} catch ( e ) {
		
		}
		this._autoHeightTm = setTimeout(this.updateHeight, 500)
	}
	
	goNext() {
		let { step, windowSize, nbItems } = this.state,
		    { tweener, scrollDir }        = this.props,
		    nextIndex                     = ((nbItems + this.state.index + 1) % (nbItems));
		
		if ( this.state.index > nextIndex )
			tweener.scrollTo(100 + windowSize - step, 0, scrollDir);
		
		//console.log(nextIndex)
		this.setState({ index: nextIndex })
	}
	
	goTo( index, then ) {
		this._then = then;
		this.setState({ index })
	}
	
	componentDidUpdate( prevProps, prevState, snapshot ) {
		let { autoScroll, scrollDir, tweener, onChange, index: pIndex, autoHeight } = this.props,
		    { index = this.props.defaultIndex, step, dec, nbItems }                 = this.state,
		    changed;
		
		if ( prevState.dec !== dec ) {
			tweener.scrollTo(tweener._getAxis(scrollDir).scrollPos + dec - prevState.dec, 0, scrollDir);
		}
		if ( pIndex !== prevProps.index ) {
			//changed = pIndex + 1;
			//tweener.scrollTo(dec + step * pIndex + 100, 750, scrollDir, "easeQuadInOut");
			this.setState({ index: pIndex })
			if ( autoScroll ) {
				clearTimeout(this._updater);
				this._updater = setTimeout(
					tm => this.goNext(),
					autoScroll
				)
			}
		}
		if ( prevState.index !== index ) {
			onChange && onChange(index % nbItems, this);
			changed = index + 1;
			if ( this._wasUserSnap ) {
				this._wasUserSnap = false;
			}
			else {
				tweener.scrollTo(dec + step * index + 100, 750, scrollDir, "easeQuadInOut").then(this._then);
			}
			if ( autoScroll ) {
				clearTimeout(this._updater);
				this._updater = setTimeout(
					tm => this.goNext(),
					autoScroll
				)
			}
		}
		else if ( this._then )
			this._then();
		this._then = null;
		if ( autoHeight && changed ) {
			this.updateHeight()
		}
	}
	
	componentWillReceiveProps( nextProps, nextContext ) {
		if ( nextProps.index !== this.props.index )
			this.goTo(this.props.index)
	}
	
	componentWillUnmount() {
		clearTimeout(this._updater);
		clearTimeout(this._autoHeightTm);
	}
	
	slideRefs = [];
	
	static getDerivedStateFromProps( props, state ) {
		let {
			    defaultIndex = 0,
			    visibleItems,
			    overlaps     = 1 / ((visibleItems - (visibleItems % 2)) || 1),
			    children                                                 : _childs, scrollDir,
			    defaultEntering, defaultLeaving, scrollY, infinite, index: pIndex
		    }                                      = props,
		    children                               = is.array(_childs) ? _childs : [],
		    { index = defaultIndex, sliderHeight } = state,
		    allItems                               = !infinite
		                                             ? [...children]
		                                             : [...children, ...children, ...children, ...children, ...children, ...children].map(( elem, i ) => React.cloneElement(elem, { key: i })),
		    nbGhostItems                           = allItems.length,
		    step                                   = 100 * overlaps,
		    dec                                    = infinite ? children.length * step : 0,
		    scrollAxis                             = [
			    ...defaultEntering,
			    ...tweenTools.offset(defaultLeaving, 100)
		    ],
		    tweenLines                             = allItems.map(( e, i ) => ({
			    [scrollDir]: tweenTools.offset(
				    scrollAxis,
				    i * step
			    )
		    }));
		
		return {
			sliderHeight,
			allItems,
			nbGhostItems,
			nbItems   : children.length,
			step,
			dec,
			tweenLines,
			windowSize: children.length * step,
			index
		}
	}
	
	
	render() {
		let {
			    defaultIndex = 0,
			    defaultInitial,
			    style        = {},
			    onClick,
			    infinite,
			    autoHeight,
			    visibleItems,
			    scrollDir,
			    className    = ""
		    }                                                                                                       = this.props,
		    { index = defaultIndex, allItems, nbGhostItems, step, dec, tweenLines, nbItems, sliderHeight = "auto" } = this.state;
		
		return (
			<div
				className={"rSlide slider " + className}
				style={
					{
						userSelect: "none",
						...style
					}
				}
			>
				<TweenAxis
					axe={scrollDir}
					defaultPosition={100 + dec + index * step}
					size={nbGhostItems * step + 100}
					scrollableWindow={visibleItems * step}
					
					bounds={
						!infinite && {
							min: 100,
							max: dec + nbGhostItems * step,
						} || undefined
					}
					inertia={
						{
							snapToBounds: false,
							//maxJump,
							shouldLoop  : infinite && (( v, d ) => {
								let { windowSize } = this.state;
								if ( d > 0 && (v) >= (100 + windowSize * 2) )
									return -windowSize;
								
								if ( d < 0 && (v) <= (100 + windowSize) )
									return windowSize;
							}),
							willSnap    : ( i, v ) => {
								let { nbItems }   = this.state;
								this._wasUserSnap = true;
								this.setState({ index: (i) % nbItems })
								//console.log(i % nbItems, v)
							},
							wayPoints   : allItems.map(( child, i ) => ({ at: 100 + i * step }))
						}
					}
				/>
				{autoHeight && <div
					style={
						{
							height: sliderHeight,
						}
					}/>}
				{
					allItems.map(
						( Child, i ) =>
							(
								<TweenRef
									key={i}
									ref={ref => (this.slideRefs[i] = ref)}
									//id={"slider_" + i}
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
								</TweenRef>)
					)
				}
			</div>
		);
	}
};