/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

'use strict';

import {asFieldType}      from "App/ui/spells";
import is                 from "is";
import React, {Component} from "react";
import {JsonTree}         from "react-editable-json-tree";

@asFieldType
export default class Json extends Component {
	static displayName = "Json";
	
	constructor() {
		super(...arguments);
		var v      = this.props.defaultValue || this.props.value;
		this.state = {
			...this.state || {},
			viewmode: 'json',
			value   : (this.props.serialize ? v && JSON.parse(is.string(v) ? v : JSON.stringify(v)) : v) || {}
		};
		this.props.serialize &&
		this.props.onChange
		&& this.props.onChange({
			                       target: this.getValue()
		                       });
	}
	
	onChange( v ) {
		
		this.props.onChange
		&& this.props.onChange({
			                       target: this.getValue({ value: v })
		                       });
		this.setState({ value: v });
	}
	
	getValue( s, p ) {
		s = s || this.state;
		p = p || this.props;
		return {
			name : p.name,
			value: this.props.serialize ?
			       JSON.stringify(s.value) : s.value
		};
	}
	
	render() {
		var
			viewmode = this.state.viewmode;
		//try {
		return (
			<>
				<div className={"tabs"}>
					<div className={viewmode === "json" ? "selected" : ""}
					     onClick={( e ) => this.setState({ viewmode: "json" })}>JSON
					</div>
					<div className={viewmode === "text" ? "selected" : ""}
					     onClick={( e ) => this.setState({ viewmode: "text" })}>Text
					</div>
				</div>
				<div className={"content"}>
				
				{
					(viewmode === "json")
					&&
					<JsonTree data={this.state.value} onFullyUpdate={this.onChange.bind(this)}/>
					||
					<textarea
						ref="json" onChange={( e ) => this.onChange((Function("return " + e.target.value))())}
						style={{ width: '100%', minHeight: '10em' }}>
                            {JSON.stringify(this.state.value, null, 2)}
                        </textarea>
				}
				</div>
			</>
		);
		//} catch ( e ) {
		//	debugger;
		//}
	}
	
};
