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

import geoJson from "App/data/VilleMTP_MTP_SousQuartiers"
import {Store} from "react-scopes";

export default class Quartiers extends Store {
	static actions = {};
	state          = geoJson;
	
	apply( data, state ) {
		let liste = state.features.map(item => item.properties.LIBSQUART)
		return {
			data  : state,
			liste,
			byName: {}
		};
	}
	
}