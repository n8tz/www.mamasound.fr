/*
 *
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

import React     from "react";
import moment    from "moment";
import Editable  from "App/ui/Editable";
import {NavLink} from "react-router-dom";


let defaultPreview = {
	Concert: require("App/ui/assets/medias/mms.png"),
	Theatre: require("App/ui/assets/medias/mmt.png"),
	Expo   : require("App/ui/assets/medias/mme.png")
};
export default ( { record, refs, selected, onClick, onTap } ) =>
	<div className={"Event Event" + record._cls + ' ' + (selected ? "selected" : "")}
	     onTap={onTap}
	     onClick={onClick}
	>
		<Editable id={record._id}/>
		<div className="start">
			{moment(record.startTM).format("H:mm")}
		</div>
		<div className="icon">
			{
				record.category && refs[record.category.objId] &&
				<img src={refs[record.category.objId].icon}/>
				||
				<img src={defaultPreview[record._cls]} style={{ transform: "scale(.8)" }}/>
			}
		</div>
		{/*{ record.previewImage &&*/}
		{/*<div className="preview">*/}
		{/*<img src={ record.previewImage }/>*/}
		{/*</div>*/}
		{/*}*/}
		<div className="title">
			{record.title}
		</div>
		
		<div className="price">
			{
				record.price
			}
		</div>
		{
			record.place && refs[record.place.objId] &&
			<div className="place">
				( <span>{refs[record.place.objId].label}</span> )
			</div>
		}
		
		{!/^\s*$/.test(record.resume || '') &&
		<div className="resume" dangerouslySetInnerHTML={{ __html: record.resume }}/> || ''}
	</div>
;
