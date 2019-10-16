/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
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