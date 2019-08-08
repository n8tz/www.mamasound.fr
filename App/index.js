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
import "core-js";
import "core-js/es/object/assign";
import "core-js/features/object/from-entries";
import React            from "react";
import ReactDom         from 'react-dom';
import {renderToString} from "react-dom/server";
import {Helmet}         from "react-helmet";
//import {hot}            from 'react-hot-loader/root'
import {reScope, Scope} from "react-rescope";
import "regenerator-runtime/runtime";
import shortid          from 'shortid';
import AppScope         from './App.scope';
import Index            from "./index.html";

const ctrl = {
	
	renderTo( node, state ) {
		//return this.renderSSRTo(...arguments)
		let cScope      = new Scope(AppScope, {
			    id         : "App",
			    autoDestroy: true
		    }),
		    App         = reScope(cScope)(require('./App').default);
		window.contexts = Scope.scopes;
		window.ctrl     = this;
		if ( localStorage.mama )
			cScope.restore(JSON.parse(localStorage.mama));
		else if ( __STATE__ )
			cScope.restore(__STATE__);
		ReactDom.render(<App/>, node);
		
		if ( process.env.NODE_ENV !== 'production' && module.hot ) {
			module.hot.accept('./App', () => {
				state = cScope.serialize({ alias: "App" });
				cScope.destroy();
				cScope = new Scope(AppScope, {
					id         : "App",
					autoDestroy: true
				});
				App    = reScope(cScope)(require('./App').default);
				cScope.restore(state);
				ReactDom.render(<App/>, node);
			});
			module.hot.accept('App/App.scope', () => {
				cScope.register(AppScope)
			});
		}
		//
	},
	
	renderSSRTo( node, state, _attempts = 0 ) {
		
		let rid     = shortid.generate(),
		    cScope  = new Scope(AppScope, {
			    id         : rid,
			    autoDestroy: false
		    }), App = reScope(cScope)(require('./App').default);
		
		
		state && cScope.restore(state, { alias: "App" });
		let html,
		    appHtml = renderToString(<App location={"/"}/>),
		    stable  = cScope.isStableTree();
		//console.log('ctrl::renderSSR:65: ', cfg.location, _attempts);
		cScope.onceStableTree(s => {
			state = cScope.serialize({ alias: "App" });
			//debugger
			cScope.destroy()
			if ( !stable && _attempts < 2 ) {
				ctrl.renderSSRTo(node, state, ++_attempts);
			}
			node.innerHTML = appHtml;
		})
		
	},
	renderSSR2( cfg, cb, _attempts = 0 ) {
		let html = "<!doctype html>\n" + renderToString(<Index helmet={Helmet.renderStatic()}
		                                                       content={""}/>);
		console.warn("render !!!!")
		cb(null, html)
	},
	renderSSR( cfg, cb, _attempts = 0 ) {
		let rid     = shortid.generate(),
		    cScope  = new Scope(AppScope, {
			    id         : rid,
			    autoDestroy: false
		    }), App = reScope(cScope)(require('./App').default);
		
		//debugger;
		if ( cfg.state ) {
			cScope.restore(cfg.state, { alias: "App" });
		}
		else {
			cScope.state.Anims = { currentBrkPts: cfg.device };
		}
		
		let html,
		    appHtml     = renderToString(<App location={cfg.location}/>),
		    stable      = cScope.isStableTree();
		global.contexts = Scope.scopes;
		//console.log('ctrl::renderSSR:65: ', cfg.location, _attempts);
		cScope.onceStableTree(state => {
			let nstate = cScope.serialize({ alias: "App" });
			cScope.destroy()
			if ( !_attempts || !stable && _attempts < 3 ) {
				cfg.state = nstate;
				ctrl.renderSSR(cfg, cb, ++_attempts);
			}
			else {
				try {
					html = "<!doctype html>\n" + renderToString(<Index helmet={Helmet.renderStatic()}
					                                                   state={JSON.stringify(nstate)}
					                                                   content={appHtml}/>);
					
					//html = cfg.tpl.render(
					//	{
					//		app  : appHtml,
					//		state: JSON.stringify(nstate),
					//		css  : !__IS_DEV__ && cfg.css
					//	}
					//);
				} catch ( e ) {
					return cb(e)
				}
				cb(null, html)
			}
		})
	}
}
export default ctrl;