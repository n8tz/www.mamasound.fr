/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import {Store}                         from "react-scopes";
import {clearWatchers, updateWatchers} from "./DataProvider";


export default class MongoRecords extends Store {
	static state = {};
	//data         = {
	//	results: {},
	//
	//};
	
	constructor() {
		super(...arguments);
		let scope = this.scope, _dataProviderPath = "DataProvider";
		while ( scope.$parent && !scope.DataProvider ) {
			scope             = scope.$parent.stores;
			_dataProviderPath = "$parent." + _dataProviderPath
		}
		this._dataProvider     = scope.DataProvider;
		this._dataProviderPath = _dataProviderPath;
	}
	
	serialize( cfg = {}, output = {} ) {
		return super.serialize(
			{
				...cfg,
				dataRefs: Object.keys(this.__recWatchers)
				                .reduce(
					                ( h, k ) => {
						                h[k] = this._dataProviderPath + "." + this.__recWatchers[k].key;
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
		
		this.$scope.restoreRefPath(this._dataProviderPath);
		updateWatchers(this, this._dataProvider, this.state, this.nextState)
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