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

import React      from "react";
import {TweenRef} from "react-rtween";

const tweenLine = {
	"scrollX": [
		{
			
			from    : 0,
			duration: 100,
			easeFn  : "easeSinIn",
			apply   : {
				//opacity  : 1,
				transform: [{}, {
					//translateZ: "50px",
					translateY: "40vh",
				}]
			}
		},
		{
			
			from    : 100,
			duration: 100,
			easeFn  : "easeSinOut",
			apply   : {
				//opacity  : -1,
				transform: [{}, {
					translateY: "40vh",
				}]
			}
		}
	]
};
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
						top       : ["50%", "3em"],
						left      : ["30%", "-3em"],
						//opacity        : 0,
						right     : "1em",
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
			<TweenRef
				initial={
					{
						"position": "absolute",
						top       : "50%",
						left      : "30%",
						//opacity        : 0,
						width     : "4px",
						bottom    : "0%",
						//backgroundColor: "black",
						transform : [{}, {
							translateY: (isNext || isCurrent) && "-40vh" || "0vh",
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
									//opacity  : -1,
									transform: [{}, {
										translateY: "40vh",
									}]
								}
							}] || isCurrent && [
							{
								
								from    : 0,
								duration: 100,
								easeFn  : "easeSinIn",
								apply   : {
									//opacity  : 1,
									transform: [{}, {
										//translateZ: "50px",
										translateY: "40vh",
									}]
								}
							},
							{
								
								from    : 100,
								duration: 100,
								easeFn  : "easeSinOut",
								apply   : {
									//opacity  : -1,
									transform: [{}, {
										translateY: "40vh",
									}]
								}
							}
						] || [
							{
								
								from    : 0,
								duration: 100,
								easeFn  : "easeSinIn",
								apply   : {
									//opacity  : -1,
									transform: [{}, {
										translateY: "40vh",
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
