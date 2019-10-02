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
import ReactLightCalendar from '@lls/react-light-calendar'
import moment             from "moment";
import React              from "react";

if ( typeof window !== "undefined" ) {
	require('@lls/react-light-calendar/dist/index.css')
}
const DAY_LABELS   = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
const MONTH_LABELS = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aûot', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

export default class Calendar extends React.Component {
	constructor( props ) {
		super(props)
		this.state = {
			startDate: props.startDate, // Today
			endDate  : props.endDate,
			open     : false
		}
	}
	
	onChange = ( startDate, endDate ) => {
		this.setState({ startDate, endDate }, this.props.onChange)
	}
	toggle   = () => {
		this.setState({ open: !this.state.open })
	}
	
	render = () => {
		const { startDate, endDate, open } = this.state
		
		return <div className={"Calendar"}>
			<div onClick={this.toggle}>
				Du {moment(startDate).format("dddd DD MMMM")} au {moment(endDate).format("dddd DD MMMM")}
			</div>
			{
				open &&
				<ReactLightCalendar startDate={startDate} endDate={endDate} onChange={this.onChange}
				                    dayLabels={DAY_LABELS}
				                    monthLabels={MONTH_LABELS}/>
			}
		
		</div>
	}
}