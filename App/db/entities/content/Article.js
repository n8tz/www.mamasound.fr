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
	labelField      : "label",
	searchableFields: ["label"],
	schema          : {
		label: [validate.mandatory, validate.noHtml]
	},
	fields          : {
		"_id"  : types.indexes,
		"label": types.labels(),
		
		"resume"      : types.descriptions('Resume'),
		"text"        : types.descriptions('Text'),
		"previewImage": types.media({ allowedTypes: "Image" }, "Preview (~12/5 fb headers):"),
		"background"  : types.media({ allowedTypes: ["Image", "Video"] }, "Background (gd image/video de fond (video LEGERE)):"),
		//"linkedMedia" : types.collection(["Article", "Media"], {}, "Contenus liés :")
	}
};
