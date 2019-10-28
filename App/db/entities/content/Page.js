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