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

import { LayerGroup as LeafletLayerGroup } from 'leaflet'

import { withLeaflet } from './context'
import MapLayer from './MapLayer'
import type { MapLayerProps } from './types'

type LeafletElement = LeafletLayerGroup
type Props = MapLayerProps

class LayerGroup extends MapLayer<LeafletElement, Props> {
  createLeafletElement(props: Props): LeafletElement {
    const el = new LeafletLayerGroup([], this.getOptions(props))
    this.contextValue = { ...props.leaflet, layerContainer: el }
    return el
  }
}

export default withLeaflet<Props, LayerGroup>(LayerGroup)
