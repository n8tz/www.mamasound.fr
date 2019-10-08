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

import stores                      from 'App/stores/(*).js';
import {Comps}                     from 'App/ui';
import Editable                    from "App/ui/Editable";
import moment                      from "moment";
import React                       from "react";
import RS, {asScope, withStateMap} from "react-scopes";


let defaultPreview = {
	Concert: require("App/ui/assets/images/mms.png"),
	Theatre: require("App/ui/assets/images/mmt.png"),
	Expo   : require("App/ui/assets/images/mme.png")
};


@RS(
	{
		@asScope
		Event: {
			@withStateMap(
				{
					data: undefined,
				}
			)
			record     : stores.MongoRecords,
			@withStateMap(
				{
					@RS.ref
					record: "record.data",
					//@RS.ref
					//curDay: "$parent.appState.curDay"
				}
			)
			currentDate: stores.Event_curDate
			
		},
	}
)
@RS.fromProps("record:Event.record.data", "day:Event.currentDate.curDay")
@RS.connect("Event.record.data:record", "Event.currentDate")
export default class eventItem extends React.Component {
	render() {
		let { record, refs, selected, onClick, onTap, currentDate } = this.props,
		    start                                                   = moment(currentDate && currentDate.startTM),
		    end                                                     = moment(currentDate && currentDate.endTM);
		return <div className={"Event Event_item Event" + record._cls + ' ' + (selected ? "selected" : "")}
		            onClick={onClick}
		>
			<Editable id={record._id}/>
			{
				(record._cls == "Expo") && record.haveVerni
				&& record.verniTM &&
				(moment(record.verniTM).dayOfYear() == moment(this.props.day).dayOfYear())
				&&
				<div className="date date_exp">
					<span>
                        <span className={"label"}>Vernissage</span>
						<span>{moment(record.verniTM).format("HH:mm")}</span>
                   </span>
				</div>
				||
				(record._cls == "Expo")
				&&
				<div className="date date_exp">
					<span className={"labelPeriod"}>
                        {("Du " + start.format("DD/MM"))}
						<br/>
						{("Au " + end.format("DD/MM"))}
                    </span>
				</div>
				||
				<div className="date">
					{moment(currentDate && currentDate.startTM || record.startTM).format("H:mm")}
				</div>
			}
			<div className="icon">
				{
					record.category && refs[record.category.objId] &&
					<Comps.Image src={refs[record.category.objId].icon}/>
					||
					<Comps.Image src={defaultPreview[record._cls]} style={{ transform: "scale(.8)" }}/>
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
					( <span>{refs[record.place.objId].label} {" - " + refs[record.place.objId].quartier}</span> )
				</div>
			}
			{selected && <Comps.ShareBox event={record} place={record.place && refs[record.place.objId]}/>}
			{!/^\s*$/.test(record.resume || '') &&
			<div className="resume" dangerouslySetInnerHTML={{ __html: record.resume }}/> || ''}
		</div>
			;
	}
}
