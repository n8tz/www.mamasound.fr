/*
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

import React from 'react';

import {types, validate} from "App/db/fields";

export default {
	alias     : "Collection",
	label     : "Collection",
	apiRoute  : "collection",
	adminRoute: "Structure/Collections",
	autoMount : ["items"],                  // @optional properties that need to be included in a get quuery (format :
                                            // {objId:(id),_cls:(entity type)})
	aliasField: "label",                          // @optional fields used to generate alias
	
	processResult: {
		"get": function ( record, cuser ) {
			if ( !record._public )
				if ( !cuser || !cuser.isPublisher ) {
					return null;
				}
			return record;
		}
	},
	schema       : {
		label: [validate.mandatory, validate.noHtml],
		text : [validate.noJs]
	},
	fields       : {
		"_id"         : types.indexes,
		"_public"     : types.boolean("Publier :", false),
		"label"       : types.labels(),
		"previewImage": types.media({ allowedTypes: "Image" }, "Preview :"),
		"text"        : types.descriptions(),
		"useLink"     : types.boolean("Use links :", false),
		"items"       : types.collection(true, {
			storeTypedItem    : true,
			allowedUploadTypes: ["Image", "Video"],
			allowUpload       : true
		}, "Content :")
	}
};
