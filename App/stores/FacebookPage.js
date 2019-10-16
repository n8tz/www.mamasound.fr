/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import {Scope, Store} from "react-scopes";

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