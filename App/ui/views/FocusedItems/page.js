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

import {Views}    from "App/ui";
import Editable   from "App/ui/Editable";
import React      from "react";
import {TweenRef} from "react-voodoo";

export default class page extends React.Component {
	state = {
		big: false
	};
	
	render() {
		let {
			    record,
			    refs   = {},
			    target = record.targetEtty && refs[record.targetEtty.objId] || record,
			    isNext, isCurrent
		    } = this.props,
		    {
			    big
		    } = this.state;
		//debugger;
		return <div className={"Page FocusedItems_page type_" + target._cls + " " + (big ? " bigView" : "smallView")}>
			<Editable id={record._id}/>
			<div className="title">
				{target && (target.title || target.label)}
			</div>
			<div className="resume">
				{
					target && !/^\s*$/.test(target.text || '') &&
					<div className="content" dangerouslySetInnerHTML={{ __html: target.text }}
					     onClick={e => this.setState({ big: !big })}/> || ''
				}
			</div>
			
			
			<TweenRef
				initial={
					{
						"position": "absolute",
						top       : ["40%", "3em"],
						left      : "0%",
						//opacity   : 0,
						width     : "45vw",
						height    : "4px",
						//backgroundColor: "white",
						transform : [{}, {
							translateX: (isNext || isCurrent) && "-40vw" || "0vw",
						}]
					}
				}
				tweenLines={
					{
						"scrollX": isNext && [
							{
								
								from    : 100,
								duration: 100,
								easeFn  : "easeSinOut",
								apply   : {
									transform: [{}, {
										translateX: "40vw",
									}]
								}
							}] || isCurrent && [
							{
								
								from    : 0,
								duration: 100,
								easeFn  : "easeSinIn",
								apply   : {
									transform: [{}, {
										translateX: "40vw",
									}]
								}
							},
							{
								
								from    : 100,
								duration: 100,
								easeFn  : "easeSinOut",
								apply   : {
									transform: [{}, {
										translateX: "40vw",
									}]
								}
							}
						] || [
							{
								
								from    : 0,
								duration: 100,
								easeFn  : "easeSinIn",
								apply   : {
									transform: [{}, {
										translateX: "40vw",
									}]
								}
							}
						] || []
					}
				}>
				<div className={"styleBar"}/>
			</TweenRef>
		</div>
	}
}
