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

import Editable    from "App/ui/Editable";
import getMediaSrc from "App/utils/getMediaSrc";
import React       from "react";
import {Helmet}    from "react-helmet";

import striptags from "striptags";

const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();
export default class page extends React.Component {
	state = {
		big: false
	};
	
	render() {
		let {
			    record, className = '',
			    refs              = {},
			    target            = record.targetEtty && refs[record.targetEtty.objId],
			    previewImage      = target && target.previewImage || record.previewImage,
			    isNext, isCurrent
		    }      = this.props,
		    {
			    big
		    }      = this.state,
		    descr  = entities.decode(striptags(record.resume || target && target.description || record.description || (record.label || target && (target.title || target.label)))),
		    resume = big || record.useBigResume ? target.text || record.resume : record.resume || target.text;
		return <div className={
			"bigSlide_article type_" + target._cls + " " + (record.useCollumn
			                                                ? " collView"
			                                                : (record.useBigResume
			                                                   ? " bigView"
			                                                   : "smallView")) + ' ' + className}>
			<Editable id={record._id}/>
			{
				isCurrent &&
				<Helmet
					title={"Mama Sound - " + (record.label || target && (target.title || target.label))}
				
				>
					<meta property="og:site_name"
					      content={"MamaSound"}/>
					<meta property="og:image"
					      content={(record.sliderImage || previewImage) && getMediaSrc(record.sliderImage || previewImage)}/>
					<meta name="description" content={descr}/>
				</Helmet>
			}
			
			{!record.hideTitle && <div className="title" style={record.titleStyle}>
				{record.label || target && (target.title || target.label)}
				{
					target && target.startTM &&
					<div className={"material-icons"}>calendar</div>
				}
			</div>}
			{!record.hideResume && <div className="resume" style={record.resumeStyle}>
				{
					resume && !/^\s*$/.test(resume || '') &&
					<div className="content" style={record.resumeContentStyle}
					     dangerouslySetInnerHTML={{ __html: resume }}
					     onClick={e => this.setState({ big: !big })}/> || ''
				}
			</div>}
		
		</div>
	}
}
