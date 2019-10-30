/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
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
console.warn("baseDomain", baseDomain)
export default {
	STATIC_URL      : baseDomain + "/medias",//"static.mamasound.fr",
	PUBLIC_URL      : baseDomain,
	ROOT_DOMAIN     : baseDomain,
	UPLOAD_URL      : baseDomain + "/upload",
	MEDIA_URL       : baseDomain + "/medias",
	ALT_MEDIA_URL   : "http://mamasound.wiseways.me/medias",
	//ALT_MEDIA_URL   : "http://static.mamasound.fr/",
	UPLOAD_DIR      : "./upload",
	SESSION_CHECK_TM: 60000,
	...$super
};