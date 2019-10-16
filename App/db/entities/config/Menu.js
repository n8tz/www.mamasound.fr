/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import {types, validate} from "App/db/fields";

export default {
	
	alias       : "Menu",
	label       : "Menu Item",
	adminRoute  : "Config/Menus",
	category    : "Config",
	labelField  : "label",
	aliasField  : "label",                          // to ref  roots in jsx
	previewField: "previewImage",
	
	searchableFields: ["label"],
	autoMount       : ["childs"],
	
	schema: {
		label: [validate.mandatory]
	},
	fields: {
		"_id"         : types.indexes,
		"label"       : types.labels("Titre"),
		"description" : types.labels("Description"),
		"path"        : types.labels("Url"),
		"cls"         : types.labels("Classe css"),
		"previewImage": types.media({ allowedTypes: "Image" }, "Preview :"),
		
		"addDay"   : types.boolean("addDay:", false),
		"outLink"  : types.boolean("Lien externe :", false),
		"hideTitle": types.boolean("Hide title (footer) :", false),
		"auth"     : types.enum("Require auth",
		                        [{ label: "no", value: false }, { label: "yes", value: true }]),//@todo,
		
		"childs": types.collection(["Menu"], { defaultProps: false }, "Sous-menus :")
	}
};