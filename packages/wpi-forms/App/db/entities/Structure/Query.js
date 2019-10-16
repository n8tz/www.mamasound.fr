/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import { types, validate } from "App/db/fields";

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
