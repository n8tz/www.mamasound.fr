/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import React    from "react";
import ReactDom from "react-dom";
import Samples  from "react-voodoo/.samples/(*)/index.js"

import "./.samples/samples.scss";


class App extends React.Component {
	state = {
		current: "SimpleCatTest"
	};
	
	render() {
		let Comp = Samples[this.state.current];
		return <div className={"app"} style={{
			width : "100%",
			height: "100%"
		}}>
			
			<div className={"sampleLst"} style={{
				position: "absolute",
				top     : "0px",
				left    : "0px",
				width   : "200px",
				height  : "100%"
			}}>
				{
					Object.keys(Samples).map(
						key => <div onClick={e => this.setState({ current: key })} key={key}>{key}</div>
					)
				}
			</div>
			<div className={"sample"} style={{
				overflow: "hidden",
				position: "absolute",
				top     : "0px",
				left    : "200px",
				width   : "calc( 100% - 200px )",
				height  : "100%"
			}}>
				<Comp/>
			</div>
		</div>
	}
}

function renderSamples() {
	
	
	ReactDom.render(
		<App/>
		, document.getElementById('app'));
	
}

renderSamples()

if ( process.env.NODE_ENV !== 'production' && module.hot ) {
	module.hot.accept('.', renderSamples);
}