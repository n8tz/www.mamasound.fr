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

import hoistNonReactStatics from 'hoist-non-react-statics'
import React, { createContext, forwardRef, type AbstractComponent } from 'react'

import type { LeafletContext } from './types'

const { Consumer, Provider } = createContext<LeafletContext>({})

export const LeafletConsumer = Consumer
export const LeafletProvider = Provider

export const withLeaflet = <Config: { leaflet: LeafletContext }, Instance>(
  WrappedComponent: AbstractComponent<Config, Instance>,
): AbstractComponent<$Diff<Config, { leaflet: LeafletContext }>, Instance> => {
  const WithLeafletComponent = (props, ref) => (
    <Consumer>
      {(leaflet: LeafletContext) => (
        <WrappedComponent {...props} leaflet={leaflet} ref={ref} />
      )}
    </Consumer>
  )

  const name = // flowlint-next-line sketchy-null-string:off
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  WithLeafletComponent.displayName = `Leaflet(${name})`

  const LeafletComponent = forwardRef(WithLeafletComponent)
  hoistNonReactStatics(LeafletComponent, WrappedComponent)

  return LeafletComponent
}
