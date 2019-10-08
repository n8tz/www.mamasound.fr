/*
 *
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

'use strict';

// import APIUtils from 'App/db';


import moment from "moment";
import RS     from "react-scopes";

export default class realPeriod extends RS.Store {
	static state = { record: undefined, curDay: undefined };
	
	shouldSerialize() {
	return false;
	}
	apply( d, { record, curDay } ) {
		let start, end;
		if ( record && record.schedule && curDay ) {
			// find the right tm
			if ( record.title.includes("skull") )
				debugger
			for ( let i = 0; record.schedule.length > i; i++ ) {
				if ( curDay && record.schedule[i] && record.schedule[i].startTM && moment(curDay).isSame(record.schedule[i].startTM, "day") ) {
					start = record.schedule[i].startTM;
					end   = record.schedule[i].endTM;
					break;
				}
			}
		}
		
		return {
			startTM: start || record && record.startTM, endTM: end || record && record.endTM
		}
	}
}

