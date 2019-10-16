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
	label        : "Contenu mis en avant",
	apiRroute    : "Focused",
	adminRoute   : "Contenu/Mis en avant",
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
		
		"_public": types.boolean("Publier :", false),
		
		//"publishTs" : "<timestamp>",// ?
		"label" : types.labels(),
		"resume": types.descriptions('Resumé'), // TODO refactor as "summary"
		
		"useBackground"     : types.boolean("Afficher le background :", false),
		"useGhostBackground": types.boolean("Afficher les ghosts flous :", false),
		"previewImage"      : types.media({ allowedTypes: "Image" }, "Preview (~12/5 fb headers):"),
		"background"        : types.media({ allowedTypes: ["Image", "Video"] }, "Background (gd image/video de fond (video LEGERE)):"),
		"backgroundColor"   : types.labels("Couleur de fond :"),
		"website"           : types.labels("Site web :"),
		"fbPage"            : types.labels("Page Facebook :"),
		"scPage"            : types.labels("Page SoundCloud :"),
		"ytPage"            : types.labels("Page Youtube :"),
		"targetEtty"        : types.picker(true, {
			allowTypeSelection: ["Concert", "Theatre", "Expo", "Event", "Article", "Collection", "Video", "Page"],
			storeTypedItem: true,
		}, "Contenu cible :"),
		//
		//"author" : fields.picker(true, {
		//    allowTypeSelection : ["MusicHunter", "Proposer", "Talent"],
		//    storeTypedItem: true,
		//}, "Sélectionner l'auteur"),
		//"placeId"       : fields.picker("Place", {}),
		//
		//"tagId"         : fields.picker("Tag"),
		//"items"  : fields.collection(null, {}, "Cible :"),
		//"item_link"      : fields.labels("Cibler via un lien")
		//
		
	}
};
