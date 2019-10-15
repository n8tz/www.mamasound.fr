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

import React   from "react";
import isArray from "isarray";

import Picker from '@material-ui/core/Paper';
import Panel  from "@material-ui/core/Paper";

import FloatingActionButton from '@material-ui/core/Paper';
import ContentAdd           from '@material-ui/icons/Add';
import ContentRm            from '@material-ui/icons/Remove';

export default class PeriodList extends React.Component {
	
	static defaultProps = {
		value   : [],
		onChange: e => false
	}
	
	constructor( props ) {
		super(...arguments);
		this.state = {
			value: (props.defaultValue || props.value)
		};
	}
	
	/**
	 * get the value of the field
	 * @returns {
	 * {
	 * name: *, // name of the field passed in this.props.name
	 * value: *[] // field value
	 * }
	 * }
	 */
	getValue( s, p ) {
		s = s || this.state;
		p = p || this.props;
		return {
			name : p.name,
			value: s.value
		};
	}
	
	componentWillReceiveProps( props ) {
		this.setState(
			{ value: props.value })
	}
	
	onChange( i, prop, tm ) {
		//debugger;
		let { value } = this.state;
		
		value[i][prop] = parseInt(tm);
		value          = [...value];
		;
		
		this.props.onChange(
			{
				target: this.getValue({ value })// should have .value
			});
	}
	
	render() {
		var { value, defaultValue } = this.state, me = this;
		
		value = isArray(value) ? value : value && [value] || [];
		return (
			
			<Panel header={ this.props.label } className="dateTimeListField">
				<div className="head">
					Liste d'occurences :
					<FloatingActionButton
						mini={ true }
						style={ { float: 'right' } }
						title="Ajouter une occurence"
						onClick={ e => this.setState(
							{ value: value.concat([{ startTM: Date.now(), endTM: Date.now() }]) }
						) }>
						<ContentAdd/>
					</FloatingActionButton>
				</div>
				{
					value.map(
						( period, i ) => <div style={ { position: "relative" } } className="period_occur">
                            <span className="from">
                                Début :
                                <Picker
	                                label="Début"
	                                inputFormat="DD/MM/YYYY HH:mm"
	                                type="chrome"
	                                onChange={ this.onChange.bind(this, i, 'startTM') }
	                                dateTime={ period.startTM }
                                />
                            </span>
							<span className="end">
                                Fin :
                                <Picker
	                                inputFormat="DD/MM/YYYY HH:mm"
	                                type="chrome"
	                                onChange={ this.onChange.bind(this, i, 'endTM') }
	                                dateTime={ period.endTM }
                                />
                            </span>
							
							<FloatingActionButton
								mini={ true }
								style={ { float: 'right' } }
								title="Ajouter une occurence"
								onClick={ e => {
									value.splice(i, 1);
									this.setState(
										{ value }
									)
								} }>
								<ContentRm/>
							</FloatingActionButton>
						</div>
					)
				}
			</Panel>
		);
	}
	
};