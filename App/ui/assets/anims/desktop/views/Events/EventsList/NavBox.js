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
import {collWidth} from "../../../vars";

export const typesNav  = {
	position : "absolute",
	width    : ["100%", "-" + collWidth],
	right    : "0px",
	top      : "5px",
	height   : "64px",
	transform: {
		//translateY: "85%"
	}
};
export const SearchBar = {
	position: "absolute",
	width   : [collWidth, -30],
	left    : "0px",
	top     : "5px",
};