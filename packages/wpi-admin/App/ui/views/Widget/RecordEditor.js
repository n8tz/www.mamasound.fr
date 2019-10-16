/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import is              from "is";
import PropTypes       from "prop-types";
import React           from "react";
import {Forms, fields} from "App/ui";

export default class RecordEditor extends React.Component {
	static defaultProps = {
		whenDone: () => {
		}
	}
	
	render() {
		return (
			<Forms.Default { ...this.props }/>
		);
	}
	
};

