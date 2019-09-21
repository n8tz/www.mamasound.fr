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
import $super from "$super";

//let baseDomain = "mamasound.wiseways.me"
let baseDomain;

if ( __IS_SERVER__ ) {
	baseDomain = process.env.APP_DOMAIN;
}
else {
	baseDomain = location.host;
}
console.warn("baseDomain",baseDomain)
export default {
	STATIC_URL      : baseDomain + "/medias",//"static.mamasound.fr",
	PUBLIC_URL      : "mamasound.fr",
	ROOT_DOMAIN     : baseDomain,
	UPLOAD_URL      : baseDomain + "/upload",
	MEDIA_URL       : baseDomain + "/medias",
	ALT_MEDIA_URL   : "http://static.mamasound.fr/",
	UPLOAD_DIR      : "./upload",
	SESSION_CHECK_TM: 60000,
	...$super
};