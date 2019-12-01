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
					record.backgroundMode &&
					record.backgroundMode !== "back_hidden" &&
					<div className="background">
						{(record.backgroundColor) &&
						<div className={"backColor"}
						     style={{ backgroundColor: record.backgroundColor || 'transparent' }}/>}
						{record.backgroundMode === "big_wghost" && <>
							<Comps.Image src={record.mainBackground} className={"leftGhost"}/>
							<Comps.Image src={record.mainBackground} className={"rightGhost"}/>
						</>}
						<Comps.Image src={record.mainBackground}/>
					</div>
					
				}
			</div>
		);
	}
};