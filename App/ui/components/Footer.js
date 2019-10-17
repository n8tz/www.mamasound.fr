/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import {Comps} from 'App/ui';
import React   from "react";

export default class Footer extends React.Component {
	static propTypes = {};
	state            = {};
	
	render() {
		let {
			    style, children
		    }     = this.props,
		    state = this.state;
		return (
			<div className={"Footer"} style={style}>
				<div className={"maskContent"}>
					<Comps.LoginBox/>
					{children}
				</div>
				{/*<div className={"toolbar"}>*/}
				{/*	<Comps.LoginBox/>*/}
				{/*</div>*/}
				{/*{ ActiveTags && ActiveTags.available && ActiveTags.available.map(*/}
				{/*tag =>*/}
				{/*<Chip*/}
				{/*key={ tag.title }*/}
				{/*icon={*/}
				{/*//<Badge badgeContent={ tag.count} color="secondary" >*/}
				{/*<img alt={ tag.title } src={ tag.style.icon } className={ "icon" }/>*/}
				{/*//</Badge>*/}
				{/*}*/}
				{/*label={ tag.title }*/}
				{/*//onClick={handleClick}*/}
				{/*//onDelete={handleDelete}*/}
				{/*//className={classes.chip}*/}
				{/*/>*/}
				{/*) }*/}
			</div>
		);
	}
};