/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
//

const aliasAPI    = require("App/db/aliasHelpers"),
      fs          = require("fs"),
      express     = require("express"),
      path        = require("path"),
      staticServe = express.static(path.join(process.cwd(), 'node_modules/ckeditor'));

export const name          = "ckEditor";
export const priorityLevel = 1000000;

export function service( server ) {
	server.use("/scripts/ckeditor", staticServe)
}
