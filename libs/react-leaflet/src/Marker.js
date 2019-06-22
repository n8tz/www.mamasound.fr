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

import { type Icon, Marker as LeafletMarker } from 'leaflet'
import React from 'react'

import { LeafletProvider, withLeaflet } from './context'
import MapLayer from './MapLayer'
import type { LatLng, MapLayerProps } from './types'

type LeafletElement = LeafletMarker
type Props = {
  icon?: Icon,
  draggable?: boolean,
  opacity?: number,
  position: LatLng,
  zIndexOffset?: number,
} & MapLayerProps

class Marker extends MapLayer<LeafletElement, Props> {
  createLeafletElement(props: Props): LeafletElement {
    const el = new LeafletMarker(props.position, this.getOptions(props))
    this.contextValue = { ...props.leaflet, popupContainer: el }
    return el
  }

  updateLeafletElement(fromProps: Props, toProps: Props) {
    if (toProps.position !== fromProps.position) {
      this.leafletElement.setLatLng(toProps.position)
    }
    if (toProps.icon !== fromProps.icon) {
      this.leafletElement.setIcon(toProps.icon)
    }
    if (toProps.zIndexOffset !== fromProps.zIndexOffset) {
      this.leafletElement.setZIndexOffset(toProps.zIndexOffset)
    }
    if (toProps.opacity !== fromProps.opacity) {
      this.leafletElement.setOpacity(toProps.opacity)
    }
    if (toProps.draggable !== fromProps.draggable) {
      if (toProps.draggable === true) {
        this.leafletElement.dragging.enable()
      } else {
        this.leafletElement.dragging.disable()
      }
    }
  }

  render() {
    const { children } = this.props
    return children == null || this.contextValue == null ? null : (
      <LeafletProvider value={this.contextValue}>{children}</LeafletProvider>
    )
  }
}

export default withLeaflet<Props, Marker>(Marker)
