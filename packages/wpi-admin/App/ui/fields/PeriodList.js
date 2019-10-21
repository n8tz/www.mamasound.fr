/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import FloatingActionButton from '@material-ui/core/Button';
import ContentAdd           from '@material-ui/icons/Add';
import ContentRm            from '@material-ui/icons/Remove';
import {Comps}              from "App/ui";
import {asFieldType}        from "App/ui/spells";
import is                   from "is";
import moment               from "moment";
import React                from "react";

@asFieldType
export default class PeriodList extends React.Component {
	static displayName  = "PeriodList";
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
	
	onChange( i, prop, tm ) {
		let { value } = this.state;
		
		value[i][prop] = parseInt(tm);
		value          = [...value];
		this.props.onChange(
			{
				target: this.getValue({ value })// should have .value
			});
	}
	
	list = React.createRef();
	
	render() {
		var { value, defaultValue } = this.state, me = this;
		
		value = is.array(value) ? value : value && [value] || [];
		return (
			
			<>
				<div className="head">
					Liste d'occurences :
					<FloatingActionButton
						mini={true}
						style={{ float: 'right' }}
						title="Ajouter une occurence"
						onClick={e => {
							this.setState(
								{
									value: value = value.concat([value.length
									                             ? {
											startTM: moment(value[value.length - 1].startTM).add(1, 'day'),
											endTM  : moment(value[value.length - 1].endTM).add(1, 'day')
										}
									                             : { startTM: Date.now(), endTM: Date.now() }])
								},
								s => {
									this.list.current.scrollTop = this.list.current.scrollHeight;
								}
							)
							
							this.props.onChange(
								{
									target: this.getValue({ value })// should have .value
								});
						}}>
						<ContentAdd/>
					</FloatingActionButton>
				</div>
				<div className={"periods"} ref={this.list}>
					{
						value.map(
							( period, i ) => <div style={{ position: "relative" }} className="period_occur">
                            <span className="from">
                                Début :
	                            <Comps.Calendar startDate={period.startTM} useInput={true}
	                                            onChange={this.onChange.bind(this, i, 'startTM')}/>
                            </span>
								<span className="end">
                                Fin :
	                            <Comps.Calendar startDate={period.endTM} useInput={true}
	                                            onChange={this.onChange.bind(this, i, 'endTM')}/>
                            </span>
								
								<FloatingActionButton
									mini={true}
									style={{ float: 'right' }}
									title="Ajouter une occurence"
									onClick={e => {
										value.splice(i, 1);
										this.setState(
											{ value }
										)
										this.props.onChange(
											{
												target: this.getValue({ value })// should have .value
											});
									}}>
									<ContentRm/>
								</FloatingActionButton>
							</div>
						)
					}
				</div>
			</>
		);
	}
	
};