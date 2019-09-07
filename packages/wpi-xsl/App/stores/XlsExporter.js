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