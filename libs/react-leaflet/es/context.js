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

"use strict";

import _extends from "@babel/runtime/helpers/esm/extends";
import hoistNonReactStatics from 'hoist-non-react-statics';
import React, { createContext, forwardRef } from 'react';

var _createContext = createContext({}),
    Consumer = _createContext.Consumer,
    Provider = _createContext.Provider;

export var LeafletConsumer = Consumer;
export var LeafletProvider = Provider;
export var withLeaflet = function withLeaflet(WrappedComponent) {
  var WithLeafletComponent = function WithLeafletComponent(props, ref) {
    return React.createElement(Consumer, null, function (leaflet) {
      return React.createElement(WrappedComponent, _extends({}, props, {
        leaflet: leaflet,
        ref: ref
      }));
    });
  };

  var name = // flowlint-next-line sketchy-null-string:off
  WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithLeafletComponent.displayName = "Leaflet(" + name + ")";
  var LeafletComponent = forwardRef(WithLeafletComponent);
  hoistNonReactStatics(LeafletComponent, WrappedComponent);
  return LeafletComponent;
};