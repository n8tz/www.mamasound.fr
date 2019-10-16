/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

/**
 * @author Nathanael BRAUN
 *
 * Date: 24/11/2015
 * Time: 19:18
 */
import React             from "react";
import {types, validate} from "App/db/fields";

export default {
	label       : "Groupes / Artistes",
	adminRoute  : "Groupes & Artistes",
	aliasField  : "title",
	labelField  : "title",
	previewField: "previewImage",
	wwwRoute    : "Artists",
	// autoMount      : ["category", "place"],
	
	searchableFields: ["title", "resume", "description"],
	// processResult : {
	//     "get" : function ( record, cuser ) {
	//         if ( !record._public )
	//             if ( !cuser || !cuser.isPublisher ) {
	//                 //console.log('hidden', record);
	//                 return null;
	//             }
	//         return record;
	//     }
	// },
	schema          : {
		title: [validate.mandatory, validate.noHtml],
		// previewImage : [validate.isImage]
	},
	fields          : {
		"_id"    : types.indexes,
		"_public": types.boolean("Publier :", false),
		"title"  : types.labels(),
		"groupe" : types.boolean("Est un collectif/groupe d'artistes ? :", false),
		
		"type"        : types.enum("Type d'artiste/groupe",
		                           [
			                           { label: "Musicien", value: "musician" },
			                           { label: "Acteur", value: "actor" },
			                           { label: "Performer", value: "performer" },
			                           { label: "Artiste graphiste", value: "artist" },
			                           { label: "Autre", value: "other" }
		                           ]
		),
		"previewImage": types.media({ allowedTypes: "Image" }, "Preview :"),
		"description" : types.descriptions('Description du groupe'),
		"website"     : types.labels("Site web :"),
		"fbPage"      : types.labels("Page Facebook :"),
		"scPage"      : types.labels("Page SoundCloud :"),
		"ytPage"      : types.labels("Page Youtube :"),
		"categories"  : types.collection(["EventCategory"], {
			storeTypedItem: true
		}, "Categories :"),
		
		"linkedMedia": types.collection(["Image", "Video", "Audio"], {
			storeTypedItem    : true,
			allowedUploadTypes: ["Image", "Video"],
			allowUpload       : true
		}, "Média lié :"),
	}
};