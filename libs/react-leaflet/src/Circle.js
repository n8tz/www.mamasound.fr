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

import { Circle as LeafletCircle } from 'leaflet'

import { withLeaflet } from './context'
import Path from './Path'
import type { LatLng, MapLayerProps, PathOptions } from './types'

type LeafletElement = LeafletCircle
type Props = {
  center: LatLng,
  radius: number,
} & MapLayerProps &
  PathOptions &
  Object

class Circle extends Path<LeafletElement, Props> {
  createLeafletElement(props: Props): LeafletElement {
    const { center, radius, ...options } = props
    return new LeafletCircle(center, radius, this.getOptions(options))
  }

  updateLeafletElement(fromProps: Props, toProps: Props) {
    if (toProps.center !== fromProps.center) {
      this.leafletElement.setLatLng(toProps.center)
    }
    if (toProps.radius !== fromProps.radius) {
      this.leafletElement.setRadius(toProps.radius)
    }
  }
}

export default withLeaflet<Props, Circle>(Circle)
