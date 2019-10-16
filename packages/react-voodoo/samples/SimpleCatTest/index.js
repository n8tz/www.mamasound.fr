/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import React                 from "react";
import {asTweener, TweenRef} from "react-voodoo";


const theCatStyle   = {
	position       : "absolute",
	display        : "inline-block",
	width          : "5em",
	height         : "5em",
	cursor         : "pointer",
	overflow       : "hidden",
	margin         : "-2.5em 0 0 -2.5em",
	top            : "0box",
	left           : "0box",
	transformOrigin: "50% 50%",
	
	transform: {
		translateX: ".5box",
		translateY: ".5box",
	}
};
const theMouseStyle = {
	position       : "absolute",
	display        : "inline-block",
	width          : "50px",
	height         : "50px",
	cursor         : "pointer",
	overflow       : "hidden",
	margin         : "-25px 0 0 -25px",
	top            : "0box",
	left           : "0box",
	transformOrigin: "50% 50%",
	
	transform: {
		translateX: ".5box",
		translateY: ".5box",
	}
};

@asTweener({ enableMouseDrag: true })
export default class Sample extends React.Component {
	state         = {
		count: 0
	};
	root          = React.createRef();
	currentTarget = {
		x: .5,
		y: .5
	};
	
	pushGoTo = ( e ) => {
		let root       = this.root.current,
		    bbox       = root.getBoundingClientRect(),
		    tweener    = this.props.tweener,
		    target     = {
			    y: e.clientY - bbox.top,
			    x: e.clientX - bbox.left
		    },
		    lastTarget = this.currentTarget;
		target.y /= bbox.height;
		target.x /= bbox.width;
		target.y       = target.y.toFixed(3);
		target.x       = target.x.toFixed(3);
		
		this.currentTarget = target;
		this.setState({ count: this.state.count + 1 })
		
		//tweener.updateRefStyle(
		//	"theMouse",
		//	{
		//		transform: {
		//			translateX: target.x + "box",
		//			translateY: target.y + "box"
		//		}
		//	}
		//)
		tweener.pushAnim(
			[
				{
					target  : "theMouse",
					duration: 200,
					apply   : {
						transform: {
							translateX: (target.x - lastTarget.x) + "box",
							translateY: (target.y - lastTarget.y) + "box"
						}
					}
				}
			],
			() => {
			});
		tweener.pushAnim(
			[
				{
					target  : "theCat",
					duration: 750,
					apply   : {
						transform: {
							translateX: (target.x - lastTarget.x) + "box",
							translateY: (target.y - lastTarget.y) + "box"
						}
					}
				}
			],
			() => {
				this.setState({ count: this.state.count - 1 })
			});
		
	}
	
	render() {
		return <div className={"SimpleTest"}
		            onClick={this.pushGoTo}
		            ref={this.root}
		            style={{
			            width : "100%",
			            height: "100%"
		            }}>
			hello ! {this.state.count} concurent anims ( click somewhere ) <br/>
			<TweenRef
				id={"theMouse"}
				initial={theMouseStyle}
			>
				<div className={"mouse"}>
				</div>
			</TweenRef>
			<TweenRef
				id={"theCat"}
				initial={theCatStyle}
			>
				<div className={"cat"}>
				</div>
			</TweenRef>
		</div>;
	}
}