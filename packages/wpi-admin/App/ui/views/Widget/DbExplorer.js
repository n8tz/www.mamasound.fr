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
import stores     from 'App/stores/(*).js';
import PropTypes  from "prop-types";
import React      from "react";
import rs         from "react-scopes";

if ( typeof window !== "undefined" )
	require('react-dropzone-component/styles/filepicker.css');


@rs.withScope({
	              @rs.asScope
	              DbExplorer: {
		              @rs.withStateMap(
			              {
				              @rs.asRef
				              Query: 'Query',
			              }
		              )
		              Data: stores.MongoQueries,
		
		              @rs.asStore
		              Query: {
			              etty       : 'Place',
			              query      : {},
			              limit      : 50,
			              updateType : ( etty ) => ({ etty }),
			              updateQuery: ( query ) => ({ query })
		              }
	              },
	
              }
)
@rs.scopeToProps("DbExplorer.Data", "Query")
export default class DbExplorer extends React.Component {
	static propTypes = {
		record: PropTypes.object,
	};
	state            = {};
	
	render() {
		let { $actions, Data, Query, $scope }
			    = this.props;
		
		return (
			<div className={"DbExplorer"}
			>
				<div className={"controls"}>
					<span>{Query.etty}
					</span>
					<IconButton onClick={e => $actions.clearState()} title={"Clear app state"}>
						<ClearIcon/>
					</IconButton>
				</div>
				{/*<TableGrid*/}
				{/*	data={MamaXls}*/}
				{/*	columns={Object.keys(schema)}*/}
				{/*	schema={schema}*/}
				{/*	//keys={ cTable && schemas[cTable].primaryKey }*/}
				{/*	//onFullyUpdate={ this.onCurTableChange.bind(this) }*/}
				{/*/>*/}
				<pre>
					{
						JSON.stringify(Query, null, 2)
					}
					---
					{
						JSON.stringify(Data, null, 2)
					}
				</pre>
			</div>
		);
	}
};