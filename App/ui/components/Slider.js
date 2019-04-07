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
import PropTypes                        from "prop-types";
import React                            from "react";
import {asTweener, TweenRef, TweenAxis} from "react-rtween";

var easingFn = require('d3-ease');


function offsetTweenLine( items, start = 0 ) {
	return items.map(
		item => (
			{
				...item,
				from: item.from + start
			}
		)
	)
	
}

@asTweener({ enableMouseDrag: true })
export default class Slider extends React.Component {
	static defaultProps = {
		
		defaultIndex: 0,
		visibleItems: 10,
		overlaps    : 1 / 4,
	};
	state               = {};
	
	reset = () => {
		this.setState(
			{
				lastDay: this.props.day
			})
		
		
	}
	
	componentDidMount() {
		let { autoScroll, defaultIndex = 0 } = this.props;
		if ( autoScroll ) {
			this._lastIndex = defaultIndex;
			this._updater   = setInterval(
				tm => {
					let {
						    children, visibleItems,
						    overlaps = 1 / (visibleItems - (visibleItems % 2))
					    }           = this.props,
					    step        = 100 * overlaps;
					this._lastIndex = (this._lastIndex + 1) % children.length;
					this.scrollTo(step * this._lastIndex + 100, 250, "scrollX")
					
				},
				autoScroll
			)
		}
	}
	
	componentWillUnmount() {
		clearInterval(this._updater);
	}
	
	render() {
		let {
			    defaultIndex    = 0,
			    visibleItems    = 5,
			    overlaps        = 1 / (visibleItems - (visibleItems % 2)),
			    area            = 1000,
			    defaultInitial  = {
				    position : "absolute",
				    height   : "100%",
				    top      : "50%",
				    left     : "50%",
				    zIndex   : 50,
				    opacity  : 0,
				    transform: [
					    {
						    perspective: "1250px",
						    translateY : "-20000px",
						    rotate     : "-1.9deg"
					    },
					    {
						    translateY: "20000px",
						    translateZ: "-200px",
						    //translateX: "1.75box",
						    //translateY: "-.5box",
						    //rotateY   : "-3deg",
						    rotateY   : "-65deg",
					    },
					    {
						    translateX: "-50%",
						    translateY: "-50%"
					    }]
			    },
			    defaultEntering = [
				    {
					    type    : "Tween",
					    from    : 0,
					    duration: 100,
					    easeFn  : easingFn.easeCubicIn,
					    apply   : {
						    transform: {
							    //translateX: "-1.25box",
							    rotate: "1.9deg",
						    },
						    zIndex   : 150,
					    }
				    },
				    {
					    type    : "Tween",
					    from    : 0,
					    duration: 35,
					    apply   : {
						    opacity: 1,
					    }
				    }, {
					    type    : "Tween",
					    from    : 55,
					    duration: 45,
					    apply   : {
						    transform: [{}, {
							    rotateY   : "65deg",
							    translateZ: "500px",
							    //rotateX: "-90deg",
						    }],
					    }
				    },
			    ],
			    defaultLeaving  = [
				    {
					    type    : "Tween",
					    from    : 0,
					    duration: 45,
					    apply   : {
						    transform: [{}, {
							    rotateY   : "65deg",
							    translateZ: "-500px",
							    //rotateX: "90deg",
						    }]
					    }
				    },
				    {
					    type    : "Tween",
					    from    : 65,
					    duration: 35,
					    apply   : {
						    opacity: -1,
					    }
				    }, {
					    type    : "Tween",
					    from    : 0,
					    duration: 100,
					    easeFn  : easingFn.easeCubicOut,
					    apply   : {
						    zIndex: -150,
						
						    transform: {
							    //translateX: "-1.25box",
							    rotate: "1.9deg",
						    }
					    }
				    },
			    ],
			    children
		    }                        = this.props,
		    { index = defaultIndex } = this.state,
		    nbItems                  = children.length,
		    step                     = 100 * overlaps;
		return (
			<div
				className={ "rSlide slider" }
				style={
					{
						transformOrigin: "0px 0px"
					}
				}
			>
				<TweenAxis
					axe={ "scrollX" }
					defaultPosition={ 100 }
					size={ nbItems * step + 100 }
					inertia={
						{
							//infinite: true,
							//hookValueUpdate( v ) {
							//	let size = nbItems * step;
							//	return 100 + ((size + v - 100) % (size));
							//},
							stops: [...children].map(( child, i ) => (100 + i * step))
						}
					}
				/>
				{
					children.map(
						( Child, i ) =>
							<TweenRef
								key={ i }
								initial={
									{
										...defaultInitial
									}
								}
								tweenLines={
									{
										scrollX: offsetTweenLine(
											[
												...defaultEntering,
												...offsetTweenLine(defaultLeaving, 100)
											],
											i * step
										)
									}
								}
							>
								<div className={ "slide" }>
									{ Child }
								</div>
							</TweenRef>
					)
				}
			</div>
		);
	}
};