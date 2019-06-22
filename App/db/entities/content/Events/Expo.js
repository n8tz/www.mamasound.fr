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

/**
 * @author Nathanael BRAUN
 *
 * Date: 24/11/2015
 * Time: 19:18
 */
import React from "react";
import {types, validate} from "App/db/fields";
export default {
    ...require("../Event").default,
    label            : "Expositions",
    disallowCreate   : false,//Can't create pure events so we must enable editing when inheriting...
    targetCollection : "Event",
    adminRoute       : "Événements/Expos",
    apiRoute         : "dates",
    wwwRoute         : "Exposition",

    fields : {
        "_id"          : types.indexes,
        "_public"      : types.boolean("Publier :", false),
        "title"        : types.labels(),
        "previewImage" : types.media({allowedTypes : "Image"}, "Preview :"),
        "artists"   : types.collection(["Artist"], {}, "Groupes / artistes :"),
        "resume"       : types.labels('Resumé'), // TODO refactor as "summary"
        "description"  : types.descriptions('Description'),
        "price"        : types.labels('Prix'),
        "haveVerni"    : types.boolean("Vernissage ?", false),
        "verniTM"      : types.date("Date du vernissage"),
        "startTM"      : types.date("Début"),
        "endTM"        : types.date("Fin"),
        "schedule"     : types.datesList("Occurences"),
        "fbLink"       : types.labels("Event facebook"),
        "category"     : types.picker(["EventCategory"], {storeTypedItem : true}, "Style d'événement"),
        "place"        : types.picker(["Place"], {storeTypedItem : true}, "Lieu"),

        "linkedMedia" : types.collection(["Image","Video","Audio"], {
            storeTypedItem: true,
            allowedUploadTypes:["Image"],
            allowUpload: true
        }, "Média lié :"),

    }
};