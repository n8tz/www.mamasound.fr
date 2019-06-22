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

const wpiConf = require('App/.wpiConfig'),
      path    = require("path"),
      shortid = require("shortid"),
      fs      = require("fs"),
      multer  = require('multer');

export default ( server, http ) => {
	var upload   = multer({ dest: wpiConf.projectRoot + '/upload' });
	var uploader = upload.fields([{ name: 'file', maxCount: 8 }]);
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
										    url     : "/medias/" + name,
										    mimetype: file.mimetype
									    };
									fs.rename(
										file.path,
										path.join(wpiConf.projectRoot, "public", name),
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