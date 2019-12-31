/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import cfg     from "App/config";
import {Store} from "react-scopes";

import superagent from "superagent";

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
				
				if ( r.body.result.isAdmin )
					document.location.reload(true);
				
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
				this.setState({ user: null });
				if ( this.data.isAdmin )
					document.location.reload(true);
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