/*
 *
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
import AppCtrl    from "App";
import React      from "react";
import RS         from "react-scopes";
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
	
	render() {
		const { $actions } = this.props;
		return (
			<div>
				<div onClick={this.doRestore}>db restore</div>
				<div onClick={this.clearRedisCache}>clear Cache</div>
				<div onClick={$actions.exportAppState}>exportAppState</div>
				<label htmlFor="file">Restore from file</label>
				<input type="file"
				       name="file"
				       onChange={this.restoreAppState}
				       accept="application/json"/>
			</div>
		);
	}
	
};

