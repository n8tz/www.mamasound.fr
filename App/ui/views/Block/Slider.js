/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import stores                                         from 'App/stores/(*).js';
import {Comps, Views}                                 from 'App/ui';
import React                                          from "react";
import {asRef, scopeToProps, withScope, withStateMap} from "react-scopes";
import {TweenRef, withTweener}                        from "react-voodoo";

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
					limit    : 50,
					orderby  : { updated: -1 },
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
				@asRef
				refs   : "Queries.FocusedItems.refs",
				imgKeys: ["previewImage"]
			}
		)
		MountedItems: stores.ImgFieldsLoader,
		
		
	}
)
@scopeToProps("MountedItems", "Selected", "HighlighterBackground", "Styles.views.Block.Highlighter:Styles", "Styles.currentTheme", "DataProvider", "appState")
@withTweener
export default class Slider extends React.Component {
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
			    $actions, currentTheme, tweener, style
		    }     = this.props,
		    state = this.state;
		return (
			<div style={style}
			     className={"SliderBlock"}>
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