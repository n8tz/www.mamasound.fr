/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import React             from "react";
import {types, validate} from "App/db/fields";

export default {
	alias     : "Page",
	wwwRoute  : "Page",
	label     : "Page simple",
	apiRoute  : "page",
	aliasField: "label",                          // @optional fields used to generate alias
	
	adminRoute: "Content/Pages",
	autoMount : ["linkedMedia"],
	schema    : {
		label    : [validate.mandatory, validate.noHtml],
		resume   : [validate.noJs],
		text     : [validate.noJs],
		item_link: [validate.noJs, validate.isUrl]
	},
	fields    : {
		"_id"  : types.indexes,
		"label": types.labels(),
		"text" : types.descriptions(),
		
		"linkedMedia": types.collection(["Document", "Article", "Collection", "Image", "Video"], {},
		                                "Contenus liés :")
		
	}
};
