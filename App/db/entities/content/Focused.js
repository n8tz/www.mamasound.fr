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
		"resume": types.descriptions('Resumé'),
		
		"startTM": types.date("Afficher à partir du "),
		"endTM"  : types.date("Afficher jusqu'au"),
		
		"sliderImage": types.media({ allowedTypes: "Image" }, "Slide (~12/5 fb headers):"),
		
		
		"website": types.labels("Site web :"),
		"fbPage" : types.labels("Page Facebook :"),
		"scPage" : types.labels("Page SoundCloud :"),
		"ytPage" : types.labels("Page Youtube :"),
		
		"targetEtty": types.picker(true, {
			allowTypeSelection: ["Concert", "Theatre", "Expo", "Event", "Article", "Collection", "Video", "Page"],
			storeTypedItem    : true,
		}, "Contenu cible :"),
		
		"relatedEvents": types.collection(["Concert", "Theatre", "Expo"], {},
		                                  "Events liés :"),
		
		"useBigPage": types.boolean("Afficher en pleine page:", false),
		
		"useBigResume"      : types.boolean("Afficher le texte cible:", false),
		"layoutMode"        : types.enum("Type de layout",
		                                 [
			                                 {
				                                 label: "Resumé en haut a gauche avec titre dedans",
				                                 value: "smallView"
			                                 },
			                                 { label: "Gros titre + resumé en bas a droite", value: "big_right_mini" },
			                                 { label: "Colonne gauche", value: "collView" },
			                                 { label: "Grosse page", value: "bigView" },
			                                 { label: "Grosse page sans titre", value: "bigView notitle" }
		                                 ]
		),
		"previewMode"       : types.enum("Type de preview",
		                                 [
			                                 { label: "Aucun", value: "hidden" },
			                                 { label: "50% droite", value: "right_50" },
			                                 { label: "50% droite grand", value: "right_big_50" },
			                                 { label: "center h/v", value: "centerized" },
		                                 ]
		),
		"previewImage"      : types.media({ allowedTypes: "Image" }, "Preview:"),
		"backgroundMode"    : types.enum("Type d'image' background",
		                                 [
			                                 { label: "Aucun", value: "back_hidden" },
			                                 { label: "Tout l'espace dispo", value: "big_back" },
			                                 { label: "Tout l'espace dispo avec ghost", value: "big_wghost" }
		                                 ]
		),
		"background"        : types.media({ allowedTypes: ["Image", "Video"] }, "Background (gd image/video de fond (video LEGERE)):"),
		"backgroundColor"   : types.color("Couleur de fond :"),
		"previewStyle"      : types.json("previewStyle :"),
		"titleStyle"        : types.json("titleStyle :"),
		"resumeStyle"       : types.json("resumeStyle :"),
		"resumeContentStyle": types.json("resumeContentStyle :"),
		
		
	}
};
