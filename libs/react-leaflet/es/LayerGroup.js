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
import { LayerGroup as LeafletLayerGroup } from 'leaflet';
import { withLeaflet } from './context';
import MapLayer from './MapLayer';

var LayerGroup =
/*#__PURE__*/
function (_MapLayer) {
  _inheritsLoose(LayerGroup, _MapLayer);

  function LayerGroup() {
    return _MapLayer.apply(this, arguments) || this;
  }

  var _proto = LayerGroup.prototype;

  _proto.createLeafletElement = function createLeafletElement(props) {
    var el = new LeafletLayerGroup([], this.getOptions(props));
    this.contextValue = _extends({}, props.leaflet, {
      layerContainer: el
    });
    return el;
  };

  return LayerGroup;
}(MapLayer);

export default withLeaflet(LayerGroup);