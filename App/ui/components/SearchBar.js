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
import React                                 from "react";
import {reScope, scopeToProps, propsToScope} from "rscopes";
import {withStateMap, asRef, asStore}        from "rescope-spells";
import Select                                from 'react-select';
import Typography                            from '@material-ui/core/Typography';
import TextField                             from '@material-ui/core/TextField';
import {asTweener, TweenRef}                 from "react-rtween";
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