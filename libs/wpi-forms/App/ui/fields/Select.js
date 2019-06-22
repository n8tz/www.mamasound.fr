/*
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

import React         from "react";
import {asFieldType} from "App/ui/spells";
import Input         from '@material-ui/core/Input';
import InputLabel    from '@material-ui/core/InputLabel';
import MenuItem      from '@material-ui/core/MenuItem';
import ListItemText  from '@material-ui/core/ListItemText';
import SelectTag     from '@material-ui/core/Select';
import Checkbox      from '@material-ui/core/Checkbox';

@asFieldType
export default class Select extends React.Component {
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
	
	onChange = ( e ) => {
		this.props.onChange
		&& this.props.onChange({
			                       target: this.getValue(e.target)// should have .value
		                       });
		this.setState({ value: e.target.value });
	}
	
	render() {
		let { defaultValue, value = defaultValue || [] } = this.state;
		
		return (
			<SelectTag
				value={value}
				multiple={this.props.multiple}
				onChange={this.onChange}
				input={<Input id="select-multiple"/>}
				//renderValue={selected => is.array(selected.join(', ')}
			>
				{
					this.props.options &&
					this.props.options.map(
						( v ) =>
							<MenuItem key={v.value} value={v.value} className={"selectItem"}>
								{
									this.props.multiple &&
									<Checkbox checked={(value).indexOf(v.value) > -1}/>
									|| ''
								}
								{v.label}
							</MenuItem>)
				}
			</SelectTag>
		);
	}
	
};