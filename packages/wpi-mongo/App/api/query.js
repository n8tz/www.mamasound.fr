/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
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
				db.save(_cls, _id, req.body).then(data => res.json(data)).catch(err => res.json({ error: err + '' }, 500))
			else
				res.json({ error: 'Auth required' }, 500)
			
		}
	);
}