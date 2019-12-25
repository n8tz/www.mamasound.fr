/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import moment from "moment";
import React  from "react";

import RS            from "react-scopes";
import {TweenRef}    from "react-voodoo";
import {ContextMenu} from "../../App";
import {Comps}       from "../index";

@RS.connect("appState", "Styles.views.Events.EventsList.NavBox:Styles")
export default class NavBox extends React.Component {
	static propTypes = {};
	state            = {};
	
	render() {
		let {
			    Styles, style, children,
			    appState,
			    $actions
		    }     = this.props,
		    state = this.state,
		    day   = appState.curVisibleDay || appState.curDay;
		return (
			<div className={"NavBox"} style={style}>
				<div className={"content container"}>
					{children}
					<TweenRef id={"eventTypeNav"} style={Styles.typesNav}
					          tweenAxis={Styles.Axis}>
						<div className={"eventTypeNav"}>
							<div className={"menuTabGroup articleMenu" + (appState.selectedTabGroup === "articles"
							                                              ? " selected"
							                                              : "")}>
								{
									[
										{
											title: "Les articles",
											//icon : require("App/ui/assets/images/jip/btn-event-on.png")
										},
										{
											title: "MamaEvents",
											//icon : require("App/ui/assets/images/jip/concert-gif.gif")
										},
									].map(
										( { title, icon }, i ) => <a href={"/" + appState.viewTypesList[i]}
										                             key={i}
										                             onClick={e => (e.preventDefault(), $actions.setCurArticleTab(i))}
										                             className={"menuTab menu" + title + " " + (appState.viewType === i
										                                                                        ? "selected"
										                                                                        : "")}>
											{title}
										</a>
									)
								}
							</div>
							<div className={"menuTabGroup eventMenu " + (appState.selectedTabGroup === "events"
							                                             ? "selected"
							                                             : "")}>
								{
									[
										{
											title: "Evénements",
											//icon : require("App/ui/assets/images/jip/btn-event-on.png")
										},
										{
											title: "Concerts",
											//icon : require("App/ui/assets/images/jip/concert-gif.gif")
										},
										{
											title: "Expos",
											//icon : require("App/ui/assets/images/jip/expo-gif.gif")
										},
										{
											title: "Theatre",
											//icon : require("App/ui/assets/images/jip/theatre-gif.gif")
										},
									].map(
										( { title, icon }, i ) => <a href={"/" + appState.viewTypesList[i]}
										                             key={i}
										                             onClick={e => (e.preventDefault(), $actions.setCurStyleTab(i))}
										                             className={"menuTab menu" + title + " " + (appState.viewType === i
										                                                                        ? "selected"
										                                                                        : "")}>
											{title}
										</a>
									)
								}
							</div>
							<div className={"menuTabGroup mapMenu" + (appState.selectedTabGroup === "map"
							                                          ? " selected"
							                                          : "")}>
								{
									[
										{
											title: "Autour de toi",
											//icon : require("App/ui/assets/images/jip/btn-event-on.png")
										},
										{
											title: "Bars",
											//icon : require("App/ui/assets/images/jip/btn-event-on.png")
										},
										{
											title: "Flippers",
											//icon : require("App/ui/assets/images/jip/concert-gif.gif")
										},
									].map(
										( { title, icon }, i ) => <a href={"/" + appState.viewTypesList[i]}
										                             key={i}
										                             onClick={e => (e.preventDefault(), $actions.setCurStyleTab(i))}
										                             className={"menuTab menu" + title + " " + (appState.viewType === i
										                                                                        ? "selected"
										                                                                        : "")}>
											{title}
										</a>
									)
								}
							</div>
						</div>
					</TweenRef>
					
					<TweenRef.div className={"cDayOverlay"} style={Styles.botTopOverlay}>
						<Comps.SearchBar/>
						{(moment(day).isSame(moment(), 'week'))
						&&
						moment(day).calendar(moment(), {
							sameDay : '[Aujourd\'hui]',
							nextDay : '[Demain]',
							nextWeek: 'dddd',
							lastDay : '[hier]',
							lastWeek: 'dddd [dernier]',
							sameElse: '[Le ]DD/MM/YYYY'
						})
						||
						(moment(day).format("dddd DD MMMM YYYY"))}
					</TweenRef.div>
				
				</div>
			</div>
		);
	}
};