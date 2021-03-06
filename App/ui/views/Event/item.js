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

import config         from "App/config";
import {Comps, Views} from 'App/ui';
import Editable       from "App/ui/Editable";
import getMediaSrc    from "App/utils/getMediaSrc";
import moment         from "moment";
import React          from "react";
import {Helmet}       from "react-helmet";

let defaultPreview = {
	Concert: require("App/ui/assets/images/mms.png"),
	Theatre: require("App/ui/assets/images/mmt.png"),
	Expo   : require("App/ui/assets/images/mme.png")
};
let defaultTypes   = {
	Concert: "MusicEvent",
	Theatre: "TheaterEvent",
	Expo   : "VisualArtsEvent"
};

export default class eventItem extends React.Component {
	state = {};
	
	render() {
		let {
			    record, record: { title, place, category }, $actions,
			    refs, selected, onClick, appState, currentDate = record.realPeriod
		    }           = this.props,
		    { big }     = this.state,
		    placeRecord = record.place && refs[record.place.objId],
		    start       = moment(currentDate && currentDate.startTM),
		    end         = moment(currentDate && currentDate.endTM),
		    url         = "/" + appState.viewTypeList[appState.viewType] + '/' + moment(start).format("DD-MM-YY")
			    + "/" + (record._alias || record._id),
		    urlPlace    = placeRecord && ("/Place/" + (placeRecord._alias || placeRecord._id));
		
		let preview = record.previewImage || (place && refs[place.objId] && refs[place.objId].previewImage || category && refs[category.objId] && refs[category.objId].icon)
		return <div className={"Event Event_item Event" + record._cls + ' ' + (selected ? "selected" : "") + ' ' + (big
		                                                                                                            ? " big"
		                                                                                                            : "")}
		            onClick={e => {
			            big && this.setState({ big: false });
			            onClick(e);
		            }} id={selected && "selected"}
		>
			<Editable id={record._id} etty={record._cls}/>
			{
				selected &&
				<Helmet
					title={"Mama Sound - " + moment(currentDate && currentDate.startTM || record.startTM).format("DD/MM/YY H:mm") + ' - ' + record.title}
					
					meta={[
						{ "property": "robots", "content": "noodp" },
						{ "property": "Description", "content": record.resume || record.description || record.title },
						{ "property": "og:site_name", "content": "MamaSound" },
						{
							"property": "og:image",
							"content" : preview && getMediaSrc(preview)
						}
					]}
					script={place && refs[place.objId] && [{
						"type"     : "application/ld+json",
						"innerHTML": `{
                                          "@context": "http://schema.org",
                                          "@type": "${defaultTypes[[this.props.record._cls] || "MusicEvent"]}",
                                          "name": "${(title || "").replace(/(['"\\])/g, '\\\$1')}",
                                          "url": "${url}",
                                          "image": "${preview}",
                                          "startDate": "${start.toISOString()}",
                                          "location": {
                                             "@type": "Place",
                                             "name": "${refs[place.objId].label}",
                                             "address": "${(refs[place.objId].address && refs[place.objId].address.address || "").replace(
							/(['"\\])/g, '\\\$1')}"
                                          }
                                    }`
					}] || []}
				>
					{place && <script type={"application/ld+json"} dangerouslySetInnerHTML={{
						__html: `{
                                          "@context": "http://schema.org",
                                          "@type": "${defaultTypes[[this.props.record._cls] || "MusicEvent"]}",
                                          "name": "${(title || "").replace(/(['"\\])/g, '\\\$1')}",
                                          "url": "${url}",
                                          "image": "${preview}",
                                          "startDate": "${start.toISOString()}",
                                          "location": {
                                             "@type": "Place",
                                             "name": "${refs[place.objId].label}",
                                             "address": "${(refs[place.objId].address && refs[place.objId].address.address || "").replace(
							/(['"\\])/g, '\\\$1')}"
                                          }
                                    }`
					}}/>
					}
					<meta property="og:site_name"
					      content={"MamaSound"}/>
					<meta property="og:image"
					      content={preview && getMediaSrc(preview, { w: 200 })}/>
				</Helmet>
			}
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
					<Comps.Image src={refs[record.category.objId].icon} w={64}/>
					||
					<Comps.Image src={defaultPreview[record._cls]} style={{ transform: "scale(.8)" }} w={64}/>
				}
			</div>
			{/*{ record.previewImage &&*/}
			{/*<div className="preview">*/}
			{/*<img src={ record.previewImage }/>*/}
			{/*</div>*/}
			{/*}*/}
			
			<a className="title" href={url} onClick={e => (e.preventDefault())} rel="nofollow">
				{record.title}
			</a>
			
			<div className="price">
				{
					record.price
				}
			</div>
			{
				record.place && refs[record.place.objId] &&
				refs[record.place.objId].address &&
				(refs[record.place.objId].browsable ?
				 <div className="place">
					 ( <a className="title" href={urlPlace}
					      onClick={e => (e.preventDefault(), e.stopPropagation(), $actions.history_push(urlPlace))}>{refs[record.place.objId].label}</a> )
				 </div> :
				 <div className="place">
					 ( <span>{refs[record.place.objId].label}</span> )
				 </div>)
			}
			
			{record.place && refs[record.place.objId] && <Views.Place.mini record={refs[record.place.objId]}/>}
			{selected && <div className="details">
				<div className="preview">
					<Comps.Image src={preview} w={150}/>
				</div>
				
				<Comps.ShareBox
					url={url}
					event={record} place={record.place && refs[record.place.objId]}/>
				{!/^\s*$/.test(record.resume || record.description || '') &&
				<div className="resume" dangerouslySetInnerHTML={{
					__html: !big
					        ? record.resume || record.description
					        : record.description || record.resume
				}}/> || ''}
				{record.description && <div className="more"
				                            onClick={e => (e.stopPropagation(), e.preventDefault(), this.setState({ big: true }))}>
				</div>}
			</div>}
		
		
		</div>
			;
	}
}
