/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import React                                        from "react";
import {asTweener, TweenAxis, TweenRef, tweenTools} from "react-voodoo";
import {pushIn, tweenAxis}                          from "./anims";


const testItemStyle = {
	position       : "absolute",
	display        : "inline-block",
	width          : "15vh",
	height         : "15vh",
	cursor         : "pointer",
	backgroundColor: "red",
	overflow       : "hidden",
	top            : ".1box",
	left           : ".1box",
	transformOrigin: "50% 50%",
	boxShadow      : {
		blurRadius  : 30,
		color       : "rgba(0, 0, 255, .5)",
		inset       : false,
		offsetX     : -20,
		offsetY     : -20,
		spreadRadius: 1
	},
	
	transform: [{
		translateZ: "0box",
		translateX: ["-50%", ".8box"],
		translateY: ["-50%", ".8box"],
	}, { perspective: "200px" }]
};

@asTweener({ enableMouseDrag: true })
export default class Sample extends React.Component {
	state = {
		count: 0
	};
	
	componentDidScroll( pos, axe ) {
		console.log('scroll', pos, axe)
		this.forceUpdate();// force update to show scroll pos
	}
	
	pushAnim = ( e, tweener ) => {
		this.setState({ count: this.state.count + 1 })
		tweener.pushAnim(tweenTools.target(pushIn, "testItem"),
		                 () => {
			                 this.setState({ count: this.state.count - 1 })
		                 });
		
	}
	
	render() {
		let tweener = this.props.tweener;
		return <div className={"SimpleTest"} style={{
			width : "100%",
			height: "100%"
		}}>
			<TweenAxis
				axe={"scrollY"}
				defaultPosition={100}
			/>
			<TweenAxis
				axe={"scrollX"}
				defaultPosition={100}
			/>
			hello ! {this.state.count} concurent anims <br/>
			<br/>y:
			<button onClick={e => tweener.scrollTo(0, 500)}>( go to 0 )</button>
			<button onClick={e => tweener.scrollTo(100, 500)}>( go to 100 )</button>
			<button onClick={e => tweener.scrollTo(200, 500)}>( go to 200 )</button>
			<br/>x:
			<button onClick={e => tweener.scrollTo(0, 500, "scrollX")}>( go to 0 )</button>
			<button onClick={e => tweener.scrollTo(100, 500, "scrollX")}>( go to 100 )</button>
			<button onClick={e => tweener.scrollTo(200, 500, "scrollX")}>( go to 200 )</button>
			<span>
				<TweenRef
					id={"testItem"}
					initial={testItemStyle}
					tweenLines={tweenAxis}
					onClick={this.pushAnim}
				>
					<div>
						<span>drag and/or click me !</span>
					</div>
				</TweenRef>
			</span>
		</div>;
	}
}