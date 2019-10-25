/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import {Comps}        from "App/ui";
import {asFieldType}  from "App/ui/spells";
import React          from "react";
import {ChromePicker} from 'react-color'

@asFieldType
class Color extends React.Component {
	static displayName = "Color";
	
	
	onCChange = ( v ) => {
		let value = 'rgba(' + v.rgb.r + ',' + v.rgb.g + ',' + v.rgb.b + ',' + v.rgb.a + ')';
		this.setState({ value })
		this.props.onChange
		&& this.props.onChange({
			                       target: { name: this.props.name, value }
		                       });
	}
	
	render() {
		const { value, defaultValue } = this.props;
		let color                     = this.state.value || defaultValue || value || "transparent";
		return (
			<div style={{ position: "relative" }}>
				<button style={{ backgroundColor: color }}
				        onClick={e => this.setState({ open: !this.state.open })}>{color}</button>
				{this.state.open && <Comps.PopAnywhere hovering={this.state.open} onClickOut={e => this.setState({ open: !this.state.open })}>
					<ChromePicker
						type="compact"
						onChange={this.onCChange}
						color={color}
					/>
				</Comps.PopAnywhere>}
			
			</div>
		);
	}
	
};

export default Color;