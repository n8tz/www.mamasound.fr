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
import moment                                from 'moment';
import Badge from '@material-ui/core/Badge';
import {withStateMap, asRef, asStore}        from "rescope-spells";
import anims                                 from 'App/ui/anims/(*).js';
import Chip                                  from '@material-ui/core/Chip';
import Avatar                                from '@material-ui/core/Avatar';

import stores                from 'App/stores/(*).js';
import Comps                 from 'App/ui/components/(*).js';
import {asTweener, TweenRef} from "react-rtween";

@reScope(
	{
		@asStore
		Tags        : {
			@asRef
			events: "EventList",
			
			$apply( data, { events: { items = [], refs } } ) {
				let available = [], seen = {}, styles = {};
				items.forEach(
					event => {
						let style = event.category && refs[event.category.objId];
						style && style.name
						              .replace(/([\.\(\)\/\\]+)/ig, '|')
						              .split('|')
						              .filter(t => (!!t && /\s*/.test(t)))
						              .filter(t => (seen[t] && seen[t]++ || (seen[t] = 1, false)))
						              .forEach(t => (styles[t] = styles[t] || style))
					}
				)
				
				return {
					available: Object
						.keys(seen)
						.filter(t => (!!styles[t]))
						.sort(( a, b ) => (seen[a] < seen[b]
						                   ? 1
						                   : -1))
						.map(tag => ({
							title: tag,
							style: styles[tag] || {},
							count: seen[tag]
						}))
				};
			},
			
		},
		@asStore
		SearchValues: {
			tags  : [],
			search: undefined,
			updateSearch( str ) {
			
			},
			addTag( str ) {
			
			},
			rmTag( str ) {
			
			}
			
		},
		
	}
)
@scopeToProps("SearchValues", "Tags")
export default class SearchBar extends React.Component {
	static propTypes = {};
	state            = {};
	
	render() {
		let {
			    record: { position, size } = {},
			    Tags, children, disabled,
			    $actions, onSelect, selected
		    }     = this.props,
		    state = this.state;
		return (
			<div
				className={ "SearchBar" }
			>
				{ Tags && Tags.available && Tags.available.map(
					tag =>
						<Chip
							icon={
								//<Badge badgeContent={ tag.count} color="secondary" >
									<img alt={ tag.title } src={ tag.style.icon } className={"icon"}/>
								//</Badge>
							}
							label={ tag.title }
							//onClick={handleClick}
							//onDelete={handleDelete}
							//className={classes.chip}
						/>
				) }
			</div>
		);
	}
};