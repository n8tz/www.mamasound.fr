/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import React from "react";
import is    from "is";

import TweenerContext from "../comps/TweenerContext";


const SimpleObjectProto = ({}).constructor;


/**
 * asTweener decorator
 * @param argz
 * @returns {*}
 */
export default function withTweener( ...argz ) {
	
	let BaseComponent = (!argz[0] || argz[0].prototype instanceof React.Component || argz[0] === React.Component) && argz.shift(),
	    opts          = (!argz[0] || argz[0] instanceof SimpleObjectProto) && argz.shift() || {};
	
	if ( !(BaseComponent && (BaseComponent.prototype instanceof React.Component || BaseComponent === React.Component)) ) {
		return function ( BaseComponent ) {
			return withTweener(BaseComponent, opts)
		}
	}
	
	class TweenerToProps extends React.Component {
		static displayName = (BaseComponent.displayName || BaseComponent.name);
		
		render() {
			return <TweenerContext.Consumer>
				{
					tweener => {
						return <BaseComponent { ...this.props } tweener={ tweener } ref={ this.props.forwardedRef }/>;
					}
				}
			</TweenerContext.Consumer>;
		}
	}
	
	
	let withRef         = React.forwardRef(( props, ref ) => {
		return <TweenerToProps { ...props } forwardedRef={ ref }/>;
	});
	withRef.displayName = TweenerToProps.displayName;
	return withRef;
}
