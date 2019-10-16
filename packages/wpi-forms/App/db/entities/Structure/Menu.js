/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import {types, validate} from "App/db/fields";

export default {
    
    alias     : "Menu",
    label     : "Menu Item",
    adminRoute: "Structure/Menus",
    category  : "Config",
    labelField: "label",
    aliasField: "label",                          // to ref  roots in jsx
    
    searchableFields: ["label"],
    autoMount       : ["childs", "Route"],
    
    schema: {
        label: [validate.mandatory]
    },
    fields: {
        "_id"         : types.indexes,
        "label"       : types.labels("Titre"),
        "description" : types.labels("Description"),
        "path"        : types.labels("Path", { placeHolder: "Leave Blank if using routes" }),
        "Route"       : types.picker(["Route"], { storeTypedItem: true }, "Cible :"),
        "cls"         : types.labels("Classe css"),
        "forceRefresh": types.boolean("Force page update :", false),
        "auth"        : types.enum("Require auth",
                                   [{ label: "no", value: false }, { label: "yes", value: true }]),//@todo,
        
        "childs": types.collection(["Menu"], { defaultProps: false }, "Sous-menus :")
    }
};
