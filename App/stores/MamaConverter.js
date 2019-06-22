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
						let rstyle    = new RegExp("(?:\\s|^)" + row.style.replace(/[^\w]/g, '.') + "(?:\\s.*|$)", 'i');
						let rplace    = new RegExp("(?:\\s|^)" + row.lieu.replace(/[^\w]/g, '.') + "(?:\\s.*|$)", 'i');
						
						let lieu  = mustMatch.Places.items.find(place => rplace.test(place.label)),
						    style = mustMatch.EventCategories.items.find(style => rstyle.test(style.name));
						
						row.validPlace  = !!lieu;
						row.validStyle  = !!style;
						row.valid       = !!style && !!lieu;
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