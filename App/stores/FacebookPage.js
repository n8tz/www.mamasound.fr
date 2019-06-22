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

import superagent from "superagent";

const isBrowserSide = (new Function("try {return this===window;}catch(e){ return false;}"))();


const accessToken = "EAAIZBEF0xi5oBACi6ZCU47QFNLXiHCaMXWyhi3a8phnbYaTOjqE8Fbz76FKVKG6cXwxAdgtcnhPJi4zSxuu0yVK4Vf7nZAW4w1MdiLZB4zxE4kakTahl4tT6jKVisPlSQvyEqaxPvAuBgwzFbGZBlx6FGL16iBJZAVSpQKA8ZCSxnXGsDicd8RvbEkTVsGpxWiLJvoHMo0DvwZDZD",
      apiUrl      = "https://graph.facebook.com/v3.3/me",
      fields      = "id,name,photos{target,images},videos{picture,description,title,source}";

export default class FacebookPage extends Store {
	static singleton = true;
	static actions   = {};
	state            = {
		accessToken: "EAAIZBEF0xi5oBACi6ZCU47QFNLXiHCaMXWyhi3a8phnbYaTOjqE8Fbz76FKVKG6cXwxAdgtcnhPJi4zSxuu0yVK4Vf7nZAW4w1MdiLZB4zxE4kakTahl4tT6jKVisPlSQvyEqaxPvAuBgwzFbGZBlx6FGL16iBJZAVSpQKA8ZCSxnXGsDicd8RvbEkTVsGpxWiLJvoHMo0DvwZDZD",
		apiUrl     : "https://graph.facebook.com/v3.3/me",
		fields     : "id,name,photos{target,images},videos{picture,description,title,source}"
	};
	//data             = {
	//	//...breakPts[initialPts]
	//};
	//
	//shouldSerialize() {
	//	return false;
	//}
	//
	constructor() {
		super(...arguments);
	}
	
	apply( data, { accessToken, apiUrl, fields } ) {
		
		superagent
			.post(state.validateUrl, state.items)
			.then(
				( res ) => {
					this.push({ items: res.body, complete: true });
					console.log(res)
				}
			)
		return data;
	}
	
	destroy() {
		super.destroy(...arguments);
	}
	
}