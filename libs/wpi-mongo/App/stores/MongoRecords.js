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

import {types, get}                                          from 'App/db';
import {clearWatchers, getRecordsFromIdKeys, updateWatchers} from "./DataProvider";


export default class MongoRecords extends Store {
	static state = {};
	//data         = {
	//	results: {},
	//
	//};
	
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
		
		updateWatchers(this, this.scope.DataProvider, this.state, this.state)
	}
	
	shouldApply( changes ) {
		let DataProvider = this.scope.DataProvider,
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
		let DataProvider = this.scope.DataProvider,
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