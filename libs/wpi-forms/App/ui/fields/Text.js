/*
 *
 * Copyright (C) 2019 Nathanael Braun
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React            from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField        from '@material-ui/core/TextField';
import {asFieldType}    from "App/ui/spells";

@asFieldType
export default class Text extends React.Component {
	render() {
		let { defaultValue, value = defaultValue } = this.props;
		
		return (
			<TextField
				className={ this.props.className }
				defaultValue={ value }
				onChange={ this.onChange }
			/>
		);
	}
}
;
