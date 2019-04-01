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