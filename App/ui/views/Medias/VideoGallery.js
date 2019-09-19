/*
 * www.mamasound.fr
 * Copyright (C) 2019 Nathanael Braun
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
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