/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import {types, validate} from "App/db/fields";

export default {
	
	alias           : "UserGroup",
	adminRoute      : "Config/UserGroup",
	label           : "Categories d'utilisateur",
	category        : "Config",
	labelField      : "label",
	searchableFields: ["label"],
	
	schema: {
		login: [validate.mandatory],
	},
	fields: {
		"_id"        : types.indexes,
		"label"      : types.labels("Nom du groupe"),
		"desc"       : types.descriptions(),
		"isAdmin"    : types.boolean("Droit d'administration", true),
		"isPublisher": types.boolean("Droit de publication", true)
	}
};