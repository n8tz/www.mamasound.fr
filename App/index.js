/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import "App/console";
import "core-js";
import "core-js/es/object/assign";
import "core-js/features/object/from-entries";
import React              from "react";
import ReactDom           from 'react-dom';
import {renderToString}   from "react-dom/server";
import {Helmet}           from "react-helmet";
//import {hot}            from 'react-hot-loader/root'
import {Scope, withScope} from "react-scopes";
import "regenerator-runtime/runtime";
import shortid            from 'shortid';
import Index              from "./index.html";
import AppScope           from './scopes/App';
//import AppContext           from 'App/context';

const ctrl = {
	
	renderTo( node, state ) {
		//return this.renderSSRTo(...arguments)
		let cScope      = new Scope(AppScope, {
			    id         : "App",
			    autoDestroy: true
		    }),
		    App         = withScope(cScope)(require('./App').default);
		window.contexts = Scope.scopes;
		window.ctrl     = this;
		//if ( localStorage.mama )
		//cScope.restore(JSON.parse(localStorage.mama));
		//else
		if ( state )
			cScope.restore(state);
		ReactDom.render(<App/>, node);
		
		if ( process.env.NODE_ENV !== 'production' && module.hot ) {
			module.hot.accept('./App', () => {
				state = cScope.serialize({ alias: "App" });
				cScope.destroy();
				cScope = new Scope(AppScope, {
					id         : "App",
					autoDestroy: true
				});
				App    = withScope(cScope)(require('./App').default);
				cScope.restore(state);
				ReactDom.render(<App/>, node);
			});
			module.hot.accept('./scopes/App', () => {
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
		    }), App = withScope(cScope)(require('./App').default);
		
		
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
	renderSSR( cfg, cb, _attempts = 0 ) {
		try {
			this.renderFullSSR(...arguments);
		} catch ( e ) {
			cb(null, "<!doctype html>\n" +
				renderToString(<Index
					css={cfg.css}
					state={{}}
					ssrErrors={`<pre>${e}\n${e.stack}</pre>`}/>)
			);
		}
	},
	renderNoSSR( cfg, cb, _attempts = 0 ) {
		let html = "<!doctype html>\n" + renderToString(<Index helmet={Helmet.renderStatic()}
		                                                       content={""}/>);
		console.warn("render !!!!")
		cb(null, html)
	},
	renderFullSSR( cfg, cb, _attempts = 0 ) {
		let rid     = shortid.generate(),
		    cScope  = new Scope(AppScope, {
			    id         : rid,
			    autoDestroy: false
		    }), App = withScope(cScope)(require('./App').default);
		
		//debugger;
		if ( cfg.state ) {
			cScope.restore(cfg.state, { alias: "App" });
		}
		else {
			cScope.state.Anims = { currentTheme: cfg.device };
		}
		
		let html,
		    appHtml     = renderToString(<App location={cfg.location}/>),
		    stable      = cScope.isStableTree();
		global.contexts = Scope.scopes;
		//console.log('ctrl::renderSSR:65: ', cfg.location, _attempts);
		cScope.onceStableTree(state => {
			let nstate = cScope.serialize({ alias: "App" });
			cScope.destroy()
			if ( !_attempts || !stable && _attempts < 2 ) {
				cfg.state = nstate;
				ctrl.renderSSR(cfg, cb, ++_attempts);
			}
			else {
				try {
					html = "<!doctype html>\n" +
						renderToString(<Index
							helmet={Helmet.renderStatic()}
							css={!__IS_DEV__ && cfg.css}
							state={nstate}
							content={appHtml}/>);
					
				} catch ( e ) {
					return cb(e)
				}
				cb(null, html)
			}
		})
	}
}
export default ctrl;