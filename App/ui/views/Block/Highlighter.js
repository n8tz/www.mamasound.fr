/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import stores                                                  from 'App/stores/(*).js';
import {Comps, Views}                                          from 'App/ui';
import moment                                                  from "moment";
import React                                                   from "react";
import {asRef, asStore, scopeToProps, withScope, withStateMap} from "react-scopes";
import {TweenRef, withTweener}                                 from "react-voodoo";

let Tetris = 'div';
if ( typeof window !== "undefined" ) {
	//Tetris = require('react-tetris');
}

@withScope(
	{
		@asStore
		FocusedItemsQuery: {
			//@asRef
			//curDay: "appState.curDay",
			query: {},
			$apply( data, state ) {
				let {
					    curDay,
				    }    = state,
				    from = moment().utc().startOf('day').valueOf(),
				    to   = moment().utc().endOf('day').add(6, 'month').valueOf();
				return {
					query: {
						etty     : 'Focused',
						limit    : 50,
						orderby  : { updated: -1 },
						query    : {
							$or: [
								{
									startTM: {
										'$lt': from
									},
									endTM  : {
										'$gt': from
									}
								},
							
							]
						},
						mountKeys: ["targetEtty", "relatedEvents"],
					}
				};
			}
			
		},
		@withStateMap(
			{
				@asRef
				FocusedItems: "FocusedItemsQuery.query",
				updateQueries() {
					//return { FocusedItems: { ...this.nextState.FocusedItems, $skip: 5 } }
				}
			}
		)
		Queries          : stores.MongoQueries,
		@withStateMap(
			{
				@asRef
				items  : "Queries.FocusedItems.items",
				@asRef
				refs   : "Queries.FocusedItems.refs",
				imgKeys: ["previewImage"]
			}
		)
		MountedItems     : stores.ImgFieldsLoader,
		
		
	}
)
@scopeToProps("MountedItems", "Selected", "HighlighterBackground", "Styles.views.Block.Highlighter:Styles", "Styles.currentTheme", "DataProvider", "appState")
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
			$actions.selectFocus(items[i]._alias || items[i]._id, items[i]._cls);
			$scope.then(tm => {
				slider.goTo(i);
			})
			
			//document.body.parentElement.scrollTo({
			//	                                     top     : 0,
			//	duration
			//	                                     behavior: 'smooth'
			//                                     })
		};
	pickNextFocused = rec => {
		let {
			    MountedItems: { items = [] } = {},appState
		    }     = this.props,
		    state = this.state;
		return (items[(items.findIndex(ref => (rec && ref && rec._id === ref._id)) + 1) % items.length]);
	};
	
	render() {
		let {
			    MountedItems: { items = [], layout = [] } = {},
			    Styles, Selected, children,appState,
			    $actions, navBox, tweener, style
		    }     = this.props,
		    state = this.state;
		return (
			<div style={style}
			     className={"Highlighter"}>
				{navBox}
				<div className={"headBackground"}>
					<div className={"maskContent"}>
						{children}
						{/*<TweenRef*/}
						{/*	//initial={Styles.background}*/}
						{/*	//tweenLines={Styles.backgroundScroll}*/}
						{/*>*/}
						{/*<div className={"container back"}>*/}
						{/*{*/}
						{/*	//appState.currentPageFocus === "head"*/}
						{/*	//&&*/}
						{/*	//<BackgroundVideo src="/test.mp4"*/}
						{/*	//                 style={ { width: '100%', height: '100%', filter: "blur(5px)" } }*/}
						{/*	//                 startTime={ 20 }*/}
						{/*	//                 autoPlay={ true }*/}
						{/*	//                 volume={ 0 }/>*/}
						{/*		/!*	//||*!/*/}
						{/*		<img src={HighlighterBackground} className={"leftGhost"}/>*/}
						{/*		<img src={HighlighterBackground} className={"rightGhost"}/>*/}
						{/*		<img src={HighlighterBackground}/>*/}
						{/*		/!*}*!/*/}
						{/*	</div>*/}
						{/*</TweenRef>*/}
						<TweenRef
							initial={Styles.focused}
							tweenLines={Styles.focusedScroll}>
							<div className={"focusedContent container"}>
								{/*<Views.Events.BestEvents/>*/}
								<Comps.ViewSwitcher target={Selected && Selected.Focused}
								                    {...Styles.Focused}
								                    DefaultView={'div'}
								                    DefaultPreview={'div'}
								                    View={Views.FocusedItems.page}
								                    ViewPreview={Views.FocusedItems.preview}
								                    getNextTarget={this.pickNextFocused}
								/>
							</div>
						</TweenRef>
					</div>
				</div>
				{
					items &&
					items.length &&
					<TweenRef
						//id={"focusSlider"}
						initial={Styles.slider}
						tweenLines={Styles.sliderScroll}
					>
						<div className={"slider"}>
							<Comps.Slider
								key={"mainSlider"}
								{...Styles.Slider}
								//ignorePropsIndex={true}
								infinite={true}
								defaultIndex={appState.selectedFocus && items.findIndex(rec => (appState.selectedFocus.id === rec._id || appState.selectedFocus.id === rec._alias))}
								autoScroll={14 * 1000}
								onClick={this.selectFocus}
							>
								{
									(items &&
										items.length &&
										items || []).map(
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
				}
				{/*</div>*/}
			</div>
		);
	}
};