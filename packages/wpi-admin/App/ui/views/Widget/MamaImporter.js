/*
 * www.mamasound.fr
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
import is                                           from "is";
import PropTypes                                    from "prop-types";
import React                                        from "react";
import TableGrid                                    from 'App/ui/components/TableGrid.js';
import PopAnywhere                                  from 'App/ui/components/PopAnywhere.js';
import {DropzoneComponent}                          from "react-dropzone-component";
import Select                                       from 'react-select';
import {withStateMap, asRef, asStore,withScope, Store, scopeToProps, propsToScope} from "react-scopes";
import ImportIcon                                   from '@material-ui/icons/CloudUploadOutlined';
import ExportIcon                                   from '@material-ui/icons/Delete';
import SaveIcon                                     from '@material-ui/icons/Save';
import ClearIcon                                    from '@material-ui/icons/Clear';
import ClearCacheIcon                               from '@material-ui/icons/Refresh';
import RefreshIcon                                  from '@material-ui/icons/CloudDownload';
import IconButton                                   from '@material-ui/core/IconButton';
import stores                                       from 'App/stores/(*).js';

if ( typeof window !== "undefined" )
	require('react-dropzone-component/styles/filepicker.css');


const types = {
	number : {
		"type": "number",
	},
	string : {
		"type": "string",
	},
	boolean: {
		"type"      : "number",
		"renderType": "bool",
		maximum     : 1,
		minimum     : 0
	}
}

@scopeToProps("allQueries")
class PlaceRenderer extends React.Component {
	state = {
		edit: false
	}
	
	render() {
		let { value, data, rowIndex, $actions, allQueries: { Places }, api } = this.props;
		return (
			<span className="PlaceRenderer"
			      onClick={ e => this.setState({ edit: true }) }
			      style={ { textAlign: 'center', background: data.validPlace && 'green' || 'red' } }>
                   
			                    <PopAnywhere hovering={ this.state.edit }
			                                 onClickOut={ e => this.setState({ edit: false }) }>
				                    {
					                    this.state.edit ?
					                    <Select className={ "select" }
					                            defaultInputValue={ value.replace(/[^\w]/ig, '').substr(0, 3) }
					                            defaultMenuIsOpen={ true }
					                            onChange={ e => this.setState({ edit: false }, s => {
						                            data.lieu       = e.label;
						                            data.lieuId     = e.value;
						                            data.validPlace = true;
						                            data.valid      = data.validStyle;
						                            api.updateRowData(data);
						                            $actions.checkValidity();
					                            }) }
					                            options={ Places && Places.items.map(row => ({
						                            label: row.label,
						                            value: row._id
					                            })) || [] }
					                    />
					                                    :
					                    value
				                    }
			                    </PopAnywhere>
                </span>
		);
	}
}

@scopeToProps("allQueries")
class StyleRenderer extends React.Component {
	state = {
		edit: false
	}
	
	render() {
		let { value, data, allQueries: { EventCategories }, api, $actions } = this.props;
		return (
			<span className="StyleRenderer"
			      onClick={ e => this.setState({ edit: true }) }
			      style={ { textAlign: 'center', background: data.validStyle && 'green' || 'red' } }>
                    {
	                    this.state.edit ?
	                    <PopAnywhere hovering={ this.state.edit } onClickOut={ e => this.setState({ edit: false }) }>
		                    <Select className={ "select" }
		                            defaultInputValue={ value.replace(/[^\w]/ig, '').substr(0, 3) }
		                            defaultMenuIsOpen={ true }
		                            onChange={ e => this.setState({ edit: false }, s => {
			                            data.style      = e.label;
			                            data.styleId    = e.value;
			                            data.validStyle = true;
			                            data.valid      = data.validPlace;
			                            api.updateRowData(data);
			                            $actions.checkValidity();
		                            }) }
		                            options={ EventCategories && EventCategories.items.map(row => ({
			                            label: row.name,
			                            value: row._id
		                            })) || [] }
		                    />
	                    </PopAnywhere>
	                                    :
	                    value
                    }
                </span>
		);
	}
}

@withScope(
	{
		XlsDataProvider: stores.XlsDataProvider,
		
		@withStateMap(
			{
				Places         : {
					etty : 'Place',
					query: {},
					limit: 10000000
				},
				EventCategories: {
					etty : 'EventCategory',
					query: {},
					limit: 10000000
				},
				updateImporterQueries() {
					return Object.keys(this.nextState).reduce(( h, k ) => (h[k] = { ...h[k] }, h), { ...this.nextState })
				}
			}
		)
		DBQueries: stores.MongoQueries,
		
		@asStore
		allQueries: {
			@asRef
			Places: "!DBQueries.Places",
			
			@asRef
			EventCategories: "!DBQueries.EventCategories"
		},
		
		@withStateMap(
			{
				@asRef
				items     : "XlsDataProvider.tablesById.EVENTS",
				@asRef
				options   : "XlsDataProvider.tablesById.OPTIONS",
				@asRef
				mustMatch : "!allQueries",
				matchLabel: {
					lieu : 'label',
					style: 'name'
				},
			}
		)
		MamaXls: stores.MamaConverter,
		
		@withStateMap(
			{
				@asRef
				items      : "MamaXls.items",
				importerUrl: "/importer",
				deleteUrl  : "/delete",
			}
		)
		Importer: stores.DataImporter,
		
		@asStore
		Exportable: {
			@asRef
			items: "Importer.imported",
			$apply( d, { items } ) {
				return {
					items: items && items.map(row => ({
						...row,
						category: row.category.objId,
						place   : row.place.objId
					}))
				}
			}
		},
		
		@withStateMap(
			{
				@asRef
				items  : "Exportable.items",
				docName: "NewEvents",
			}
		)
		Exporter: stores.XlsExporter,
		
	}
)
@scopeToProps("MamaXls", "appState", "Importer", "Exporter")
export default class MamaImporter extends React.Component {
	static propTypes = {
		record: PropTypes.object,
	};
	state            = {
		currentlyPlaying: 0,
		showUploader    : false
	};
	
	showUploader = ( e ) => {
		this.setState({ showUploader: true })
	};
	hideUploader = ( e ) => {
		this.setState({ showUploader: false })
	};
	
	render() {
		let { $actions, MamaXls, Importer, Exporter, $scope }
			    = this.props,
		    schema           = {
			    valid    : types.boolean,
			    date     : types.string,
			    groupe   : types.string,
			    lieu     : {
				    "type"  : "string",
				    renderer: withScope($scope)(PlaceRenderer),
				    sanitize: ( v ) => (v && ('' + v).trim())
			    },
			    style    : {
				    "type"  : "string",
				    renderer: withScope($scope)(StyleRenderer),
				    sanitize: ( v ) => (v && ('' + v).trim())
			    },
			    prix     : types.string,
			    heure    : types.string,
			    timestamp: types.number,
			
			    lieuId : types.string,
			    styleId: types.string,
		    } || {},
		    { showUploader } = this.state
		;
		
		return (
			<div className={ "XSLImporter" }
			     onDragEnter={ this.showUploader }
			>
				<div className={ "controls" }>
					<span>
						Année en cour : { MamaXls.options && MamaXls.options.year || "inconnue" }
					</span>
					{ !Importer.imported &&
					<IconButton onClick={ e => {
						if ( !Importer.valid && !confirm("Seul les events tout vert seront importé !") )
							return;
						$actions.doDbImport();
					} } title={ "Upload to server" }>
						<ImportIcon/>
					</IconButton> }
					{ Importer.imported &&
					<IconButton onClick={ e => $actions.doDbDelete() } title={ "Delete imported" }>
						<ExportIcon/>
					</IconButton> }
					<IconButton onClick={ e => $actions.dataProvider_flushAll() } title={ "Update styles & places" }>
						<RefreshIcon/>
					</IconButton>
					<IconButton onClick={ e => $actions.clearWebSiteCache() } title={ "Clear website cache" }>
						<ClearCacheIcon/>
					</IconButton>
					<IconButton onClick={ e => $actions.saveState() } title={ "Save app state in the browser" }>
						<SaveIcon/>
					</IconButton>
					<IconButton onClick={ e => $actions.clearState() } title={ "Clear app state" }>
						<ClearIcon/>
					</IconButton>
				</div>
				<TableGrid
					data={ MamaXls }
					columns={ Object.keys(schema) }
					schema={ schema }
					//keys={ cTable && schemas[cTable].primaryKey }
					//onFullyUpdate={ this.onCurTableChange.bind(this) }
				/>
				{
					<DropzoneComponent
						onDragLeave={ this.hideUploader }
						className={ !showUploader && "hidden" }
						ref="dropzone"
						eventHandlers={ {
							addedfile: file => {
								$actions.addXLSfile(
									file,
									e => this.refs.dropzone.dropzone.removeFile(file)
								);
							},
							//complete: this.uploadSuccess,
							drop     : this.hideUploader
						} }
						style={ { width: "100%", height: "100%", background: "#ffffff5c" } }
						
						config={ {
							parallelUploads : 100,
							maxFiles        : 100,
							iconFiletypes   : [".xls", ".csv", ".xslx"],
							showFiletypeIcon: true,
							autoDiscover    : false,
							postUrl         : "no-url"
						} }
						djsConfig={ {
							parallelUploads   : 100,
							maxFiles          : 100,
							autoProcessQueue  : false,
							withCredentials   : true,
							autoDiscover      : false,
							dictDefaultMessage: "Drop here to parse"
						} }/>
				}
			</div>
		);
	}
};