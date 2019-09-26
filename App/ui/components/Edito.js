/*
 *
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
import stores             from 'App/stores/(*).js';
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
						title : "Edito",
						text: "Ceci est un edito"
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
			      Edito:{data:record}, style,
			      isNext, isCurrent
		      } = this.props;
		return (
			<div className={"Edito smallView"} style={style}>
				
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
							"position": "absolute",
							top       : ["40%", "3em"],
							left      : "40%",
							//opacity   : 0,
							width     : "60%",
							height    : "4px",
							backgroundColor: "white",
							transform : [{}, {
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