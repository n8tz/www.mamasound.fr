/*
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

import Fab                                                                            from '@material-ui/core/Fab';
import entities                                                                       from 'App/db/entities';
import stores                                                                         from 'App/stores/(*).js';
import {Views}                                                                        from 'App/ui';
import {asFieldType}                                                                  from "App/ui/spells";
import React                                                                          from "react";
import {asRef, asScope, asStore, propsToScope, scopeToProps, withScope, withStateMap} from "react-scopes";
import Select                                                                         from './Select';
import Text                                                                           from './Text';

@withScope(
	{
		@asScope
		Picker: {
			@asStore
			SelectedQuery: {
				active: false,
				$apply( data, { active, search, defaultType, types, selectedType = defaultType || types && types[0] } ) {
					let query = {}, etty = selectedType;
					
					
					if ( !active )
						return;
					
					while ( entities[etty].targetCollection ) {
						etty = entities[etty].targetCollection;
					}
					if ( search ) {
						let fields = entities[selectedType].searchableFields ||
							['name', 'label', 'desc'], re;
						re         = {
							$regex  : ".*" + search.replace(/([^\w\d])/g, "\\$1") + ".*",
							$options: 'gi'
						};
						query.$or  = fields.map(
							( f ) => ({ [f]: re, _cls: selectedType }))
					}
					else {
						query._cls = selectedType;
					}
					
					return {
						etty,
						query,
						limit: 3,
					}
				},
				updateSearch( search ) {
					return { search, active: true };
				},
				updateQuery( selectedType ) {
					return { selectedType, active: true };
				}
			},
			@withStateMap(
				{
					@asRef
					data: "SelectedQuery",
				}
			)
			Query        : stores.MongoQueries,
			@asStore
			SelectedRef  : {
				$apply( data, { ref: { objId, cls } = {} } ) {
					return { id: objId, etty: cls }
				}
			},
			@withStateMap(
				{
					@asRef
					record: "SelectedRef",
				}
			)
			Selected     : stores.MongoRecords,
		},
		
	}
)
@propsToScope(
	"defaultValue:Picker.SelectedRef.ref",
	"allowTypeSelection:Picker.SelectedQuery.types",
	"defaultValue.cls:Picker.SelectedQuery.defaultType"
)
@scopeToProps("Picker.Query", "Picker.Selected", "SelectedQuery")
@asFieldType
export default class Picker extends React.Component {
	static displayName  = "Picker";
	static defaultProps = {
		allowTypeSelection: Object.keys(entities)
	};
	state               = {
		editing: false
	};
	togglePicker        = () => {
		let { $actions } = this.props;
		
		!this.state.editing && $actions.Picker.updateSearch("")
		this.setState({ editing: !this.state.editing });
	};
	
	render() {
		let { defaultValue, value = defaultValue, Query, Selected, allowTypeSelection, SelectedQuery = {}, $actions } = this.props,
		    { currentType = SelectedQuery.etty || allowTypeSelection[0], currentSearch = "", editing }                = this.state;
		return (
			<>
				<div className={"menu"}>
					<Fab onClick={this.togglePicker} size={"small"}>
						<i className="material-icons">
							{
								!editing ? "create" : "cancel"
							}
						</i>
					</Fab>
				</div>
				{
					!editing ?
					<>
						<div className={"selected"}>
							{
								Selected && Selected.record
								&& <Views.DefaultPreview record={Selected.record}/>
							}
						</div>
					</> :
					<>
						<div className={"queryBar"}>
							<Select options={allowTypeSelection.map(etty => ({ label: etty, value: etty }))}
							        value={currentType}
							        onChange={e => {
								        this.setState({ currentType: e.target.value })
								        $actions.Picker.updateQuery(e.target.value)
							        }}
							/>
							<Text
								placeholder={"Search"}
								value={currentSearch}
								onChange={e => {
									this.setState({ currentSearch: e.target.value })
									$actions.Picker.updateSearch(e.target.value)
								}}
							/>
						</div>
						<div className={"results"}>
							{
								Query
								&& Query.data
								&& Query.data.items
								&& Query.data.items.map(record => <Views.DefaultItem record={record}/>)
							}
						</div>
					</>
				}
			</>
		);
	}
}
;
