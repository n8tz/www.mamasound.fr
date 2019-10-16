/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import React                 from "react";
import {asTweener, TweenRef} from "react-voodoo";


/**
 * This is an experimental lib
 *
 */

const initialBallStyle = {
	position: "absolute",
	display : "inline-block",
	cursor  : "pointer",
	overflow: "hidden",
	top     : "50%",
	left    : "50%",
	
	transform: [
		{
			translateX: "-50%",
			translateY: "-50%",
		},
	]
};
const areaStyle        = {
	position: "relative",
	width   : "100%",
	height  : "100%",
	overflow: "hidden",
	filter  : "url(#goo)"
};

@asTweener({ enableMouseDrag: true })
export default class Sample extends React.Component {
	root          = React.createRef();
	currentTarget = {
		x: .5,
		y: .5
	};
	
	componentDidMount() {
		this._bbox = this.root.current.getBoundingClientRect();
		window.addEventListener("mousemove", this.pushGoTo)
	}
	
	componentWillUnmount() {
		window.removeEventListener("mousemove", this.pushGoTo)
	}
	
	windowDidResize() {
		this._bbox = this.root.current.getBoundingClientRect()
	}
	
	pushGoTo = ( e ) => {
		let bbox       = this._bbox,
		    tweener    = this.props.tweener,
		    target     = {
			    y: e.clientY - bbox.top,
			    x: e.clientX - bbox.left
		    },
		    lastTarget = this.currentTarget,
		    now        = e.timeStamp,
		    tween;
		
		
		// mano debounce
		if ( now - this.lastTm < 50 )
			return;
		this.lastTm = now;
		
		target.y /= bbox.height;
		target.x /= bbox.width;
		target.y           = Math.min(1, Math.max(0, target.y.toFixed(3)));
		target.x           = Math.min(1, Math.max(0, target.x.toFixed(3)));
		this.currentTarget = target;
		
		tween = {
			transform: [{}, {
				translateX: (target.x - lastTarget.x) + "box",
				translateY: (target.y - lastTarget.y) + "box"
			}]
		};
		
		tweener.pushAnim(
			[
				{
					target  : "goo1",
					duration: 100,
					apply   : tween
				},
				{
					target  : "goo3",
					duration: 200,
					apply   : tween
				},
				{
					target  : "goo2",
					duration: 300,
					apply   : tween
				}
			]);
	};
	
	render() {
		return <div className={"GooSample"}
		            ref={this.root}>
			<svg style={{ position: 'absolute', width: 0, height: 0 }}>
				<filter id="goo">
					<feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="30"/>
					<feColorMatrix in="blur" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7"/>
				</filter>
			</svg>
			<div style={areaStyle} className={"area"}>
				<TweenRef.div id={"goo1"}
				              initial={initialBallStyle}
				              className={"gooBall"}/>
				<TweenRef.div id={"goo2"}
				              initial={initialBallStyle}
				              className={"gooBall"}/>
				<TweenRef.div id={"goo3"}
				              initial={initialBallStyle}
				              className={"gooBall"}/>
			</div>
		</div>;
	}
}