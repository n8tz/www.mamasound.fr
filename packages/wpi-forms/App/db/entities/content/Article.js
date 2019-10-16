/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import React             from "react";
import {types, validate} from "App/db/fields";

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
