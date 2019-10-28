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

import {Comps}  from "App/ui";
import Editable from "App/ui/Editable";
import React    from "react";

export default class SlideItem extends React.Component {
	render() {
		let {
			    record, style, className, onClick
		    } = this.props;
		return (
			<div className="FocusedItems SlideItem" style={style} onClick={onClick}>
				<Editable id={record._id}/>
				
				{record.sliderImage &&
				<div className="preview">
					<Comps.Image src={record.sliderImage}/>
				</div>
				}
				<div className="title">
					{record.label}
				</div>
			</div>
		);
	}
};
