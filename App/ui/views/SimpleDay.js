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
 * Date: 08/12/2015
 * Time: 11:50
 */
'use strict';

import moment from "moment";
import React  from "react";

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
	<div className={"SimpleDay"}>
		{/*<img src={ banList[moment(day).weekday()] }/>*/}
		<div className="date">
			{(moment(day).isSame(moment(), 'week'))
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
			(moment(day).format("dddd DD MMMM YYYY"))}
		</div>
	</div>
;
