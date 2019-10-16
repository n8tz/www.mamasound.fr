/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import React            from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switcher         from '@material-ui/core/Switch';
import {asFieldType}    from "App/ui/spells";

@asFieldType
export default class Switch extends React.Component {
	static displayName = "Switch";
	getValue( s, p ) {
		s = s || this.state;
		p = p || this.props;
		return {
			name : p.name,
			value: s.checked
		};
	}
	render() {
		let { defaultValue, value = defaultValue } = this.props;
		
		return (
			<Switcher
				className={ this.props.className }
				defaultChecked={ value }
				onChange={ this.onChange }
			/>
		);
	}
}
;
