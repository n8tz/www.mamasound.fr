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
import {Views}                       from "App/ui";
import Widget                        from 'App/ui/components/Widget.js';
import Pages                         from "App/ui/pages/(*).js";
import moment                        from "moment";
import React                         from 'react';
import {Helmet}                      from "react-helmet";
import {ContextMenu}                 from 'react-inheritable-contextmenu';
import {BrowserRouter, StaticRouter} from "react-router-dom";
import RS                            from "react-scopes";
import {ToastContainer}              from 'react-toastify';

import "regenerator-runtime/runtime";
import "./ui/styles/index.scss"

!__IS_SERVER__ && require('react-toastify/dist/ReactToastify.css');

let hookedRCE       = React.createElement;
React.createElement = function ( type, ...argz ) {
	if ( !type ) {
		console.error("Invalid TagName passed to CreateElement");
		debugger
		return <div className="error">Invalid TagName passed to CreateElement, </div>;
	}
	return hookedRCE.apply(this, arguments);
}
moment.locale('fr');
@RS.connect("widgets", "appState", "$history", "CurrentUser", "location.routes")
export default class App extends React.Component {
	state = {};
	
	constructor( props ) {
		super(props);
		props.$actions.loadStateFromUrl(props.location)
		!__IS_SERVER__ && (this._uTm = setInterval(this.keepCDay, 10000))
		
	}
	
	componentWillUnmount() {
		this._uTm && clearInterval(this._uTm);
	}
	
	keepCDay = () => {
		let { appState, $actions } = this.props;
		if ( appState.userSetCDay && moment(Date.now()).startOf("day").valueOf() > appState.curDay )
			$actions.updateCurrentDay(Date.now(), false);
	}
	
	render() {
		let Router                                                       = BrowserRouter;
		let { widgets = { items: [] }, appState, CurrentUser, $actions } = this.props;
		if ( __IS_SERVER__ )
			Router = StaticRouter;
		return <>
			
			<Helmet>
				<meta charSet="UTF-8"/>
				<meta name="viewport"
				      content="width=device-width, initial-scale=1.01, maximum-scale=1.0, user-scalable=no, minimal-ui"/>
				<meta http-equiv="X-UA-Compatible" content="IE=9;IE=10;IE=11;IE=Edge,chrome=1"/>
				<meta name="apple-mobile-web-app-capable" content="yes"/>
				<meta name="apple-touch-fullscreen" content="yes"/>
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
				<link rel="manifest" href="/manifest.json"/>
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
				<meta name="theme-color" content="#ffffff"/>
				<title>MamaSound</title>
				<link rel="stylesheet" type="text/css"
				      href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"/>
				
				<script src="/jwplayer/jwplayer.js"></script>
				<script
					src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyA7XcGxipnIMdSSBJHn3tzeJe-fU3ilCak"></script>
				<link rel="stylesheet"
				      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
				<link
					href="https://fonts.googleapis.com/icon?family=Material+Icons"
					rel="stylesheet"/>
			</Helmet>
			
			{CurrentUser && CurrentUser.isAdmin && <ContextMenu>
				<div
					onClick={() => $actions.newWidget('MamaImporter', { title: "Importer d'events" })}>
					Event Importer
				</div>
				<div
					onClick={() => $actions.newWidget('DbExplorer', { title: "Admin" })}>
					Admin
				</div>
				<div
					onClick={() => $actions.newWidget('DevTools', { title: "DevTools" }, {
						"size"    : { "width": 200, "height": 250 },
						"position": { "x": 0, "y": 0 }
					})}>
					DevTools
				</div>
			</ContextMenu>}
			
			{__IS_ADMIN__ &&
			widgets.items.map(
				widget => {
					let WidgetComp = Views.Widget[widget.type] || 'div';
					return <Widget key={widget._id} record={widget}
					               onSelect={e => $actions.selectWidget(widget._id)}
					               selected={widget._id === appState.selectedWidgetId}>
						<WidgetComp record={widget} {...widget.props}/>
					</Widget>
				}
			)
			}
			<Pages.Home/>
			<ToastContainer autoClose={5000}/>
			{/*<Route path="/" exact component={Pages.Admin}/>*/}
		</>
	}
}
