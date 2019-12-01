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
	label     : "Theme",
	apiRroute : "Theme",
	adminRoute: "Config/Theme",
	
	aliasField: "label",
	labelField: "label",
	schema    : {
		label : [validate.mandatory, validate.noHtml],
		//mainBackground: [validate.mandatory],
		resume: [validate.noJs],
		//     author     : [validate.mandatory]
	},
	fields    : {
		"_id"  : types.indexes,
		"label": types.labels(),
		//"resume": types.descriptions('Resumé'), // TODO refactor as "summary"
		
		
		"logo"              : types.media({ allowedTypes: "Image" }, "Logo:"),
		"backgroundMode"    : types.enum("Type d'image' background",
		                                 [
			                                 { label: "Aucun", value: "back_hidden" },
			                                 { label: "Tout l'espace dispo", value: "big_back" },
			                                 { label: "Tout l'espace dispo avec ghost", value: "big_wghost" }
		                                 ]
		),
		"mainBackground"    : types.media({ allowedTypes: "Image" }, "Background haut:"),
		"backgroundColor"   : types.color("Couleur de fond ( haut ):"),
		"backgroundRightBot": types.media({ allowedTypes: "Image" }, "Background bas gauche:"),
		"backgroundColorBot": types.color("Couleur de fond ( bas ):"),
		"backgroundLeftBot" : types.media({ allowedTypes: "Image" }, "Background bas droit:"),
		
		"menuTop"   : types.picker(true, {
			allowTypeSelection: ["Menu"],
			storeTypedItem    : true,
		}, "Menu haut gauche :"),
		"menuPro"   : types.picker(true, {
			allowTypeSelection: ["Menu"],
			storeTypedItem    : true,
		}, "Menu haut milieu :"),
		"menuSocial": types.picker(true, {
			allowTypeSelection: ["Menu"],
			storeTypedItem    : true,
		}, "Menu menuSocial ( ht droit ) :"),
		
		"values": types.json("Variables :"),
		
	}
};
