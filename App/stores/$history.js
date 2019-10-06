/*
 *
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

