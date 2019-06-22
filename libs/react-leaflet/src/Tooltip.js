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

import { Tooltip as LeafletTooltip } from 'leaflet'

import { withLeaflet } from './context'
import DivOverlay from './DivOverlay'
import type { DivOverlayProps } from './types'

type LeafletElement = LeafletTooltip
type Props = DivOverlayProps

class Tooltip extends DivOverlay<LeafletElement, Props> {
  static defaultProps = {
    pane: 'tooltipPane',
  }

  createLeafletElement(props: Props): LeafletElement {
    return new LeafletTooltip(
      this.getOptions(props),
      props.leaflet.popupContainer,
    )
  }

  componentDidMount() {
    const { popupContainer } = this.props.leaflet
    if (popupContainer == null) return

    popupContainer.on({
      tooltipopen: this.onTooltipOpen,
      tooltipclose: this.onTooltipClose,
    })
    popupContainer.bindTooltip(this.leafletElement)
  }

  componentWillUnmount() {
    const { popupContainer } = this.props.leaflet
    if (popupContainer == null) return

    popupContainer.off({
      tooltipopen: this.onTooltipOpen,
      tooltipclose: this.onTooltipClose,
    })
    if (popupContainer._map != null) {
      popupContainer.unbindTooltip(this.leafletElement)
    }
  }

  onTooltipOpen = ({ tooltip }: { tooltip: LeafletElement }) => {
    if (tooltip === this.leafletElement) {
      this.onOpen()
    }
  }

  onTooltipClose = ({ tooltip }: { tooltip: LeafletElement }) => {
    if (tooltip === this.leafletElement) {
      this.onClose()
    }
  }
}

export default withLeaflet<Props, Tooltip>(Tooltip)
