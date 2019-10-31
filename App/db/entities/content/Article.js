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
		
		"hideTitle"         : types.boolean("Cacher le titre :", true),
		"hideResume"        : types.boolean("Cacher le résumé :", false),
		"useBigResume"      : types.boolean("Afficher le résumé en grand direct:", false),
		"useCollumn"        : types.boolean("Afficher le texte en colonne:", false),
		"usePreviewImage"   : types.boolean("Afficher une image preview :", true),
		"useBigPreviewImage": types.boolean("Afficher une l'image preview en grand :", false),
		"previewImage"      : types.media({ allowedTypes: "Image" }, "Preview:"),
		"useBackground"     : types.boolean("Afficher le background :", false),
		"useGhostBackground": types.boolean("Afficher les ghosts flous :", false),
		"background"        : types.media({ allowedTypes: ["Image", "Video"] }, "Background (gd image/video de fond (video LEGERE)):"),
		"backgroundColor"   : types.color("Couleur de fond :"),
		"previewStyle"      : types.json("previewStyle :"),
		"titleStyle"        : types.json("titleStyle :"),
		"resumeStyle"       : types.json("resumeStyle :"),
		"resumeContentStyle": types.json("resumeContentStyle :"),
	}
};
