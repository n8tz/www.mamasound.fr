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

import React                                 from 'react';
import {reScope, scopeToProps, propsToScope} from "rscopes";
import Fab                                   from '@material-ui/core/Fab';
import DeleteIcon                            from '@material-ui/icons/Delete';
import SaveIcon                              from '@material-ui/icons/Save';
import {asTweener, TweenRef}                 from "react-rtween";

var easingFn = require('d3-ease');

let pushIn  = function ( target ) {
	return {
		anims: [
			{
				type    : "Tween",
				target  : target,
				from    : 0,
				duration: 500,
				easeFn  : easingFn.easeCircleIn,
				apply   : {
					_z: .2,
				}
			}
		]
	};
};
let pushOut = function ( target ) {
	return {
		anims: [
			{
				type    : "Tween",
				target  : target,
				from    : 0,
				duration: 500,
				easeFn  : easingFn.easeCubicInOut,
				apply   : {
					_z: -.2,
				}
			}
		]
	};
};
@asTweener
export default class Home extends React.Component {
	state = {};
	
	static scrollableAnim = [
		
		{
			type    : "Tween",
			target  : "header",
			from    : 0,
			duration: 50,
			easeFn  : easingFn.easePolyOut,
			apply   : {
				height: -130,
			}
		},
		{
			type    : "Tween",
			target  : "highlighted",
			from    : 0,
			duration: 50,
			easeFn  : easingFn.easePolyOut,
			apply   : {
				height: -50,
			}
		},
		{
			type    : "Tween",
			target  : "events",
			from    : 0,
			duration: 50,
			easeFn  : easingFn.easePolyOut,
			apply   : {
				height: 50,
			}
		},
	];
	
	render() {
		let { widgets = { items: [] }, appState, $actions } = this.props;
		return <div className={ "Page Home" }>
			<TweenRef
				id={ "header" }
				initial={ {
					height: "150px"
				} }
			>
				<header
					style={ {
						//position  : "absolute",
						display   : "inline-block",
						width     : "100%",
						//height    : "15em",
						//cursor    : "pointer",
						background: "red",
						//overflow  : "hidden",
						//margin    : "-7.5em 0 0 -7.5em",
						//top       : "0px",
						//left      : "0px"
					} }>click me !
				</header>
			</TweenRef>
			<TweenRef
				id={ "highlighted" }
				initial={ {
					height: "80%"
				} }
			>
				<div
					style={ {
						//position  : "absolute",
						display   : "inline-block",
						width     : "100%",
						//height    : "15em",
						//cursor    : "pointer",
						background: "blue",
						//overflow  : "hidden",
						//margin    : "-7.5em 0 0 -7.5em",
						//top       : "0px",
						//left      : "0px"
					} }>slides
				</div>
			</TweenRef>
			<TweenRef
				id={ "events" }
				initial={ {
					height: "20%"
				} }
			>
				<div
					style={ {
						//position  : "absolute",
						display   : "inline-block",
						width     : "100%",
						//height    : "15em",
						//cursor    : "pointer",
						background: "green",
						//overflow  : "hidden",
						//margin    : "-7.5em 0 0 -7.5em",
						//top       : "0px",
						//left      : "0px"
					} }>events
				</div>
			</TweenRef>
		
		</div>
	}
}
