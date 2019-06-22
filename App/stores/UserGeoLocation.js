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