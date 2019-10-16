/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import stores             from 'App/stores/(*).js';
import Editable           from "App/ui/Editable";
import React              from "react";
import RS, {withStateMap} from "react-scopes";
import {TweenRef}         from "react-voodoo";

@RS(
	{
		@withStateMap(
			{
				data: {
					id       : "Edito",
					etty     : "Article",
					"default": {
						_id  : "_Edito",
						_cls : "Article",
						title: "Edito",
						text : "Ceci est un edito"
					}
				}
			}
		)
		Edito: stores.MongoRecords,
	}
)
@RS.connect("Edito")
export default class Edito extends React.Component {
	static propTypes = {};
	state            = {
		single: null,
		multi : null,
	};
	
	render() {
		const {
			      Edito: { data: record }, style,
			      isNext, isCurrent
		      } = this.props;
		return (
			<div className={"Edito smallView"} style={style}>
				{/*<Editable id={record._id}/>*/}
				
				<div className="title">
					{record && (record.title || record.label)}
				</div>
				<div className="resume">
					{
						record && !/^\s*$/.test(record.text || '') &&
						<div className="content" dangerouslySetInnerHTML={{ __html: record.text }}/>
					}
				</div>
				<TweenRef
					initial={
						{
							"position"     : "absolute",
							top            : ["40%", "3em"],
							left           : "0%",
							//opacity   : 0,
							width          : "45vw",
							height         : "4px",
							backgroundColor: "white",
							transform      : [{}, {
								translateX: (isNext || !isCurrent) && "-40vw" || "0vw",
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
		);
	}
};