const wpi      = require('webpack-inherit'),
      fs       = require('fs'),
      fkill    = require('fkill'),
      rimraf   = require('rimraf'),
      chokidar = require('chokidar'),
      exec     = require('child_process').exec;

function getConfigKey( config, key ) {
	for ( let i = 0; i < config.allCfg.length; i++ )
		if ( config.allCfg[i][key] )
			return config.allCfg[i][key];
};

module.exports = function Profile( profileId ) {
	let config     = wpi.getConfig(profileId),
	    commands   = getConfigKey(config, "commands"),
	    logs       = {},
	    watchers   = {},
	    killing    = {},
	    running    = {},
	    runAfter   = {},
	    onComplete = [],
	    defered    = [],
	    nbCmd      = 0;
	
	function doDefer( fn, tm ) {
		let id;
		defered.push(id = setTimeout(tm => {
			defered = defered.filter(tmId => (tmId !== id));
			fn();
		}, tm))
	}
	
	return {
		raw: config,
		start() {
			if ( !commands )
				return console.error('No commands in this profile', profileId);
			
			for ( let cmdId in commands )
				if ( commands.hasOwnProperty(cmdId) ) {
					logs[cmdId] = logs[cmdId] || { stdout: "", stderr: "" };
					this.run(cmdId)
				}
		},
		onComplete( cb ) {
			onComplete.push(cb);
		},
		cmdLog( cmdId, text ) {
			logs[cmdId].stdout += text + "\n";
			process.stdout.write(text + "\n");
		},
		cmdErr( cmdId, text ) {
			text = "\x1b[31m" + text + "\x1b[0m\n";
			logs[cmdId].stdout += text;
			logs[cmdId].stderr += text;
			process.stdout.write(text);
		},
		stop() {
			while ( defered.length )
				clearTimeout(defered.shift());
			
			return Promise.all(Object.keys(commands).map(id => this.kill(id)));
		},
		kill( cmdId ) {
			let cmd  = running[cmdId],
			    task = commands[cmdId];
			//this.cmdLog(cmdId, 'Killing ' + ':' + profileId + '::' + cmdId);
			console.warn("Killing " + ':' + profileId + '::' + cmdId);
			killing[cmdId] = true;
			return cmd && fkill(cmd.pid, { tree: true, force: true, silent: true })
				.then(
					logs => {
						running[cmdId] = null;
						killing[cmdId] = false;
					}
				)
		},
		run( cmdId, cleared, watched, waitDone ) {
			let cmd  = running[cmdId],
			    task = commands[cmdId];
			
			if ( cmd ) {
				return this.kill(cmdId).then(e => this.run(cmdId, cleared, watched, waitDone));
			}
			
			if ( !cleared && task.clearBefore ) {
				console.warn("Clear before ", task.clearBefore);
				return rimraf(task.clearBefore, ( err, val ) => this.run(cmdId, true, watched, waitDone));
			}
			
			nbCmd++;
			if ( !waitDone && task.wait ) {
				runAfter[task.wait] = runAfter[task.wait] || [];
				runAfter[task.wait].push(cmdId);
				return;
			}
			if ( !watched && task.watch ) {
				watchers[cmdId] && watchers[cmdId].close();
				
				try {
					if ( !fs.existsSync(task.watch) )
						return doDefer(tm => this.run(cmdId, true, false, true), 3000);
					watchers[cmdId] = chokidar
						.watch(task.watch, { ignored: /(^|[\/\\])\../ })
						.on('all', ( event, path ) => {
							if ( event === 'add' ) {
								console.warn(cmdId + ": '" + task.watch + "' has been updated restarting...");
								this.run(cmdId, true, true, true);
							}
						});
					console.warn(cmdId + ": '" + task.watch + "' waiting updates...");
				} catch ( e ) {
					return doDefer(tm => this.run(cmdId, true, false, true), 1000);
				}
			}
			this.cmdLog(cmdId, 'Starting ' + ':' + profileId + '::' + cmdId);
			running[cmdId] = cmd = exec(
				task.run,
				{
					stdio: 'inherit',
					env  : {
						...process.env,
						'__WPI_PROFILE__': undefined,
						...(task.vars && { '__WPI_VARS_OVERRIDE__': JSON.stringify(task.vars) })
					}
				},
				( err ) => {
					//err && console.warn(err);
					
					//this.cmdLog(cmdId, cmdId + ": '" + task.run + "' ended ...");
					err && this.cmdErr(cmdId, cmdId + ": '" + task.run + "' ended with error : " + err);
					if ( !killing[cmdId] && task.forever ) {
						console.warn(cmdId + "' restart ...");
						doDefer(tm => this.run(cmdId, true, true, true), 1000);
					}
					else {// normal exit
						watchers[cmdId] && watchers[cmdId].close();
						
						if ( runAfter[cmdId] ) {
							while ( runAfter[cmdId].length )
								this.run(runAfter[cmdId].shift(), false, false, true);
						}
						
						nbCmd--;
						if ( !killing[cmdId] && nbCmd === 0 )
							while ( onComplete.length )
								onComplete.shift()();
					}
					running[cmdId] = null;
				}
			);
			
			cmd.stdout.on('data', txt => (this.cmdLog(cmdId, txt.toString())))
			cmd.stderr.on('data', txt => (this.cmdErr(cmdId, txt.toString())))
		}
	}
}