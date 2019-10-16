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
export default class MiniSearch extends React.Component {
	static propTypes = {};
	state            = {};
	
	render() {
		let {
			    record  : { position, size } = {},
			    appState: { curDay: day, viewType },
			    $actions
		    }     = this.props,
		    state = this.state;
		return (
			<TweenRef.div className={"MiniSearch"}
			              initial={
				              {
				              	//border:
				              }
			              }
			>
				<div className={"title"}>Test</div>
				<div className={"results"}>
					jhbkjhkjh
				</div>
			</TweenRef.div>
		);
	}
};