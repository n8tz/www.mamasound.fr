/*
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

import {types, validate} from "App/db/fields";
export default {

    alias            : "Route",
    label            : "App Route",
    category         : "Config",
    adminRoute       : "Structure/Routes",
    labelField       : "label",
    searchableFields : ["label"],
    // autoMount        : ["childs"],
    schema           : {
        label : [validate.mandatory]
    },
    fields           : {
        "_id"   : types.indexes,
        "label" : types.labels("Titre de la route"),
        "path"  : types.labels("Url ( ex : /path/:id )"),
        "auth"  : types.boolean("Require login :"),
        "viewMode": types.labels("View mode (default to 'page')"),

        "target" : types.picker(true, {storeTypedItem : true}, "Cible :")
    }
};
