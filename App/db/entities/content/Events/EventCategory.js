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
import React from 'react';

import {types, validate} from 'App/db/fields';
export default {
    label        : "Style d'événements",
    adminRoute   : "Événements/Style d'événements",
    // apiRoute     : "eventType",
    aliasField   : "name",
    labelField   : "name",
    previewField : "icon",
    wwwRoute     : "genres",

    schema : {
        name : [validate.mandatory, validate.noHtml],
        icon : [validate.mandatory]
    },
    fields : {
        "_id"       : types.indexes,
        "name"      : types.labels(),
        "eventType" : types.enum(
            "Type",
            [
                {label : "Concert", value : "Concert"},
                {label : "Expo", value : "Expo"},
                {label : "Theatre", value : "Theatre"}
            ]
        ),
        "icon"      : types.media({allowedTypes : "Image"}, "Preview :"),
        "color"     : types.color('Couleur :')
    }
};