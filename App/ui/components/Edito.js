/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import stores             from 'App/stores/(*).js';
import Editable           from "App/ui/Editable";
import React              from "react";
import RS, {withStateMap} from "react-scopes";
import {TweenRef}         from "react-voodoo";
import {Comps, Views}     from 'App/ui';

export default class Edito extends React.Component {
	static propTypes = {};
	state            = {
		single: null,
		multi : null,
	};
	
	render() {
		const {
			      style,
			      isNext, isCurrent
		      } = this.props;
		return (
			<div className={"Edito smallView"} style={style}>
				{/*<Editable id={record._id}/>*/}
				
				<div className="searchBox">
					<Comps.SearchBar/>
				</div>
			</div>
		);
	}
};