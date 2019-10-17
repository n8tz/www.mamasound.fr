/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import AppCtrl    from "App";
import React      from "react";
import RS         from "react-scopes";
import {toast}    from 'react-toastify';
import superagent from "superagent";

var fileDownload = require('js-file-download');

@RS(
	{
		@RS.store
		AppStateMngr: {
			docName: "appState",
			exportAppState() {
				let me = this;
				return ( { docName } ) => {
					let rootScope = me.$scope;
					while ( rootScope.parent )
						rootScope = rootScope.parent;
					fileDownload(
						new Blob([JSON.stringify(rootScope.serialize({ alias: "App" }), null, 2)], { type: "application/json" })
						,
						docName + '.json'
					);
					
				}
			},
			restoreAppState( state ) {
				let rootScope = this.$scope;
				while ( rootScope.parent )
					rootScope = rootScope.parent;
				//rootScope.restore(state, true);
				rootScope.destroy()
				AppCtrl.renderTo(document.getElementById("app"), state)
			}
		},
	}
)
@RS.connect("AppStateMngr")
export default class DevTools extends React.Component {
	static defaultWindow = {
		"size"    : { "width": 200, "height": 120 },
		"position": { "x": 0, "y": 0 }
	}
	clearRedisCache      = () => {
		superagent.get("/devTools/clearCache").then(req => console.log(req.data))
	}
	restoreAppState      = ( e ) => {
		const { $actions } = this.props;
		let file           = e.target.files[0],
		    reader         = new FileReader();
		reader.onload      = ( e ) => {
			let state = JSON.parse(e.target.result);
			$actions.restoreAppState(state);
		};
		reader.readAsText(file);
	}
	restoreDb            = ( e ) => {
		const { $actions } = this.props;
		let file           = e.target.files[0],
		    reader         = new FileReader();
		var request        = superagent.post('/devTools/dbRestore');
		//request.set('Authorization', 'Bearer 14d79ed924584881940d76aba1a874bf')
		toast("Upload started...")
		request.attach('file', file);
		request.end(function ( res, e ) {
			toast(e ? "seems succesfull" : "Got error")
			console.log('yay got ', res, e);
			e.target.value = '';
		}).on('progress', function ( e ) {
			console.log('Percentage done: ', e.percent);
		});
	}
	
	render() {
		const { $actions } = this.props;
		return (
			<div>
				<div onClick={this.clearRedisCache}>clear Cache</div>
				<div onClick={$actions.exportAppState}>exportAppState</div>
				<div><a href={"/devTools/dbDump"}>Download db dump</a></div>
				<br/>
				<label htmlFor="file">Restore db from file</label>
				<input type="file"
				       name="file"
				       onChange={this.restoreDb}/>
				<br/>
				<label htmlFor="file">Restore state from file</label>
				<input type="file"
				       name="file"
				       onChange={this.restoreAppState}
				       accept="application/json"/>
			</div>
		);
	}
	
};

