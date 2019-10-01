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
import stores                                                  from 'App/stores/(*).js';
import {Comps, Views}                                          from 'App/ui';
import React                                                   from "react";
import {asRef, asStore, scopeToProps, withScope, withStateMap} from "react-scopes";
import {TweenRef, withTweener}                                 from "react-voodoo";

let Tetris = 'div';
if ( typeof window !== "undefined" ) {
	Tetris = require('react-tetris');
}

@withScope(
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
@scopeToProps("MountedItems", "Selected", "HighlighterBackground", "Styles.views.Block.Highlighter:Styles", "DataProvider", "appState")
@withTweener
export default class Highlighter extends React.Component {
	static propTypes = {};
	state            = {};
	
	selectFocus     =
		( e, i, slider ) => {
			let {
				    MountedItems: { items = [] } = {},
				    $actions, $scope
			    }     = this.props,
			    state = this.state;
			$actions.selectFocus(items[i]._id, items[i]._cls);
			$scope.then(tm => {
				slider.goTo(i);
			})
		};
	pickNextFocused = rec => {
		let {
			    MountedItems: { items = [] } = {},
		    }     = this.props,
		    state = this.state;
		return (items[(items.findIndex(ref => (rec && ref && rec._id === ref._id)) + 1) % items.length]);
	};
	
	render() {
		let {
			    MountedItems: { items = [], layout = [] } = {},
			    Styles, Selected, children,
			    $actions, HighlighterBackground, tweener, style
		    }     = this.props,
		    state = this.state;
		return (
			<div style={style}
			     className={"Highlighter"}>
				{children}
				<div className={"headBackground"}>
					<div className={"maskContent"}>
						<TweenRef
							initial={Styles.background}
							tweenLines={Styles.backgroundScroll}
						>
							<div className={"container back"}>
								{/*{*/}
								{/*	//appState.currentPageFocus === "head"*/}
								{/*	//&&*/}
								{/*	//<BackgroundVideo src="/test.mp4"*/}
								{/*	//                 style={ { width: '100%', height: '100%', filter: "blur(5px)" } }*/}
								{/*	//                 startTime={ 20 }*/}
								{/*	//                 autoPlay={ true }*/}
								{/*	//                 volume={ 0 }/>*/}
								{/*	//||*/}
								<img src={HighlighterBackground} className={"leftGhost"}/>
								<img src={HighlighterBackground} className={"rightGhost"}/>
								<img src={HighlighterBackground}/>
								{/*}*/}
							</div>
						</TweenRef>
						<TweenRef
							initial={Styles.focused}
							tweenLines={Styles.focusedScroll}>
							<div className={"focusedContent container"}>
								{/*<Views.Events.BestEvents/>*/}
								<Comps.ViewSwitcher target={Selected && Selected.Focused}
								                    {...Styles.Focused}
								                    DefaultView={Comps.Edito}
									//DefaultPreview={Views.Article.preview}
									                View={Views.FocusedItems.page}
									                ViewPreview={Views.FocusedItems.preview}
									                getNextTarget={this.pickNextFocused}
								/>
							</div>
						</TweenRef>
					</div>
				</div>
				
				
				<TweenRef
					//id={"focusSlider"}
					initial={Styles.slider}
					tweenLines={Styles.sliderScroll}
				>
					<div className={"slider"}>
						<Comps.Slider
							key={"mainSlider"}
							{...Styles.Slider}
							ignorePropsIndex={true}
							infinite={true}
							autoScroll={14 * 1000}
							onClick={this.selectFocus}
						>
							{
								items.length &&
								items.map(
									( item, i ) =>
										<TweenRef key={item._id + i}
										          tweener={tweener}
										          initial={Styles.slide}
										          tweenLines={Styles.slideScroll}>
											<Views.FocusedItems.SlideItem record={item}
												//onTap={
												//    e => $actions.selectFocus(item.targetEtty.objId, i)
												//}
											/>
										</TweenRef>
								)
							}
						</Comps.Slider>
					</div>
				</TweenRef>
				{/*</div>*/}
			</div>
		);
	}
};