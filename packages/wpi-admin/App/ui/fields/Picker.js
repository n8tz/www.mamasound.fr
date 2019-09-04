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

import React                                                                        from "react";
import FormControlLabel
                                                                                    from '@material-ui/core/FormControlLabel';
import Select                                                                       from './Select';
import Text                                                                         from './Text';
import {asFieldType}                                                                from "App/ui/spells";
import {withScope, scopeToProps, asScope, withStateMap, asRef, asStore, propsToScope} from "react-scopes";
import {Views}                                                                      from 'App/ui';
import stores                                                                       from 'App/stores/(*).js';
import entities                                                                     from 'App/db/entities';

@withScope(
	{
		@asScope
		Picker: {
			@asStore
			SelectedQuery: {
				$apply( data, { search, defaultType, types, selectedType = defaultType || types && types[0] } ) {
					let query = {}, etty = selectedType;
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
					return { search };
				},
				updateQuery( selectedType ) {
					return { selectedType };
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
	}
	state               = {};
	
	render() {
		let { defaultValue, value = defaultValue, Query, Selected, allowTypeSelection, SelectedQuery = {}, $actions } = this.props,
		    { currentType = SelectedQuery.etty || allowTypeSelection[0], currentSearch = "" }                         = this.state;
		//debugger
		return (
			<>
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
				{
					Selected && Selected.record
					&& <Views.DefaultPreview record={Selected.record}/>
				}
				{
					Query
					&& Query.data
					&& Query.data.items
					&& Query.data.items.map(record => <Views.DefaultItem record={record}/>)
				}
			</>
		);
	}
}
;
