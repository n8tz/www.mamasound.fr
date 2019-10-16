/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

'use strict';

import {Views}    from "App/ui";
import Image     from "App/ui/components/Image";
import moment    from "moment";
import React     from "react";
import {NavLink} from "react-router-dom";


export default class Menu extends React.Component {
	//static follow = [ 'events' ];
	
	//constructor( props, context ) {
	//    // debugger;
	//    super(...arguments);
	//    this.state = {
	//        ...this.state,
	//    }
	//}
	
	getRouteTo() {
		var record = this.props.record,
		    route  = this.props.record.path,
		    day    = this.state.events && this.state.events.day,
		    sday   = this.state.events && this.state.events.selectedDay,
		    now    = moment()
		;
		if ( !record.addDay )
			return route;//super.getRouteTo();
		
		if ( now.isSame(sday, 'day') )
			day = "Aujourd'hui"
		// else if (now.add(1, 'day').isSame(sday, 'day'))
		// day = "Demain"
		
		
		if ( !route || route == '/' && day ) route = '/Tout-Montpellier';
		return route + (day ? '/' + day : '');
	}
	
	getRootComponent() {
		let r = this.props.record;
		return (r && (!r.childs || !r.childs.length) && NavLink) || 'div';
	}
	
	getClassName() {
		return super.getClassName() + ' ' + (this.props.record && this.props.record.cls || '')
	}
	
	getAttributes() {
		var record = this.props.record;
		// debugger
		if ( !this.props.record )
			return {};
		return record.childs && record.childs.length &&
			{
				itemType : "http://www.schema.org/SiteNavigationElement",
				role     : "navigation",
				itemScope: true
			}
			||
			{
				to             : this.getRouteTo(),
				className      : "MenuItem " + (record.cls || ''),
				activeClassName: "active",
				exact          : true,
				itemProp       : "url",
				target         : record.outLink ? "_blank" : undefined,
				onClick        : this.onClick.bind(this)
			};
	}
	
	render() {
		var record = this.props.record;
		if ( !record )
			return <span/>;
		return record.childs && record.childs.length ?
		       record.childs.map(
			       ( child ) => <Views.Menu.menu id={child.objId} key={child.objId + '_' + "MenuItem"}
			                                    className={"MenuItem"}/>
		       )
		                                             : [
				this.getPreviewSrc() &&
				<Image src={this.getPreviewSrc()} preload
				       className="preview"
				/> || [
					<span className="_vAlign"></span>,
					!record.hideTitle && <span className="label">{record.label}</span> || ''
				]
			];
	}
	
}
;