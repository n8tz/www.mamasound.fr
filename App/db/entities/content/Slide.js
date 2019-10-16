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
	label        : "Contenu slideable",
	apiRroute    : "Slides",
	adminRoute   : "Contenu/Slides",
	processResult: {
		"get": function ( record, cuser ) {
			if ( !record._public )
				if ( !cuser || !cuser.isPublisher ) {
					//console.log('hidden', record);
					return null;
				}
			return record;
		}
	},
	autoMount    : ["targetEtty"],
	
	schema: {
		label     : [validate.mandatory, validate.noHtml],
		previewUrl: [validate.mandatory],
		resume    : [validate.noJs],
		text      : [validate.noJs],
		item_link : [validate.noJs, validate.isUrl],
		//     author     : [validate.mandatory]
	},
	fields: {
		"_id": types.indexes,
		//"pubFlag" : fields.publicationFlag,
		
		"label"       : types.labels(),
		//"browsable"   : types.boolean("Afficher dans les recherches ?", false),
		"textType"    : types.enum("Type de texte",
		                           [
			                           { label: "Texte a gauche", value: "left" },
			                           { label: "Mini texte a droite", value: "mini" },
		                           ]),//@todo,
		"previewImage": types.media({ allowedTypes: "Image" }, "Preview (~12/5 fb headers):"),
		"background"  : types.media({ allowedTypes: ["Image", "Video"] }, "Background (gd image/video de fond (video LEGERE)):"),
		"resume"      : types.descriptions('Resumé'),
		"description" : types.descriptions('Description'),
		"targetEtty"  : types.picker(true, {
			allowTypeSelection: ["Concert", "Theatre", "Expo", "Event", "Article", "Collection", "Video", "Page"],
			storeTypedItem    : true,
		}, "Contenu cible :"),
		
	}
};
