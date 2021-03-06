/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import React            from "react";
import is               from "is";
import PropTypes        from 'prop-types'; // ES6
import ReactDom         from "react-dom";
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {
	isSpell, spells, Store, Scope, withScope, propsToScope, scopeToProps,
	scopeToState
} from "react-scopes";

function isReactRenderable( obj ) {
	return obj.prototype instanceof React.Component || obj === React.Component || obj.$$typeof || is.func(obj);
}

export default function asFieldType( ...argz ) {
	let BaseComponent = (!argz[0] || (isReactRenderable(argz[0]))) && argz.shift(),
	    cfg           = (!argz[0] || is.object(argz[0])) && argz.shift();
	
	if ( !(BaseComponent) ) {
		return function ( BaseComponent ) {
			return asFieldType(BaseComponent, cfg)
		}
	}
	const compName = BaseComponent.displayName || BaseComponent.name;
	return class Field extends BaseComponent {
		static displayName = compName;
		
		constructor( props ) {
			super(...arguments);
			this.state = {
				value: props.defaultValue || props.value,
				...(this.state || {})
			};
		}
		
		onChange = ( e ) => {
			let v = this.getValue(e.target);
			this.props.onChange
			&& this.props.onChange({
				                       target: v
			                       });
			this.setState({ value: v.value });
		}
		
		getValue( s, p ) {
			if ( super.getValue )
				return super.getValue(s, p);
			s = s || this.state;
			p = p || this.props;
			return {
				name : p.name,
				value: s.value
			};
		}
		
		render() {
			return <div style={this.props.style}
			            className={(this.props.className || '') + "field field_" + compName}>
				<span className={"label"}>{this.props.label}</span>
				<span className={"input"}>{super.render()}</span>
			</div>
		}
	}
}
