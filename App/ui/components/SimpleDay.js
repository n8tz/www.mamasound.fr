/*
 * The MIT License (MIT)
 * Copyright (c) 2019. Wise Wild Web
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  @author : Nathanael Braun
 *  @contact : n8tz.js@gmail.com
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
	require("App/ui/assets/medias/ban/jours-lundi.png"),
	require("App/ui/assets/medias/ban/jours-mardi.png"),
	require("App/ui/assets/medias/ban/jours-mercredi.png"),
	require("App/ui/assets/medias/ban/jours-jeudi.png"),
	require("App/ui/assets/medias/ban/jours-vendredi.png"),
	require("App/ui/assets/medias/ban/jours-samedi.png"),
	require("App/ui/assets/medias/ban/jours-dimanche.png")
]

export default ( { day } ) =>
	<div className={ "SimpleDay" }>
		<img src={ banList[moment(day).weekday()] }/>
		<div className="date">
			{ moment(day).calendar(moment(), {
				sameDay : '[Aujourd\'hui]',
				nextDay : '[Demain]',
				nextWeek: 'dddd',
				lastDay : '[hier]',
				lastWeek: 'dddd [dernier]',
				sameElse: '[Le ]DD/MM/YYYY'
			}) }
		</div>
	</div>
;
