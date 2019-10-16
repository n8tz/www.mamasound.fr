/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import debounce from "debounce";
import React    from "react";
import anims    from "./anims/(*)/anims.js";
import Slider   from "./etc/Slider";

export default class ResponsiveSlidable extends React.Component {
	state = {
		responsiveMode: "landscape"
	};
	
	//
	componentWillMount() {
		this._applyResponsive()
	}
	
	componentDidMount() {
		window.addEventListener(
			"resize",
			this._applyResponsive);
	}
	
	componentWillUnmount() {
		window.removeEventListener(
			"resize",
			this._applyResponsive);
	}
	
	_applyResponsive = debounce(() => {
		let width          = window.innerWidth,
		    height         = window.innerHeight,
		    responsiveMode = "landscape";
		
		if ( width < height )
			responsiveMode = "portrait"
		console.log(width, height, responsiveMode)
		this.setState({ responsiveMode })
	}, 10)
	
	componentDidScroll( pos, axe ) {
		this.forceUpdate();// force update to show scroll pos
	}
	
	render() {
		const responsiveMode = this.state.responsiveMode;
		return <div className={"ResponsiveSlidable"} style={{
			width : "100%",
			height: "100%"
		}}>
			<Slider {...anims[responsiveMode]}>
				<div className={"item"} style={{ backgroundImage: "url(https://source.unsplash.com/600x400/?logo)" }}>
					1
				</div>
				<div className={"item"} style={{ backgroundImage: "url(https://source.unsplash.com/600x400/?bridge)" }}>
					2
				</div>
				<div className={"item"} style={{ backgroundImage: "url(https://source.unsplash.com/600x400/?sky)" }}>
					3
				</div>
				<div className={"item"} style={{ backgroundImage: "url(https://source.unsplash.com/600x400/?cat)" }}>
					4
				</div>
				<div className={"item"} style={{ backgroundImage: "url(https://source.unsplash.com/600x400/?beer)" }}>
					5
				</div>
				<div className={"item"} style={{ backgroundImage: "url(https://source.unsplash.com/600x400/?dog)" }}>
					6
				</div>
			</Slider>
		</div>;
	}
}