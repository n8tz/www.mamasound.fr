/*
 *
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

import {asFieldType} from "App/ui/spells";
import React         from "react";
import Geosuggest    from "react-geosuggest";

if ( typeof window !== "undefined" ) {
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
@asFieldType
export default class GeoPoint extends React.Component {
	static displayName = "GeoPoint";
	
	constructor( props ) {
		super(props);
		
		var loc = this.props.defaultValue || this.props.value ||
			{ lat: 59.938043, lng: 30.337157, geoPoint: [43.608091, 3.876624] };
		
		
		if ( loc.geoPoint ) {
			loc.lat = loc.geoPoint[1];
			loc.lng = loc.geoPoint[0];
		}
		
		// debugger;
		this.state = {
			zoom : 9,
			value: loc
		};
	}
	
	stopEvent = () => {
		//e.stopPropagation()
	}
	
	onNameChange = ( v ) => {
		this.setState({ value: { ...this.state.value, name: v.target.value } },
		              s => {
			
			              this.props.onChange
			              && this.props.onChange({
				                                     target: {
					                                     name : this.props.name,
					                                     value: this.state.value
				                                     }
			                                     });
		              });
	}
	
	onSuggestSelect = ( v ) => {
		this.setState({
			              // name    : this.state.name,
			              // address : v.label,
			              value: {
				              ...v.location,
				              zoom    : 14,//this.state.zoom,
				              name    : this.state.value.name,
				              address : v.label,
				              geoPoint: [v.location.lng, v.location.lat]
			              }
		              },
		              s => {
			
			              this.props.onChange
			              && this.props.onChange({
				                                     target: {
					                                     name : this.props.name,
					                                     value: this.state.value
				                                     }
			                                     });
		              }
		)
	}
	
	render() {
		let { defaultValue, value = defaultValue, UserGeoLocation } = this.props, coords = this.state.value;
		
		let center = [43.608091, 3.876624];
		return (
			<div className={"content"}>
				<div className={"searchContainer "}>
					
					<input type="text" onChange={this.onNameChange} placeholder='Label' className="mapLabel"
					       mode="compact"
					       defaultValue={coords.name}/>
					<Geosuggest
						onSuggestSelect={this.onSuggestSelect}
						radius="50"
						type="text"
						location={new google.maps.LatLng(coords.geoPoint[1], coords.geoPoint[0])}
						placeholder='Adresse'
						initialValue={coords.address}/>
				</div>
				<div className={"mapContainer "} onDragStart={this.stopEvent}>
					<Map center={[coords.geoPoint[1], coords.geoPoint[0]]}
					     zoom={coords.zoom}
						//className={"container"}
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
						{
							coords &&
							<Marker
								icon={
									Leaflet.icon.pulse({ iconSize: [12, 12], color: 'red' })
								}
								position={{ lat: coords.geoPoint[1], lng: coords.geoPoint[0] }}/>
						}
						{/*<LayerGroup ref="PopupsLayer">*/}
						{/*</LayerGroup>*/}
					
					</Map>
				</div>
			</div>
		);
	}
}
;
