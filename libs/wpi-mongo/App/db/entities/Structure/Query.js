/*
 * Copyright (c) 2018. Wise Wild Web
 *
 * This File is part of Caipi and under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International Public License
 * Full license at https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode
 *
 *  @author : Nathanael Braun
 *  @contact : caipilabs@gmail.com
 */

import { types, validate } from "App/db/field/index";

export default {
    
    alias           : "Query",
    label           : "App Query",
    adminRoute      : "Structure/Queries",
    category        : "Config",
    labelField      : "label",
    searchableFields: [ "label" ],
    schema          : {
        label: [ validate.mandatory ]
    },
    fields          : {
        "_id"     : types.indexes,
        "label"   : types.labels("Query name"),
        "viewMode": types.labels("View mode (default to preview)"),
        "useLink" : types.boolean("Use links :", false),
        "type"    : types.ettyEnum("Target Entity Type"),
        "query"   : types.json("Query REST", { serialize: true })
    }
};
