/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
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
