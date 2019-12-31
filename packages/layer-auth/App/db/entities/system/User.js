/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import {types, validate} from "App/db/fields";

export default {
	alias           : "User",
	apiRoute        : "User",
	wwwRoute        : "User",
	adminRoute      : "Config/Utilisateurs",
	label           : "Utilisateur",
	category        : "Config",
	labelField      : "login",
	previewField    : "avatar",
	aliasField      : "login",
	requireAdmin    : true,
	searchableFields: ["login"],
	schema          : {
		login: [validate.mandatory],
	},
	fields          : {
		"_id"      : types.indexes,
		"login"    : types.labels("Login"),
		"avatar"   : types.media({ allowedTypes: "Image" }, "Avatar :"),
		"pass"     : types.labels("Password"),
		"email"    : types.labels("email"),
		"UserGroup": types.picker("UserGroup", { storeTypedItem: false }, "Groupe :"),
		
		"isAdmin"    : types.boolean("Droit d'administration", true),
		"isPublisher": types.boolean("Droit de publication", true),
		"desc"       : types.descriptions()
	}
};