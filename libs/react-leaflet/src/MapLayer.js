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

import type { Layer } from 'leaflet'
import React, { Fragment } from 'react'

import { LeafletProvider } from './context'
import MapComponent from './MapComponent'
import type { LeafletContext, MapLayerProps } from './types'

export default class MapLayer<
  LeafletElement: Layer,
  Props: MapLayerProps,
> extends MapComponent<LeafletElement, Props> {
  contextValue: ?LeafletContext
  leafletElement: LeafletElement

  constructor(props: Props) {
    super(props)
    this.leafletElement = this.createLeafletElement(props)
  }

  get layerContainer(): Layer {
    return this.props.leaflet.layerContainer || this.props.leaflet.map
  }

  createLeafletElement(_props: Props): LeafletElement {
    throw new Error('createLeafletElement() must be implemented')
  }

  updateLeafletElement(_fromProps: Props, _toProps: Props) {}

  componentDidMount() {
    super.componentDidMount()
    this.layerContainer.addLayer(this.leafletElement)
  }

  componentDidUpdate(prevProps: Props) {
    super.componentDidUpdate(prevProps)

    if (this.props.attribution !== prevProps.attribution) {
      const { map } = this.props.leaflet
      if (map != null && map.attributionControl != null) {
        map.attributionControl.removeAttribution(prevProps.attribution)
        map.attributionControl.addAttribution(this.props.attribution)
      }
    }

    this.updateLeafletElement(prevProps, this.props)
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.layerContainer.removeLayer(this.leafletElement)
  }

  render() {
    const { children } = this.props
    if (children == null) {
      return null
    }
    return this.contextValue == null ? (
      <Fragment>{children}</Fragment>
    ) : (
      <LeafletProvider value={this.contextValue}>{children}</LeafletProvider>
    )
  }
}
