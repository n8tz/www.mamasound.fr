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

import { Popup as LeafletPopup } from 'leaflet'

import { withLeaflet } from './context'
import DivOverlay from './DivOverlay'
import type { LatLng, DivOverlayProps } from './types'

type LeafletElement = LeafletPopup
type Props = {
  autoPan?: boolean,
  position?: LatLng,
} & DivOverlayProps

class Popup extends DivOverlay<LeafletElement, Props> {
  static defaultProps = {
    pane: 'popupPane',
  }

  getOptions(props: Props): Props {
    return {
      ...super.getOptions(props),
      autoPan: false,
    }
  }

  createLeafletElement(props: Props): LeafletElement {
    const options = this.getOptions(props)
    options.autoPan = props.autoPan !== false
    return new LeafletPopup(options, props.leaflet.popupContainer)
  }

  updateLeafletElement(fromProps: Props, toProps: Props) {
    if (toProps.position !== fromProps.position) {
      this.leafletElement.setLatLng(toProps.position)
    }
  }

  componentDidMount() {
    const { position } = this.props
    const { map, popupContainer } = this.props.leaflet
    const el = this.leafletElement

    if (map != null) {
      map.on({
        popupopen: this.onPopupOpen,
        popupclose: this.onPopupClose,
      })
    }

    if (popupContainer) {
      // Attach to container component
      popupContainer.bindPopup(el)
    } else {
      // Attach to a Map
      if (position) {
        el.setLatLng(position)
      }
      el.openOn(map)
    }
  }

  componentWillUnmount() {
    const { map } = this.props.leaflet

    if (map != null) {
      map.off({
        popupopen: this.onPopupOpen,
        popupclose: this.onPopupClose,
      })
      map.removeLayer(this.leafletElement)
    }

    super.componentWillUnmount()
  }

  onPopupOpen = ({ popup }: { popup: LeafletElement }) => {
    if (popup === this.leafletElement) {
      this.onOpen()
    }
  }

  onPopupClose = ({ popup }: { popup: LeafletElement }) => {
    if (popup === this.leafletElement) {
      this.onClose()
    }
  }

  onRender = () => {
    if (this.props.autoPan !== false && this.leafletElement.isOpen()) {
      if (this.leafletElement._map && this.leafletElement._map._panAnim) {
        this.leafletElement._map._panAnim = undefined
      }
      this.leafletElement._adjustPan()
    }
  }
}

export default withLeaflet<Props, Popup>(Popup)
