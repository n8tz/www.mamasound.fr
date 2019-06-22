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