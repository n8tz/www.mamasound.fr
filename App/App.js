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
import "regenerator-runtime/runtime";
import React                                      from 'react';
import moment                                     from 'moment';
import Pages                                      from "App/ui/pages/(*).js";
import Widget                                     from 'App/ui/components/Widget.js';
import {Views}                                    from "App/ui";
import {BrowserRouter, StaticRouter, Route, Link} from "react-router-dom";
import {ContextMenu}                              from 'react-inheritable-contextmenu';
import "./ui/styles/index.scss"
import {reScope, scopeToProps, propsToScope}      from "rscopes";

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
@scopeToProps("widgets", "appState", "FacebookPage")
export default class App extends React.Component {
	state = {};
	
	render() {
		let Router                                          = BrowserRouter;
		let { widgets = { items: [] }, appState, $actions } = this.props;
		if ( this.props.location )
			Router = StaticRouter;
		return <Router location={this.props.location}>
			<React.Fragment>
				{__ADMIN__ && <ContextMenu>
					<div
						onClick={() => $actions.newWidget('MamaImporter', { title: "Importer d'events" })}>
						New Importer
					</div>
					<div
						onClick={() => $actions.newWidget('DBQuery', { title: "Db query & delete" })}>
						New DBQuery
					</div>
				</ContextMenu>}
				
				{__ADMIN__ &&
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
				<Route path="/" exact component={Pages.Home}/>
				{/*<Route path="/" exact component={Pages.Admin}/>*/}
			</React.Fragment>
		</Router>
	}
}
