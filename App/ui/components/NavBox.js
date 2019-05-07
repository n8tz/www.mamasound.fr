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
import {reScope, scopeToProps, propsToScope} from "rscopes";
import {withStateMap, asRef, asStore}        from "rescope-spells";
import anims                                 from 'App/ui/anims/(*).js';
import Fab                                   from '@material-ui/core/Fab';
import stores                                from 'App/stores/(*).js';
import Views                                 from 'App/ui/components/(*).js';
import {asTweener, TweenRef}                 from "react-rtween";
import {FacebookProvider, Page}              from 'react-facebook';
import {ContextMenu}                         from "../../App";
import {Comps}                               from "../index";

@reScope(
	{
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
@scopeToProps("SearchValues", "ActiveTags")
export default class NavBox extends React.Component {
	static propTypes = {};
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
				className={ "NavBox" }
			>
				<div className={ "toolbar" }>
					<Fab>
						<div className={ "material-icons icon" }>search</div>
					</Fab>
				</div>
				
				<Comps.LoginBox/>
				<div className={ "fbPage" }>
					<FacebookProvider appId="1191108604284018">
						<Page href="https://www.facebook.com/mamasound.fr"
						      smallHeader={ true } tabs="timeline"
						      adaptContainerWidth={ true }
						      height={ 350 }
						      width={ 300 }/>
					</FacebookProvider>
				</div>
				{/*{ ActiveTags && ActiveTags.available && ActiveTags.available.map(*/ }
				{/*tag =>*/ }
				{/*<Chip*/ }
				{/*key={ tag.title }*/ }
				{/*icon={*/ }
				{/*//<Badge badgeContent={ tag.count} color="secondary" >*/ }
				{/*<img alt={ tag.title } src={ tag.style.icon } className={ "icon" }/>*/ }
				{/*//</Badge>*/ }
				{/*}*/ }
				{/*label={ tag.title }*/ }
				{/*//onClick={handleClick}*/ }
				{/*//onDelete={handleDelete}*/ }
				{/*//className={classes.chip}*/ }
				{/*/>*/ }
				{/*) }*/ }
			</div>
		);
	}
};