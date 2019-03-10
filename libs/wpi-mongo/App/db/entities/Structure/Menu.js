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
