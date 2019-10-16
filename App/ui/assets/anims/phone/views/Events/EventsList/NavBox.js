/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import {collWidth, mapHeight,footerMiniHeight} from "../../../vars";

export const typesNav       = {
	position : "absolute",
	width    : ["100%", "-" + collWidth],
	right    : "0px",
	top      : "5px",
	height   : "64px",
	transform: {
		//translateY: "85%"
	}
};
export const SearchBar      = {
	position: "absolute",
	width   : [collWidth],
	left    : "0px",
	top     : "5px",
};
export const SearchBarProps = {
	startPos     : 0,
	openDuration : 100,
	closeDuration: 100,
	minBottom    : footerMiniHeight,
	maxBottom    : mapHeight,
	minHeight    : "40px",
};