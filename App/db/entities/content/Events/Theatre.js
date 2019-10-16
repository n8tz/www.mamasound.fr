/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

/**
 * @author Nathanael BRAUN
 *
 * Date: 24/11/2015
 * Time: 19:18
 */
import React from 'react';


import {types, validate} from 'App/db/fields';

export default {
	...require("../Event").default,
	label           : "Piece de Theatre",
	targetCollection: "Event",
	disallowCreate  : false,//Can't create pure events so we must enable editing when inheriting...
	adminRoute      : "Événements/Theatre",
	// apiRoute         : "dates",
	wwwRoute        : "Theatre"
};