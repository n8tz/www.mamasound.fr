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

import { VideoOverlay as LeafletVideoOverlay, latLngBounds } from 'leaflet'

import { withLeaflet } from './context'
import MapLayer from './MapLayer'
import type { LatLngBounds, MapLayerProps } from './types'

type LeafletElement = LeafletVideoOverlay
type Props = {
  attribution?: string,
  bounds: LatLngBounds,
  opacity?: number,
  play?: boolean,
  url: string | string[] | HTMLVideoElement,
  zIndex?: number,
} & MapLayerProps

class VideoOverlay extends MapLayer<LeafletElement, Props> {
  createLeafletElement(props: Props): LeafletElement {
    return new LeafletVideoOverlay(
      props.url,
      props.bounds,
      this.getOptions(props),
    )
  }

  componentDidMount() {
    super.componentDidMount()
    if (this.props.play === true) {
      this.leafletElement.getElement().play()
    }
  }

  updateLeafletElement(fromProps: Props, toProps: Props) {
    if (toProps.url !== fromProps.url) {
      this.leafletElement.setUrl(toProps.url)
    }
    if (toProps.bounds !== fromProps.bounds) {
      this.leafletElement.setBounds(latLngBounds(toProps.bounds))
    }
    if (toProps.opacity !== fromProps.opacity) {
      this.leafletElement.setOpacity(toProps.opacity)
    }
    if (toProps.zIndex !== fromProps.zIndex) {
      this.leafletElement.setZIndex(toProps.zIndex)
    }
    // flowlint-next-line sketchy-null-bool:off
    if (toProps.play === true && !fromProps.play) {
      this.leafletElement.getElement().play()
      // flowlint-next-line sketchy-null-bool:off
    } else if (!toProps.play && fromProps.play === true) {
      this.leafletElement.getElement().pause()
    }
  }
}

export default withLeaflet<Props, VideoOverlay>(VideoOverlay)
