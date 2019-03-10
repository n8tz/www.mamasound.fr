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
import PropTypes                             from "prop-types";
import React                                 from "react";
import {Rnd}                                 from "react-rnd";
import {reScope, scopeToProps, propsToScope} from "rscopes";
import CloseIcon                             from '@material-ui/icons/Close';
import CardHeader                            from '@material-ui/core/CardHeader';
import IconButton                            from '@material-ui/core/IconButton';
import {withStateMap, asRef, asStore}        from "rescope-spells";

import stores from 'App/stores/(*).js';
import Comps  from 'App/ui/components/(*).js';

@reScope(
	{
		
		@withStateMap(
			{
				events: {
					collection: 'Event',
					$limit    : 100,
					query     : {}
				}
				//updateQueries() {
				//	return { query: {} }
				//}
			}
		)
		Queries     : stores.MongoQueries,
		@withStateMap(
			{
				@asRef
				items  : "Queries.events.items",
				imgKeys: ["previewImage"]
			}
		)
		WithImgList : stores.ImgFieldsLoader,
		@withStateMap(
			{
				@asRef
				items      : "WithImgList.items",
				toMountKeys: ["category", "place"]
			}
		)
		MountedItems: stores.MongoListRefsLoader,
		@asStore
		Events      : {
			@asRef
			items: "MountedItems.items",
			
		},
		
	}
)
@scopeToProps("Events")
export default class EventList extends React.Component {
	static propTypes = {
		//record  : PropTypes.object.isRequired,
		//onSelect: PropTypes.func
	};
	state            = {};
	
	render() {
		let {
			    record: { position, size } = {},
			    Events, children, disabled,
			    $actions, onSelect, selected
		    }     = this.props,
		    state = this.state;
		return (
			<div
				className={ "EventList container" }
			>
				{
					Events && Events.items && Events.items.map(
						item => <div key={ item._id }><Comps.Event record={ item }/></div>
					)
				}
				<div className={ " item" } onClick={ e => e.preventDefault() }>
					EventList item
				</div>
			</div>
		);
	}
};