/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

'use strict';

import {createBrowserHistory, createMemoryHistory} from 'history';
import {Store}                                     from 'react-scopes';
// import APIUtils from 'App/db';

export default class $history extends Store {
	static actions = {
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
		this.$actions.loadStateFromUrl(location.pathname)
		this.push(location);
	};
}

