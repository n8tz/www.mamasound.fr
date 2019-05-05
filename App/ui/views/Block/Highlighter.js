/*
 * The MIT License (MIT)
 * Copyright (c) 2019. Wise Wild Web
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  @author : Nathanael Braun
 *  @contact : n8tz.js@gmail.com
 */
import is                                           from "is";
import PropTypes                                    from "prop-types";
import React                                        from "react";
import {reScope, scopeToProps, propsToScope, Store} from "rscopes";
import moment                                       from 'moment';
//import Slider                                       from "rSlide";
import anims                                        from 'App/ui/anims/(*).js';
import {Comps, Views}                               from 'App/ui';
import {withStateMap, asRef, asStore}               from "rescope-spells";
import stores                                       from 'App/stores/(*).js';
import {withTweener, asTweener, TweenRef}           from "react-rtween";

@reScope(
	{
		@withStateMap(
			{
				FocusedItems: {
					etty     : 'FocusedItems',
					limit    : 4,
					query    : {},
					mountKeys: ["targetEtty"],
				},
				
				updateQueries() {
					//return { FocusedItems: { ...this.nextState.FocusedItems, $skip: 5 } }
				}
			}
		)
		Queries     : stores.MongoQueries,
		@withStateMap(
			{
				@asRef
				items  : "Queries.FocusedItems.items",
				imgKeys: ["previewImage"]
			}
		)
		MountedItems: stores.ImgFieldsLoader,
		@withStateMap(
			{
				HomeGridLayout: {
					id       : "HomeGridLayout",
					etty     : "Assets",
					"default": {
						layout: []
					}
				}
			}
		)
		GridLayout  : stores.MongoRecords,
		@asStore
		Grid        : {
			@asRef
			items: "MountedItems.items",
			
			@asRef
			layout: "GridLayout.HomeGridLayout.layout",
		},
		
	}
)
@scopeToProps("MountedItems", "Grid")
@withTweener
export default class Highlighter extends React.Component {
	static propTypes = {};
	state            = {};
	
	onLayoutChange = ( layout ) => {
	}
	
	render() {
		let {
			    Grid: { items: gridItems = [], layout = [] },
			    $actions, onSelect, tweener
		    }     = this.props,
		    state = this.state;
		return (
			<div
				className={ "Highlighter" }
			>
				
				<div className={ "headBackground" }>
					<div className={ "maskContent" }>
						<TweenRef
							initial={ {
								position : "absolute",
								//transformOrigin: "0% 0%",
								transform: {
									perspective: "200px",
									translateY : '-50%',
									translateX : '-50%',
								}
							} }
							tweenLines={ {
								scrollY: [
									{
										type    : "Tween",
										from    : 0,
										duration: 100,
										apply   : {
											filter   : {
												//blur: "5px",
												//translateY: "-50px",
											},
											transform: {
												translateZ: "50px",
												//translateY: "-20vh",
											}
										}
									},
									{
										type    : "Tween",
										from    : 250,
										duration: 100,
										apply   : {
											filter   : {
												//blur: "5px",
												//translateY: "-50px",
											},
											transform: {
												translateZ: "-50px",
												//translateY: "-20vh",
											}
										}
									}
								],
							} }
						>
							<div className={ "container " }>
								<img src={ require("App/ui/assets/couvs/test.jpg") }/>
							</div>
						</TweenRef>
					</div>
				</div>
				{/*<div className={ " today" } onClick={ e => e.preventDefault() }>*/ }
				
				
				<TweenRef
					initial={ {
						position : "absolute",
						bottom   : "0px",
						left     : "0px",
						width    : "100%",
						//height   : "calc(20% - 50px)",
						zIndex   : "100",
						transform: {
							perspective: "200px",
							translateY : '0px',
							//rotateX    : "2deg"
						}
					} }
					tweenLines={ {
						scrollY: [
							{
								type    : "Tween",
								from    : 0,
								duration: 100,
								apply   : {
									transform: {
										perspective: "100px",
									}
								}
							},
							{
								type    : "Tween",
								from    : 150,
								duration: 100,
								apply   : {
									transform: {
										perspective: "-100px",
									}
								}
							}
						],
					} }
				>
					<div className={ "slider" }>
						<Comps.Slider autoScroll={ 10 * 1000 }>
							{
								gridItems.map(
									( item, i ) =>
										<Views.FocusedItems record={ item }/>
								)
							}
						</Comps.Slider>
					</div>
				</TweenRef>
				{/*</div>*/ }
			</div>
		);
	}
};