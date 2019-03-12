/*
 * The MIT License (MIT)
 * Copyright (c) 2019. Wise Wild Web
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  @author : Nathanael Braun
 *  @contact : n8tz.js@gmail.com
 */
import is                                           from "is";
import PropTypes                                    from "prop-types";
import React                                        from "react";
import TableGrid                                    from 'App/ui/components/TableGrid.js';
import PopAnywhere                                  from 'App/ui/components/PopAnywhere.js';
import {types}                                      from 'App/db';
import {DropzoneComponent}                          from "react-dropzone-component";
import Select                                       from 'react-select';
import XlsDataProvider                              from 'App/stores/XlsDataProvider';
import MamaConverter                                from 'App/stores/MamaConverter';
import MongoQuery                                   from 'App/stores/MongoQuery';
import DataImporter                                 from 'App/stores/DataImporter';
import XlsExporter                                  from 'App/stores/XlsExporter';
import {reScope, Store, scopeToProps, propsToScope} from "rscopes";
import {withStateMap, asRef, asStore}               from "rescope-spells";
import ImportIcon                                   from '@material-ui/icons/CloudUploadOutlined';
import ExportIcon                                   from '@material-ui/icons/Delete';
import RefreshIcon                                  from '@material-ui/icons/Refresh';
import IconButton                                   from '@material-ui/core/IconButton';

if ( typeof window !== "undefined" )
	require('react-dropzone-component/styles/filepicker.css');

@scopeToProps("Places")
class PlaceRenderer extends React.Component {
	state = {
		edit: false
	}
	
	render() {
		let { value, data, rowIndex, $actions, Places, api } = this.props;
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

@scopeToProps("EventCategory")
class StyleRenderer extends React.Component {
	state = {
		edit: false
	}
	
	render() {
		let { value, data, EventCategory, api, $actions } = this.props;
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
			                            api.updateRowData(data);
			                            $actions.checkValidity();
		                            }) }
		                            options={ EventCategory && EventCategory.items.map(row => ({
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

@reScope(
	{
		XlsDataProvider,
		
		@withStateMap(
			{
				collection: 'Place',
				query     : {},
				updateQueries() {
					return { query: {} }
				}
			}
		)
		Places: MongoQuery,
		
		@withStateMap(
			{
				collection: 'EventCategory',
				query     : {},
				updateQueries() {
					return { query: {} }
				}
			}
		)
		EventCategory: MongoQuery,
		
		@asStore
		allQueries: {
			@asRef
			lieu: "!Places.items",
			
			@asRef
			style: "!EventCategory.items"
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
		MamaXls: MamaConverter,
		
		@withStateMap(
			{
				@asRef
				items      : "MamaXls.items",
				importerUrl: "/importer",
				deleteUrl  : "/delete",
			}
		)
		Importer: DataImporter,
		
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
		Exporter: XlsExporter,
		
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
			    date     : types.string,
			    groupe   : types.string,
			    lieu     : {
				    "type"  : "string",
				    renderer: reScope($scope)(PlaceRenderer),
				    sanitize: ( v ) => (v && ('' + v).trim())
			    },
			    style    : {
				    "type"  : "string",
				    renderer: reScope($scope)(StyleRenderer),
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
					{ !Importer.imported && MamaXls.valid &&
					<IconButton onClick={ e => $actions.doDbImport() } title={ "Upload to server" }>
						<ImportIcon/>
					</IconButton> }
					{ Importer.imported &&
					<IconButton onClick={ e => $actions.doDbDelete() } title={ "Delete imported" }>
						<ExportIcon/>
					</IconButton> }
					<IconButton onClick={ e => $actions.updateQueries() } title={ "Update styles & places" }>
						<RefreshIcon/>
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