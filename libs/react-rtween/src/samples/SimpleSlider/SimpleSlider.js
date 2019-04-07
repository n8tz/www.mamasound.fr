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
	static propTypes = {
		//day: PropTypes.number,
	};
	state            = {};
	
	reset = () => {
		this.setState(
			{
				lastDay: this.props.day
			})
		
		
	}
	
	render() {
		let {
			    defaultIndex    = 0,
			    defaultInitial  = {
				    position : "absolute",
				    top      : "50%",
				    left     : "0px",
				    opacity  : 0,
				    transform: [
					    {
						    translateX: "0box"
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
					    apply   : {
						    opacity  : 1,
						    transform: {
							    translateX: ".5box"
						    }
					    }
				    },
			    ],
			    defaultLeaving  = [
				    {
					    type    : "Tween",
					    from    : 0,
					    duration: 100,
					    apply   : {
						    opacity  : -1,
						    transform: {
							    translateX: ".5box"
						    }
					    }
				    },
			    ],
			    children
		    }                        = this.props,
		    { index = defaultIndex } = this.state;
		return (
			<div
				className={ "rSlide slider" }
			>
				<TweenAxis
					axe={ "scrollX" }
					defaultPosition={ 100 }
					size={ children.length * 100 + 100 }
					inertia={
						{
							stops: [...children].map(( child, i ) => (100 + i * 100))
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
											i * 100
										)
									}
								}
							>
								{/*<div>*/ }
								{ Child }
								{/*</div>*/ }
							</TweenRef>
					)
				}
			</div>
		);
	}
};