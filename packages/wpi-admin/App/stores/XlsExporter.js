/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import {Scope, Store} from "react-scopes";

import XLSX       from "xlsx";
import camelCase  from "camelcase";
import shortId    from "shortid";

var fileDownload = require('js-file-download');
import superagent from "superagent";

/* generate a download */
function s2ab( s ) {
	var buf  = new ArrayBuffer(s.length);
	var view = new Uint8Array(buf);
	for ( var i = 0; i != s.length; ++i ) view[i] = s.charCodeAt(i) & 0xFF;
	return buf;
}

export default class XlsExporter extends Store {
	static state   = {
		items  : [],
		docName: 'export'
	};
	static actions = {
		
		exportAsXLS() {
			let { items, docName } = this.nextState;
			var wb                 = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(items), docName);
			
			fileDownload(
				new Blob([s2ab(XLSX.write(wb, {
					bookType   : 'xlsx',
					type       : 'binary',
					compression: true
				}))], { type: "application/octet-stream" })
				,
				docName + '.xlsx'
			)
			;
			
		}
	};
	
	
}