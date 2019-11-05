/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import {Comps, Views}     from 'App/ui';
import moment             from "moment";
import React              from "react";
import RS, {scopeToProps} from "react-scopes";
import {TweenRef}         from "react-voodoo";

import scopes from 'App/scopes/(*).js';

@RS(
	{ ...scopes.ArticleList }
)
@RS.fromProps(
	[
		//"day:DayEventsQuery.curDay",
		//"filter:EventList.filter",
		"viewType:Articles.query.viewType"
	])
@RS.connect("appState", "Articles.data.articles")
export default class ArticleList extends React.Component {
	static propTypes = {};
	state            = {};
	
	componentDidMount() {
	
	}
	
	componentDidUpdate( prevProps, prevState, snapshot ) {
	}
	
	componentWillUnmount() {
	
	}
	
	render() {
		let {
			    appState,
			    Styles, style,
			    children,
			    $actions, articles
		    }     = this.props,
		    state = this.state;
		//console.log('EventList::render:136: ', activeScroll);
		return (
			<div className={"ArticleList container"} style={style}>
				<div className={"content"}>
					{
						articles
						&& articles.items
						&& articles.items.map(
							article => <span><Views.Article.card record={article}
							                                     className={"content"}
							                                     onClick={e => {
								                                     $actions.selectFocus(article._id, article._cls)
							                                     }}/></span>
						)
					}
				</div>
			</div>
		);
	}
};