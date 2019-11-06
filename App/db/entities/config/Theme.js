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
		label         : [validate.mandatory, validate.noHtml],
		mainBackground: [validate.mandatory],
		resume        : [validate.noJs],
		//     author     : [validate.mandatory]
	},
	fields    : {
		"_id"  : types.indexes,
		"label": types.labels(),
		//"resume": types.descriptions('Resumé'), // TODO refactor as "summary"
		
		
		"logo"           : types.media({ allowedTypes: "Image" }, "Logo:"),
		"mainBackground" : types.media({ allowedTypes: "Image" }, "MainBackground:"),
		"backgroundMode" : types.enum("Type d'image' background",
		                              [
			                              { label: "Aucun", value: "back_hidden" },
			                              { label: "Tout l'espace dispo", value: "big_back" },
			                              { label: "Tout l'espace dispo avec ghost", value: "big_wghost" }
		                              ]
		),
		"backgroundColor": types.color("Couleur de fond :"),
		
		"menuTop"   : types.picker(true, {
			allowTypeSelection: ["Menu"],
			storeTypedItem    : true,
		}, "Menu haut :"),
		"menuSocial": types.picker(true, {
			allowTypeSelection: ["Menu"],
			storeTypedItem    : true,
		}, "Menu menuSocial :"),
		"menuBot"   : types.picker(true, {
			allowTypeSelection: ["Menu"],
			storeTypedItem    : true,
		}, "Menu bas :"),
		
		"values": types.json("Variables :"),
		
	}
};
