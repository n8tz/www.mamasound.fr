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
import entities from "App/db/entities";
//

const config   = require('App/config'),
      aliasAPI = require("App/db/aliasHelpers"),
      db       = require("App/db");
//multer  = require('multer');

export default ( server, http ) => {
	console.log("wpi-mongo server running ! :D");
	server.post(
		'/db/query',
		function ( req, res, next ) {
			let isAdmin = req.user && req.user.isAdmin;
			if ( entities[req.body.etty] && (!entities[req.body.etty].requireAdmin || isAdmin) )
				db.query(req.body).then(data => res.json(data)).catch(err => res.json({ error: err + '' }, 500))
			else
				res.json({ error: 'Auth required' }, 500)
		}
	);
	server.post(
		'/db/remove',
		function ( req, res, next ) {
			if ( !(req.user && req.user.isAdmin) )
				return reject("Auth required");
			db.remove(req.body).then(data => res.json(data)).catch(err => res.json({ error: err + '' }, 500))
			
		}
	);
	server.post(
		'/db/get',
		function ( req, res, next ) {
			let { objId, cls } = req.body,
			    isAdmin        = req.user && req.user.isAdmin;
			if ( entities[cls] && (!entities[cls].requireAdmin || isAdmin) )
				db.get(cls, objId).then(data => res.json(data)).catch(err => res.json({ error: err + '' }, 500))
			else
				res.json({ error: 'Auth required' }, 500)
			
		}
	);
	server.post(
		'/db/create',
		function ( req, res, next ) {
			let { _id, _cls } = req.body,
			    isAdmin       = req.user && req.user.isAdmin;
			if ( entities[_cls] && (isAdmin) )
				db.create(_cls, req.body).then(data => res.json(data)).catch(err => res.json({ error: err + '' }, 500))
			else
				res.json({ error: 'Auth required' }, 500)
			
		}
	);
	server.post(
		'/db/save',
		function ( req, res, next ) {
			let { _id, _cls } = req.body,
			    isAdmin       = req.user && req.user.isAdmin;
			if ( entities[_cls] && (isAdmin) )
				db.update(_cls, _id, req.body).then(data => res.json(data)).catch(err => res.json({ error: err + '' }, 500))
			else
				res.json({ error: 'Auth required' }, 500)
			
		}
	);
}