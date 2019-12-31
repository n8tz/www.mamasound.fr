/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import ReactDOM from 'react-dom';
import React    from 'react';
import is       from 'is';

import Checkbox      from '@material-ui/core/Checkbox';
import {AgGridReact} from 'ag-grid-react';
//import 'ag-grid/dist/styles/ag-grid.css';
//import 'ag-grid/dist/styles/ag-theme-blue.css';

import "ag-grid-community";

/**
 * Custom rendering cell types
 */
const CellsRenderers = {
	defaultCell: class SimpleCellRenderer extends React.Component {
		render() {
			return (
				<span className="simple-cell-renderer">{
					is.string(this.props.value) || is.number(this.props.value) ?
					this.props.value
					                                                           :
					JSON.stringify(this.props.value, null, 2)
				}</span>
			);
		}
	},
	bool       : class BoolRenderer extends React.Component {
		render() {
			return (
				<span className="checkbox-renderer" style={ { textAlign: 'center' } }>
                    <Checkbox
	                    className={ "checkbox" }
	                    checked={ !!this.props.value }
                    />
                </span>
			);
		}
	},
	float      : class FloatRenderer extends React.Component {
		render() {
			return (
				<span className="simple-cell-renderer" style={ { textAlign: 'center' } }>
                    { ~~(this.props.value * 1000) / 1000 }
                </span>
			);
		}
	}
}

/**
 * Ag grid wrapper
 */
export default class TableGrid extends React.Component {
	static defaultProps = {
		columns: [],
		keys   : [],
		schema : {},
		data   : { items: [] }
	};
	
	constructor() {
		super(...arguments);
		
		this.state = {
			columnDefs: this.createColumnDefs(),
			rowData   : this.props.data && this.props.data.items
		};
	}
	
	onGridReady = ( { columnApi } ) => {
		columnApi.autoSizeColumns()
	}
	
	componentWillReceiveProps( np ) {
		this.setState(
			{
				columnDefs: this.createColumnDefs(np),
				rowData   : np.data&&np.data.items||[]
			}
		)
	}
	
	createColumnDefs( props = this.props ) {
		const columnDefs = [];
		
		props.columns.forEach(colName => {
			colName != "dsid" &&
			columnDefs.push({
				                headerName           : colName.toUpperCase(),
				                field                : colName,    filter: true,
				                resizable            : true,
				                //rowGroup             : props.keys.includes(colName),
				                menuTabs             : ["filterMenuTab", "generalMenuTab", "columnsMenuTab"],
				                cellRendererFramework: props.schema[colName].renderer || props.schema[colName].renderType
					                && CellsRenderers[props.schema[colName].renderType]
					                || CellsRenderers.defaultCell
				                ,
				                width                : 100
			                });
		});
		
		return columnDefs;
	}
	
	render() {
		return (
			<div style={ {
				boxSizing: "border-box",
				height   : "100%",
				width    : "100%"
			} }
			     className="ag-theme-blue TableGrid">
				<AgGridReact
					animateRows
					rowBuffer={ 20 }
					rowHeight = {40}
					//enableFilter={ true }
					suppressScrollOnNewData={ true }
					alwaysShowVerticalScroll={ true }
					columnDefs={ this.state.columnDefs }
					rowData={ this.state.rowData }
					onGridReady={ this.onGridReady }
				/>
			</div>
		);
	}
};

