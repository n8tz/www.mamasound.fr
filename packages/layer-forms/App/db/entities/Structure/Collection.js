/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
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
