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

import { GridLayer as LeafletGridLayer } from 'leaflet'

import MapLayer from './MapLayer'
import type { GridLayerProps } from './types'

export default class GridLayer<
  LeafletElement: LeafletGridLayer,
  Props: GridLayerProps,
> extends MapLayer<LeafletElement, Props> {
  createLeafletElement(props: Props): LeafletElement {
    return new LeafletGridLayer(this.getOptions(props))
  }

  updateLeafletElement(fromProps: Props, toProps: Props) {
    const { opacity, zIndex } = toProps
    if (opacity !== fromProps.opacity) {
      this.leafletElement.setOpacity(opacity)
    }
    if (zIndex !== fromProps.zIndex) {
      this.leafletElement.setZIndex(zIndex)
    }
  }

  getOptions(props: Props): Props {
    const options = super.getOptions(props)
    return props.leaflet.map == null
      ? options
      : // $FlowFixMe: object spread type
        {
          maxZoom: props.leaflet.map.options.maxZoom,
          minZoom: props.leaflet.map.options.minZoom,
          ...options,
        }
  }

  render() {
    return null
  }
}
