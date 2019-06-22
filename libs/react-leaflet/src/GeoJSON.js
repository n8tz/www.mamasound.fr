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

// @flow

import { GeoJSON as LeafletGeoJSON, type LatLng, type Layer } from 'leaflet'

import { withLeaflet } from './context'
import Path from './Path'
import type { PathProps } from './types'

type LeafletElement = LeafletGeoJSON

type GeoJSONdata = Object | Array<any>

type Props = {
  data: GeoJSONdata,
  pointToLayer?: (point: GeoJSONdata, latlng: LatLng) => Layer,
  style?: (feature: GeoJSONdata) => Object,
  onEachFeature?: (feature: GeoJSONdata, layer: Layer) => void,
  filter?: (feature: GeoJSONdata) => boolean,
  coordsToLatLng?: (coords: GeoJSONdata) => LatLng,
} & PathProps

class GeoJSON extends Path<LeafletElement, Props> {
  createLeafletElement(props: Props): LeafletElement {
    return new LeafletGeoJSON(props.data, this.getOptions(props))
  }

  updateLeafletElement(fromProps: Props, toProps: Props) {
    if (typeof toProps.style === 'function') {
      this.setStyle(toProps.style)
    } else {
      this.setStyleIfChanged(fromProps, toProps)
    }
  }
}

export default withLeaflet<Props, GeoJSON>(GeoJSON)
