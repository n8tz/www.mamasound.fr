/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import TextField  from '@material-ui/core/TextField';
import moment     from "moment";
import React      from "react";
import RS         from "react-scopes";
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
	handleDateChange   = e => {
		//debugger
		this.calendar.current.toggle();
		this.props.$actions.updateCurrentDay(e.startDate);
	};
	selectTag          = tag => {
		this.props.$actions.selectTag(tag.label)
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
				//bottom              : minBottom,
				overflow            : "hidden",
				display             : "inline-block",
				...props.boxStyle,
				...style,
			},
			titleStyle  : {
				position : "absolute",
				width    : "100%",
				height   : minHeight,
				left     : "0%",
				top      : "0%",
				
				...props.titleStyle,
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
				title  : props.titleAxis || [],
				icon   : props.iconAxis || [
					{
						from    : startPos + openDuration,
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
							//opacity: .5,
							//top    : "-" + minHeight,
							//left   : ["-100%", maxHeight, "-" + minHeight],
							//height : ["-" + maxHeight, minHeight, minHeight],
							//width  : ["-" + maxHeight, minHeight, minHeight],
						}
					}
				],
				content: props.contentAxis || [],
				root   : props.rootAxis || [
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
			<TextField
				className={"input"}
				placeholder={"Groupe, quartier, style, date, ..."}
				value={this.state.search}
				onChange={this.handleSearchChange}
			/>
		</div>;
	}
	
	renderIcon() {
		return <img src={require('App/ui/assets/images/detectCat.png')}/>;
	}
	
	calendar = React.createRef();
	
	renderContent() {
		const { TagManager, appState, Quartiers, $actions } = this.props;
		return <>
			<Comps.Calendar startDate={appState.curDay}
			                ref={this.calendar}
			                endDate={moment(appState.curDay).add(appState.dayCountByViewType[0], 'day')}
			                onChange={this.handleDateChange}/>
			
			<div className={"selectedTags"}>
				{
					TagManager && TagManager.selected.map(
						tag =>
							<span
								key={tag.label}
								className={"tag"}
								onClick={( e ) => $actions.unSelectTag(tag.label)}
								style={{
									fontSize: 14
								}}
							>
								{/*<img alt={tag.title} src={tag.style.icon} className={"tagIcon"}/>*/}
								{tag.label}
								({tag.count})
							</span>)
				}
			</div>
			<div className={"label"}>Prix</div>
			<div className={"priceTags"}>
				<span
					className={"tag " + (!appState.currentArea ? "selected" : "")}
					onClick={e => $actions.setCurrentArea()}>Tout les prix</span>
				{
					TagManager && TagManager.available
					                        .filter(tag => !TagManager.selected.includes(tag))
					                        .filter(tag => (tag.type === "price"))
					                        .map(
						                        tag =>
							                        <span
								                        key={tag.label}
								                        className={"tag"}
								                        onClick={( e ) => this.selectTag(tag)}
								                        style={{
									                        fontSize: 14
								                        }}
							                        >
								{/*<img alt={tag.title} src={tag.style.icon} className={"tagIcon"}/>*/}
								                        {tag.label}
								                        ({tag.count})
							</span>)
				}
			</div>
			<div className={"label"}>Quartiers</div>
			<div className={"areaTags"}>
				<span
					className={"tag " + (!appState.currentArea ? "selected" : "")}
					onClick={e => $actions.setCurrentArea()}>Tout Montpellier</span>
				{
					TagManager && TagManager.available
					                        .filter(tag => !TagManager.selected.includes(tag))
					                        .filter(tag => (tag.type === "area"))
					                        .map(
						                        tag =>
							                        <span
								                        key={tag.label}
								                        className={"tag"}
								                        onClick={( e ) => this.selectTag(tag)}
								                        style={{
									                        fontSize: 14
								                        }}
							                        >
								{/*<img alt={tag.title} src={tag.style.icon} className={"tagIcon"}/>*/}
								                        {tag.label}
								                        ({tag.count})
							</span>)
				}
			</div>
			<div className={"label"}>Styles</div>
			<div className={"styleTags"}>
				{
					TagManager && TagManager.available
					                        .filter(tag => !TagManager.selected.includes(tag))
					                        .filter(tag => (tag.type === "style"))
					                        .map(
						                        tag =>
							                        <span
								                        key={tag.label}
								                        className={"tag"}
								                        onClick={( e ) => this.selectTag(tag)}
								                        style={{
									                        fontSize: 14
								                        }}
							                        >
								{/*<img alt={tag.title} src={tag.style.icon} className={"tagIcon"}/>*/}
								                        {tag.label}
								                        ({tag.count})
							</span>)
				}
			</div>
		</>
	}
};