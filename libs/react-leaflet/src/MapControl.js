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

import { Control } from 'leaflet'
import { Component } from 'react'

import type { MapControlProps } from './types'

export default class MapControl<
  LeafletElement: Control,
  Props: MapControlProps,
> extends Component<Props> {
  leafletElement: LeafletElement

  constructor(props: Props) {
    super(props)
    this.leafletElement = this.createLeafletElement(this.props)
  }

  createLeafletElement(_props: Props): LeafletElement {
    throw new Error('createLeafletElement() must be implemented')
  }

  updateLeafletElement(fromProps: Props, toProps: Props): void {
    if (toProps.position !== fromProps.position) {
      this.leafletElement.setPosition(toProps.position)
    }
  }

  componentDidMount() {
    this.leafletElement.addTo(this.props.leaflet.map)
  }

  componentDidUpdate(prevProps: Props) {
    this.updateLeafletElement(prevProps, this.props)
  }

  componentWillUnmount() {
    this.leafletElement.remove()
  }

  render(): * {
    return null
  }
}
