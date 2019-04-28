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
import {reScope, scopeToProps, propsToScope} from "rscopes";
import {withStateMap, asRef, asStore}        from "rescope-spells";
import Fab                                   from '@material-ui/core/Fab';
import GpsNoFixedIcon                        from '@material-ui/icons/GpsNotFixed';
import GpsFixedIcon                          from '@material-ui/icons/GpsFixed';
import GpsOffIcon                            from '@material-ui/icons/GpsOff';
import scopes                                from 'App/scopes/(*).js';
import {asTweener, TweenRef}                 from "react-rtween";
import {Views}                               from 'App/ui';


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
		                                  //iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
		                                  iconUrl  : require('leaflet/dist/images/marker-icon.png'),
		                                  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
	                                  });
	
	Leaflet.Marker.prototype.options.icon = Leaflet.icon({
		                                                     //iconRetinaUrl: require(
		                                                     //    'leaflet/dist/images/marker-icon-2x.png'),
		                                                     iconUrl  : require('leaflet/dist/images/marker-icon.png'),
		                                                     shadowUrl: require(
			                                                     'leaflet/dist/images/marker-shadow.png'),
	                                                     });
}
else {
	let Map, Marker, TileLayer, Popup;
	Popup = Map = Marker = TileLayer = 'div'
}


@reScope(
	{
		
		...scopes.EventList,
		@asStore
		Events: {
			@asRef
			selected    : "Selected.record",
			@asRef
			MountedItems: "EventList",
			$apply( d, { MountedItems: { items, refs }, selected } ) {
				let POIs = [], center, zoom = 13;
				if ( selected ) {
					items = [selected];
				}
				
				items && items.forEach(
					event => {
						let place = event.place && refs[event.place.objId];
						place && place.address && place.address.geoPoint && POIs.push({
							                                                              geoPoint: place.address.geoPoint,
							                                                              event,
							                                                              place
						                                                              });
						
					}
				)
				
				if ( selected && POIs[0] ) {
					center = {
						latitude : POIs[0].geoPoint[1],
						longitude: POIs[0].geoPoint[0]
					};
					zoom   = 16
				}
				else {
					center = {
						latitude : "43.618091",
						longitude: "3.876624"
					};//POIs.length && geolib.getCenter(POIs.map(poi => poi.geoPoint)) ||
				}
				
				return {
					items,
					refs,
					POIs, zoom,
					center: {
						lat: center.latitude,
						lng: center.longitude
					}
				}
			}
			
		},
		
	}
)
@propsToScope(
	[
		"day:DayEventsQuery.curDay",
		"viewType:DayEventsQuery.viewType"
	])
@scopeToProps("Selected", "Anims", "Events", "UserGeoLocation", "DataProvider")
export default class EventMap extends React.Component {
	static propTypes = {};
	state            = {};
	
	render() {
		let {
			    Events: { center = {}, POIs = [], zoom } = {},
			    Anims : { MainPage }, UserGeoLocation, Selected,
			    $actions, DataProvider, selected
		    }     = this.props,
		    state = this.state;
		return (
			<div className={ "EventMap" }>
				<div className={ "maskContent " }>
					
					<Map center={ center } zoom={ zoom }
					     className={ "container" }
					     scrollWheelZoom={ false }
					     animate={ true }
					     useFlyTo={ true }
					     dragging={ false }
					>
						<TileLayer
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
						/>
						
						{
							POIs.map(
								( { geoPoint, event } ) =>
									<Marker
										//icon={
										//	(Selected.Event && (Selected.Event._id === event._id)) &&
										//	Leaflet.icon.pulse({
										//		                   iconSize: [12, 12],
										//		                   color   : 'red'
										//	                   }) || Leaflet.Icon.Default
										//}
										position={ { lat: geoPoint[1], lng: geoPoint[0] } } key={ event._id }>
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
						<LayerGroup ref="PopupsLayer">
							{
								Selected.Event && DataProvider[Selected.Event.place.objId]
								&& <Popup
									position={ [...DataProvider[Selected.Event.place.objId].address.geoPoint].reverse() }
									key={ Selected.Event.place._id }
									style={ { marginBottom: '50px' } }
									offset={ Leaflet.point(0, -25) }
								>
									<Views.Event.popin
										$scope={ this.props.$scope }
										record={ Selected.Event }
										refs={ DataProvider }
										onClose={ ( e ) => {
											//this.state.selectedMarkerIcon &&
											//this.state.selectedMarkerIcon.classList.remove("active");
											//this.setState({ selectedPOI: null, selectedMarkerIcon: null });
											
										} }
									/>
								</Popup>
								|| ''
							}
						</LayerGroup>
					</Map>
					<div
						className={ "EventMapTools" }
					>
						<Fab aria-label="edit" className={ "newBtn button" }
						     onClick={ $actions.toggleUserGeoLocation }>
							{
								UserGeoLocation.activating &&
								<GpsNoFixedIcon/> ||
								UserGeoLocation.active &&
								<GpsFixedIcon/> ||
								<GpsOffIcon/>
							}
						
						</Fab>
					</div>
					
					{/*<TweenRef id={ "EventMap_Gradient" } initial={ MainPage.EventMap_Gradient }>*/ }
					{/*<div className={ "GradientBottom" }/>*/ }
					{/*</TweenRef>*/ }
				</div>
			</div>
		);
	}
};