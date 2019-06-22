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
