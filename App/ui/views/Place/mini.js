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
 * Date: 20/12/2015
 * Time: 13:03
 */

'use strict';

import React from "react";
import Editable       from "App/ui/Editable";

export default class extends React.Component {
	onClick( e ) {
		e.stopPropagation()
	}
	
	render() {
		var record = this.props.record,
		    coords = record.address;
		// moment;
		// debugger;
		// console.log(this.context.data.cache.getEntity("Place", record.place.objId))
		return <div className={"Place_mini"}>
			<div className="descr">
				<div className="details">
					<div className="title">
						<span>Adresse : </span>{record.address.label}
					</div>
					<div className="address">
						<a href={"https://www.google.fr/maps/search/" + record.address.address}
						   target="_blank">{record.address.address}</a>
					</div>
				</div>
			</div>
		</div>
	}
	
};