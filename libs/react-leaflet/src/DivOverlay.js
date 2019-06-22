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

import { createPortal } from 'react-dom'

import MapComponent from './MapComponent'
import updateClassName from './utils/updateClassName'
import type { DivOverlayProps } from './types'

type DivOverlayTypes = {
  _container: HTMLDivElement,
  _contentNode: HTMLDivElement,
  isOpen: () => boolean,
  update: () => void,
}

export default class DivOverlay<
  LeafletElement,
  Props: DivOverlayProps,
> extends MapComponent<LeafletElement & DivOverlayTypes, Props> {
  constructor(props: Props) {
    super(props)
    this.leafletElement = this.createLeafletElement(props)
  }

  createLeafletElement(_props: Props) {
    throw new Error('createLeafletElement() must be implemented')
  }

  updateLeafletElement(_prevProps: Props, _props: Props) {}

  componentDidUpdate(prevProps: Props) {
    updateClassName(
      this.leafletElement._container,
      prevProps.className,
      this.props.className,
    )

    this.updateLeafletElement(prevProps, this.props)

    if (this.leafletElement.isOpen()) {
      this.leafletElement.update()
      this.onRender()
    }
  }

  onClose = () => {
    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  onOpen = () => {
    this.forceUpdate() // Re-render now that leafletElement is created
    if (this.props.onOpen) {
      this.props.onOpen()
    }
  }

  onRender() {}

  render() {
    if (this.leafletElement._contentNode) {
      return createPortal(this.props.children, this.leafletElement._contentNode)
    }
    return null
  }
}
