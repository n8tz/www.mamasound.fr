/*
 * Copyright (c)  2018 Wise Wild Web .
 *
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 *
 * @author : Nathanael Braun
 * @contact : caipilabs@gmail.com
 */
import React from "react";

import {renderToString} from "react-dom/server"
import is               from "is";
import {isSpell}        from "./spellFactory";
import {
	spells, Store, Scope, reScope, propsToScope, scopeToProps, Component, propsToStore,
	scopeToState
}                       from "react-rescope";

@propsToScope(['props'])
@scopeToProps(['props'])
class RSComp extends Component {
	render() {
		return this.props.children || [];
	}
}

let Lib = {
	@isSpell("store", v => (is.object(v) || is.string(v)))
	store( obj, { 0: cfg }, ref ) {
		let use = [], state = {}, actions = {},
		    applier                       = obj.$apply;
		if ( applier )
			obj = { ...obj },
				delete obj.$apply;
		Scope.stateMapToRefList(obj, state, use, actions)
		if ( applier )
			return class StateMapWA extends Store {
				static displayName = ref[1];
				static use         = use;
				static state       = state;
				static actions     = actions;
				apply              = applier;
			}
		else
			return class StateMap extends Store {
				static displayName = ref[1];
				static use         = use;
				static state       = state;
				static actions     = actions;
			}
	},
	@isSpell("scope", v => (is.object(v)))
	scope( obj, { 0: cfg }, ref ) {
		return class childScope extends Scope {
			constructor( map, cfg2 ) {
				super({ ...obj, ...map }, { ...cfg, ...cfg2 });
			}
		}
	},
	@isSpell("ref", v => (is.string(v)))
	ref( obj, { 0: cfg }, ref ) {
		
		return new Scope.scopeRef(obj);
	},
	@isSpell("stateMap", v => (v === Store || v.prototype instanceof Store), 'with')
	stateMap( obj, { 0: stateMap } ) {
		let use = [], initialState = {}, actions = {}, applier = stateMap.$apply;
		if ( stateMap.$apply )
			stateMap = { ...stateMap },
				delete stateMap.$apply;
		stateMap && Scope.stateMapToRefList(stateMap, initialState, use, actions);
		if ( applier )
			return class withStateMap extends obj {
				static displayName = obj.displayName || obj.name;
				static actions     = obj.actions && { ...obj.actions, ...actions } || actions;
				static state       = obj.state && { ...obj.state, ...initialState } || initialState;
				static use         = obj.use && [...obj.use, ...use] || use;
				
				apply() {
					return applier.apply(this, arguments);
				}
			}
		else
			return class withStateMap extends obj {
				static displayName = obj.displayName || obj.name;
				static actions     = obj.actions && { ...obj.actions, ...actions } || actions;
				static state       = obj.state && { ...obj.state, ...initialState } || initialState;
				static use         = obj.use && [...obj.use, ...use] || use;
			}
	},
}

export default Lib;