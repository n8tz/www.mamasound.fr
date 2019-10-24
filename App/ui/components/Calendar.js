/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import {Comps}     from "App/ui";
import InputMoment from 'input-moment'
import moment      from "moment";
import React       from "react";

if ( !__IS_SERVER__ ) {
	require('input-moment/dist/input-moment.css')
}
const DAY_LABELS   = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
const MONTH_LABELS = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aûot', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

export default class Calendar extends React.Component {
	constructor( props ) {
		super(props)
		this.state = {
			startDate  : props.startDate, // Today
			endDate    : props.endDate,
			useInput   : false,
			displayTime: false,
			open       : false
		}
	}
	
	onChange      = ( startDate ) => {
		this.props.onChange({ startDate: startDate.valueOf() });
		//console.log(moment(startDate).format("DD/MM/YY HH:mm"))
		this.input.current
		&& (this.input.current.value = moment(startDate).format("DD/MM/YY HH:mm"));
		//setTimeout(tm => this.toggle())
	}
	onInputChange = ( e ) => {
		//debugger
		this.props.onChange({ startDate: moment(e.target.value, "DD/MM/YY HH:mm").valueOf() })
	}
	toggle        = () => {
		this.setState({ open: !this.state.open })
	}
	input         = React.createRef();
	render        = () => {
		const { startDate, endDate, displayTime, useInput } = this.props
		const { open }                                      = this.state;
		
		return <div className={"Calendar"}>
			<div onClick={this.toggle} className={"datePeriod"}>
				{
					endDate ?
					<>Du {moment(startDate).format("DD MMM")} au {moment(endDate).format("DD MMM")}</>
					        :
					useInput ?
					<>
						<input type={"text"}
						       ref={this.input}
						       defaultValue={moment(startDate).format("DD/MM/YY HH:mm")}
						       onChange={this.onInputChange}/>
					</>
					         :
					moment(startDate).format("DD/MM/YY HH:mm")
				}
			</div>
			{
				open &&
				<Comps.PopAnywhere hovering={open} onClickOut={this.toggle}>
					<InputMoment moment={moment(startDate)}
					             onSave={this.toggle}
					             onChange={this.onChange}
						//dayLabels={DAY_LABELS}
						//timezone={"Europe/Paris"}
						//monthLabels={MONTH_LABELS}
					/>
				</Comps.PopAnywhere>
			}
		
		</div>
	}
}