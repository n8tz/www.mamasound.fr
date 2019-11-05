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
	label     : "Lieu",
	// alias    : "lieu",
	aliasField: "label",
	adminRoute: "Geo/Lieux",
	wwwRoute  : "Lieux",
	schema    : {
		label: [validate.mandatory, validate.noHtml]
	},
	indexes   : { "address.geoPoint": "2dsphere" },
	fields    : {
		"_id": types.indexes,
		
		"label"      : types.labels(),
		"browsable"  : types.boolean("Afficher comme page dedié ?", false),
		"type"       : types.enum("Type de lieu",
		                          [
			                          { label: "Bar", value: "bar" },
			                          { label: "Parc", value: "parc" },
			                          { label: "Salle publique", value: "public" },
			                          { label: "Place publique", value: "place" }
		                          ]
		),
		"description": types.descriptions('Description'),
		"address"    : types.address("Adresse :"),
		"website"    : types.labels("Site web :"),
		"fbPages"    : types.labels("Page Facebook :"),
		"scPage"     : types.labels("Page SoundCloud :"),
		"ytPage"     : types.labels("Page Youtube :"),
		"phone"      : types.labels("Numero de telephone"),
		"categories" : types.collection(["EventCategory"], {}, "Categories :"),
		"linkedMedia": types.collection(["Image", "Video", "Audio"], {
			storeTypedItem    : true,
			allowedUploadTypes: ["Image"],
			allowUpload       : true
		}, "Média lié :"),
		
		
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