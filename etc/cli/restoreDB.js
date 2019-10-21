/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

const restore = require("mongodb-restore");
const fs      = require("fs");
const program = require('commander');

program.option('-s, --src <file>', 'Source')
       .parse(process.argv);


console.log("Using ", program.src);
const fstream = fs.createReadStream(program.src);
// Pipe it trough
//file.pipe(fstream);

restore({
	        uri     : process.env.MONGO_URI + '/mamasound_fr', // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
	        stream  : fstream, // send this stream into db
	        metadata: true,
	        tar     : true,
	        callback: function ( err ) { // callback after restore
		        console.log('done', err);
	        }
        });