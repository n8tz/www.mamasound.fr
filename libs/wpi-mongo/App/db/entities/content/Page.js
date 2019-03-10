/*
 * Copyright (c) 2018. Wise Wild Web
 *
 * This File is part of Caipi and under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International Public License
 * Full license at https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode
 *
 *  @author : Nathanael Braun
 *  @contact : caipilabs@gmail.com
 */

import React from "react";
import {types, validate} from "App/db/field";
export default {
    alias      : "Page",
    wwwRoute   : "Page",
    label      : "Page simple",
    apiRoute   : "page",
    aliasField : "label",                          // @optional fields used to generate alias

    adminRoute : "Content/Pages",
    autoMount  : ["linkedMedia"],
    schema     : {
        label     : [validate.mandatory, validate.noHtml],
        resume    : [validate.noJs],
        text      : [validate.noJs],
        item_link : [validate.noJs, validate.isUrl]
    },
    fields     : {
        "_id"   : types.indexes,
        "label" : types.labels(),
        "text"  : types.descriptions(),

        "linkedMedia" : types.collection(["Document", "Article", "Collection", "Image", "Video"], {},
                                          "Contenus liés :")

    }
};
