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
import is                                                               from "is";
import PropTypes                                                        from "prop-types";
import React                                                            from "react";
import TableGrid                                                        from 'App/ui/components/TableGrid.js';
import PopAnywhere                                                      from 'App/ui/components/PopAnywhere.js';
import {DropzoneComponent}                                              from "react-dropzone-component";
import {remove}                                                         from 'App/db';
import {reScope, Store, scopeToProps, propsToScope}                     from "rscopes";
import {withStateMap, asRef, asStore}                                   from "rescope-spells";
import QueryIcon                                                        from '@material-ui/icons/CloudUploadOutlined';
import DeleteIcon                                                       from '@material-ui/icons/Delete';
import RefreshIcon                                                      from '@material-ui/icons/Refresh';
import IconButton                                                       from '@material-ui/core/IconButton';
import stores                                                           from 'App/stores/(*).js';
import {ADD_DELTA_TYPE, JsonTree, REMOVE_DELTA_TYPE, UPDATE_DELTA_TYPE} from "react-editable-json-tree";

@reScope(
	{
		XlsDataProvider: stores.XlsDataProvider,
		
		@asStore
		CurrentQuery: {
			etty : 'Place',
			query: {},
			limit: 10000000,
			updateQuery( state ) {
				return state;
			},
			doQueryDelete( state = this.nextState ) {
				if ( confirm("Really delete all records matching the query ????") )
					remove(state)
						.then(r => {
							alert(r.n, " record deleted")
						})
						.catch(r => {
							alert(r, " (failed)")
						})
			}
		},
		@withStateMap(
			{
				@asRef
				Query: "CurrentQuery",
			}
		)
		DBQuery     : stores.MongoQueries,
		
	}
)
@scopeToProps("DBQuery", "CurrentQuery")
export default class DBQuery extends React.Component {
	static propTypes = {
		record: PropTypes.object,
	};
	state            = {
		currentlyPlaying: 0,
		showUploader    : false
	};
	
	onQueryChange( v ) {
		
		this.setState({ query: v });
	}
	
	render() {
		let { $actions, DBQuery, $scope, CurrentQuery }
			    = this.props,
		    { textMode, query = CurrentQuery } = this.state
		;
		
		return (
			<div className={ "DBQuery" }
			>
				<div className={ "controls" }>
					<IconButton onClick={ e => this.setState({ textMode: !textMode }) }
					            title={ "Switch viewmode" }>
						<RefreshIcon/>
					</IconButton>
					<IconButton onClick={ e => $actions.updateQuery(query) }
					            title={ "DoQuery" }>
						<QueryIcon/>
					</IconButton>
					<IconButton onClick={ e => $actions.doQueryDelete(query) }
					            title={ "Do Delete this query" }>
						<DeleteIcon/>
					</IconButton>
					
					<IconButton onClick={ e => $actions.dataProvider_flushAll() } title={ "Update all query" }>
						<RefreshIcon/>
					</IconButton>
				</div>
				<div className={ "query" }>
					{
						textMode
						&&
						<JsonTree data={ query } onFullyUpdate={ this.onQueryChange.bind(this) }/>
						||
						<textarea
							ref="json" onChange={ ( e ) => this.onQueryChange(JSON.parse(e.target.value)) }
							style={ { width: '100%', minHeight: '10em' } } value={ JSON.stringify(query, null, 2) }>
                        </textarea>
					}
				</div>
				<div className={ "results" }>
					{
						<JsonTree data={ DBQuery || {} }/>
					}
				</div>
			</div>
		);
	}
};