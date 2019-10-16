/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */


import $super      from "$super";
import CurrentUser from "App/stores/CurrentUser";


export default {
	...$super,
	CurrentUser: CurrentUser
}