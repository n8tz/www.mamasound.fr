/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import {Comps} from 'App/ui';
import React   from "react";

export default class Background extends React.Component {
	static propTypes = {};
	state            = {};
	
	render() {
		let {
			    record = {}, style
		    }     = this.props,
		    state = this.state;
		//debugger
		return (
			<div style={style}
			     className={"Background"}>
				{
					record.mainBackground &&
					<div className="background">
						<Comps.Image src={record.mainBackground} className={"leftGhost"} h={800}/>
						<Comps.Image src={record.mainBackground} className={"rightGhost"} h={800}/>
						<Comps.Image src={record.mainBackground} h={800}/>
					</div>
					
				}
			</div>
		);
	}
};