/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import config from "App/config";

const path    = require("path"),
      shortid = require("shortid"),
      fs      = require("fs"),
      multer  = require('multer');

export default ( server, http ) => {
	console.log(path.normalize(path.join(process.cwd(), config.UPLOAD_DIR)));
	let upload   = multer({ dest: path.normalize(path.join(process.cwd(), config.UPLOAD_DIR)) }),
	    uploader = upload.fields([{ name: 'file', maxCount: 8 }]);
	console.log("Upload server running !");
	server.post(
		'/upload',
		uploader,
		( req, res, next ) => {
			if ( !(req.user && req.user.isAdmin) )
				return res.json({ success: false, error: "Auth required" });
			
			let results = [];
			if ( req.files.file )
				Promise.all(
					req.files.file.map(
						file =>
							new Promise(
								function ( resolve, reject ) {
									let name   = shortid.generate() + path.extname(file.originalname),
									    record = {
										    label   : file.originalname,
										    url     : name,
										    mimetype: file.mimetype
									    };
									fs.rename(
										file.path,
										path.join(config.projectRoot, config.UPLOAD_DIR, name),
										function ( e, r ) {
											if ( e ) {
												return reject(e);
											}
											results.push(record);
											resolve();
										}
									)
								})
					)
				).then(
					() => {
						console.log("Upload server done !", results);
						res.set('Content-Type', 'application/json');
						res.status(200).send(
							{
								result: results
							});
						
					}
				).catch(
					( err ) => {
						console.warn("Upload server fail !", results, err);
						res.set('Content-Type', 'application/json');
						res.status(500).send(
							{
								result: results
							});
						
					}
				)
			else
				next()
		}
	)
}