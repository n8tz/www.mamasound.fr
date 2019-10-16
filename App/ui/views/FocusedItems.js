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

import React    from "react";
import Editable from "App/ui/Editable";

import {NavLink}          from "react-router-dom";

export default class SlideItem extends React.Component {
	render() {
		let {
			    record, style, className, onClick
		    } = this.props;
		return (
			<div className="FocusedItems" style={ style } onClick={onClick}>
				<Editable id={ record._id }/>
				{ record.previewImage &&
				<div className="preview">
					<img src={ record.previewImage + "w=420" } draggable="false"/>
				</div>
				}
				<div className="title">
					{ record.label }
				</div>
				{ !/^\s*$/.test(record.resume || '') &&
				<div className="resume" dangerouslySetInnerHTML={ { __html: record.resume } }/> || '' }
			</div>
		);
	}
};
