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
	label         : "Événements",
	adminRoute    : "Événements/Tous",
	disallowCreate: true,
	aliasField    : "title",
	labelField    : "title",
	previewField  : "previewImage",
	wwwRoute      : "Evenements",
	autoMount     : ["category", "place"],
	
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
		"_id"         : types.indexes,
		//"_public"     : types.boolean("Publier :", false),
		"title"       : types.labels(),
		"previewImage": types.media({ allowedTypes: "Image" }, "Preview :"),
		"artists"     : types.collection(["Artist"], {}, "Groupes / artistes :"),
		"resume"      : types.labels('Resumé'), // TODO refactor as "summary"
		"description" : types.descriptions('Description'),
		"price"       : types.labels('Prix'),
		
		"startTM": types.date("Début"),
		"endTM"  : types.date("Fin"),
		
		"schedule": types.datesList("Occurences"),
		
		"fbLink"  : types.labels("Event facebook"),
		"category": types.picker(["EventCategory"], { storeTypedItem: true }, "Style d'événement"),
		"place"   : types.picker(["Place"], { storeTypedItem: true }, "Lieu"),
		
		"linkedMedia": types.collection(["Image", "Video", "Audio"], {
			storeTypedItem    : true,
			allowedUploadTypes: ["Image", "Video"],
			allowUpload       : true
		}, "Média lié :"),
	}
};