/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import React    from "react";
import ReactDom from "react-dom";

import Samples from "./(*)/index.js"
import "./samples.scss";

class App extends React.Component {
	state = {
		current: "MassGoo"
	};
	
	render() {
		let Comp = Samples[this.state.current];
		return <div className={"app"}>
			
			<div className={"sampleLst"}>
				{
					Object.keys(Samples).map(
						key => <div onClick={e => this.setState({ current: key })} key={key}>{key}</div>
					)
				}
			</div>
			<div className={"sample"}>
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