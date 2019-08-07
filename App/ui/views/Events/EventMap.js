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
import PropTypes                             from "prop-types";
import React                                 from "react";
import {reScope, scopeToProps, propsToScope} from "react-scopes";
import {withStateMap, asRef, asStore}        from "rescope-spells";
import scopes                                from 'App/scopes/(*).js';
import {asTweener, TweenRef}                 from "react-voodoo";
import {Views}                               from 'App/ui';

let isBrowser = false;

if ( typeof window !== "undefined" ) {
	isBrowser      = true;
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
		                                                     ...Leaflet.Marker.prototype.options.icon,
		                                                     //iconSize:     [16, 24],
		                                                     ////shadowSize:   [50, 64],
		                                                     //iconAnchor:   [0, 40],
		                                                     //shadowAnchor: [4, 0],
		                                                     //popupAnchor:  [-3, -76],
		                                                     //iconRetinaUrl: require(
		                                                     //    'leaflet/dist/images/marker-icon-2x.png'),
		                                                     iconUrl  : require('leaflet/dist/images/marker-icon.png'),
		                                                     shadowUrl: require(
			                                                     'leaflet/dist/images/marker-shadow.png'),
	                                                     });
}
else {
	let Map, Marker, TileLayer, Popup, LayerGroup;
	Popup = Map = Marker = TileLayer = LayerGroup = 'div'
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
	
	onPoiClicked = ( e ) => {
		let {
			    appParams: { poiClickMinZoom },
		    }          = this.props,
		    map        = this.refs.map && this.refs.map.leafletElement,
		    poi        = e.target.options.poi,
		    targetZoom = poiClickMinZoom >= map.getZoom() ? 6 : map.getZoom();
		
		if ( this.state.selectedPOI === poi )
			return this.setState({ selectedPOI: null, selectedMarkerIcon: null });
		
		this.setState({
			              selectedPOI       : null,
			              selectedMarkerIcon: null
		              },
		              s => {
			              let wasFired,
			                  panningDone = e => {
				                  if ( wasFired )
					                  return;
				                  wasFired = true;
				                  this.setState({
					                                selectedPOI       : poi,
					                                selectedMarkerIcon: map._icon
				                                });
				                  map && this.props.$actions.updateHashPassive({ cBBox: map.getBounds().toBBoxString() })
				                  this.props.$stores.bboxInfos.setState(
					                  {
						                  bbox       : map.getBounds().toBBoxString(),
						                  zoom       : map.getZoom(),
						                  selectedPOI: this.state.selectedPOI
					                  })
			                  };
			
			              e.target._icon.classList.add('active');
			              map.setView(
				              map.unproject(
					              map.project(poi, targetZoom)
					                 .subtract([0, 150]),
					              targetZoom
				              ),
				              targetZoom, { animate: true, duration: .25 }
			              ).once('moveend',// not triggered if no panning is done
			                     panningDone
			              ); // zoom
			              setTimeout(panningDone, 300)
		              }
		);
	};
	
	render() {
		let {
			    Events: { center = {}, POIs = [], zoom } = {},
			    Anims : { MainPage }, UserGeoLocation, Selected,
			    $actions, DataProvider, style
		    }           = this.props,
		    map         = this.refs.map && this.refs.map.leafletElement,
		    selectedPOI = Selected.Page && Selected.Page.place && DataProvider[Selected.Page.place.objId],
		    selectedPos = selectedPOI && (selectedPOI.address.geoPoint
			    &&
			    [...selectedPOI.address.geoPoint].reverse()
			    || selectedPOI.address);
		
		if ( map && selectedPos ) {
			center = map.unproject(
				map.project(selectedPos, map.getZoom())
				   .subtract([0, 125]),
				map.getZoom()
			)
		}
		if ( !isBrowser )
			return <div className={ "EventMap" }/>
		return (
			<div className={ "EventMap" } style={ style }>
				<div className={ "maskContent " }>
					
					<Map center={ center }
					     zoom={ zoom }
					     className={ "container" }
					     scrollWheelZoom={ false }
					     animate={ true }
					     useFlyTo={ true }
					     ref={ "map" }
					     dragging={ false }
					>
						<TileLayer
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
						/>
						
						<LayerGroup ref="PopupsLayer">
							{
								selectedPOI
								&& <Popup
									position={
										selectedPOI.address.geoPoint
										&&
										[...selectedPOI.address.geoPoint].reverse()
										|| selectedPOI.address
									}
									key={ Selected.Page.place._id }
									//style={ { marginBottom: '50px' } }
									offset={ Leaflet.point(13, 20) }
								>
									<Views.Event.popin
										$scope={ this.props.$scope }
										record={ Selected.Page }
										refs={ DataProvider }
										onClick={
											e => $actions.selectPage(Selected.Page._id)
											
										}
									/>
								</Popup>
								|| ''
							}
						</LayerGroup>
						{
							POIs.map(
								( { geoPoint, event } ) =>
									<Marker
										//icon={
										//	(Selected.Event && (Selected.Event._id === event._id)) &&
										//	Leaflet.icon.pulse({
										//		                   iconSize: [12, 12],
										//		                   color   : 'blue'
										//	                   }) || Leaflet.Marker.prototype.options.icon
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
					</Map>
					
					{/*<TweenRef id={ "EventMap_Gradient" } initial={ MainPage.EventMap_Gradient }>*/ }
					{/*<div className={ "GradientBottom" }/>*/ }
					{/*</TweenRef>*/ }
				</div>
			</div>
		);
	}
};