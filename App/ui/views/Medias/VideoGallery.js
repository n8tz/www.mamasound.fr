/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import PropTypes             from "prop-types";
import React                 from "react";
import {
	withScope, scopeToProps, propsToScope
}                            from "react-scopes";
import {Comps}               from 'App/ui';

import ReactJWPlayer from 'react-jw-player';

//@scopeToProps("appState", "Styles", "UserGeoLocation")
export default class VideoGallery extends React.Component {
	static propTypes = {};
	state            = {};
	
	componentDidMount() {
		//this.isBotListIsInViewport()
		this.watchCurrentDayFromScroll()
	}
	
	componentDidUpdate() {
		//this.scrollToSelected();
		this.watchCurrentDayFromScroll();
	}
	
	componentWillUnmount() {
		//clearTimeout(this._infinite)
		
		//let element = document.querySelector(".EventList *[aria-hidden=false] .EventNav");
		//
		//if ( element ) {
		//	this._scrollList && element.removeEventListener("scroll", this._scrollList);
		//}
	}
	
	render() {
		let {
			    record                          : { position, size } = {},
			    UserGeoLocation, appState, Styles: { HomePage },
			    $actions, style
		    }     = this.props,
		    state = this.state;
		//console.log("evt")
		return (
			<div className={ "VideoGallery" } style={ style }>
				
				<div className={ "Player" }>
					<ReactJWPlayer
						playerId='mainPlayer'
						playerScript='https://link-to-my-jw-player/script.js'
						playlist='https://link-to-my-playlist.json'
					/>
				</div>
			</div>
		);
	}
};