/*
 *
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