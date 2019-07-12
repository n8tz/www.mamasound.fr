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


import config from "App/config";
import App    from "App/index.js";

const fs          = require('fs'),
      path        = require('path'),
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
	let publicFiles = express.static(process.cwd() + '/dist'),
	    adminFiles  = express.static(process.cwd() + '/dist.admin');
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
	server.use(
		( req, res, next ) => {
			if ( !(req.user && req.user.isAdmin) )
				return publicFiles(req, res, next);
			return adminFiles(req, res, next);
		}
	);
	
	server.use(express.static(process.cwd() + '/static'));
	server.use("/medias", express.static(path.join(process.cwd(), config.UPLOAD_DIR)));
	server.use("/medias", ( req, res, next ) => {
		
		res.redirect(config.ALT_MEDIA_URL + req.url);
		
	});
	server.use("/assets/static", express.static(process.cwd() + '/App/ui/assets/static'));
	
}
;
