/*
 *
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


import config  from "App/config";
import App     from "App/index.js";
import express from "express";

export const name          = "Rendering";
export const priorityLevel = 100000;
export const service       = ( server ) => {
	server.get(
		'/',
		function ( req, res, next ) {
			App.renderSSR(
				{
					url: req.url
				},
				( err, html, nstate ) => {
					res.send(200, html)
				}
			)
		}
	);
	server.use(express.static(config.projectRoot + '/dist/www'));
};