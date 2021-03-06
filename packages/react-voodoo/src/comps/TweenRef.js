/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import is      from "is";
import React   from 'react';
import shortid from 'shortid';

import TweenerContext from "./TweenerContext";

function setTarget( anims, target ) {
	return anims.map(
		tween => ({
			...tween,
			target
		})
	)
}

export default class TweenRef extends React.Component {
	
	static propTypes = {};
	state            = {};
	__tweenableId    = shortid.generate();
	
	componentWillUnmount() {
		if ( this._tweenAxis ) {
			Object.keys(this._tweenAxis)
			      .forEach(axe => this._currentTweener.rmScrollableAnim(this._tweenAxis[axe], axe));
			
		}
		if ( this._currentTweener ) {
			this._currentTweener.rmTweenRef(this.__tweenableId)
			this._currentTweener.setRootRef(undefined);
		}
		delete this._currentTweener;
		delete this._previousScrollable;
	}
	
	//componentDidMount() {
	//	let {
	//		    children,
	//		    id = this.__tweenableId,
	//	    }      = this.props,
	//	    target = this._currentTweener.getTweenableRef(id);
	//	let props  = [...target.style];// should reset ssr initials ?
	//	props.forEach(p => (target.style[p] = undefined));
	//	this._currentTweener._updateTweenRef()
	//}
	
	render() {
		let {
			    children,
			    id            = this.__tweenableId,
			    style, initial, pos, noRef, reset, tweener,
			    isRoot,
			    tweenLines,
			    tweenAxis     = tweenLines,
			    onClick       = children && children.props && children.props.onClick,
			    onDoubleClick = children && children.props && children.props.onDoubleClick
		    } = this.props;
		return <TweenerContext.Consumer>
			{
				parentTweener => {//@todo : must be better method
					
					
					parentTweener = tweener || parentTweener;
					
					if ( !parentTweener ) {
						console.error("No voodoo tweener found in the context, is there any parent with asTweener ?")
						return <React.Fragment/>;
					}
					
					let twRef = this._lastRef || parentTweener.tweenRef(id, style || children.props && children.props.style, initial,
					                                                    pos, noRef);
					
					
					if ( this._currentTweener !== parentTweener || this._previousScrollable !== tweenAxis ) {
						if ( this._tweenAxis ) {
							Object.keys(this._tweenAxis)
							      .forEach(axe => this._currentTweener.rmScrollableAnim(this._tweenAxis[axe], axe));
							
						}
						//twRef = parentTweener.tweenRef(id, style || children.props && children.props.style, initial,
						// pos, noRef, reset);
						if ( this._currentTweener !== parentTweener )
							this._currentTweener && this._currentTweener.rmTweenRef(id);
						if ( this._previousScrollable !== tweenAxis )
						twRef = parentTweener.tweenRef(id, style || children.props && children.props.style, initial,
						                               pos, noRef, true)
						//}
						
						if ( tweenAxis && is.array(tweenAxis) )
							this._tweenAxis = { scrollY: parentTweener.addScrollableAnim(setTarget(tweenAxis, id)) };
						else
							this._tweenAxis = tweenAxis &&
								Object.keys(tweenAxis)
								      .reduce(( h, axe ) => (h[axe] = parentTweener.addScrollableAnim(setTarget(tweenAxis[axe], id), axe), h), {});
						
						twRef.style = { ...parentTweener._updateTweenRef(id) };
						
						if ( this.props.hasOwnProperty("isRoot") ) {
							this._currentTweener && this._currentTweener.setRootRef(undefined);
							tweener.setRootRef(id);
						}
						
						this._currentTweener     = parentTweener;
						this._previousScrollable = tweenAxis;
						
					}
					else if ( twRef ) {
						twRef.style = { ...parentTweener._updateTweenRef(id) };
					}
					
					let refChild = React.Children.only(children);
					
					if ( refChild && React.isValidElement(refChild) ) {
						refChild      = React.cloneElement(
							refChild,
							{
								...twRef,
								onDoubleClick: onDoubleClick && (e => onDoubleClick(e, parentTweener)),
								onClick      : onClick && (e => onClick(e, parentTweener))
							}
						);
						this._lastRef = twRef;
						//console.log(twRef, refChild)
						return refChild;
					}
					else {
						console.error("Invalid voodoo TweenRef child : ", id)
					}
					return <div>Invalid</div>;
				}
			}
		</TweenerContext.Consumer>;
	}
}

TweenRef.div = ( { children, className, ...props } ) => {
	return <TweenRef {...props}>
		<div className={className}>{children}</div>
	</TweenRef>;
}