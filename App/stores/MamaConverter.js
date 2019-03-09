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

import {Scope, Store} from "rscopes";
import moment         from "moment";

export default class MamaConverter extends Store {
	static state   = { items: [], options: [] };
	static data    = { items: [], valid: false };
	static actions = {
		checkValidity() {
			let items = this.data.items,
			    valid = items.reduce(( res, item ) => (res && item.validPlace && item.validStyle), true);
			return { valid };
		}
	};
	
	apply( d = {}, { options = [], target, mustMatch, valid, items }, { items: nextItems } ) {
		let cDay;
		if ( nextItems ) {
			options = options.reduce(
				( opt, row ) => ({ ...opt, [row.key]: row.value }),
				{}
			);
			valid   = true;
			items   = nextItems.reduce(
				( list, row, i ) => {
					if ( !row.groupe ) {
						cDay = row.heure;
					}
					else {
						row.dt        = cDay + '/' + options.year + ' ' + row.heure;
						row.dt        = row.dt.replace(/^\w+\s(.*)$/, "$1");
						row.timestamp = moment(row.dt, "DD/MM/YYYY HH[h]mm").valueOf();
						row.date      = moment(row.timestamp).format("DD/MM/YY HH[h]mm");
						let rstyle    = new RegExp(".*" + row.style.replace(/[^\w]/g, '.*') + ".*", 'i');
						let rplace    = new RegExp(".*" + row.lieu.replace(/[^\w]/g, '.*') + ".*", 'i');
						
						let lieu  = mustMatch.lieu.find(place => rplace.test(place.label)),
						    style = mustMatch.style.find(style => rstyle.test(style.name));
						
						row.validPlace  = !!lieu;
						row.validStyle  = !!style;
						row.lieuId      = lieu && lieu._id;
						row.styleId     = style && style._id || "cat_62";
						row.originIndex = i;
						valid           = valid && row.validPlace && row.validStyle;
						list.push(row);
					}
					return list;
				},
				[]
			);
			//items   = items.splice(0, 10);
			return { items, options, valid }
		}
		
		return { ...d, valid, items: items && d.items };
	}
	
}