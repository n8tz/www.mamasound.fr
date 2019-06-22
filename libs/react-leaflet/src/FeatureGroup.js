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

import { FeatureGroup as LeafletFeatureGroup } from 'leaflet'

import { withLeaflet } from './context'
import Path from './Path'
import type { PathProps } from './types'

type LeafletElement = LeafletFeatureGroup
type Props = PathProps

class FeatureGroup extends Path<LeafletElement, Props> {
  createLeafletElement(props: Props): LeafletElement {
    const el = new LeafletFeatureGroup(this.getOptions(props))
    this.contextValue = {
      ...props.leaflet,
      layerContainer: el,
      popupContainer: el,
    }
    return el
  }

  componentDidMount() {
    super.componentDidMount()
    this.setStyle(this.props)
  }
}

export default withLeaflet<Props, FeatureGroup>(FeatureGroup)
