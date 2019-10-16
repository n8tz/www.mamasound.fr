/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

'use strict';

// import APIUtils from 'App/db';


import {createBrowserHistory, createMemoryHistory} from 'history';
import {Store}                                     from 'react-scopes';

export default class $history extends Store {
	static actions = {
		history_push( url, state ) {
			this.history.push(url, state)
		},
		history_set( url, state ) {
			this.history.replace(url, state)
		}
	};
	
	state = {
		//routerHistory:
	};
	history=__IS_SERVER__ ? createMemoryHistory() : createBrowserHistory();
	//data  = typeof window === "undefined" ? undefined : { ...location };
	
	shouldSerialize() {
		return false;
	}
	
	apply( data, state, { routerHistory } ) {
		if ( routerHistory ) {
			if ( this._list )
				this._list();
			this._list = routerHistory.listen(this.updateLocation);
		}
		return routerHistory && routerHistory.location || undefined
	}
	
	updateLocation = ( location, action ) => {
		this.push(location);
	};
}

