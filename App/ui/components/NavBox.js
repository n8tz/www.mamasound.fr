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
import moment                             from "moment";
import React                              from "react";
import {asStore, scopeToProps, withScope} from "react-scopes";
import {ContextMenu}                      from "../../App";
import {Comps, Views}                     from "../index";

@withScope(
	{
		@asStore
		SearchValues: {
			tags  : [],
			search: undefined,
			updateSearch( str ) {
			
			},
			addTag( str ) {
			
			},
			rmTag( str ) {
			
			}
			
		},
		
	}
)
@scopeToProps("appState")
export default class NavBox extends React.Component {
	static propTypes = {};
	state            = {};
	
	render() {
		let {
			    record: { position, size } = {},
			    appState,
			    $actions
		    }     = this.props,
		    state = this.state;
		return (
			<div className={"NavBox"}>
				
				<div className={"eventTypeNav"}>
					<Comps.StretchBox
						onClick={e => $actions.setCurStyleTab(0)}
						title={
							<>
								Evenements
							</>
						}
						icon={
							<img src={require("App/ui/assets/images/jip/btn-event-on.png")}
							     className={"typeIcon"}/>
						}>
						{
							Array(appState.dayCountByViewType[0])
								.fill(0)
								.map(
									( v, i ) =>
										<Views.Events.DayEvents
											className={"dayBlock"}
											ViewItem={Views.Event.headerItem}
											key={i}
											day={moment(appState.curDay).add(i, 'day').unix() * 1000}
											viewType={0}/>
								)
						}
					</Comps.StretchBox>
					<Comps.StretchBox
						onClick={e => $actions.setCurStyleTab(1)}
						title={
							<>
								Concerts
							</>
						}
						icon={
							<img src={require("App/ui/assets/images/jip/concert-gif.gif")}
							     className={"typeIcon"}/>
						}>
						{
							Array(appState.dayCountByViewType[1])
								.fill(0)
								.map(
									( v, i ) =>
										<Views.Events.DayEvents
											className={"dayBlock"}
											ViewItem={Views.Event.headerItem}
											key={i}
											day={moment(appState.curDay).add(i, 'day').unix() * 1000}
											viewType={1}/>
								)
						}
					</Comps.StretchBox>
					<Comps.StretchBox
						onClick={e => $actions.setCurStyleTab(2)}
						title={
							<>
								Expos
							</>
						}
						
						icon={
							<img src={require("App/ui/assets/images/jip/expo-gif.gif")} className={"typeIcon"}
							/>
						}
					>
						
						{
							Array(appState.dayCountByViewType[2])
								.fill(0)
								.map(
									( v, i ) =>
										<Views.Events.DayEvents
											className={"dayBlock"}
											ViewItem={Views.Event.headerItem}
											key={i}
											day={moment(appState.curDay).add(i, 'day').unix() * 1000}
											viewType={2}/>
								)
						}
					</Comps.StretchBox>
					<Comps.StretchBox
						onClick={e => $actions.setCurStyleTab(3)}
						title={
							<>
								Theatre
							</>
						}
						
						icon={
							<img src={require("App/ui/assets/images/jip/theatre-gif.gif")} className={"typeIcon"}
							/>
						}>
						{
							Array(appState.dayCountByViewType[3])
								.fill(0)
								.map(
									( v, i ) =>
										<Views.Events.DayEvents
											className={"dayBlock"}
											ViewItem={Views.Event.headerItem}
											key={i}
											day={moment(appState.curDay).add(i, 'day').unix() * 1000}
											viewType={3}/>
								)
						}
					</Comps.StretchBox>
				
				</div>
				{/*<div className={"cDay"}>*/}
				{/*	Cette semaine :*/}
				{/*	{*/}
				{/*		//(moment(day).format("dddd DD MMMM YYYY"))*/}
				{/*	}*/}
				{/*</div>*/}
				
				<Comps.StretchBox
					className={"searchStretchBox"}
					title={
						<Comps.SearchBar/>
					}>
					last searches
				</Comps.StretchBox>
			</div>
		);
	}
};