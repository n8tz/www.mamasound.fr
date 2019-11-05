/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import {types, validate} from "App/db/fields";
import React             from "react";

export default {
	alias     : "Page",
	wwwRoute  : "Page",
	label     : "Page simple",
	apiRoute  : "page",
	aliasField: "label",                          // @optional fields used to generate alias
	
	adminRoute: "Contenu/Pages",
	autoMount : ["linkedMedia"],
	schema    : {
		label    : [validate.mandatory, validate.noHtml],
		resume   : [validate.noJs],
		text     : [validate.noJs],
		item_link: [validate.noJs, validate.isUrl]
	},
	fields    : {
		"_id"  : types.indexes,
		"label": types.labels(),
		"text" : types.descriptions(),
		
		"linkedMedia": types.collection(["Document", "Article", "Collection", "Image", "Video"], {},
		                                "Contenus liés :"),
		
		
		"website"   : types.labels("Site web :"),
		"fbPage"    : types.labels("Page Facebook :"),
		"scPage"    : types.labels("Page SoundCloud :"),
		"ytPage"    : types.labels("Page Youtube :"),
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