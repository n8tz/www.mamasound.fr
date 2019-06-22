/*
 * Copyright (c) 2017.  Caipi Labs.  All rights reserved.
 *
 * This File is part of Caipi. You can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *  This project is dual licensed under AGPL and Commercial Licence.
 *  
 * @author : Nathanael Braun
 * @contact : caipilabs@gmail.com
 */

/**
 * @author Nathanael BRAUN
 *
 * Date: 24/11/2015
 * Time: 19:18
 */
import React from 'react';

import {types, validate} from 'App/db/fields';

export default {
	label        : "Contenu mis en avant",
	apiRroute    : "Focused",
	adminRoute   : "Contenu/Mis en avant",
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
	
	schema: {
		label     : [validate.mandatory, validate.noHtml],
		previewUrl: [validate.mandatory],
		resume    : [validate.noJs],
		text      : [validate.noJs],
		item_link : [validate.noJs, validate.isUrl],
		//     author     : [validate.mandatory]
	},
	fields: {
		"_id": types.indexes,
		//"pubFlag" : fields.publicationFlag,
		
		//"_public"        : types.boolean("Publier :", false),
		//"publishTs" : "<timestamp>",// ?
		"label"       : types.labels(),
		"previewImage": types.media({ allowedTypes: "Image" }, "Background :"),
		"resume"      : types.descriptions('Resumé'), // TODO refactor as "summary"
		"targetEtty"  : types.picker(true, {
			//allowTypeSelection: ["Concert", "Theatre", "Expo", "Event", "Article", "Collection", "Video", "Page"],
			storeTypedItem    : true,
		}, "Contenu cible :"),
		//
		//"author" : fields.picker(true, {
		//    allowTypeSelection : ["MusicHunter", "Proposer", "Talent"],
		//    storeTypedItem: true,
		//}, "Sélectionner l'auteur"),
		//"placeId"       : fields.picker("Place", {}),
		//
		//"tagId"         : fields.picker("Tag"),
		//"items"  : fields.collection(null, {}, "Cible :"),
		//"item_link"      : fields.labels("Cibler via un lien")
		//
		
	}
};
