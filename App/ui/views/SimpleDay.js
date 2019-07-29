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

/**
 * @author Nathanael BRAUN
 *
 * Date: 08/12/2015
 * Time: 11:50
 */
'use strict';

import React  from "react";
import moment from "moment";

import {NavLink} from "react-router-dom";

const banList = [
	require("App/ui/assets/images/ban/jours-lundi.png"),
	require("App/ui/assets/images/ban/jours-mardi.png"),
	require("App/ui/assets/images/ban/jours-mercredi.png"),
	require("App/ui/assets/images/ban/jours-jeudi.png"),
	require("App/ui/assets/images/ban/jours-vendredi.png"),
	require("App/ui/assets/images/ban/jours-samedi.png"),
	require("App/ui/assets/images/ban/jours-dimanche.png")
]

export default ( { day } ) =>
	<div className={ "SimpleDay" }>
		<img src={ banList[moment(day).weekday()] }/>
		<div className="date">
			{ (moment(day).isSame(moment(), 'week'))
			&&
			moment(day).calendar(moment(), {
				sameDay : '[Aujourd\'hui]',
				nextDay : '[Demain]',
				nextWeek: 'dddd',
				lastDay : '[hier]',
				lastWeek: 'dddd [dernier]',
				sameElse: '[Le ]DD/MM/YYYY'
			})
			||
			(moment(day).format("dddd DD MMMM YYYY")) }
		</div>
	</div>
;
