/*
 * Copyright (c) 2018. Wise Wild Web
 *
 * This File is part of Caipi and under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International Public License
 * Full license at https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode
 *
 *  @author : Nathanael Braun
 *  @contact : caipilabs@gmail.com
 */

import React from 'react';

import {types, validate} from "App/db/field/index";

export default {
    alias     : "Collection",
    label     : "Collection",
    apiRoute  : "collection",
    adminRoute: "Structure/Collections",
    autoMount : ["items"],                  // @optional properties that need to be included in a get quuery (format : {objId:(id),_cls:(entity type)})
    aliasField: "label",                          // @optional fields used to generate alias
    
    processResult: {
        "get": function ( record, cuser ) {
            if ( !record._public )
                if ( !cuser || !cuser.isPublisher ) {
                    return null;
                }
            return record;
        }
    },
    schema       : {
        label: [validate.mandatory, validate.noHtml],
        text : [validate.noJs]
    },
    fields       : {
        "_id"         : types.indexes,
        "_public"     : types.boolean("Publier :", false),
        "label"       : types.labels(),
        "previewImage": types.media({ allowedTypes: "Image" }, "Preview :"),
        "text"        : types.descriptions(),
        "useLink" : types.boolean("Use links :", false),
        "items"       : types.collection(true, {
            storeTypedItem    : true,
            allowedUploadTypes: ["Image", "Video"],
            allowUpload       : true
        }, "Content :")
    }
};
