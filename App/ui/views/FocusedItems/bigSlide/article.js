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
import config      from "App/config";
import getMediaSrc from "App/utils/getMediaSrc";
import React       from "react";
import {Helmet}    from "react-helmet";

import striptags from "striptags";

const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();
export default class page extends React.Component {
	state     = {
		big: false
	};
	linkClick = ( e ) => {
		if ( e.target.href.includes(config.ROOT_DOMAIN) || e.target.href[0] === '/' ) {
			e.preventDefault();
			e.stopPropagation();
			this.props.$actions.history_push(e.target.href.replace(/^https?:\/\/[^\/]+/ig, ""));
		}
	}
	
	componentDidMount() {
		let node = this.text.current;
		node.querySelectorAll("a").forEach(
			node => node.addEventListener("click", this.linkClick)
		)
	}
	
	componentDidUpdate() {
		let node = this.text.current;
		node.querySelectorAll("a").forEach(
			node => (node.removeEventListener("click", this.linkClick),
				node.addEventListener("click", this.linkClick))
		)
	}
	
	text = React.createRef();
	
	render() {
		let {
			    record, className = '',
			    refs              = {},
			    target            = record.targetEtty && refs[record.targetEtty.objId] || record,
			    previewImage      = target && target.previewImage || record.previewImage,
			    isNext, isCurrent, $actions
		    }      = this.props,
		    {
			    big
		    }      = this.state,
		    descr  = entities.decode(striptags(record.resume || target && (target.description || target.text) || record.description || (record.label || target && (target.title || target.label)))),
		    resume = big || record.useBigResume
		             ? target.description || target.text || record.resume
		             : record.resume || target.description || target.text;
		return <div className={
			"bigSlide_article type_" + target._cls + " "
			+ " " + (record.layoutMode || 'smallView')
			+ ' ' + className}>
			<Editable id={record._id} etty={record._cls}/>
			{
				isCurrent &&
				<Helmet
					title={"Mama Sound - " + (record.label || target && (target.title || target.label))}
				>
					<meta property="og:site_name"
					      content={"MamaSound"}/>
					<meta property="og:image"
					      content={(record.sliderImage || previewImage) && getMediaSrc(record.sliderImage || previewImage, {
						      w: 200,
						      h: 200
					      })}/>
					<meta name="description" content={descr}/>
				</Helmet>
			}
			
			{!record.hideTitle && <div className="title" style={record.titleStyle}>
				{record.label || target && (target.title || target.label)}
				{/*{*/}
				{/*	//target && target.startTM &&*/}
				{/*<div className={"material-icons"}>calendar</div>*/}
				{/*}*/}
				<span className={"close material-icons"} onClick={e => $actions.history_push("/")}>close</span>
			</div>}
			{!record.hideResume && <div className="resume" style={record.resumeStyle} ref={this.text}>
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
