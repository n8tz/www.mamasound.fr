/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
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
