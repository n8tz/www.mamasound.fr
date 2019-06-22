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

import { Control, type Layer } from 'leaflet'
import React, {
  cloneElement,
  Component,
  Children,
  Fragment,
  type ChildrenArray,
  type Element,
} from 'react'

import { LeafletProvider, withLeaflet } from './context'
import MapControl from './MapControl'
import type {
  AddLayerHandler,
  RemoveLayerHandler,
  LeafletContext,
  MapControlProps,
} from './types'

type ControlledLayerProps = {
  addBaseLayer: AddLayerHandler,
  addOverlay: AddLayerHandler,
  checked?: boolean,
  children: Element<*>,
  leaflet: LeafletContext,
  name: string,
  removeLayer: RemoveLayerHandler,
  removeLayerControl: RemoveLayerHandler,
}

// Abtract class for layer container, extended by BaseLayer and Overlay
export class ControlledLayer extends Component<ControlledLayerProps> {
  contextValue: LeafletContext
  layer: ?Layer

  componentDidUpdate({ checked }: ControlledLayerProps) {
    if (this.props.leaflet.map == null) {
      return
    }
    // Handle dynamically (un)checking the layer => adding/removing from the map
    if (this.props.checked === true && (checked == null || checked === false)) {
      this.props.leaflet.map.addLayer(this.layer)
    } else if (
      checked === true &&
      (this.props.checked == null || this.props.checked === false)
    ) {
      this.props.leaflet.map.removeLayer(this.layer)
    }
  }

  componentWillUnmount() {
    this.props.removeLayerControl(this.layer)
  }

  addLayer() {
    throw new Error('Must be implemented in extending class')
  }

  removeLayer(layer: Layer) {
    this.props.removeLayer(layer)
  }

  render() {
    const { children } = this.props
    return children ? (
      <LeafletProvider value={this.contextValue}>{children}</LeafletProvider>
    ) : null
  }
}

class BaseLayer extends ControlledLayer {
  constructor(props: ControlledLayerProps) {
    super(props)
    this.contextValue = {
      ...props.leaflet,
      layerContainer: {
        addLayer: this.addLayer.bind(this),
        removeLayer: this.removeLayer.bind(this),
      },
    }
  }

  addLayer = (layer: Layer) => {
    this.layer = layer // Keep layer reference to handle dynamic changes of props
    const { addBaseLayer, checked, name } = this.props
    addBaseLayer(layer, name, checked)
  }
}

class Overlay extends ControlledLayer {
  constructor(props: ControlledLayerProps) {
    super(props)
    this.contextValue = {
      ...props.leaflet,
      layerContainer: {
        addLayer: this.addLayer.bind(this),
        removeLayer: this.removeLayer.bind(this),
      },
    }
  }

  addLayer = (layer: Layer) => {
    this.layer = layer // Keep layer reference to handle dynamic changes of props
    const { addOverlay, checked, name } = this.props
    addOverlay(layer, name, checked)
  }
}

type LeafletElement = Control.Layers
type LayersControlProps = {
  children: ChildrenArray<*>,
  collapsed?: boolean,
} & MapControlProps

class LayersControl extends MapControl<LeafletElement, LayersControlProps> {
  controlProps: {
    addBaseLayer: AddLayerHandler,
    addOverlay: AddLayerHandler,
    removeLayer: RemoveLayerHandler,
    removeLayerControl: RemoveLayerHandler,
  }

  constructor(props: LayersControlProps) {
    super(props)
    this.controlProps = {
      addBaseLayer: this.addBaseLayer.bind(this),
      addOverlay: this.addOverlay.bind(this),
      leaflet: props.leaflet,
      removeLayer: this.removeLayer.bind(this),
      removeLayerControl: this.removeLayerControl.bind(this),
    }
  }

  createLeafletElement(props: LayersControlProps): LeafletElement {
    const { children: _children, ...options } = props
    return new Control.Layers(undefined, undefined, options)
  }

  updateLeafletElement(
    fromProps: LayersControlProps,
    toProps: LayersControlProps,
  ) {
    super.updateLeafletElement(fromProps, toProps)
    if (toProps.collapsed !== fromProps.collapsed) {
      if (toProps.collapsed === true) {
        this.leafletElement.collapse()
      } else {
        this.leafletElement.expand()
      }
    }
  }

  componentWillUnmount() {
    setTimeout(() => {
      super.componentWillUnmount()
    }, 0)
  }

  addBaseLayer(layer: Layer, name: string, checked: boolean = false) {
    if (checked && this.props.leaflet.map != null) {
      this.props.leaflet.map.addLayer(layer)
    }
    this.leafletElement.addBaseLayer(layer, name)
  }

  addOverlay(layer: Layer, name: string, checked: boolean = false) {
    if (checked && this.props.leaflet.map != null) {
      this.props.leaflet.map.addLayer(layer)
    }
    this.leafletElement.addOverlay(layer, name)
  }

  removeLayer(layer: Layer) {
    if (this.props.leaflet.map != null) {
      this.props.leaflet.map.removeLayer(layer)
    }
  }

  removeLayerControl(layer: Layer) {
    this.leafletElement.removeLayer(layer)
  }

  render() {
    const children = Children.map(this.props.children, child => {
      return child ? cloneElement(child, this.controlProps) : null
    })
    return <Fragment>{children}</Fragment>
  }
}

const LayersControlExport: Object = withLeaflet(LayersControl)

LayersControlExport.BaseLayer = BaseLayer
LayersControlExport.Overlay = Overlay

export default LayersControlExport
