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
				active    : false,
				page      : 0,
				pageLength: 10,
				$apply( data, { active, page, pageLength, search, defaultType, types, selectedType = defaultType || types && types[0] } ) {
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
						orderby: { updated: -1 },
						skip   : page * pageLength,
						limit  : pageLength,
						page
					}
				},
				updatePage( page ) {
					return { page };
				},
				nextPage  : () => state => ({
					page: state.page + 1
				}),
				precPage  : () => state => ({
					page: state.page - 1
				}),
				updateSearch( search ) {
					return { search, active: true, page: 0 };
				},
				updateQuery( selectedType ) {
					return { selectedType, active: true, page: 0 };
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
				},
				selectItem( ref ) {
					return { ref };
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
@scopeToProps("Picker.Query", "Picker.Selected", "Picker.SelectedQuery")
@asFieldType
export default class RecordRef extends React.Component {
	static displayName  = "RecordRef";
	static defaultProps = {
		allowTypeSelection: Object.keys(entities)
	};
	state               = {
		editing: false
	};
	
	togglePicker = () => {
		let { $actions } = this.props;
		
		!this.state.editing && $actions.Picker.updateSearch("")
		this.setState({ editing: !this.state.editing });
	};
	//
	//getValue( s, p ) {
	//	s = s || this.state;
	//	p = p || this.props;
	//	return {
	//		name : p.name,
	//		value: s.value
	//	};
	//}
	
	selectRecord = ( record ) => {
		let { $actions, name } = this.props;
		let value              = { objId: record._id, cls: record._cls };
		this.props.onChange
		&& this.props.onChange({
			                       target: {
				                       name,
				                       value
			                       }// should have .value
		                       });
		$actions.Picker.selectItem(value)
		this.setState({ editing: false });
	};
	
	render() {
		let { defaultValue, value = defaultValue, Query, Selected, allowTypeSelection, SelectedQuery = {}, $actions } = this.props;
		if ( allowTypeSelection === true )
			allowTypeSelection = Object.keys((entities));
		let
			{ currentType = SelectedQuery.etty || value && value.cls || allowTypeSelection[0], currentSearch = "", editing } = this.state;
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
								&& <Views.DefaultPreview record={Selected.record} key={Selected.record._id}/>
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
							<button onClick={$actions.Picker.precPage}>prec</button>
							<span>{SelectedQuery.page}</span>
							<button onClick={$actions.Picker.nextPage}>next</button>
						</div>
						<div className={"results"}>
							{
								Query
								&& Query.data
								&& Query.data.items
								&& Query.data.items.map(record => <Views.DefaultItem key={record._id} record={record}
								                                                     onClick={e => this.selectRecord(record)}/>)
							}
						</div>
					</>
				}
			</>
		);
	}
}
;
