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
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import { Marker as LeafletMarker } from 'leaflet';
import React from 'react';
import { LeafletProvider, withLeaflet } from './context';
import MapLayer from './MapLayer';

var Marker =
/*#__PURE__*/
function (_MapLayer) {
  _inheritsLoose(Marker, _MapLayer);

  function Marker() {
    return _MapLayer.apply(this, arguments) || this;
  }

  var _proto = Marker.prototype;

  _proto.createLeafletElement = function createLeafletElement(props) {
    var el = new LeafletMarker(props.position, this.getOptions(props));
    this.contextValue = _extends({}, props.leaflet, {
      popupContainer: el
    });
    return el;
  };

  _proto.updateLeafletElement = function updateLeafletElement(fromProps, toProps) {
    if (toProps.position !== fromProps.position) {
      this.leafletElement.setLatLng(toProps.position);
    }

    if (toProps.icon !== fromProps.icon) {
      this.leafletElement.setIcon(toProps.icon);
    }

    if (toProps.zIndexOffset !== fromProps.zIndexOffset) {
      this.leafletElement.setZIndexOffset(toProps.zIndexOffset);
    }

    if (toProps.opacity !== fromProps.opacity) {
      this.leafletElement.setOpacity(toProps.opacity);
    }

    if (toProps.draggable !== fromProps.draggable) {
      if (toProps.draggable === true) {
        this.leafletElement.dragging.enable();
      } else {
        this.leafletElement.dragging.disable();
      }
    }
  };

  _proto.render = function render() {
    var children = this.props.children;
    return children == null || this.contextValue == null ? null : React.createElement(LeafletProvider, {
      value: this.contextValue
    }, children);
  };

  return Marker;
}(MapLayer);

export default withLeaflet(Marker);