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
				rowData   : np.data.items
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

