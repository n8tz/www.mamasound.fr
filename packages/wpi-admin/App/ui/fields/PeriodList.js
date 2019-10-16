/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
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