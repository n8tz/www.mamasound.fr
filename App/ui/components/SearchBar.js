/*
 * www.mamasound.fr
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
import Fab            from '@material-ui/core/Fab';
import TextField      from '@material-ui/core/TextField';
import moment         from "moment";
import React          from "react";
import {scopeToProps} from "react-scopes";

@scopeToProps("appState")
export default class SearchBar extends React.Component {
	static propTypes = {};
	state            = {
		single: null,
		multi : null,
	};
	
	handleSearchChange = e => {
		this.setState({
			              search: e.target.value,
		              });
		this.props.$actions.updateCurrentSearch(e.target.value)
	};
	
	render() {
		const {
			      appState: { curDay: day, currentSearch }, disabled,
		      } = this.props;
		return (
			<div
				className={"SearchBar"}
			>
				<Fab className={"searchIcon"}>
					<div className={"material-icons icon"}>search</div>
				</Fab>
				{/*<div className={"cDay"}>*/}
				{/*	{*/}
				{/*		(moment(day).format("dddd DD MMMM YYYY"))*/}
				{/*	}*/}
				{/*	{currentSearch&&(" - "+currentSearch)}*/}
				
				{/*</div>*/}
				<TextField
					className={"input"}
					value={this.state.search}
					onChange={this.handleSearchChange}
				/>
			</div>
		);
	}
};