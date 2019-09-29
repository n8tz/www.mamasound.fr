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

/**
 * @author Nathanael BRAUN
 *
 * Date: 13/03/2017
 * Time: 10:33
 */


var path        = require('path'),
    fs          = require('fs'),
    PoolScope   = global.dbConnectPool = global.dbConnectPool || (global.dbConnectPool = {}),
    debounce    = require('debounce'),
    MongoClient = require('mongodb').MongoClient;

let cfg = {
	DB_TASK_RELEASE_TM: 1000 * 30, //30 sec : max db task time
	DB_REPORT_TM      : 1000 * 3,//30s
	MAX_MONGO_THREAD  : 30,// max concurrent mongo db active links
	DB_URL            : process.env.MONGO_URI||"mongodb://localhost:27017",
	DB_NAME           : 'mamasound_fr'
}

const MAX_MONGO_THREAD = cfg.MAX_MONGO_THREAD || 10;


console.info(cfg);

let connect = MongoClient.connect;
// MongoClient.connect = function () {
//     console.warn("Please use ");
//     console.trace();
//     return connect.apply(this, arguments);
// }
let __nowKillingLinks,
    autoKill       = debounce(
	    () => {
		    let free = PoolScope.freeThreads.length;
		    if ( free && (free == PoolScope.cCount) ) {
			    console.log(" No activity cleaning the pool... ( %d links )", PoolScope.cCount);
			    __nowKillingLinks = true;
			    PoolScope.connectByThread.forEach(c => (c.letKill = true, c.close()));
			    __nowKillingLinks         = false;
			    PoolScope.connectByThread = [];
			    PoolScope.tmByThreads     = [];
			    PoolScope.freeThreads     = [];
			    PoolScope.delayedTasks    = [];
			    PoolScope.cCount          = 0;
			
			    // pool is now sleeping (free cli)
			
		    }
	    }, 5000
    ),
    lastReport     = 0,
    lastTotalTasks = 0,
    lastReportTm   = 0,
    stats          = () => {
	    let free = PoolScope.freeThreads.length, op;
	    lastReportTm && clearTimeout(lastReportTm);
	    if ( lastReport < (Date.now() - cfg.DB_REPORT_TM) ) {
		    op = ((Date.now() - cfg.DB_REPORT_TM) - lastReport) / 1000;
		
		    console.log(" %d\tactive links\t ~%d\tt/sec", PoolScope.cCount - free, (~~(lastTotalTasks / op * 10)) / 10);
		    lastTotalTasks = 0;
		    lastReport     = Date.now();
		    if ( !lastTotalTasks )
			    autoKill();
	    }
	    if ( lastTotalTasks ) lastReportTm = setTimeout(stats, 1000);
    };

let runTask     = function ( task, tid ) {
	    PoolScope.tmByThreads[tid] = setTimeout(taskChecker.bind(this, task, tid), cfg.DB_TASK_RELEASE_TM);
	    lastTotalTasks++;
	    // console.info("exec task on ", tid);
	    try {
		    task(PoolScope.connectByThread[tid], taskDone.bind(this, task, tid));
	    } catch ( e ) {
		    console.error("Db pool fail", e)
	    }
    },
    taskDone    = function ( prev_task, tid ) {
	    let task;
	    // console.info("task done on ", tid);
	    stats();
	    if ( PoolScope.tmByThreads[tid] ) {
		    clearTimeout(PoolScope.tmByThreads[tid]);
		    PoolScope.tmByThreads[tid] = null;
	    }
	    if ( PoolScope.delayedTasks.length ) {
		    task = PoolScope.delayedTasks.shift();
		    runTask(task, tid);
	    }
	    else {
		    PoolScope.freeThreads.push(tid);
		
	    }
    }
	,
	taskChecker = function ( task, tid ) {
		PoolScope.tmByThreads[tid] = null;
		console.error("A task has'nt finished.. free db connect on ", tid, task.originStack);
		PoolScope.freeThreads.push(tid);
		stats();
	}
	,
	getLink     = function ( cb ) {
		connect.call(
			MongoClient,
			cfg.DB_URL,
			cb
		)
	};


if ( !PoolScope.connectByThread ) {
	console.log('Init db pool');
	PoolScope.connectByThread = [];
	PoolScope.tmByThreads     = [];
	PoolScope.freeThreads     = [];
	PoolScope.stackByThread   = [];
	PoolScope.delayedTasks    = [];
	PoolScope.cCount          = 0;
}
else {
	console.log('Restore db pool');
	stats();
}

export function pushDbTask( task ) {
	let tid;
	// console
	try {
		// task = function(){
		//     return task(...arguments)
		// };
		task.originStack = (new Error()).stack;
	} catch ( e ) {
		console.error("WTF !!!!!", e);
	}
	
	if ( !PoolScope.freeThreads.length ) {
		
		if ( PoolScope.cCount < MAX_MONGO_THREAD ) {
			tid = ++PoolScope.cCount;
			return getLink(( err, db ) => {
				if ( err ) {
					console.error("Fail getting new db connect !!!!!", err);
					PoolScope.delayedTasks.push(task);
					return;
				}
				
				PoolScope.connectByThread[tid] = db;
				
				db.on('close', function onClose() {
					!db.letKill && (function reco( tries ) {
						console.error('Lost db socket %d, try to reconnect... (%d)', tid, tries || 0);
						getLink(
							( err, db2 ) => {
								if ( err ) {
									setTimeout(
										() => reco(err, tries || 1),
										1000
									);
									db2.close();
								}
								else {
									console.info("Restored db connect ", tid);
									PoolScope.connectByThread[tid] = db2;
									db2.on('close', onClose);
									db = db2;
								}
							}
						);
						db.close();
						// db=null;
					})()
				});
				
				
				runTask(task, tid);
			})
		}
		else {
			stats();
			PoolScope.delayedTasks.push(task);
		}
		
	}
	else {
		tid = PoolScope.freeThreads.shift();
		// tasksByThreads[tid]  = task;
		runTask(task, tid);
	}
}

export default { pushDbTask };
// if ( module.hot ) {
//     module.hot.accept("$map(ui/views)", () => {
//
//         var
//             nviews = require("$map(ui/views)");
//         Object.keys(nviews)
//             .forEach(
//                 ( k ) => {
//                     if ( views[k] != nviews[k] ) {
//                         console.log("update " + k)
//
//                         RegisterView(k, nviews[k])
//                     }
//                 }
//             );
//
//         __CAIPI_ROOT__.forceFullUpdate();
//         return nviews;
//     });
// }
