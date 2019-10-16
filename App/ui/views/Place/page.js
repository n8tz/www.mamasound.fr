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

import React   from "react";
import moment  from "moment";
import {Comps} from "App/ui";

import {NavLink} from "react-router-dom";


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
	return <div className={ "Place Place_" + record._cls + ' ' + (selected ? "selected" : "") }>
		<div className="title">
			{ record.label }
		</div>
		{
			record.previewImage &&
			<div className="preview">
				<Comps.Image src={ record.previewImage } w={ 500 }/>
			</div>
		}
		<pre>
			{
				JSON.stringify(record, null, 2)
			}
		</pre>
		{
			!/^\s*$/.test(record.text || '') &&
			<div className="resume" dangerouslySetInnerHTML={ { __html: record.text } }/> || ''
		}
	</div>
}
;
