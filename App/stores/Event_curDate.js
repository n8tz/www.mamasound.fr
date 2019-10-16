/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
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

