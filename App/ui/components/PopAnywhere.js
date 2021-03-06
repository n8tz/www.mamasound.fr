/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

'use strict';
import React, {Component} from "react";
import ReactDOM           from 'react-dom'

let currentLayer;
export default class PopAnywhere extends Component {
	
	static defaultProps = {
		onClickOut : v => false,
		onMouseOut : v => false,
		hovering   : false,
		keepVisible: false,
		zIndex     : 10000
	}
	
	
	constructor( props ) {
		super(...arguments);
		this.state = {
			hovering: props.hovering
		};
		if ( !__IS_SERVER__ ) {
			
			this._hoverLayer = document.createElement('div');
			this._hoverLayer.classList.add("PopAnywhereLayer");
			
			Object.assign(
				this._hoverLayer.style,
				{
					position: "fixed",
					top     : "0",
					left    : "0",
					width   : "100%",
					height  : "100%",
					zIndex  : this.props.zIndex,
				}
			);
		}
		
	}
	
	_resize = () => {
		let wrapper    = this._clone,
		    body       = document.body,
		    hoverLayer = this._hoverLayer,
		    box        = wrapper && this.getBoxState(wrapper, true),
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
	
	
	getBoxState( wrapper, force ) {
		let box = (force || !this._lastBox) && wrapper.getBoundingClientRect();
		box     = this._lastBox = (!force && this._lastBox) || {
			top   : box.top,
			left  : box.left,
			width : box.width,
			height: box.height,
		};
		
		if ( window.innerHeight < (box.top + box.height) )
			box.top -= box.height + 30;
		if ( window.innerWidth < (box.left + box.width) )
			box.left -= box.width;
		return box;
	}
	
	
	applyHovering( props ) {
		props          = props || this.props;
		let wrapper    = ReactDOM.findDOMNode(this.refs.wrapper),
		    body       = document.body,
		    hoverLayer = this._hoverLayer,
		    box        = this.getBoxState(wrapper),
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
					// hoverLayer.style.pointerEvents = "none";
					// document.elementFromPoint(e.clientX, e.clientY).dispatchEvent(e);
					this.close();
					
					//e.stopPropagation()
				}//else e.stopPropagation()
			}
			hoverLayer.onmousemove = e => {
				this.props.hovering && this.props.onMouseOut();
			}
			
			
			dummy                = document.createElement('span');
			dummy.className      = "PopAnywhere " + (props.className || '');
			dummy.style.position = "absolute";
			dummy.style.width    = box.width + "px";
			dummy.style.height   = box.height + "px";
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
			wrapper.onclick     = ( e ) => {
				e.popped = true;
			};
			wrapper.onmousemove = ( e ) => {
				e.popped = true;
			};
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
			<div className={"PopAnywhere " + (this.props.className || '')} style={{ ...(this.props.style || {}) }}
			     ref="root">
				<div className={"PopAnywhere_wrapper"} ref="wrapper">
					{this.props.children}
				</div>
			</div>
		);
	}
	
};
