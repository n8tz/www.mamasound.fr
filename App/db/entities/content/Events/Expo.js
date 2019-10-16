/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
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