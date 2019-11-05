/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import React             from "react";
import {types, validate} from "App/db/fields";

export default {
	aliasField      : "label",
	labelField      : "label",
	searchableFields: ["label"],
	adminRoute      : "Contenu/Article",
	schema          : {
		label: [validate.mandatory, validate.noHtml]
	},
	fields          : {
		"_id"  : types.indexes,
		"label": types.labels(),
		
		"resume": types.descriptions('Resume'),
		"text"  : types.descriptions('Text'),
		
		"tags"        : types.labels("Tags"),
		"linkedMedia" : types.collection(["Article", "Media"], {}, "Contenus liés :"),
		"linkedEvents": types.collection(["Event"], {}, "Events liés :"),
		
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
