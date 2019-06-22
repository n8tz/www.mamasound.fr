/*
 * www.mamasound.fr
 * Copyright (C) 2019 Nathanael Braun
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
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
		
		"previewImage": types.media({ allowedTypes: "Image" }, "Preview :"),
		"resume"      : types.descriptions('Resume'),
		"text"        : types.descriptions('Text'),
		//"linkedMedia" : types.collection(["Article", "Media"], {}, "Contenus liés :")
	}
};
