/*
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


//export const infinite        = true;
export const maxJump         = 1;
export const visibleItems    = 1;
export const style           = {
	position: "absolute",
	right   : "0%",
	left    : "300px",
	top     : "0%",
	height  : "100%",
	//overflow: "auto"
};
export const defaultInitial  = {
	position       : "absolute",
	overflow       : "hidden",
	backgroundColor: "white",
	top            : "0%",
	left           : "0%",
	width          : "100%",
	height         : "100%",
	zIndex         : 50,
	//opacity  : 0,
	transform      : [
		{
			translateX: "100%",
			//translateY: "-50%"
		}]
};
export const defaultEntering = [
	{
		from    : 0,
		duration: 100,
		//easeFn  : "easeSinIn",
		apply   : {
			transform: {
				translateX: "-100%",
			},
			zIndex   : 150,
		}
	},
];
export const defaultLeaving  = [
	{
		from    : 0,
		duration: 100,
		//easeFn  : "easeSinOut",
		apply   : {
			transform: {
				translateX: "-100%",
			},
			zIndex   : -150,
		}
	}]
;