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

import {Comps}  from 'App/ui';
import Editable from "App/ui/Editable";
import moment   from "moment";
import React    from "react";


let defaultPreview = {
	Concert: require("App/ui/assets/images/mms.png"),
	Theatre: require("App/ui/assets/images/mmt.png"),
	Expo   : require("App/ui/assets/images/mme.png")
};

export default class eventItem extends React.Component {
	state = {};
	
	render() {
		let { record, refs, selected, onClick, onTap, currentDate = record.realPeriod } = this.props,
		    { big }                                                                     = this.state,
		    start                                                                       = moment(currentDate && currentDate.startTM),
		    end                                                                         = moment(currentDate && currentDate.endTM);
		return <div className={"Event Event_item Event" + record._cls + ' ' + (selected ? "selected" : "") + ' ' + (big
		                                                                                                            ? " big"
		                                                                                                            : "")}
		            onClick={e => {
			            big && this.setState({ big: false });
			            onClick(e);
		            }}
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
				refs[record.place.objId].address &&
				<a className="place"
				   target={"_blank"}
				   href={"https://www.google.fr/maps/search/" + (refs[record.place.objId].address.address)}>
					( {refs[record.place.objId].label} )
				</a>
			}
			{selected && <Comps.ShareBox event={record} place={record.place && refs[record.place.objId]}/>}
			{!/^\s*$/.test(record.resume || record.description || '') &&
			<div className="resume" dangerouslySetInnerHTML={{
				__html: !big
				        ? record.resume || record.description
				        : record.description || record.resume
			}}/> || ''}
			{record.description && <div className="more material-icons"
			                            onClick={e => (e.stopPropagation(), e.preventDefault(), this.setState({ big: true }))}>add
			</div>}
		</div>
			;
	}
}
