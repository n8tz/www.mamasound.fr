/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import React   from "react";
import GooBall from "./etc/GooBall";

const areaStyle = {
	position: "relative",
	width   : "100%",
	height  : "100%",
	overflow: "hidden",
	
	filter: "url(#goo)"
};

export default class Sample extends React.Component {
	render() {
		return <div className={"MassGoo"}
		            ref={this.root}>
			<svg style={{ position: 'absolute', width: 0, height: 0 }}>
				<filter id="goo">
					<feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="30"/>
					<feColorMatrix in="blur" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7"/>
				</filter>
			</svg>
			<div className={"description"}>
				Drag & throw the balls ( alpha demo )
			</div>
			<div style={areaStyle} className={"area"}>
				<GooBall color={"black"} defaultPosition={{ x: .5, y: .5 }}/>
				<GooBall color={"green"} defaultPosition={{ x: .75, y: .75 }}/>
				<GooBall color={"red"} defaultPosition={{ x: .25, y: .25 }}/>
				<GooBall color={"darkblue"} defaultPosition={{ x: .25, y: .75 }}/>
				<GooBall color={"lightgrey"} defaultPosition={{ x: .75, y: .25 }}/>
			</div>
		</div>;
	}
}