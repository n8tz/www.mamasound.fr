/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import PropTypes from "prop-types";
import React     from 'react';

import TweenerContext from "./TweenerContext";

export default class TweenAxis extends React.Component {
	static propTypes = {
		axe            : PropTypes.string.isRequired,
		items          : PropTypes.array,
		bounds         : PropTypes.object,
		inertia        : PropTypes.any,
		defaultPosition: PropTypes.number,
		size           : PropTypes.any
	};
	state            = {};
	
	componentWillUnmount() {
		
		if ( this._tweenLines ) {
			Object.keys(this._tweenLines)
			      .forEach(axe => this._previousTweener.rmScrollableAnim(this._tweenLines[axe], axe));
			
		}
		delete this._previousTweener;
		delete this._previousScrollable;
	}
	
	render() {
		let {
			    children,
			    axe, scrollFirst, bounds,
			    scrollableWindow, inertia, size, defaultPosition,
			    items = [],
		    } = this.props;
		return <TweenerContext.Consumer>
			{
				tweener => {
					//if ( React.isValidElement(children) ) {
					//	children = React.cloneElement(
					//		children,
					//		{
					//			...tweener.tweenRef(id, style || children.props.style, initial, pos, noRef, reset),
					//			onDoubleClick: onDoubleClick && (e => onDoubleClick(e, tweener)),
					//			onClick      : onClick && (e => onClick(e, tweener))
					//		}
					//	);
					//
					//}
					if ( !this._previousAxis || this._previousAxis !== axe ) {//....
						this._previousAxis    = axe;
						this._previousInertia = inertia;
						tweener.initAxis(axe, {
							inertia,
							size,
							scrollableWindow,
							defaultPosition,
							scrollFirst,
							scrollableBounds: bounds
						}, true);
					}
					else if ( !this._previousInertia || this._previousInertia !== inertia ) {//....
						this._previousInertia = inertia;
						this._previousAxis    = axe;
						tweener.initAxis(axe, {
							inertia,
							size,
							scrollableWindow,
							defaultPosition,
							scrollFirst,
							scrollableBounds: bounds
						});
					}
					if ( !this._previousTweener || this._previousTweener !== tweener ) {// mk axe not modifiable
						this._previousTweener && this._lastTL && this._previousTweener.rmScrollableAnim(this._lastTL, this._previousAxis);
						if ( items.length )
							this._lastTL = tweener.addScrollableAnim(items, axe, size);
						this._previousTweener = tweener;
						this._previousTweens  = items;
					}
					else if ( this._previousTweens !== items ) {
						this._lastTL && tweener.rmScrollableAnim(this._lastTL, this._previousAxis);
						this._lastTL = null;
						if ( items.length )
							this._lastTL = tweener.addScrollableAnim(items, axe, size);
						this._previousTweens = items;
					}
					return <React.Fragment/>;
				}
			}
		</TweenerContext.Consumer>;
	}
}