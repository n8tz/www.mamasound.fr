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
import PropTypes                                    from "prop-types";
import React                                        from "react";
import {Rnd}                                        from "react-rnd";
import {reScope, scopeToProps, propsToScope, Store} from "rscopes";
import CloseIcon                                    from '@material-ui/icons/Close';
import moment                                       from 'moment';
import anims                                        from 'App/ui/anims/(*).js';
import Slider                                       from "react-slick";
//import CaipiSlideshow                               from "react-caipi-slider";


import {withStateMap, asRef, asStore} from "rescope-spells";
import stores                         from 'App/stores/(*).js';
import DataProvider, {withQueries}    from 'App/stores/DataProvider';
import Comps                          from 'App/ui/components/(*).js';

import {asTweener, TweenRef} from "react-rtween";

var CaipiSlideshow
if ( typeof window !== "undefined" ) {
	require('slick-carousel/slick/slick.css');
	require('slick-carousel/slick/slick-theme.css');
	CaipiSlideshow = require('react-caipi-slider');
}
else CaipiSlideshow = 'div';

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
//@asTweener({ initialScrollPos: { scrollX: 100 }, propagateAxes: { scrollY: true } })
export default class Highlighter extends React.Component {
	static propTypes = {};
	state            = {};
	
	onLayoutChange = ( layout ) => {
	}
	
	render() {
		let {
			    Grid: { items: gridItems = [], layout = [] },
			    $actions, onSelect, selected
		    }          = this.props,
		    state      = this.state;
		const settings = {
			className    : "center",
			centerMode   : true,
			infinite     : true,
			centerPadding: "60px",
			slidesToShow : 1,
			variableWidth: true,
			autoplay     : true,
			autoplaySpeed: 5000,
			speed        : 500
		};
		return (
			<div
				onClick={ $actions.saveState }
				className={ "Highlighter container" }
			>
				
				<TweenRef id={ "slider" }
				          initial={ {
					          position       : "absolute",
					          backgroundColor: "yellow",
					          top            : "0px",
					          left           : "0px",
					          width          : "100%",
					          height         : "20vh",
					          zIndex         : 1000,
					          opacity        : 0,
					
					          transform: {
						          translateZ: '-.2box',
						          translateY: '-500px',
					          }
				          } }
				          scrollableAnims={ {
					          scrollY: anims.slideIn(0, 100, "top"),
				          } }
				>
					<div onClick={ e => {
						e.stopPropagation()
						e.preventDefault()
					} }>
						<Slider { ...settings }>
							{
								gridItems.map(
									( item, i ) =>
										<Comps.FocusedItems record={ item } key={ item._id }/>
								)
							}
						</Slider>
					</div>
				</TweenRef>
				
				<TweenRef
					initial={ {
						position : "absolute",
						top      : "0px",
						left     : "0px",
						width    : "100%",
						height   : "100%",
						transform: {
							translateY: '-.20box',
						}
					} }
					scrollableAnims={ {
						scrollY: [
							{
								type    : "Tween",
								from    : 0,
								duration: 100,
								apply   : {
									filter   : {
										blur: "5px",
										//translateY: "-50px",
									},
									transform: {
										translateZ: "50px",
										//translateY: "-50px",
									}
								}
							}
						],
					} }
				>
					<div className={ "headBackground" }>
						<img src={ require("App/ui/assets/couvs/test.jpg") }/>
					</div>
				</TweenRef>
				{/*<div className={ " today" } onClick={ e => e.preventDefault() }>*/ }
				
				<TweenRef
					initial={ {
						position : "absolute",
						bottom   : "0px",
						left     : "0px",
						width    : "100%",
						height   : "175px",
						transform: {
							//opacity   : "1"
							//scale: '1',
							//translateY: '-150px',
						}
					} }
					scrollableAnims={ {
						scrollY: [
							{
								type    : "Tween",
								from    : 0,
								duration: 100,
								apply   : {
									opacity  : "-1",
									transform: {
										translateY: "100px"
									}
								}
							}
						],
					} }
				>
					<div className={ "slider" }>
						<CaipiSlideshow
							showArrow
							vignets
							autoSlide={ 10000 }
							
							onClick={
								( e, item ) => {
									//
								}
							}
							config={
								{
									hPositioningFn                    : 'hCentralZoom',
									predictiveMomentum_maxMomentumJump: 1,
									predictiveMomentum                : true,
									//forceSlotRatio                    : 7 / 5,
									//infiniteMode                       : false,
									autoScroll                        : true,
									autoScrollPeriod                  : 5000,
									visibleItems                      : 5,
									//hSlotWidth                        : .85,
									hSlotHeight                       : 1,
									listenMouseWheel                  : false,
									direction                         : 'horizontal',
									//
									//itemClicked : function ( item, offset, index, slot, e ) {
									//
									//	let { App: { history } } = me.context;
									//	if ( offset ) {
									//		e.preventDefault();
									//		e.stopPropagation();
									//		//
									//		me.refs.slider._slideShow.goTo(offset);
									//		return false;
									//	}
									//	else {//debugger;
									//		var item = me.refs.slider.state.items[index].targetEtty;
									//		var View = require('App/ui/View');
									//		history.push(db.getRouteTo(item.cls, item.objId));
									//		return false;
									//
									//	}
									//},
									//itemTargeted: function ( item, node ) {
									//	var SlideshowDom = require('App/ui/utils/Dom');
									//	if ( node && node != me._selected ) {
									//		var s = me._selected;
									//		SlideshowDom.addCls(node, "selected");
									//		me._selected = node;
									//		setTimeout(function () {
									//			s && SlideshowDom.rmCls(s, "selected");
									//		});
									//
									//	}
									//}
								}
							}>
							{
								gridItems.map(
									( item, i ) =>
										<div><Comps.FocusedItems record={ item } key={ item._id }/></div>
								)
							}
						</CaipiSlideshow>
					</div>
				</TweenRef>
				{/*</div>*/ }
			</div>
		);
	}
};