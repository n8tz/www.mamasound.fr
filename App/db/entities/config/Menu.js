/*
 * Copyright (c) 2017.  Caipi Labs.  All rights reserved.
 *
 * This File is part of Caipi. You can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *  This project is dual licensed under AGPL and Commercial Licence.
 *
 * @author : Nathanael Braun
 * @contact : caipilabs@gmail.com
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