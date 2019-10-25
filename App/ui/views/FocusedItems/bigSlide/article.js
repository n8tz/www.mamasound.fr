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

import Editable from "App/ui/Editable";
import React    from "react";

export default class page extends React.Component {
	state = {
		big: false
	};
	
	render() {
		let {
			    record, className = '',
			    refs              = {},
			    target            = record.targetEtty && refs[record.targetEtty.objId] || record,
			    isNext, isCurrent
		    }      = this.props,
		    {
			    big
		    }      = this.state,
		    resume = big || record.useBigResume ? target.text : record.resume;
		return <div className={"bigSlide_article type_" + target._cls + " " + (big || record.useBigResume
		                                                                       ? " bigView"
		                                                                       : "smallView") + ' ' + className}>
			<Editable id={record._id}/>
			{record.useTitle && <div className="title">
				{record.label || target && (target.title || target.label)}
			</div>}
			{record.useResume && <div className="resume">
				{
					resume && !/^\s*$/.test(resume || '') &&
					<div className="content"
					     dangerouslySetInnerHTML={{ __html: resume }}
					     onClick={e => this.setState({ big: !big })}/> || ''
				}
			</div>}
		
		</div>
	}
}
