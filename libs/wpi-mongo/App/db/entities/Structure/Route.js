/*
 * Copyright (c) 2018. Wise Wild Web
 *
 * This File is part of Caipi and under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International Public License
 * Full license at https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode
 *
 *  @author : Nathanael Braun
 *  @contact : caipilabs@gmail.com
 */

import {types, validate} from "App/db/field/index";
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
