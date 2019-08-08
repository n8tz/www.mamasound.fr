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
import PropTypes                             from "prop-types";
import React                                 from "react";
import {withScope, scopeToProps, propsToScope} from "react-scopes";
import {withStateMap, asRef, asStore}        from "rescope-spells";
import anims                                 from 'App/ui/assets/anims/(*).js';
import Fab                                   from '@material-ui/core/Fab';
import stores                                from 'App/stores/(*).js';
import Views                                 from 'App/ui/components/(*).js';
import {asTweener, TweenRef}                 from "react-voodoo";
import {FacebookProvider, Page}              from 'react-facebook';
import {ContextMenu}                         from "../../App";
import {Comps}                               from "../index";

@withScope(
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
					{/*<FacebookProvider appId="1191108604284018">*/}
						{/*<Page href="https://www.facebook.com/mamasound.fr"*/}
						      {/*smallHeader={ true } tabs="timeline"*/}
						      {/*adaptContainerWidth={ true }*/}
						      {/*height={ 350 }*/}
						      {/*width={ 300 }/>*/}
					{/*</FacebookProvider>*/}
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