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
				<Editable id={record._id} etty={record._cls}/>
				
				{
					record.sliderImage &&
					<a className="preview"
					   href={"/" + record._cls + "/" + (record._alias || record._id)}
					   onDragStart={e => e.preventDefault()}
					   onClick={e => e.preventDefault()}
					>
						<Comps.Image src={record.sliderImage} h={500}/>
					</a>
				}
				{/*<div className="title">*/}
				{/*	{record.label}*/}
				{/*</div>*/}
			</div>
		);
	}
};
