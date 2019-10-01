/*
 *
 * Copyright (C) 2019 Nathanael Braun
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
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
			boxStyle    : {
				position            : "relative",
				width               : width,
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
			iconStyle   : {
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
				title  : [],
				icon   : [
					{
						from    : startPos,
						duration: openDuration,
						apply   : {
							opacity: -.5,
							top    : minHeight,
							left   : ["100%", "-" + maxHeight, minHeight],
							height : [maxHeight, "-" + minHeight, "-" + minHeight],
							width  : [maxHeight, "-" + minHeight, "-" + minHeight],
						}
					},
					{
						from    : startPos + openDuration,
						duration: closeDuration,
						apply   : {
							opacity: .5,
							top    : "-" + minHeight,
							left   : ["-100%", maxHeight, "-" + minHeight],
							height : ["-" + maxHeight, minHeight, minHeight],
							width  : ["-" + maxHeight, minHeight, minHeight],
						}
					}
				],
				content: [],
				root   : [
					{
						from    : startPos,
						duration: openDuration,
						apply   : {
							height   : [maxHeight, "-" + minHeight],
							transform: [, , {}],
						}
					},
					{
						from    : startPos + openDuration,
						duration: closeDuration,
						apply   : {
							height   : ["-" + maxHeight, minHeight],
							transform: [, , {}],
						}
					}
				]
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