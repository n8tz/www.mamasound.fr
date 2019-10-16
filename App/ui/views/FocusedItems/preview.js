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

import {Comps}    from "App/ui";
import Editable   from "App/ui/Editable";
import React      from "react";
import {TweenRef} from "react-voodoo";


export default (
	{
		record,
		refs = {},
		style = {},
		className = "",
		target = record.targetEtty && refs[record.targetEtty.objId] || record,
		previewImage = target && target.previewImage || record.previewImage,
		rPreviewImage = record.previewImage,
		category = record.category && refs[record.category.objId],
		isNext, isCurrent
	}
) => {
	//debugger;
	return <div className={"Page FocusedItems_preview type_" + target._cls + " " + className} style={style}>
		<Editable id={record._id}/>
		{
			record.useBackground && (record.background || rPreviewImage)&&
			<TweenRef
				initial={
					{
						filter: {
							sepia: (isNext || isCurrent) ? 0 : 100,
						}
					}
				}
				tweenLines={
					{
						"scrollX": isNext && [
							{
								
								from    : 100,
								duration: 100,
								easeFn  : "easeExpInOut",
								apply   : {
									filter: {
										sepia: 100,
									}
								}
							}] || isCurrent && [
							{
								
								from    : 0,
								duration: 100,
								easeFn  : "easeExpInOut",
								apply   : {
									filter: {
										sepia: 100,
									}
								}
							},
							{
								
								from    : 100,
								duration: 100,
								easeFn  : "easeExpInOut",
								apply   : {
									filter: {
										sepia: 100,
									}
								}
							}
						] || [
							{
								
								from    : 0,
								duration: 100,
								easeFn  : "easeExpInOut",
								apply   : {
									filter: {
										sepia: 100,
									}
								}
							}
						] || []
					}
				}>
				<div className="background">
					<Comps.Image src={record.background || rPreviewImage} className={"leftGhost"}/>
					<Comps.Image src={record.background || rPreviewImage} className={"rightGhost"}/>
					<Comps.Image src={record.background || rPreviewImage}/>
				</div>
			</TweenRef>
			
		}
		
		{
			previewImage &&
			<TweenRef
				initial={
					{
						//"position": "absolute",
						//top       : ["0%", "3.5em"],
						//left      : "0%",
						opacity  : (isNext || isCurrent) ? 0 : 1,
						//width     : "45vw",
						//height    : "4px",
						//backgroundColor: "white",
						transform: [{}, {
							translateX: (isNext || isCurrent) && "40vw" || "0vw",
						}]
					}
				}
				tweenLines={
					{
						"scrollX": isNext && [
							{
								
								from    : 100,
								duration: 100,
								easeFn  : "easeExpInOut",
								apply   : {
									opacity  : 1,
									transform: [{}, {
										translateX: "-40vw",
									}]
								}
							}] || isCurrent && [
							{
								
								from    : 0,
								duration: 100,
								easeFn  : "easeExpInOut",
								apply   : {
									opacity  : 1,
									transform: [{}, {
										translateX: "-40vw",
									}]
								}
							},
							{
								
								from    : 100,
								duration: 100,
								easeFn  : "easeExpInOut",
								apply   : {
									opacity  : 1,
									transform: [{}, {
										translateX: "-40vw",
									}]
								}
							}
						] || [
							{
								
								from    : 0,
								duration: 100,
								easeFn  : "easeExpInOut",
								apply   : {
									opacity  : 1,
									transform: [{}, {
										translateX: "-40vw",
									}]
								}
							}
						] || []
					}
				}>
				<div className="preview">
					
					{/*<Comps.Image src={previewImage} className={"leftGhost"}/>*/}
					{/*<Comps.Image src={previewImage} className={"rightGhost"}/>*/}
					<Comps.Image src={previewImage}/>
				</div>
			</TweenRef>
		}
	</div>
}
;
