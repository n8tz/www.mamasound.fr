/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import {Scope, Store} from "react-scopes";
import db, {mount}    from "App/db";


import config         from 'App/config';
import {types, query} from 'App/db';

export default class UserGeoLocation extends Store {
	static actions = {
		toggleUserGeoLocation() {
			let sw = this.nextState.active;
			return { active: !sw, pos: null }
		}
	};
	state          = { active: false };
	
	apply( d = {}, { active, activating, pos } ) {
		
		if ( (!pos || activating) && active ) {
			navigator.geolocation.getCurrentPosition(
				( _pos ) => {
					if ( !activating )
						pos = _pos.coords;
					else this.setState({ pos: _pos.coords, active: true, activating: false })
					setTimeout(
						tm => this.setState({ activating: this.nextState.active }),
						3000
					)
				},
				( error ) => {
					this.setState({ active: false, activating: false, pos: null })
				})
			
			activating = true;
			active     = false;
		}
		else activating = false;
		
		
		return { active, activating, pos };
	}
	
}