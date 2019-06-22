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
export const selected       = {
	position : "absolute",
	//backgroundColor: "red",
	top      : "45%",
	left     : "50%",
	//width          : "90vw",
	height   : "50vh",
	//overflow       : "hidden",
	transform: [{
		translateX: "-50%",
		translateY: "-50%",
		perspective: "600px",
		//rotateX    : "2deg"
	}, {}, {  }]
};
export const selectedScroll = {
	scrollY: [
		{
			type    : "Tween",
			from    : 0,
			duration: 100,
			apply   : {
				opacity  : "-1",
				//height   : 2.5,
				//top      : -2.5,
				transform: [
					{
						//perspective:'500px'
					},
					{
						rotateX: "-6deg"
					}, {
						translateY: "150px",
						translateZ: "50px",
					}]
			}
		},
	],
}