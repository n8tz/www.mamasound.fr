/*
 * Copyright (c) 2018. Wise Wild Web
 *
 * This File is part of Caipi and under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International Public License
 * Full license at https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode
 *
 *  @author : Nathanael Braun
 *  @contact : caipilabs@gmail.com
 */

import React             from "react";
import {types, validate} from "App/db/field";

export default {
    labelField      : "label",
    searchableFields: ["label"],
    schema          : {
        label: [validate.mandatory, validate.noHtml]
    },
    fields          : {
        "_id"  : types.indexes,
        "label": types.labels(),
        
        "previewImage": types.media({ allowedTypes: "Image" }, "Preview :"),
        "resume"      : types.descriptions('Resume'),
        "text"        : types.descriptions('Text'),
        //"linkedMedia" : types.collection(["Article", "Media"], {}, "Contenus liés :")
    }
};
