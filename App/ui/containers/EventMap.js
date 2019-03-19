/*
 * The MIT License (MIT)
 * Copyright (c) 2019. Wise Wild Web
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  @author : Nathanael Braun
 *  @contact : n8tz.js@gmail.com
 */
import PropTypes                             from "prop-types";
import React                                 from "react";
import {Rnd}                                 from "react-rnd";
import {reScope, scopeToProps, propsToScope} from "rscopes";
import geolib                                from 'geolib';
import moment                                from 'moment';
import IconButton                            from '@material-ui/core/IconButton';
import {withStateMap, asRef, asStore}        from "rescope-spells";
//import React, {Component} from "react";

import Fab            from '@material-ui/core/Fab';
import GpsNoFixedIcon from '@material-ui/icons/GpsNotFixed';
import GpsFixedIcon   from '@material-ui/icons/GpsFixed';
import GpsOffIcon     from '@material-ui/icons/GpsOff';


import stores                from 'App/stores/(*).js';
import Comps                 from 'App/ui/components/(*).js';
import {asTweener, TweenRef} from "react-rtween";

import anims from 'App/ui/anims/(*).js';


if ( typeof window !== "undefined" ) {
	
	var LeafletCss = require('leaflet/dist/leaflet.css');
	var Leaflet    = require('leaflet');
	var {
		    LayerGroup, Map, Popup, Marker,
		    Rectangle, TileLayer, ZoomControl
	    }          = require("react-leaflet");
	
	var LeafletPulseIcon     = require('leaflet-pulse-icon/src/L.Icon.Pulse');
	var LeafletPulseIcon_css = require('leaflet-pulse-icon/src/L.Icon.Pulse.css');

// fix webpack messing with leaflet markers icon
	Leaflet.Icon.Default.imagePath = '.';
	Leaflet.Icon.Default.mergeOptions({
		                                  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
		                                  iconUrl      : require('leaflet/dist/images/marker-icon.png'),
		                                  shadowUrl    : require('leaflet/dist/images/marker-shadow.png'),
	                                  });
	
	Leaflet.Marker.prototype.options.icon = Leaflet.icon({
		                                                     iconRetinaUrl: require(
			                                                     'leaflet/dist/images/marker-icon-2x.png'),
		                                                     iconUrl      : require('leaflet/dist/images/marker-icon.png'),
		                                                     shadowUrl    : require(
			                                                     'leaflet/dist/images/marker-shadow.png'),
	                                                     });
}

@reScope(
	{
		
		@asStore
		Events: {
			@asRef
			MountedItems: "EventList",
			$apply( d, { MountedItems: { items, refs } } ) {
				let POIs = [], center;
				items && items.forEach(
					event => {
						let place = refs[event.place.objId];
						place && place.address && place.address.geoPoint && POIs.push({
							                                                              geoPoint: place.address.geoPoint,
							                                                              event,
							                                                              place
						                                                              });
						
					}
				)
				center = {
					latitude : "43.618091",
					longitude: "3.876624"
				};//POIs.length && geolib.getCenter(POIs.map(poi => poi.geoPoint)) ||
				
				return {
					items,
					refs,
					POIs,
					center: {
						lat: center.latitude,
						lng: center.longitude
					}
				}
			}
			
		},
		
	}
)
@scopeToProps("Events", "UserGeoLocation")
@asTweener({ initialScrollPos: { scrollX: 100, scrollY: 100 } })
export default class EventMap extends React.Component {
	static propTypes = {};
	state            = {};
	
	render() {
		let {
			    Events: { center = {}, POIs = [] } = {},
			    Events, UserGeoLocation, disabled,
			    $actions, onSelect, selected
		    }     = this.props,
		    state = this.state;
		return (
			<div
				className={ "EventMap container" }
			>
				<Map center={ center } zoom={ 13 }>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					/>
					
					{
						POIs.map(
							( { geoPoint, event } ) =>
								<Marker position={ { lat: geoPoint[1], lng: geoPoint[0] } } key={ event._id }>
									<Popup>{ event.title }</Popup>
								</Marker>
						)
					}
					{
						UserGeoLocation.pos &&
						<Marker
							icon={
								Leaflet.icon.pulse({ iconSize: [12, 12], color: 'red' })
							}
							position={ { lat: UserGeoLocation.pos.latitude, lng: UserGeoLocation.pos.longitude } }/>
					}
				</Map>
				<div
					className={ "EventMapTools" }
				>
					
					<Fab aria-label="edit" className={ "newBtn button" }
					     onClick={ $actions.toggleUserGeoLocation }>
						{
							UserGeoLocation.activating &&
							<GpsNoFixedIcon/> ||
							<GpsOffIcon/>
						}
					
					</Fab>
				</div>
			</div>
		);
	}
};