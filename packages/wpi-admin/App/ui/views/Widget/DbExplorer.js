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
import IconButton from '@material-ui/core/IconButton';
import ClearIcon  from '@material-ui/icons/Clear';
import entities   from 'App/db/entities.js';
import stores     from 'App/stores/(*).js';
import TableGrid  from 'App/ui/components/TableGrid.js';
import PropTypes  from "prop-types";
import React      from "react";
import {JsonTree} from "react-editable-json-tree";
import rs         from "react-scopes";
import SplitPane  from "react-split-pane";

if ( typeof window !== "undefined" )
	require('react-dropzone-component/styles/filepicker.css');


@rs.withScope({
	              @rs.asScope
	              DbExplorer: {
		              @rs.asStore
		              Query: {
			              etty       : 'Place',
			              query      : {},
			              limit      : 50,
			              updateType : ( etty ) => ({ etty }),
			              selectType : ( e ) => ({ etty: e.target.value }),
			              updateQuery: ( query ) => ({ query })
		              },
		
		              @rs.withStateMap(
			              {
				              @rs.asRef
				              Query: 'Query',
			              }
		              )
		              Data: stores.MongoQueries,
		
		              @rs.asStore
		              Schema: {
			              @rs.asRef
			              etty: 'Query.etty',
			              $apply( data, state ) {
				              //entities;
				              debugger
				              return entities[state.etty].fields;
			              }
		              }
	              },
	
              }
)
@rs.scopeToProps("DbExplorer.Data", "DbExplorer.Query", "DbExplorer.Schema")
export default class DbExplorer extends React.Component {
	static propTypes = {
		record: PropTypes.object,
	};
	state            = {};
	
	render() {
		let { $actions, Data, Query, Schema }
			    = this.props;
		return (
			<SplitPane className={"DbExplorer"} split="horizontal" minSize={50} defaultSize={75}>
				<div className={"controls"}>
					<span>{Query.etty} {Data && Data.Query && Data.Query.items.length}</span>
					<select value={Query.etty} onChange={$actions.DbExplorer.selectType}>
						{
							Object.keys(entities).map(
								id => <option key={id} value={id}>{entities[id].label || id}</option>
							)
						}
					</select>
					<IconButton onClick={e => $actions.clearState()} title={"Clear app state"}>
						<ClearIcon/>
					</IconButton>
				</div>
				<div>
					<SplitPane split="vertical" minSize={50} defaultSize={150}>
						<div>
							<JsonTree data={Query.query} onFullyUpdate={$actions.DbExplorer.updateQuery}/>
						</div>
						<TableGrid
							data={Data && Data.Query}
							columns={Object.keys(Schema)}
							schema={Schema}
							//keys={ cTable && schemas[cTable].primaryKey }
							//onFullyUpdate={ this.onCurTableChange.bind(this) }
						/>
					</SplitPane>
				</div>
			</SplitPane>
		);
	}
};