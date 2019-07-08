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

import React                                 from 'react';
import {reScope, scopeToProps, propsToScope} from "rscopes";
import {Comps, Views}                        from 'App/ui';
import ReactDom                              from "react-dom";

import {withStateMap, asRef, asStore}   from "rescope-spells";
import {asTweener, TweenRef, TweenAxis} from "react-voodoo";

@scopeToProps("appState", "Anims", "Selected")
export default class Admin extends React.Component {
	state = {};
	
	render() {
		let {
			    Anims, Selected, appState,
		    }     = this.props,
		    state = this.state;
		console.log('render snap', appState.currentPageFocus)
		return <div className={"Admin container"}>
			<pre>{Selected && JSON.stringify(Selected)}</pre>
			<Comps.ViewSwitcher target={Selected && Selected.Focused}
			                    {...Anims.Focused} View={Views.Page.page}
			                    style={{
				                    position  : "absolute",
				                    background: "grey",
				                    top       : "100px",
				                    left      : "100px",
				                    width     : "800px",
				                    height    : "500px"
			                    }}
			/>
		</div>
	}
}


