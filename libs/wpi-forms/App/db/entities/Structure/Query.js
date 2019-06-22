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
