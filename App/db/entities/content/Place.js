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

import {types, validate} from 'App/db/field';

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
        
        "label"       : types.labels(),
        "browsable"   : types.boolean("Afficher dans les recherches ?", false),
        "type"        : types.enum("Type de lieu",
                                   [
                                       { label: "Bar", value: "bar" },
                                       { label: "Parc", value: "parc" },
                                       { label: "Salle publique", value: "public" },
                                       { label: "Place publique", value: "place" }
                                   ]
        ),
        "description" : types.descriptions('Description'),
        "previewImage": types.media({ allowedTypes: "Image" }, "Custom preview :"),
        "address"     : types.address("Address :"),
        "website": types.labels("Site web :"),
        "fbPages"     : types.labels("Page Facebook :"),
        "scPage": types.labels("Page SoundCloud :"),
        "ytPage": types.labels("Page Youtube :"),
        "phone"       : types.labels("Numero de telephone"),
        "categories"  : types.collection(["EventCategory"], {}, "Categories :"),
        "linkedMedia" : types.collection(["Image", "Video", "Audio"], {
            storeTypedItem    : true,
            allowedUploadTypes: ["Image"],
            allowUpload       : true
        }, "Média lié :")
    }
};