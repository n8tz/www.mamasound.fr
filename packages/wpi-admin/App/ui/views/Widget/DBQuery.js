/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import is                                                               from "is";
import PropTypes                                                        from "prop-types";
import React                                                            from "react";
import {remove}                                                         from 'App/db';
import {withScope, Store, scopeToProps, propsToScope}                     from "react-scopes";
import {withStateMap, asRef, asStore}                                   from "react-scopes";
import QueryIcon                                                        from '@material-ui/icons/CloudUploadOutlined';
import DeleteIcon                                                       from '@material-ui/icons/Delete';
import RefreshIcon                                                      from '@material-ui/icons/Refresh';
import IconButton                                                       from '@material-ui/core/IconButton';
import stores                                                           from 'App/stores/(*).js';
import {ADD_DELTA_TYPE, JsonTree, REMOVE_DELTA_TYPE, UPDATE_DELTA_TYPE} from "react-editable-json-tree";

@withScope(
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
			<div className={"DBQuery"}
			>
				<div className={"controls"}>
					<IconButton onClick={e => this.setState({ textMode: !textMode })}
					            title={"Switch viewmode"}>
						<RefreshIcon/>
					</IconButton>
					<IconButton onClick={e => $actions.updateQuery(query)}
					            title={"DoQuery"}>
						<QueryIcon/>
					</IconButton>
					<IconButton onClick={e => $actions.doQueryDelete(query)}
					            title={"Do Delete this query"}>
						<DeleteIcon/>
					</IconButton>
					
					<IconButton onClick={e => $actions.dataProvider_flushAll()} title={"Update all query"}>
						<RefreshIcon/>
					</IconButton>
				</div>
				<div className={"query"}>
					{
						textMode
						&&
						<JsonTree data={query} onFullyUpdate={this.onQueryChange.bind(this)}/>
						||
						<textarea
							ref="json" onChange={( e ) => this.onQueryChange(JSON.parse(e.target.value))}
							style={{ width: '100%', minHeight: '10em' }} value={JSON.stringify(query, null, 2)}>
                        </textarea>
					}
				</div>
				<div className={"results"}>
					{
						<JsonTree data={DBQuery || {}}/>
					}
				</div>
			</div>
		);
	}
};