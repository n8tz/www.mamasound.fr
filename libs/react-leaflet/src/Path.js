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

import type { Path as PathType } from 'leaflet'
import isEqual from 'fast-deep-equal'

import MapLayer from './MapLayer'
import type { PathOptions, PathProps } from './types'
import pick from './utils/pick'

const OPTIONS = [
  'stroke',
  'color',
  'weight',
  'opacity',
  'lineCap',
  'lineJoin',
  'dashArray',
  'dashOffset',
  'fill',
  'fillColor',
  'fillOpacity',
  'fillRule',
  'bubblingMouseEvents',
  'renderer',
  'className',
  // Interactive Layer
  'interactive',
  // Layer
  'pane',
  'attribution',
]

export default class Path<
  LeafletElement: PathType,
  Props: PathProps,
> extends MapLayer<LeafletElement, Props> {
  constructor(props: Props) {
    super(props)
    if (this.contextValue == null) {
      this.contextValue = {
        ...props.leaflet,
        popupContainer: this.leafletElement,
      }
    }
  }

  componentDidUpdate(prevProps: Props) {
    super.componentDidUpdate(prevProps)
    this.setStyleIfChanged(prevProps, this.props)
  }

  getPathOptions(props: Props): PathOptions {
    return pick(props, OPTIONS)
  }

  setStyle(options: PathOptions = {}) {
    this.leafletElement.setStyle(options)
  }

  setStyleIfChanged(fromProps: Props, toProps: Props) {
    const nextStyle = this.getPathOptions(toProps)
    if (!isEqual(nextStyle, this.getPathOptions(fromProps))) {
      this.setStyle(nextStyle)
    }
  }
}
