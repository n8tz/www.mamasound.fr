/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import {Comps}       from "App/ui";
import {asFieldType} from "App/ui/spells";
import moment        from "moment";
import React         from "react";

@asFieldType
export default class Date extends React.Component {
	static displayName  = "Date";
	static defaultProps = {}
	
	constructor( props ) {
		super(...arguments);
		this.state = {
			value: (props.defaultValue || props.value) || props.options && props.options[0] && props.options[0].value
		};
		if ( props.multiple && this.state.value && !is.array(this.state.value) )
			this.state.value = [this.state.value];
		
	}
	
	getValue( s, p ) {
		s = s || this.state;
		p = p || this.props;
		return {
			name : p.name,
			value: s.value
		};
	}
	
	handleDateChange = period => {
		//debugger
		//this.calendar.current.toggle();
		this.setState(
			{ value: period.startDate },
			e => (
				this.props.onChange
				&& this.props.onChange({
					                       target: this.getValue()// should have .value
				                       }))
		);
		//this.props.$actions.updateCurrentDay(e.startDate);
	};
	onChange         = ( e ) => {
		this.props.onChange
		&& this.props.onChange({
			                       target: this.getValue(e.target)// should have .value
		                       });
	}
	calendar         = React.createRef();
	
	render() {
		let { defaultValue, value = defaultValue || [] } = this.state;
		
		return (
			<>
				<Comps.Calendar startDate={value}
				                ref={this.calendar}
				                {...this.props}
				                onChange={this.handleDateChange}/>
			</>
		);
	}
	
};