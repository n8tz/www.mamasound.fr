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
import {withStyles}                          from '@material-ui/core/styles';
import NoSsr                                 from '@material-ui/core/NoSsr';
import classNames                            from 'classnames';
import TextField                             from '@material-ui/core/TextField';
import Paper                                 from '@material-ui/core/Paper';
import Chip                                  from '@material-ui/core/Chip';
import MenuItem                              from '@material-ui/core/MenuItem';
import CancelIcon                            from '@material-ui/icons/Cancel';
import {emphasize}                           from '@material-ui/core/styles/colorManipulator';
import stores                                from 'App/stores/(*).js';
import Comps                                 from 'App/ui/components/(*).js';
import {asTweener, TweenRef}                 from "react-rtween";

const styles = theme => ({
	root            : {
		flexGrow: 1,
		height  : 250,
	},
	input           : {
		display: 'flex',
		padding: 0,
	},
	valueContainer  : {
		display   : 'flex',
		flexWrap  : 'wrap',
		flex      : 1,
		alignItems: 'center',
		overflow  : 'hidden',
	},
	chip            : {
		margin: `${ theme.spacing.unit / 2 }px ${ theme.spacing.unit / 4 }px`,
	},
	chipFocused     : {
		backgroundColor: emphasize(
			theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
			0.08,
		),
	},
	noOptionsMessage: {
		padding: `${ theme.spacing.unit }px ${ theme.spacing.unit * 2 }px`,
	},
	singleValue     : {
		fontSize: 16,
	},
	placeholder     : {
		position: 'absolute',
		left    : 2,
		fontSize: 16,
	},
	paper           : {
		position : 'absolute',
		//zIndex   : 1,
		marginTop: theme.spacing.unit,
		left     : 0,
		right    : 0,
		zIndex   : 100000,
		bottom   : "100%",
	},
	divider         : {
		height: theme.spacing.unit * 2,
	},
});

function NoOptionsMessage( props ) {
	return (
		<Typography
			color="textSecondary"
			className={ props.selectProps.classes.noOptionsMessage }
			{ ...props.innerProps }
		>
			{ props.children }
		</Typography>
	);
}

function inputComponent( { inputRef, ...props } ) {
	return <div ref={ inputRef } { ...props } />;
}

function Control( props ) {
	return (
		<TextField
			fullWidth
			InputProps={ {
				inputComponent,
				inputProps: {
					className: props.selectProps.classes.input,
					inputRef : props.innerRef,
					children : props.children,
					...props.innerProps,
				},
			} }
			{ ...props.selectProps.textFieldProps }
		/>
	);
}

function Option( props ) {
	return (
		<MenuItem
			buttonRef={ props.innerRef }
			selected={ props.isFocused }
			component="div"
			style={ {
				fontWeight: props.isSelected ? 500 : 400,
			} }
			{ ...props.innerProps }
		>
			{ props.children }
		</MenuItem>
	);
}

function Placeholder( props ) {
	return (
		<Typography
			color="textSecondary"
			className={ props.selectProps.classes.placeholder }
			{ ...props.innerProps }
		>
			{ props.children }
		</Typography>
	);
}

function SingleValue( props ) {
	return (
		<Typography className={ props.selectProps.classes.singleValue } { ...props.innerProps }>
			{ props.children }
		</Typography>
	);
}

function ValueContainer( props ) {
	return <div className={ props.selectProps.classes.valueContainer }>{ props.children }</div>;
}

function MultiValue( props ) {
	return (
		<Chip
			tabIndex={ -1 }
			label={ props.children }
			className={ classNames(props.selectProps.classes.chip, {
				[props.selectProps.classes.chipFocused]: props.isFocused,
			}) }
			onDelete={ props.removeProps.onClick }
			deleteIcon={ <CancelIcon { ...props.removeProps } /> }
		/>
	);
}

function Menu( props ) {
	return (
		<Paper square className={ props.selectProps.classes.paper } { ...props.innerProps }>
			{ props.children }
		</Paper>
	);
}

const components = {
	Control,
	Menu,
	MultiValue,
	NoOptionsMessage,
	Option,
	Placeholder,
	SingleValue,
	ValueContainer,
};
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
@withStyles(styles, { withTheme: true })
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
		
		const selectStyles = {
			input: base => ({
				...base,
				color    : theme.palette.text.primary,
				'& input': {
					font: 'inherit',
				},
			}),
		};
		console.log(Object.keys(TagManager.available).map(t => TagManager.available[t]))
		return (
			<div
				className={ "SearchBar container" }
			>
				<Select
					classes={ classes }
					styles={ selectStyles }
					textFieldProps={ {
						label          : 'Tags',
						InputLabelProps: {
							shrink: true,
						},
					} }
					options={ Object.keys(TagManager.available).map(t => TagManager.available[t]) }
					components={ components }
					value={ this.state.multi }
					onChange={ this.handleChange('multi') }
					//placeholder="Select multiple countries"
					isMulti={ true }
				/>
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