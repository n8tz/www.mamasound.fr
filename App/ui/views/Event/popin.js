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

'use strict';

import React from "react";


export default ( { record, record: { title, place, category }, onClose, refs, className, style, onClick, ref } ) =>
{
	return (
		<div className={"Popin " + (className || '')} style={{ ...(style || {}) }} ref={ref} onClick={onClick}>
			{/*<div className="closeBtn" onClick={ onClose }/>*/}
			<div className="topBlock">
				<img className="logo"
				     src={"http://static.mamasound.fr/" + (refs[place.objId].previewImage || record.previewImage || category && refs[category.objId] && refs[category.objId].icon)}/>
				<div className="name">
					{refs[place.objId].label}
				</div>
				<div className="address">
					{refs[record.place.objId] && refs[place.objId].address.address},<br/>
				</div>
			</div>
		</div>
	);
}
	