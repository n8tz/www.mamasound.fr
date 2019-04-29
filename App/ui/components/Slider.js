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
import PropTypes                                    from "prop-types";
import React                                        from "react";
import {asTweener, TweenRef, TweenAxis, tweenTools} from "react-rtween";
import {reScope, scopeToProps, propsToScope}        from "rscopes";
import {withStateMap, asRef, asStore}               from "rescope-spells";

@scopeToProps("Anims")
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
			    defaultIndex = 0,
			    visibleItems = 5,
			    overlaps     = 1 / (visibleItems - (visibleItems % 2)),
			    Anims: { MainSlider: { defaultInitial, defaultEntering, defaultLeaving } },
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
						//transformOrigin: "0px 0px"
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
										scrollX: tweenTools.offset(
											[
												...defaultEntering,
												...tweenTools.offset(defaultLeaving, 100)
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