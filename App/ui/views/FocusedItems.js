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

import React    from "react";
import Editable from "App/ui/Editable";

import {NavLink}          from "react-router-dom";
import moment, {TweenRef} from "./DayBlock";

export default class FocusedItems extends React.Component {
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
