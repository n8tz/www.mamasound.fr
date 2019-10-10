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

import {types, validate} from 'App/db/fields';
/**
 * @author Nathanael BRAUN
 *
 * Date: 24/11/2015
 * Time: 19:18
 */
import React             from 'react';

export default {
	label     : "Theme",
	apiRroute : "Theme",
	adminRoute: "Config/Theme",
	
	schema: {
		label         : [validate.mandatory, validate.noHtml],
		mainBackground: [validate.mandatory],
		resume        : [validate.noJs],
		//     author     : [validate.mandatory]
	},
	fields: {
		"_id"   : types.indexes,
		"label" : types.labels(),
		//"resume": types.descriptions('Resumé'), // TODO refactor as "summary"
		
		
		"mainBackground": types.media({ allowedTypes: "Image" }, "MainBackground:"),
		"values"        : types.json("Variables :"),
		
	}
};
