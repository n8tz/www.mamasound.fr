/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import Button                    from '@material-ui/core/Button';
import entities                  from 'App/db/entities.js';
import stores                    from 'App/stores/(*).js';
import PopAnywhere               from "App/ui/components/PopAnywhere";
import TableGrid                 from 'App/ui/components/TableGrid.js';
import Editable                  from "App/ui/Editable";
import is                        from "is";
import PropTypes                 from "prop-types";
import Menu, {MenuItem, SubMenu} from 'rc-menu';

import React         from "react";
import {JsonTree}    from "react-editable-json-tree";
import {ContextMenu} from "react-inheritable-contextmenu";
import rs            from "react-scopes";
import SplitPane     from "react-split-pane";
import {toast}       from 'react-toastify';
import Text          from "../../fields/Text";

!__IS_SERVER__ && require('react-dropzone-component/styles/filepicker.css');
!__IS_SERVER__ && require('rc-menu/assets/index.css');

@rs.toProps("DbExplorer.Data:AllItems")
class RecordRefRenderer extends React.Component {
	state = {
		edit: false
	}
	
	render() {
		let { value, data, AllItems: { Query }, api, $actions } = this.props;
		return (
			<span className="RecordRefRenderer"
			      onClick={e => this.setState({ edit: true })}
			      style={{ textAlign: 'center', background: data.validStyle && 'green' || 'red' }}>
                    {
	                    this.state.edit ?
	                    <PopAnywhere hovering={this.state.edit} onClickOut={e => this.setState({ edit: false })}>edit
		                    {/*<Select className={ "select" }*/}
		                    {/*        defaultInputValue={ value.replace(/[^\w]/ig, '').substr(0, 3) }*/}
		                    {/*        defaultMenuIsOpen={ true }*/}
		                    {/*        onChange={ e => this.setState({ edit: false }, s => {*/}
		                    {/*            data.style      = e.label;*/}
		                    {/*            data.styleId    = e.value;*/}
		                    {/*            data.validStyle = true;*/}
		                    {/*            data.valid      = data.validPlace;*/}
		                    {/*            api.updateRowData(data);*/}
		                    {/*            $actions.checkValidity();*/}
		                    {/*        }) }*/}
		                    {/*        options={ EventCategories && EventCategories.items.map(row => ({*/}
		                    {/*            label: row.name,*/}
		                    {/*            value: row._id*/}
		                    {/*        })) || [] }*/}
		                    />
	                    </PopAnywhere>
	                                    :
	                    value
                    }
                </span>
		);
	}
}

@rs({
	    @rs.scope
	    DbExplorer: {
		    @rs.store
		    Query: {
			    //etty       : 'Place',
			    query     : {},
			    limit     : 50,
			    active    : true,
			    page      : 0,
			    pageLength: 50,
			    $apply( data, { active, page, pageLength, search, defaultType, etty } ) {
				    let query = {}, _etty = etty;
				
				    if ( !etty )
					    return;
				    //debugger
				    while ( entities[_etty].targetCollection ) {
					    _etty = entities[_etty].targetCollection;
				    }
				    if ( search ) {
					    let fields = entities[etty].searchableFields ||
						    ['name', 'label', 'desc'], re;
					    re         = {
						    $regex  : ".*" + search.replace(/([^\w\d])/g, "\\$1") + ".*",
						    $options: 'gi'
					    };
					    if ( _etty !== etty )
						    query.$or = fields.map(
							    ( f ) => ({ [f]: re, _cls: etty }))
					    else
						    query.$or = fields.map(
							    ( f ) => ({ [f]: re }))
					    query.$or.push({ _id: search })
				    }
				    else {
					    if ( _etty !== etty )
						    query._cls = etty;
				    }
				
				    return {
					    etty   : _etty, _etty: etty,
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
			    selectType( etty ) {
				    return { etty, active: true, page: 0 };
			    }
		    },
		
		    @rs.withStateMap(
			    {
				    @rs.ref
				    Query: 'Query',
			    }
		    )
		    Data: stores.MongoQueries,
		
		    @rs.store
		    Schema   : {
			    @rs.ref
			    etty: 'Query.etty',
			    $apply( data, state ) {
				    //entities;
				    let schema          = entities[state.etty] && entities[state.etty].fields,
				        TableGridSchema = {};
				    if ( !schema )
					    return {};
				
				    Object.keys(schema)
				          .map(
					          ( field ) => (
						          TableGridSchema[field] = {
							          ...field,
							          renderer: ( { value, data } ) => {
								          //debugger
								          return <div>
									          <Editable id={data._id} $scope={this.$scope.stores.$parent}/>
									          {
										          is.object(value) ? JSON.stringify(value) :
										          is.array(value) ? JSON.stringify(value) :
										          value
									          }
								          </div>
							          }
						          }
					          )
				          );
				
				    TableGridSchema._id = {
					    ...TableGridSchema._id,
					    width   : 40,
					    renderer: ( { value, data } ) => {
						    //debugger
						    return <div>
							    <Editable id={data._id} $scope={this.$scope.stores.$parent}/>
							    <Button onClick={e => {
								    confirm("Supprimer '" + data._id + "' ?") && this.$actions.$parent.db_remove(data, ok => {
									    toast(ok.ok ? "Supprimé" : "Erreur:" + ok.error)
								    })
							    }}><span
								    className={"icon material-icons"}>delete</span> </Button>
						    </div>
					    }
				    }
				    //debugger
				    return TableGridSchema;
			    }
		    },
		    @rs.store
		    AdminMenu: {
			    $apply( data, state ) {
				    //entities;
				
				    let menu = {
					    _childs: [],
				    };
				    Object.keys(entities)
				          .forEach(
					          ( key ) => {
						
						          //if ( entities[key].hidden ) return;
						          var path = (entities[key].adminRoute || '').split('/'), last,
						              pos  = menu, tmp;
						          while ( path.length ) {
							          if ( !pos[path[0]] ) {
								          pos._childs.push(path[0]);
								          pos[path[0]] = {
									          _childs: [],
									          _label : path[0]
								          }
								
							          }
							          pos = pos[path[0]];
							          path.shift();
						          }
						          pos._etty   = key;
						          pos._weight = entities[key].weight;
						
					          }
				          );
				    return menu;
			    }
		    }
	    },
	
    }
)
@rs.scopeToProps("DbExplorer.Data", "DbExplorer.Query", "DbExplorer.Schema", "DbExplorer.AdminMenu")
export default class DbExplorer extends React.Component {
	static propTypes = {
		record: PropTypes.object,
	};
	state            = {};
	
	render() {
		let { $actions, Data, Query, Schema, AdminMenu }
			    = this.props;
		let { currentSearch }
			    = this.state;
		return (
			<SplitPane className={"DbExplorer"} split="horizontal" minSize={100} defaultSize={75}>
				<div className={"controls"}>
					<ContextMenu native={true}/>
					<Menu mode={"horizontal"}>
						{
							(function walk( menu, first ) {
								return (
									!menu._label &&
									Object.keys(menu)
									      .map(
										      ( key ) => ((key[0] !== '_') && walk(menu[key], first))
									      ).filter(v => !!v)
									||
									menu._childs.length &&
									<SubMenu
										title={menu._label}
										// style={{display : 'inline-block'}}
										anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}>
										{
											Object.keys(menu)
											      .map(
												      ( key ) => ((key[0] !== '_') &&
													      walk(menu[key]))
											      ).filter(v => !!v)
										}
									</SubMenu>
									||
									<MenuItem
										onClick={() => {
											$actions.DbExplorer.selectType(menu._etty);
										}}>
										{menu._label}
									</MenuItem>
								)
							})(AdminMenu, true)
						}
					</Menu>
					{
						Query &&
						<div className={"queryBar"}>
							<Text
								placeholder={"Search"}
								value={currentSearch}
								onChange={e => {
									this.setState({ currentSearch: e.target.value })
									$actions.DbExplorer.updateSearch(e.target.value)
								}}
							/>
							<button onClick={$actions.DbExplorer.precPage}>prec</button>
							<span>{Query.page}</span>
							<button onClick={$actions.DbExplorer.nextPage}>next</button>
							<span> {Data && Data.Query && Data.Query.length}{Query._etty || ''}</span>
							{
								Query && Query._etty && !entities[Query._etty].disallowCreate &&
								<Button className={'entityAddItem entityAdd' + Query.etty + 'Item'}
								        onClick={e => $actions.newWidget('RecordEditor', {
									        etty : Query._etty,
									        title: entities[Query._etty].label
								        }, {
									
									                                         "size": { "width": 600, "height": 800 },
									                                         //"position": { "x": 0, "y": 0 }
								                                         })}>
									Créer {entities[Query._etty].label}
								</Button>
							}
						</div>
					}
					{/*<IconButton onClick={e => $actions.clearState()} title={"Clear app state"}>*/}
					{/*	<ClearIcon/>*/}
					{/*</IconButton>*/}
				</div>
				<div>
					<SplitPane split="vertical" minSize={50} defaultSize={150}>
						<div>
							{Query && <JsonTree data={Query.query} onFullyUpdate={$actions.DbExplorer.updateQuery}/>}
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