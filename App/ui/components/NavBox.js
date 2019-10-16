/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import React                              from "react";
import {asStore, scopeToProps, withScope} from "react-scopes";
import {TweenRef}                         from "react-voodoo";
import {ContextMenu}                      from "../../App";
import {Comps}                            from "../index";

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
@scopeToProps("appState", "Styles.views.Events.EventsList.NavBox:Styles")
export default class NavBox extends React.Component {
	static propTypes = {};
	state            = {};
	
	render() {
		let {
			    Styles, style,children,
			    appState,
			    $actions
		    }     = this.props,
		    state = this.state;
		return (
			<div className={"NavBox"} style={style}>
				<div className={"content container"}>
					{children}
					<TweenRef.div id={"eventTypeNav"} className={"eventTypeNav"} style={Styles.typesNav}
					              tweenAxis={Styles.Axis}>
						{
							[
								{ title: "Evenements", icon: require("App/ui/assets/images/jip/btn-event-on.png") },
								{ title: "Expos", icon: require("App/ui/assets/images/jip/expo-gif.gif") },
								{ title: "Theatre", icon: require("App/ui/assets/images/jip/theatre-gif.gif") },
							].map(
								( { title, icon }, i ) =>
									<Comps.StretchBox
										className={appState.viewType === i ? "selected" : ""}
										onClick={e => $actions.setCurStyleTab(i)}
										title={title}
										key={i}
										icon={<img src={icon} className={"typeIcon"}/>}
										{...Styles.StretchBox}
									>
										{/*{*/}
										{/*	Array(appState.dayCountByViewType[i])*/}
										{/*		.fill(0)*/}
										{/*		.map(*/}
										{/*			( v, i2 ) =>*/}
										{/*				<Views.Events.DayEvents*/}
										{/*					className={"dayBlock"}*/}
										{/*					ViewItem={Views.Event.headerItem}*/}
										{/*					key={i2}*/}
										{/*					day={moment(appState.curDay).add(i2, 'day').unix() * 1000}*/}
										{/*					viewType={i}/>*/}
										{/*		)*/}
										{/*}*/}
									</Comps.StretchBox>
							)
						}
					</TweenRef.div>
					{/*<div className={"cDay"}>*/}
					{/*	Cette semaine :*/}
					{/*	{*/}
					{/*		//(moment(day).format("dddd DD MMMM YYYY"))*/}
					{/*	}*/}
					{/*</div>*/}
					
					<TweenRef initial={Styles.SearchBar}>
						<Comps.SearchBar {...Styles.SearchBarProps}/>
					</TweenRef>
				
				</div>
			</div>
		);
	}
};