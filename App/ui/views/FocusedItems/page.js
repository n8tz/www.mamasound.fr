/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

/**
 * @author Nathanael BRAUN
 *
 * Date: 08/12/2015
 * Time: 11:50
 */
'use strict';

import {Views} from "App/ui";
import React   from "react";

export default class page extends React.Component {
	render() {
		let Renderer = Views.FocusedItems.bigSlide["article"];
		return <Renderer className={"FocusedItems_page"} {...this.props}/>
	}
}
