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

import {types, get}                                          from 'App/db';
import {clearWatchers, getRecordsFromIdKeys, updateWatchers} from "./DataProvider";


export default class MongoRecords extends Store {
	static state = {};
	//data         = {
	//	results: {},
	//
	//};
	
	constructor() {
		super(...arguments);
		let scope = this.scope;
		while ( scope.$parent && !scope.DataProvider )
			scope = scope.$parent.stores;
		this._dataProvider = scope.DataProvider;
	}
	
	serialize( cfg = {}, output = {} ) {
		return super.serialize(
			{
				...cfg,
				dataRefs: Object.keys(this.__recWatchers)
				                .reduce(
					                ( h, k ) => {
						                h[k] = "DataProvider." + this.__recWatchers[k].key;
						                return h;
					                },
					                {}
				                )
			},
			output);
		
	}
	
	restore( snapshot, immediate ) {
		
		super.restore(
			snapshot, immediate);
		
		updateWatchers(this, this._dataProvider, this.state, this.state)
	}
	
	shouldApply( changes ) {
		let DataProvider = this._dataProvider,
		    hasChanges, update,
		    curState     = this.nextState;
		if ( !DataProvider )
			throw new Error("No DataProvider found !!");
		
		if ( updateWatchers(this, DataProvider, curState, changes) ) {
			//
			//// initial & instant update
			//update     = getRecordsFromIdKeys(
			//	DataProvider, curState, changes
			//);
			//hasChanges = false;
			//Object.keys(update)
			//      .forEach(
			//	      key => (hasChanges = hasChanges || (update[key] !== changes[key]))
			//      );
			//hasChanges && this.push(update);
		}
		
		
		return false;//super.shouldApply(...arguments);
	}
	
	destroy() {
		let DataProvider = this._dataProvider,
		    curState     = this.nextState;
		
		// stop watching the injected records
		// (auto delete will clean it if the resource is no used anymore)
		clearWatchers(this, DataProvider, curState);
		
		super.destroy();
	}
	
	//
	//apply( d = {}, { objId, cls, template }, {} ) {
	//	get(cls, objId)
	//		.then(result => this.push(result))
	//		.catch(e => this.push({ ...template }))
	//}
	
}