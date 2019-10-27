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
	label        : "Contenu en focus",
	apiRroute    : "Focused",
	adminRoute   : "Contenu/Focused",
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
	
	aliasField: "label",
	labelField: "label",
	schema    : {
		label     : [validate.mandatory, validate.noHtml],
		previewUrl: [validate.mandatory],
		resume    : [validate.noJs],
		text      : [validate.noJs],
		item_link : [validate.noJs, validate.isUrl],
		//     author     : [validate.mandatory]
	},
	fields    : {
		"_id"   : types.indexes,
		"label" : types.labels(),
		"resume": types.descriptions('Resumé'), // TODO refactor as "summary"
		
		"startTM": types.date("Début"),
		"endTM"  : types.date("Fin"),
		
		"sliderImage": types.media({ allowedTypes: "Image" }, "Slide (~12/5 fb headers):"),
		
		"website"   : types.labels("Site web :"),
		"fbPage"    : types.labels("Page Facebook :"),
		"scPage"    : types.labels("Page SoundCloud :"),
		"ytPage"    : types.labels("Page Youtube :"),
		"targetEtty": types.picker(true, {
			allowTypeSelection: ["Concert", "Theatre", "Expo", "Event", "Article", "Collection", "Video", "Page"],
			storeTypedItem    : true,
		}, "Contenu cible :"),
		
		"hideTitle"         : types.boolean("Cacher le titre :", true),
		"hideResume"        : types.boolean("Cacher le résumé :", false),
		"useBigResume"      : types.boolean("Afficher le résumé en grand direct:", false),
		"titleStyle"        : types.json("titleStyle :"),
		"resumeStyle"       : types.json("resumeStyle :"),
		"resumeContentStyle": types.json("resumeContentStyle :"),
		
		"useBackground"     : types.boolean("Afficher le background :", false),
		"useGhostBackground": types.boolean("Afficher les ghosts flous :", false),
		"background"        : types.media({ allowedTypes: ["Image", "Video"] }, "Background (gd image/video de fond (video LEGERE)):"),
		"backgroundColor"   : types.color("Couleur de fond :"),
		
		"usePreviewImage"   : types.boolean("Afficher une image preview :", true),
		"useBigPreviewImage": types.boolean("Afficher une l'image preview en grand :", false),
		"previewImage"      : types.media({ allowedTypes: "Image" }, "Preview:"),
		"previewStyle"      : types.json("previewStyle :"),
		
		
	}
};
