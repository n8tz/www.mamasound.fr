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

import {Comps} from "App/ui";
import React   from "react";


export default (
	{
		record,
		refs,
		selected,
		place = record.place
		&& refs
		&& refs[record.place.objId],
		category = record.category
		&& refs[record.category.objId]
	}
) => {
	//debugger;
	return <div className={"Page Page_" + record._cls + ' ' + (selected ? "selected" : "")}>
		{/*<div className="title">*/}
		{/*	{record.title}*/}
		{/*</div>*/}
		{
			record.previewImage &&
			<div className="preview">
				<Comps.Image src={record.previewImage} w={500}/>
			</div>
		}
		{
			record.background &&
			<div className="background">
				<Comps.Image src={record.background} className={"leftGhost"}/>
				<Comps.Image src={record.background} className={"rightGhost"}/>
				<Comps.Image src={record.background}/>
			</div>
		}
		{/*{*/}
		{/*	!/^\s*$/.test(record.text || '') &&*/}
		{/*	<div className="resume" dangerouslySetInnerHTML={{ __html: record.text }}/> || ''*/}
		{/*}*/}
	</div>
}
;
