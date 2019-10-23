/*
 * Copyright (C) 2019 Nathanael Braun
 * All rights reserved
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
import scopes               from 'App/scopes/(*).js';
import {Views}              from 'App/ui';
import moment               from "moment";
import React                from "react";
import RS, {asRef, asStore} from "react-scopes";

let isBrowser = false;

if ( typeof window !== "undefined" ) {
	isBrowser      = true;
	var LeafletCss = require('leaflet/dist/leaflet.css');
	var Leaflet    = require('leaflet');
	var {
		    LayerGroup, Map, Popup, Marker, GeoJSON,
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


@RS(
	{
		
		...scopes.EventList,
		@asStore
		Events: {
			@asRef
			selected    : "Selected.record",
			@asRef
			MountedItems: "!EventList",
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
				);
				
				if ( selected && POIs[0] ) {
					center = {
						latitude : POIs[0].geoPoint[1],
						longitude: POIs[0].geoPoint[0]
					};
					zoom   = POIs[0].zoom || 16
				}
				else {
					center = {
						latitude : "43.608091",
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
@RS.fromProps(
	[
		"day:DayEventsQuery.curDay",
		"viewType:DayEventsQuery.viewType"
	])
@RS.connect("Selected", "Styles", "TagManager", "Events", "UserGeoLocation", "DataProvider", "Quartiers")
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
					                 .subtract([0, 50]),
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
			    Events,
			    TagManager, day,
			    Events: { center = {}, POIs = [], zoom } = {},
			    Styles: { HomePage }, UserGeoLocation, Selected,
			    $actions, DataProvider, Quartiers, style
		    }           = this.props,
		    map         = this.refs.map && this.refs.map.leafletElement,
		    selectedPOI = Selected.Event && Selected.Event.place && DataProvider[Selected.Event.place.objId],
		    selectedPos = selectedPOI && (selectedPOI.address.geoPoint
			    &&
			    [...selectedPOI.address.geoPoint].reverse()
			    || selectedPOI.address);
		
		if ( map && selectedPos ) {
			center = map.unproject(
				map.project(selectedPos, map.getZoom())
				   .subtract([0, 50]),
				map.getZoom()
			)
		}
		//console.log(Selected.Event)
		if ( !isBrowser || !Events )
			return <div className={"EventMap"}/>
		return (
			<div className={"EventMap"} style={style}>
				<div className={"NavTools"}>
					{moment(day).format("dddd DD mmmm")}
					{/*<span aria-label="edit" className={"newBtn button"}*/}
					{/*     onClick={$actions.toggleUserGeoLocation}>*/}
					{/*	{*/}
					{/*		UserGeoLocation.activating &&*/}
					{/*		<GpsNoFixedIcon/> ||*/}
					{/*		UserGeoLocation.active &&*/}
					{/*		<GpsFixedIcon/> ||*/}
					{/*		<GpsOffIcon/>*/}
					{/*	}*/}
					{/*</span>*/}
				</div>
				<div className={"mapContainer"} onDragStart={e => e.stopPropagation()}
				     onMouseDown={e => e.stopPropagation()} onMouseMove={e => e.stopPropagation()}>
					<Map center={center}
					     zoom={zoom}
					     className={"content"}
						//scrollWheelZoom={false}
						 animate={true}
						 useFlyTo={true}
						 ref={"map"}
						//dragging={false}
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
									key={selectedPOI._id}
									//style={ { marginBottom: '50px' } }
									offset={Leaflet.point(13, 20)}
								>
									<Views.Event.popin
										$scope={this.props.$scope}
										record={Selected.Event}
										refs={DataProvider}
										onClick={
											e => $actions.selectEvent(Selected.Event._id)
											
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
										onClick={
											e => $actions.selectEvent(event._id)
											
										}
										//icon={
										//	(Selected.Event && (Selected.Event._id === event._id)) &&
										//	Leaflet.icon.pulse({
										//		                   iconSize: [12, 12],
										//		                   color   : 'blue'
										//	                   }) || Leaflet.Marker.prototype.options.icon
										//}
										position={{ lat: geoPoint[1], lng: geoPoint[0] }} key={event._id}>
									</Marker>
							)
						}
						{
							UserGeoLocation.pos &&
							<Marker
								icon={
									Leaflet.icon.pulse({ iconSize: [12, 12], color: 'red' })
								}
								position={{ lat: UserGeoLocation.pos.latitude, lng: UserGeoLocation.pos.longitude }}/>
						}
						<GeoJSON data={Quartiers.data}
						         style={( feature, layer ) => {
							         let active = TagManager.selectedTags[feature.properties.LIBSQUART];
							
							         return {
								         weight     : 2,
								         opacity    : .5,
								         color      : 'black',
								         dashArray  : '3',
								         fillColor  : active ? "blue" : "white",
								         fillOpacity: active ? .5 : 0
							         }
						         }}
						         onMouseOver={e => {
							         e.propagatedFrom.setStyle({
								                                   //fillOpacity: .5
							                                   });
						         }}
						         onMouseOut={e => {
							         e.propagatedFrom.setStyle({
								                                   //fillOpacity: 0
							                                   });
						         }}
						         onClick={e => {
							         $actions.toggleTag(e.propagatedFrom.feature.properties.LIBSQUART)
						         }}/>
					</Map>
					
					{/*<TweenRef id={ "EventMap_Gradient" } initial={ HomePage.EventMap_Gradient }>*/}
					{/*<div className={ "GradientBottom" }/>*/}
					{/*</TweenRef>*/}
				</div>
			</div>
		);
	}
};