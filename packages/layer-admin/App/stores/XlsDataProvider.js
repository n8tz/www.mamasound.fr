/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import {Scope, Store} from "react-scopes";

import XLSX      from "xlsx";
import camelCase from "camelcase";
import shortId   from "shortid";

var fileDownload = require('js-file-download');


export default class XlsDataProvider extends Store {
	state          = {
		status         : "initial",
		complete       : false,
		serverVersion  : false,
		browserVersion : false,
		localVersion   : 0,
		saveLocally    : 0,
		availableTables: {},
		originInfos    : [],
		dsid           : shortId.generate(),
	};
	static actions = {
		updateName: name => ({ name }),
		
		addXLSfile( file, cb ) {
			var reader = new FileReader();
			
			this.wait();// keep me unstable
			
			reader.onload = ( e ) => {
				
				// now check & parse xls
				let xls     = XLSX.read(
					e.target.result,
					{
						type: 'binary'
					}),
				    headers = {}, key;
				
				this.$actions.addDataTable(
					Object.keys(xls.Sheets)
					      .reduce(
						      ( h, k ) => (
							      key = k.replace(/^\s*([^\s]+)\s*$/ig, '$1').toUpperCase(),
								      headers[key] = this.getCamelCaseHeader(xls.Sheets[k], k),
								      h[key] = XLSX.utils.sheet_to_json(
									      xls.Sheets[k],
									      {
										      raw: true,
										      ...headers[key]
									      }
								      ),
								      h
						      ), {}
					      ),
					headers
				);
				this.setState({ originInfos: [{ ...xls.Props, fileName: file.name }, ...this.nextState.originInfos] })
				this.release();
				cb && cb();
			};
			setTimeout(
				() => reader.readAsBinaryString(file)
			);
		},
		
		clearXslProvider() {
			return {
				status         : "initial",
				complete       : false,
				serverVersion  : false,
				browserVersion : false,
				localVersion   : 0,
				saveLocally    : 0,
				headers        : {},
				availableTables: {},
				tablesById     : {},
				originInfos    : [],
			};
		},
		
		addDataTable( tablesById, nheaders, force ) {
			let {
				    requiredTables,
				    headers         = {},
				    availableTables = {},
				    report          = {},
				    name
			    }   = this.state;
			headers = {
				...headers,
				...nheaders
			};
			return {
				availableTables: { ...availableTables },
				headers,
				tablesById
			};
		},
		
		
	}
	
	mapColsToTable( headers ) {
		return Object
			.keys(headers)
			.reduce(
				( h, k ) => {
					headers[k]
						.header
						.forEach(
							cId => (h[cId] = [...(h[cId] || []), k])
						);
					return h;
				},
				{}
			)
	}
	
	mapIds( headers ) {
		return Object
			.keys(headers)
			.reduce(
				( h, k ) => {
					h[k] = Object
						.keys(headers)
						.reduce(
							( refs, id ) => {
								let joins = headers[k].header.filter(cid => headers[id].header.includes(cid));
								if ( id != k && joins.length ) {
									refs[id] = joins;
								}
								return refs
							},
							{}
						)
					return h;
				},
				{}
			)
	}
	
	getCamelCaseHeader( sheet, id, row = 0 ) {
		var range  = sheet['!ref'] && XLSX.utils.decode_range(sheet['!ref']),
		    header = [];
		if ( !range )
			return { range: 1, header };
		for ( var C = 0, addr, cell; C <= range.e.c; ++C ) {
			addr = XLSX.utils.encode_cell(
				{
					r: row,
					c: C
				});
			cell = sheet[addr];
			
			if ( !cell ) {
				header.length = 0;
				break;
			}
			
			header.push(
				camelCase(
					(cell.v + '').replace(/[^\w\d]/ig, ' ')
				)
			);
		}
		
		if ( (!header.length || camelCase(id) == header[0]) && row < 15 )
			return this.getCamelCaseHeader(sheet, id, row + 1);
		
		return {
			range: row + 1,
			header
		};
	}
	
}