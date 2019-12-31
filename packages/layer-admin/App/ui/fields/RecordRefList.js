/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import Fab                                                                            from '@material-ui/core/Fab';
import entities                                                                       from 'App/db/entities';
import stores                                                                         from 'App/stores/(*).js';
import {Views}                                                                        from 'App/ui';
import {asFieldType}                                                                  from "App/ui/spells";
import arrayMove                                                                      from 'array-move';
import React                                                                          from "react";
import {asRef, asScope, asStore, propsToScope, scopeToProps, withScope, withStateMap} from "react-scopes";
import {SortableContainer, SortableElement}                                           from 'react-sortable-hoc';
import Select                                                                         from './Select';
import Text                                                                           from './Text';

const SortableItem = SortableElement(( { value, onRm, index } ) =>
	                                     <Views.DefaultRefItem recordRef={value}>
		                                     <span className={"material-icons  button"}
		                                           onMouseDown={e => {
			                                           e.stopPropagation();
			                                           e.preventDefault();
			                                           onRm(value)
		                                           }}
			                                     //onMouseDown={e => onRm(value)}
		                                     >remove</span>
	                                     </Views.DefaultRefItem>);

const SortableList = SortableContainer(( { items, onRm } ) => {
	return (
		<div className={"refList"}>
			{items.map(( value, index ) => (
				<SortableItem key={index} index={index} value={value} onRm={onRm}/>
			))}
		</div>
	);
});
@withScope(
	{
		@asScope
		Picker: {
			@asStore
			SelectedQuery  : {
				active    : false,
				page      : 0,
				pageLength: 10,
				$apply( data, { active, page, pageLength, search, defaultType, types, selectedType = defaultType || types && types[0] } ) {
					let query = {}, etty = selectedType;
					//debugger
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
			Query          : stores.MongoQueries,
			@asStore
			SelectedRefList: {
				$apply( data, { ref: { objId, cls } = {} } ) {
					return { id: objId, etty: cls }
				},
				selectItem( ref ) {
					return { ref };
				}
			},
			@withStateMap(
				{
					//@asRef
					//record: "SelectedRef",
				}
			)
			Selected       : stores.MongoRecords,
		},
		
	}
)
@propsToScope(
	//"defaultValue:Picker.SelectedRef.list",
	"allowTypeSelection:Picker.SelectedQuery.types",
	//"defaultValue.cls:Picker.SelectedQuery.defaultType"
)
@scopeToProps("Picker.Query", "Picker.SelectedQuery")
@asFieldType
export default class RecordRefList extends React.Component {
	static displayName  = "RecordRefList";
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
		let value              = [...this.state.value, { objId: record._id, cls: record._cls }];
		this.props.onChange
		&& this.props.onChange({
			                       target: {
				                       name,
				                       value
			                       }// should have .value
		                       });
		//$actions.Picker.selectItem(value)
		this.setState({ editing: false, value });
	};
	
	onSortEnd = ( { oldIndex, newIndex } ) => {
		let { $actions, name } = this.props;
		let value              = arrayMove(this.state.value, oldIndex, newIndex)
		this.setState({ value });
		this.props.onChange
		&& this.props.onChange({
			                       target: {
				                       name,
				                       value
			                       }// should have .value
		                       });
	};
	onRm      = ( ref ) => {
		let { $actions, name } = this.props;
		let value              = [...this.state.value].filter(r => (r !== ref))
		this.setState({ value });
		this.props.onChange
		&& this.props.onChange({
			                       target: {
				                       name,
				                       value
			                       }// should have .value
		                       });
	};
	
	render() {
		let { defaultValue, Query, Selected, allowTypeSelection, SelectedQuery = {}, $actions } = this.props;
		let { value = defaultValue }                                                            = this.state;
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
								!editing ? "add" : "cancel"
							}
						</i>
					</Fab>
				</div>
				{
					!editing ?
					<>
						<SortableList className={"selected"} items={value}
						              onSortEnd={this.onSortEnd}
						              shouldCancelStart={e => e.target.classList.contains("button")}
						              distance={5}
						              onRm={this.onRm}
						              helperClass='sortableHelper'
						/>
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
