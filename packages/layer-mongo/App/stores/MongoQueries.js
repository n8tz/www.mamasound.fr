/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import {Store}                         from "react-scopes";
import {clearWatchers, updateWatchers} from './DataProvider';


export default class MongoQueries extends Store {
	static state = {};
	
	constructor() {
		super(...arguments);
		let scope = this.scope, _dataProviderPath = "DataProvider.";
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
				dataRefs: Object.keys(this.__queryWatchers)
				                .reduce(
					                ( h, k ) => {
						                h[k] = this._dataProviderPath + this.__queryWatchers[k].key;
						                return h;
					                },
					                {}
				                )
			},
			output);
		
	}
	
	restore( snapshot, immediate ) {
		
		super.restore(snapshot, immediate);
		
		updateWatchers(this, this._dataProvider, this.nextState, this.nextState, true)
	}
	
	shouldApply( changes ) {
		let DataProvider = this._dataProvider,
		    hasChanges, update,
		    curState     = this.nextState;
		
		if ( !DataProvider )
			throw new Error("No DataProvider found !!");
		
		if ( updateWatchers(this, DataProvider, curState, changes, true) ) {
			
			// initial & instant update
			//update     = getQueriesFromIdKeys(
			//	DataProvider, curState, changes, true
			//);
			//hasChanges = false;
			//Object.keys(update)
			//      .forEach(
			//	      key => (hasChanges = hasChanges || (update[key] !== changes[key]))
			//      );
			//hasChanges && this.setState(update);
		}
		
		
		return false;//super.shouldApply(...arguments);
	}
	
	destroy() {
		let DataProvider = this._dataProvider,
		    curState     = this.state;
		
		// stop watching the injected records
		// (auto delete will clean it if the resource is no used anymore)
		clearWatchers(this, DataProvider, curState, true);
		
		super.destroy();
	}
	
}