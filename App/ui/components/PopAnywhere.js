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

'use strict';
import React, {Component} from "react";
import ReactDOM           from 'react-dom'

let currentLayer;
export default class PopAnywhere extends Component {
	
	static defaultProps = {
		onClickOut: v => false,
		onMouseOut: v => false,
		hovering  : false,
		zIndex    : 1000000
	}
	
	
	constructor( props ) {
		super(...arguments);
		this.state       = {
			hovering: props.hovering
		};
		this._hoverLayer = document.createElement('div');
		this._hoverLayer.classList.add("PopAnywhereLayer");
		
		Object.assign(
			this._hoverLayer.style,
			{
				position: "absolute",
				top     : "0",
				left    : "0",
				width   : "100%",
				height  : "100%",
				zIndex  : this.props.zIndex,
			}
		);
		
	}
	
	_resize = () => {
		let wrapper    = this._clone,
		    body       = document.body,
		    hoverLayer = this._hoverLayer,
		    box        = wrapper && wrapper.getBoundingClientRect(),
		    boxStyle   = wrapper && window.getComputedStyle(wrapper),
		    dummy;
		if ( !wrapper ) return;
		dummy                = hoverLayer.firstElementChild;
		dummy.style.position = "absolute";
		dummy.style.width    = wrapper.offsetWidth + "px";
		dummy.style.height   = wrapper.offsetHeight + "px";
		dummy.style.top      = box.top + "px";
		dummy.style.left     = box.left + "px";
		dummy.style.fontSize = boxStyle.getPropertyValue('font-size');
	};
	
	componentWillReceiveProps( props ) {
		this.forceUpdate()
	}
	
	shouldComponentUpdate( props, nextState ) {
		return props.hovering != this.props.hovering
			|| props.className != this.props.className;
	}
	
	
	componentDidMount() {
		this.applyHovering();
	}
	
	componentDidUpdate() {
		this.applyHovering();
	}
	
	
	close() {
		this.props.onClickOut();
	}
	
	
	applyHovering( props ) {
		props          = props || this.props;
		let wrapper    = ReactDOM.findDOMNode(this.refs.wrapper),
		    body       = document.body,
		    hoverLayer = this._hoverLayer,
		    box        = (this._lastBox = wrapper.getBoundingClientRect()),
		    boxStyle   = (this._lastBoxStyle = window.getComputedStyle(wrapper)),
		    dummy;
		
		if ( props.hovering ) {
			//console.warn('hover ', props.hovering)
			if ( currentLayer && currentLayer !== this )
				currentLayer.close();
			
			if ( this._clone ) {
				dummy           = hoverLayer.firstElementChild;
				dummy.className = "PopAnywhere " + (props.className || '');
				
				return;
			}
			
			// hoverLayer.style.pointerEvents = "all";
			currentLayer           = this;
			hoverLayer.onclick     = e => {
				if ( !e.popped ) {
					//debugger;
					// hoverLayer.style.pointerEvents = "none";
					// document.elementFromPoint(e.clientX, e.clientY).dispatchEvent(e);
					this.close();
					
				}
			}
			hoverLayer.onmousemove = e => {
				!e.popped && this.props.onMouseOut();
			}
			
			dummy                = document.createElement('div');
			dummy.onclick        = ( e ) => {
				e.popped = true;
			};
			dummy.onmousemove    = ( e ) => {
				e.popped = true;
			};
			dummy.className      = "PopAnywhere " + (props.className || '');
			dummy.style.position = "absolute";
			dummy.style.width    = wrapper.offsetWidth + "px";
			dummy.style.height   = wrapper.offsetHeight + "px";
			dummy.style.top      = box.top + "px";
			dummy.style.left     = box.left + "px";
			dummy.style.fontSize = boxStyle.getPropertyValue('font-size');
			// console.log(boxStyle.getPropertyValue('font-size'));
			
			this.refs.root.style.zIndex     = "0";
			this.refs.root.style.visibility = "hidden";
			
			body.appendChild(hoverLayer);
			
			this._clone = wrapper.cloneNode(true);
			this.refs.root.appendChild(this._clone);
			
			dummy.appendChild(wrapper);
			hoverLayer.appendChild(dummy);
			props.onRedraw
			&& props.onRedraw(dummy)
			window.addEventListener('resize', this._resize);
			
		}
		else {
			if ( wrapper.parentNode !== this.refs.root )
				this.refs.root.appendChild(wrapper);
			else return;
			// hoverLayer.style.pointerEvents = "all";
			hoverLayer.innerHTML            = "";
			this.refs.root.style.zIndex     = null;
			this.refs.root.style.visibility = "visible";
			hoverLayer.parentNode && body.removeChild(hoverLayer);
			this._clone && this.refs.root.removeChild(this._clone);
			this._clone   = null;
			this._lastBox = null;
			if ( currentLayer === this )
				currentLayer = null;
			window.removeEventListener('resize', this._resize);
		}
	}
	
	componentWillUnmount() {
		window.removeEventListener('resize', this._resize);
		
		
		if ( this.props.hovering ) {
			this.applyHovering({ hovering: false });
		}
	}
	
	render() {
		return (
			<div className={ "PopAnywhere " + (this.props.className || '') } style={ { ...(this.props.style || {}) } }
			     ref="root">
				<div className={ "PopAnywhere_wrapper" } ref="wrapper">
					{ this.props.children }
				</div>
			</div>
		);
	}
	
};
