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

import {Comps}     from "App/ui";
import Editable    from "App/ui/Editable";
import React       from "react";
import {TweenRef}  from "react-voodoo";
import getMediaSrc from "App/utils/getMediaSrc";


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
	return <div
		className={
			"Page FocusedItems_preview type_" + target._cls + " " + className
			+ " " + (record.backgroundMode || '')
			+ " " + (record.previewMode || '')
		}
		style={style}>
		<Editable id={record._id} etty={record._cls}/>
		{
			record.backgroundMode &&
			record.backgroundMode !== "back_hidden" &&
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
					{(record.backgroundColor) &&
					<div className={"backColor"} style={{ backgroundColor: record.backgroundColor || 'transparent' }}/>}
					{record.backgroundMode !== "big_wghost" && <>
						<Comps.Image src={record.background} className={"leftGhost"}/>
						<Comps.Image src={record.background} className={"rightGhost"}/>
					</>}
					{
						(/^[^\s]+\.i?(avi|mp4|mkv|webm|flv|3gp|mpeg|mpg)(\?.*)?$/.test(record.background)
							|| /youtube/.test(record.background))
						&&
						<Comps.Player
							item={{
								mediaUrl : getMediaSrc(record.background),
								visible  : true,
								jwOptions: { repeat: true, mute: true }
							}}
							style={{ width: '100%', height: '100%' }}
							startTime={20}
							autoplay={true}
							volume={0}/>
						|| <Comps.Image src={record.background}/>
					}
				</div>
			</TweenRef>
			
		}
		
		{
			record.usePreviewImage && previewImage &&
			<TweenRef
				initial={
					{
						...record.previewStyle,
						//"position": "absolute",
						//top       : ["0%", "3.5em"],
						//left      : "0%",
						opacity  : (isNext || isCurrent) ? 0 : 1,
						//width     : "45vw",
						//height    : "4px",
						//backgroundColor: "white",
						transform: [{}, {
							translateX: (isNext || isCurrent) && "100px" || "0px",
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
										translateX: "-100px",
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
										translateX: "-100px",
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
										translateX: "-100px",
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
										translateX: "-100px",
									}]
								}
							}
						] || []
					}
				}>
				<div className="preview">
					
					{/*<Comps.Image src={previewImage} className={"leftGhost"}/>*/}
					{/*<Comps.Image src={previewImage} className={"rightGhost"}/>*/}
					<Comps.Image src={previewImage} w={500}/>
				</div>
			</TweenRef>
		}
	</div>
}
;
