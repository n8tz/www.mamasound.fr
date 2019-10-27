/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

'use strict';

import {createBrowserHistory, createMemoryHistory} from 'history';
import moment                                      from "moment";
import {Store}                                     from 'react-scopes';
// import APIUtils from 'App/db';

export default class $history extends Store {
	static actions = {
		loadStateFromUrl( url = !__IS_SERVER__ && location.pathname || '/', state ) {
			this.updateLocation({ pathname: url })
		},
		history_push( url, state ) {
			this.history.push(url, state)
		},
		history_set( url, state ) {
			this.history.replace(url, state)
		}
	};
	
	state   = {
		//routerHistory:
	};
	history = __IS_SERVER__ ? createMemoryHistory() : createBrowserHistory();
	
	//data  = typeof window === "undefined" ? undefined : { ...location };
	
	//shouldSerialize() {
	//	return false;
	//}
	
	constructor() {
		super(...arguments);
		this._list = this.history.listen(this.updateLocation);
	}
	
	destroy() {
		super.destroy();
		this._list();
	}
	
	apply( data, state, { location } ) {
		return this.history.location || undefined
	}
	
	updateLocation = ( location, action ) => {
		if ( action === "REPLACE" )
			return;
		let path = location.pathname.split('/'), $actions = this.$actions;
		path.shift();
		if ( path.length === 1 ) {
			if ( path[0] === "" ) {
				$actions.setCurStyleTab(0);
			}
			else if ( path[0] === "Concerts" )
				$actions.setCurStyleTab(1);
			else if ( path[0] === "Expositions" )
				$actions.setCurStyleTab(2);
			else if ( path[0] === "Theatres" )
				$actions.setCurStyleTab(3);
			
			this.$stores.appState
			    .setState({
				              selectedEventId: null,
				              selectedEventDT: null,
				              selectedEvent: null,
				              selectedFocus: null
			              })
		}
		else if ( path.length === 2 ) {
			//debugger
			$actions.selectFocus(path[1], path[0]);
			this.$stores.appState
			    .setState({
				              selectedEvent: null
			              })
		}
		else if ( path.length === 3 ) {
			let matches = location.pathname.match(/^\/([^\/]+)\/([^\/]+)\/([^\/]+)$/);
			this.$stores.appState
			    .setState({
				              curDay          : moment(matches[2], "DD-MM-YY").startOf("day").valueOf(),
				              selectedEventId : matches[3],
				              selectedEventDT : moment(matches[2], "DD-MM-YY").startOf("day").valueOf(),
				              selectedEvent   : { id: matches[3], etty: "Event" },
				              currentPageFocus: "events"
			              })
		}
		this.push(location);
	};
}

