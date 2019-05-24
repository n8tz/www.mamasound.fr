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
import BackgroundVideo                              from "react-background-video-player";
import anims                                        from 'App/ui/anims/(*).js';
import {Comps, Views}                               from 'App/ui';
import {withStateMap, asRef, asStore}               from "rescope-spells";
import stores                                       from 'App/stores/(*).js';
import {withTweener, asTweener, TweenRef}           from "react-rtween";

let Tetris = 'div';
if ( typeof window !== "undefined" ) {
	Tetris = require('react-tetris');
}

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
@scopeToProps("MountedItems", "Selected", "HighlighterBackground", "Anims", "DataProvider")
@withTweener
export default class Highlighter extends React.Component {
	static propTypes = {};
	state            = {};
	
	onLayoutChange = ( layout ) => {
	}
	
	render() {
		let {
			    MountedItems: { items: gridItems = [], layout = [] },
			    Anims, Selected, DataProvider,
			    $actions, HighlighterBackground, tweener, style
		    }     = this.props,
		    state = this.state;
		return (
			<div style={ style }
			     className={ "Highlighter" }
			>
				
				<div className={ "headBackground" }>
					<div className={ "maskContent" }>
						<TweenRef
							initial={ Anims.Highlighter.background }
							tweenLines={ Anims.Highlighter.backgroundScroll }
						>
							<div className={ "container " }>
								<BackgroundVideo src="/test.mp4"
								                 style={ { width: '100%', height: '100%', filter:"blur(5px)" } }
								                 startTime={ 20 }
								                 autoPlay={ true }
								                 volume={ 0 }/>
								{/*<img src={ HighlighterBackground }/>*/ }
							</div>
						</TweenRef>
					</div>
				</div>
				<TweenRef
					initial={ Anims.Highlighter.focused }
					tweenLines={ Anims.Highlighter.focusedScroll }
				>
					<div className={ "focusedContent container" }>
						<Comps.ViewSwitcher target={ Selected && Selected.Focused }
						                    { ...Anims.Focused }/>
					</div>
				</TweenRef>
				
				
				<TweenRef
					initial={ Anims.Highlighter.slider }
					tweenLines={ Anims.Highlighter.sliderScroll }
				>
					<div className={ "slider" }>
						<Comps.Slider
							{ ...Anims.MainSlider }
							autoScroll={ 10 * 1000 }
							onClick={
								( e, i, slider ) => {
									$actions.selectFocus(gridItems[i].targetEtty.objId);
									slider.goTo(i);
								}
							}
						>
							{
								gridItems.length &&
								gridItems.map(
									( item, i ) =>
										<TweenRef key={ item._id + i }
										          tweener={ tweener }
										          initial={ Anims.Highlighter.slide }
										          tweenLines={ Anims.Highlighter.slideScroll }>
											<Views.FocusedItems record={ item }
											                    onClick={
												                    e => $actions.selectFocus(item.targetEtty.objId, i)
											                    }/>
										</TweenRef>
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