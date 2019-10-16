/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import React            from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField        from '@material-ui/core/TextField';
import {asFieldType}    from "App/ui/spells";

@asFieldType
export default class Text extends React.Component {
	static displayName = "Text";
	
	render() {
		let { defaultValue, value = defaultValue, placeholder } = this.props;
		
		return (
			<TextField
				placeholder={this.props.placeholder}
				className={this.props.className}
				defaultValue={value}
				onChange={this.onChange}
			/>
		);
	}
}
;
