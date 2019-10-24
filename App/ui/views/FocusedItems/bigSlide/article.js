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
		    } = this.props,
		    {
			    big
		    } = this.state;
		//debugger;
		return <div className={"bigSlide_article type_" + target._cls + " " + (big
		                                                                       ? " bigView"
		                                                                       : "smallView") + ' ' + className}>
			<Editable id={record._id}/>
			{record.useTitle && <div className="title">
				{target && (target.title || target.label)}
			</div>}
			{record.useResume && <div className="resume">
				{
					target && !/^\s*$/.test(target.text || '') &&
					<div className="content" dangerouslySetInnerHTML={{ __html: target.text }}
					     onClick={e => this.setState({ big: !big })}/> || ''
				}
			</div>}
			
			
			{/*<TweenRef*/}
			{/*	initial={*/}
			{/*		{*/}
			{/*			"position": "absolute",*/}
			{/*			top       : ["0%", "3.5em"],*/}
			{/*			left      : "0%",*/}
			{/*			//opacity   : 0,*/}
			{/*			width     : "45vw",*/}
			{/*			height    : "4px",*/}
			{/*			//backgroundColor: "white",*/}
			{/*			transform : [{}, {*/}
			{/*				translateX: (isNext || isCurrent) && "-40vw" || "0vw",*/}
			{/*			}]*/}
			{/*		}*/}
			{/*	}*/}
			{/*	tweenLines={*/}
			{/*		{*/}
			{/*			"scrollX": isNext && [*/}
			{/*				{*/}
			{/*					*/}
			{/*					from    : 100,*/}
			{/*					duration: 100,*/}
			{/*					easeFn  : "easeSinOut",*/}
			{/*					apply   : {*/}
			{/*						transform: [{}, {*/}
			{/*							translateX: "40vw",*/}
			{/*						}]*/}
			{/*					}*/}
			{/*				}] || isCurrent && [*/}
			{/*				{*/}
			{/*					*/}
			{/*					from    : 0,*/}
			{/*					duration: 100,*/}
			{/*					easeFn  : "easeSinIn",*/}
			{/*					apply   : {*/}
			{/*						transform: [{}, {*/}
			{/*							translateX: "40vw",*/}
			{/*						}]*/}
			{/*					}*/}
			{/*				},*/}
			{/*				{*/}
			{/*					*/}
			{/*					from    : 100,*/}
			{/*					duration: 100,*/}
			{/*					easeFn  : "easeSinOut",*/}
			{/*					apply   : {*/}
			{/*						transform: [{}, {*/}
			{/*							translateX: "40vw",*/}
			{/*						}]*/}
			{/*					}*/}
			{/*				}*/}
			{/*			] || [*/}
			{/*				{*/}
			{/*					*/}
			{/*					from    : 0,*/}
			{/*					duration: 100,*/}
			{/*					easeFn  : "easeSinIn",*/}
			{/*					apply   : {*/}
			{/*						transform: [{}, {*/}
			{/*							translateX: "40vw",*/}
			{/*						}]*/}
			{/*					}*/}
			{/*				}*/}
			{/*			] || []*/}
			{/*		}*/}
			{/*	}>*/}
			{/*	<div className={"styleBar"}/>*/}
			{/*</TweenRef>*/}
		</div>
	}
}
