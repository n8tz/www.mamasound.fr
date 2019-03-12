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
import CardHeader                                   from '@material-ui/core/CardHeader';
import IconButton                                   from '@material-ui/core/IconButton';
import ReactGridLayout                              from 'react-grid-layout';


import {withStateMap, asRef, asStore} from "rescope-spells";
import stores                         from 'App/stores/(*).js';
import DataProvider, {withQueries}    from 'App/stores/DataProvider';
import Comps                          from 'App/ui/components/(*).js';

import {asTweener, TweenRef} from "react-rtween";

var easingFn      = require('d3-ease');
const scrollAnims = {
	scrollX: [
		{
			type    : "Tween",
			from    : 0,
			duration: 100,
			easeFn  : easingFn.easeCircleIn,
			apply   : {
				_z: -.2,
			}
		},
		{
			type    : "Tween",
			from    : 100,
			duration: 100,
			easeFn  : easingFn.easeCircleIn,
			apply   : {
				_z: .2,
			}
		},
		{
			type    : "Tween",
			from    : 50,
			duration: 100,
			easeFn  : easingFn.easeCircle,
			apply   : {
				rotateY: 180,
			}
		},
		{
			type    : "Tween",
			from    : 200,
			duration: 100,
			easeFn  : easingFn.easeCircleIn,
			apply   : {
				_z: -.2,
			}
		},
		{
			type    : "Tween",
			from    : 300,
			duration: 100,
			easeFn  : easingFn.easeCircleIn,
			apply   : {
				_z: .2,
			}
		},
		{
			type    : "Tween",
			from    : 250,
			duration: 100,
			easeFn  : easingFn.easeCircle,
			apply   : {
				rotateY: -180,
			}
		}
	],
	//scrollY: [
	//	{
	//		type    : "Tween",
	//		from    : 0,
	//		duration: 200,
	//		//easeFn  : easingFn.easePolyOut,
	//		apply   : {
	//			top: -200,
	//		}
	//	},
	//]
};
if ( typeof window !== "undefined" ) {
	require('react-resizable/css/styles.css');
	require('react-grid-layout/css/styles.css');
}
@reScope(
	typeof window !== "undefined" && {
		
		@withStateMap(
			{
				FocusedItems: {
					etty : 'FocusedItems',
					limit: 100,
					query: {}
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
		WithImgList : stores.ImgFieldsLoader,
		@withStateMap(
			{
				@asRef
				items      : "WithImgList.items",
				toMountKeys: ["targetEtty"]
			}
		)
		MountedItems: stores.MongoListRefsLoader,
		@withStateMap(
			{
				objId   : "HomeGridLayout",
				cls     : "Assets",
				template: {
					layout: []
				}
			}
		)
		GridLayout  : stores.MongoRecord,
		@asStore
		Grid        : {
			@asRef
			items: "MountedItems.items",
			
			@asRef
			layout: "GridLayout.layout",
		},
		
	}
)
@scopeToProps("MountedItems", "Grid")
@asTweener({ initialScrollPos: { scrollX: 200 } })
export default class Highlighter extends React.Component {
	static propTypes = {
		//record  : PropTypes.object.isRequired,
		//onSelect: PropTypes.func
	};
	state            = {};
	
	onLayoutChange = ( layout ) => {
		/*eslint no-console: 0*/
		//this.setState({ layout });
		//this.props.onLayoutChange(layout); // updates status display
	}
	
	render() {
		let {
			    Grid: { items: gridItems = [], layout = [] },
			    $actions, onSelect, selected
		    }     = this.props,
		    state = this.state;
		return (
			<div
				onClick={ $actions.saveState }
				className={ "Highlighter container" }
			>
				<TweenRef
					id={ "today" }
					initial={ {
						_x     : 0,
						_y     : 0,
						_z     : 0,
						rotateY: -180,
						top    : "0%",
						left   : "0%",
						bottom : "0px",
						width  : "100%",
						//paddingTop: "150px"
					} }
					scrollableAnims={ scrollAnims }
				>
					<div className={ " today" } onClick={ e => e.preventDefault() }>
						<ReactGridLayout className="layout" layout={ layout } cols={ 8 } rowHeight={ 50 }
						                 onLayoutChange={ this.onLayoutChange }
						                 isResizable={ true }
						                 width={ 1200 }>
							{
								gridItems.map(
									item => <div key={ item._id }><Comps.FocusedItems record={ item }/></div>
								)
							}
						</ReactGridLayout>
					</div>
				</TweenRef>
			</div>
		);
	}
};