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
import React                                 from "react";
import {reScope, scopeToProps, propsToScope} from "rscopes";
import {withStateMap, asRef, asStore}        from "rescope-spells";
import Select                                from 'react-select';
import Typography                            from '@material-ui/core/Typography';
import TextField                             from '@material-ui/core/TextField';
import {asTweener, TweenRef}                 from "react-voodoo";
import Fab                                   from '@material-ui/core/Fab';

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
@scopeToProps("SearchValues", "TagManager")
export default class SearchBar extends React.Component {
	static propTypes = {};
	state            = {
		single: null,
		multi : null,
	};
	
	handleChange = name => value => {
		this.setState({
			              [name]: value,
		              });
	};
	
	render() {
		const {
			      record: { position, size } = {},
			      TagManager, children, disabled,
			      $actions, onSelect, selected, classes, theme
		      } = this.props;
		//console.log(Object.keys(TagManager.available).map(t => TagManager.available[t]))
		return (
			<div
				className={ "SearchBar container" }
			>
				<Fab>
					<div className={ "material-icons icon" }>search</div>
				</Fab>
				<TextField
					style={
						{
							width: "calc(100% - 100px)"
						}
					}
					//value={ this.state.multi }
					//onChange={ this.handleChange('multi') }
				/>
				{/*<Select*/ }
				{/*classes={ classes }*/ }
				{/*styles={ selectStyles }*/ }
				{/*textFieldProps={ {*/ }
				{/*label          : 'Tags',*/ }
				{/*InputLabelProps: {*/ }
				{/*shrink: true,*/ }
				{/*},*/ }
				{/*} }*/ }
				{/*options={ Object.keys(TagManager.available).map(t => TagManager.available[t]) }*/ }
				{/*components={ components }*/ }
				{/*value={ this.state.multi }*/ }
				{/*onChange={ this.handleChange('multi') }*/ }
				{/*//placeholder="Select multiple countries"*/ }
				{/*isMulti={ true }*/ }
				{/*/>*/ }
				{/*<ChipInput*/ }
				{/*value={ TagManager.selected }*/ }
				{/*dataSource={ Object.keys(TagManager.available) }*/ }
				{/*onRequestAdd={ ( chip ) => $actions.selectTag(chip) }*/ }
				{/*onRequestDelete={ ( chip, index ) => $actions.unSelectTag(chip) }*/ }
				{/*/>*/ }
				{/*{*/ }
				{/*TagManager &&*/ }
				{/*TagManager.available &&*/ }
				{/*Object.keys(TagManager.available)*/ }
				{/*.map(*/ }
				{/*tag => TagManager.available[tag])*/ }
				{/*.map(*/ }
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