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


import App              from "App/index.js";
import {renderToString} from "react-dom/server";

const wpiConf     = require('App/.wpiConfig.json'),
      fs          = require('fs'),
      express     = require('express'),
      tpl         = require('../index.html.tpl'),
      compression = require('compression'),
      device      = require('express-device'),
      compressor  = compression();

export const name          = "Rendering";
export const priorityLevel = 100000;

export function service( server ) {
	//
	//if ( process.env.NODE_ENV === 'production' ) {
	//	let creds = JSON.parse(fs.readFileSync(process.cwd() + '/creds.json'));
	//	server.use(basicAuth(creds.user, creds.pass))
	//}
	//
	
	server.use(device.capture());
	server.get(
		'/',
		function ( req, res, next ) {
			compressor(
				req, res,
				() => {
					console.warn(req.url, req.user, req.device)
					App.renderSSR(
						{
							device  : req.device.type,
							location: req.url,
							css     : fs.existsSync(process.cwd() + "/dist/App.css")
							          ? fs.readFileSync(process.cwd() + "/dist/App.css")
							          : "/* ... */",
							//state   : currentState,
							tpl
						},
						( err, html, nstate ) => {
							res.send(200, html)
						}
					)
				}
			)
		}
	);
	server.use(express.static(process.cwd() + '/dist'));
	server.use(express.static(process.cwd() + '/static'));
	server.use("/assets/static", express.static(process.cwd() + '/App/ui/assets/static'));
	
}
;
