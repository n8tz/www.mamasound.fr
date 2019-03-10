/*
 * The MIT License (MIT)
 * Copyright (c) 2019. Wise Wild Web
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  @author : Nathanael Braun
 *  @contact : n8tz.js@gmail.com
 */

import React                                      from 'react';
import Widget                                     from 'App/ui/containers/Widget.js';
import allWidgets                                 from "App/ui/widgets/(*).js";
import Home                                       from './ui/pages/Home';
import {BrowserRouter, StaticRouter, Route, Link} from "react-router-dom";
import AppBar                                     from '@material-ui/core/AppBar';
import Toolbar                                    from '@material-ui/core/Toolbar';
import IconButton                                 from '@material-ui/core/IconButton';
import Typography                                 from '@material-ui/core/Typography';
import HomeIcon                                   from '@material-ui/icons/Home';
import "./ui/styles/index.scss"
import {reScope, scopeToProps, propsToScope}      from "rscopes";


@scopeToProps("widgets", "appState")
export default class App extends React.Component {
	state = {};
	
	render() {
		let Router                                          = BrowserRouter;
		let { widgets = { items: [] }, appState, $actions } = this.props;
		
		if ( this.props.location )
			Router = StaticRouter;
		return <Router location={ this.props.location }>
			<React.Fragment>
				{/*<AppBar position="static" className={ "AppBar" }>*/}
					{/*<Toolbar>*/}
						{/*<Typography cvariant="h6" color="inherit" noWrap>*/}
						{/*</Typography>*/}
						{/*<div className={ "tools" }>*/}
							{/*<Link to={ "/" } className={ "homeBtn" }>*/}
								{/*<IconButton aria-label="home"*/}
								            {/*color="inherit">*/}
									{/*<HomeIcon/>*/}
								{/*</IconButton>*/}
							{/*</Link>*/}
						{/*</div>*/}
					{/*</Toolbar>*/}
				{/*</AppBar>*/}
				
				{
					widgets.items.map(
						widget => {
							let WidgetComp = allWidgets[widget.type] || 'div';
							return <Widget key={ widget._id } record={ widget }
							               onSelect={ e => $actions.selectWidget(widget._id) }
							               selected={ widget._id == appState.selectedWidgetId }>
								<WidgetComp record={ widget } { ...widget.props }/>
							</Widget>
						}
					)
				}
				
				<Route path="/" exact component={ Home }/>
			</React.Fragment>
		</Router>
	}
}
