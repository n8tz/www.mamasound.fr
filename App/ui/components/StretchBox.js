/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import React      from "react";
import {TweenRef} from "react-voodoo";


export default class StretchBox extends React.Component {
	root = React.createRef();
	
	static defaultProps = {
		startPos     : 0,
		openDuration : 100,
		closeDuration: 100,
		color        : "black",
		width        : "31%",
		minHeight    : "40px",
		maxHeight    : "135px"
	};
	state               = {};
	nextTarget          = {};
	
	
	static getDerivedStateFromProps( props, state ) {
		let {
			    startPos,
			    openDuration,
			    closeDuration, minHeight, maxHeight, width, style
		    } = props;
		return {
			boxStyle    : props.boxStyle || {
				position            : "relative",
				height              : minHeight,
				borderTopLeftRadius : "10px",
				borderTopRightRadius: "10px",
				//marginLeft          : "5px",
				overflow            : "hidden",
				display             : "inline-block",
				...style,
			},
			titleStyle  : {
				position : "absolute",
				width    : "100%",
				height   : minHeight,
				left     : "0%",
				top      : "0%",
				//backgroundColor: "red",
				transform: [
					{}, {},
				]
			},
			contentStyle: {
				position : "absolute",
				width    : "100%",
				bottom   : "0%",
				left     : "0%",
				top      : minHeight,
				//backgroundColor: "green",
				transform: [
					{}, {},
				]
			},
			iconStyle   : props.iconStyle || {
				position : "absolute",
				width    : minHeight,
				height   : minHeight,
				left     : "0%",
				top      : 0,
				//backgroundColor: "green",
				transform: [
					{}, {},
				]
			},
			axis        : {
				title: [],
			}
		}
	}
	
	render() {
		let { title, children, onClick, icon, className = "" }      = this.props;
		let { boxStyle, titleStyle, contentStyle, iconStyle, axis } = this.state;
		return <TweenRef.div className={"StretchBox " + className}
		                     tweenAxis={axis.root}
		                     onClick={onClick}
		                     initial={boxStyle}>
			<TweenRef.div initial={titleStyle} className={"title"}
			              tweenAxis={axis.title}>{title}</TweenRef.div>
			<TweenRef.div initial={iconStyle} className={"icon"}
			              tweenAxis={axis.icon}>{icon}</TweenRef.div>
			<TweenRef.div initial={contentStyle} className={"content"}
			              tweenAxis={axis.content}>{children}</TweenRef.div>
		</TweenRef.div>;
	}
}