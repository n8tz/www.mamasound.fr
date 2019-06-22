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

import {Scope, Store} from "rscopes";

import {types, get} from 'App/db';

import superagent from "superagent";
import cfg        from "App/config";

export default class CurrentUser extends Store {
	static singleton = true;
	state            = {
		user: null
	};
	static actions   = {
		
		/**
		 * Do login using the infos contained in 'user'
		 * @param user
		 * @returns {Promise.<TResult>|*|TaskFlow}
		 */
		login( user, cb ) {
			superagent.post(
				"http://" + cfg.ROOT_DOMAIN + '/login', user
			).then(r => {
				this.setState({ user: r.body.result })
				cb(null, r.body.result)
			}).catch(e => {
				cb(e)
			});
		},
		
		/**
		 * Do logout
		 * @returns {Promise.<TResult>|*|TaskFlow}
		 */
		logout() {
			superagent.get(
				"http://" + cfg.ROOT_DOMAIN + '/logout'
			).then(( r ) => {
				this.setState({ user: null })
			}).catch(e => {
				debugger
			});
		}
	}
	
	apply( data, state, changes ) {
		return state.user;
	}
	
	constructor() {
		super(...arguments);
		this.checkLoginStatus()
		setInterval(this.checkLoginStatus.bind(this), cfg.SESSION_CHECK_TM);
	}
	
	/**
	 * Sync/restore/invalidate the local session
	 * @returns {Promise.<TResult>|*|TaskFlow}
	 */
	checkLoginStatus() {
		return superagent.get("http://" + cfg.ROOT_DOMAIN + '/session')
		                 .then(( r ) => {
			                 let user  = r.body.result && r.body.result._id,
			                     cuser = this.data && this.data._id;
			                 if ( user !== cuser )
				                 this.setState({ user: r.body.result })
		                 });
	}
}