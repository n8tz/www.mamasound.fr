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
import Fab        from '@material-ui/core/Fab';
import TextField  from '@material-ui/core/TextField';
import moment     from "moment";
import React      from "react";
import RS         from "react-scopes";
import TagCloud   from 'react-tag-cloud';
import {TweenRef} from "react-voodoo";
import {Comps}    from "../index";

@RS.toProps("TagManager", "appState", "Quartiers")
export default class SearchBar extends React.Component {
	static propTypes    = {};
	static defaultProps = {
		startPos     : 0,
		openDuration : 100,
		closeDuration: 100,
		color        : "black",
		width        : "31%",
		minHeight    : "40px",
		maxHeight    : "135px"
	};
	state               = {
		single: null,
		multi : null,
	};
	
	handleSearchChange = e => {
		this.setState({
			              search: e.target.value,
		              });
		this.props.$actions.updateCurrentSearch(e.target.value)
	};
	selectTag          = tag => {
		this.setState({
			              search: tag.label,
		              });
		this.props.$actions.updateCurrentSearch(tag.label)
		this.props.$actions.setPageFocus("events", true)
	};
	
	
	static getDerivedStateFromProps( props, state ) {
		let {
			    startPos,
			    openDuration,
			    closeDuration, minHeight, maxHeight, width, minBottom, maxBottom, style
		    } = props;
		return {
			boxStyle    : {
				position            : "relative",
				width               : width,
				//height              : minHeight,
				borderTopLeftRadius : "10px",
				borderTopRightRadius: "10px",
				bottom              : minBottom,
				overflow            : "hidden",
				display             : "inline-block",
				...style,
			},
			titleStyle  : {
				position : "absolute",
				width    : "100%",
				height   : minHeight,
				left     : "0%",
				top      : "0%",
				//backgroundColor: "red",
				transform: [
					{}, {},
				]
			},
			contentStyle: {
				position : "absolute",
				width    : "100%",
				bottom   : "0%",
				left     : "0%",
				top      : minHeight,
				//backgroundColor: "green",
				transform: [
					{}, {},
				]
			},
			iconStyle   : {
				position : "absolute",
				width    : minHeight,
				height   : minHeight,
				left     : "0%",
				top      : 0,
				//backgroundColor: "green",
				transform: [
					{}, {},
				]
			},
			axis        : {
				title  : [],
				icon   : [
					{
						from    : startPos,
						duration: openDuration,
						apply   : {
							opacity: -.5,
							top    : minHeight,
							left   : ["100%", "-" + maxHeight, minHeight],
							height : [maxHeight, "-" + minHeight, "-" + minHeight],
							width  : [maxHeight, "-" + minHeight, "-" + minHeight],
						}
					},
					{
						from    : startPos + openDuration,
						duration: closeDuration,
						apply   : {
							opacity: .5,
							//top    : "-" + minHeight,
							//left   : ["-100%", maxHeight, "-" + minHeight],
							//height : ["-" + maxHeight, minHeight, minHeight],
							//width  : ["-" + maxHeight, minHeight, minHeight],
						}
					}
				],
				content: [],
				root   : [
					{
						from    : startPos,
						duration: openDuration,
						apply   : {
							//bottom   : [maxHeight, "-" + minHeight],
							transform: [, , {}],
						}
					},
					{
						from    : startPos + openDuration,
						duration: closeDuration,
						apply   : {
							top      : 40,
							bottom   : maxBottom,
							transform: [, , {}],
						}
					}
				]
			}
		}
	}
	
	render() {
		let { title, children, onClick, icon, className = "" }      = this.props;
		let { boxStyle, titleStyle, contentStyle, iconStyle, axis } = this.state;
		return <TweenRef.div className={"StretchBox SearchBar"}
		                     tweenAxis={axis.root}
		                     onClick={onClick}
		                     initial={boxStyle}>
			<TweenRef.div initial={titleStyle} className={"title"}
			              tweenAxis={axis.title}>{this.renderTitle()}</TweenRef.div>
			<TweenRef.div initial={iconStyle} className={"icon"}
			              tweenAxis={axis.icon}>{this.renderIcon()}</TweenRef.div>
			<TweenRef.div initial={contentStyle} className={"content"}
			              tweenAxis={axis.content}>{this.renderContent()}</TweenRef.div>
		</TweenRef.div>;
	}
	
	renderTitle() {
		const { TagManager, strechProps, style } = this.props;
		return <div className={"SearchBarForm"}>
			{/*<Fab className={"searchIcon"}>*/}
			{/*	<div className={"material-icons icon"}>search</div>*/}
			{/*</Fab>*/}
			<TextField
				className={"input"}
				placeholder={"Groupe, quartier, style, date, ..."}
				value={this.state.search}
				onChange={this.handleSearchChange}
			/>
			<Fab className={"optIcon"}>
				<div className={"material-icons icon"}>search</div>
			</Fab>
		</div>;
	}
	
	renderIcon() {
		const { TagManager, strechProps, style } = this.props;
		return null;
	}
	
	renderContent() {
		const { TagManager, appState, Quartiers, $actions } = this.props;
		return <>
			
			<Comps.Calendar startDate={appState.curDay}
			                endDate={moment(appState.curDay).add(appState.dayCountByViewType[0], 'day')}
			                onChange={this.onChange}/>
			<div className={"cityArea"}>
				{
					Quartiers.liste.map(name => <span
						className={"area " + (appState.currentArea === name ? "selected" : "")}
						onClick={e => $actions.setCurrentArea(name)}>{name}</span>)
				}
			</div>
			<TagCloud
				style={{
					fontFamily: 'sans-serif',
					fontSize  : 10,
					fontWeight: 'bold',
					fontStyle : 'italic',
					//color     : () => randomColor(),
					padding   : 1,
					width     : '100%',
					height    : '100%'
				}}
				rotate={() => (~~(Math.random() * 3 - 1) * 90)}
			>
				{/*<div style={{ fontSize: 20 }}>react</div>*/}
				{/*<div style={{color: 'green'}}>tag</div>*/}
				{/*<div rotate={90}>cloud</div>*/}
				{
					TagManager && TagManager.available.map(
						tag =>
							<div
								key={tag.label}
								className={"tag"}
								onClick={( e ) => this.selectTag(tag)}
								style={{
									width: '2em !important', fontSize: 2 + (tag.count > 10 ? 10 : tag.count)
								}}
							>
								{/*<img alt={tag.title} src={tag.style.icon} className={"tagIcon"}/>*/}
								{tag.label}
							</div>)
				}
			</TagCloud>
		</>
	}
};