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

import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import { TileLayer as LeafletTileLayer } from 'leaflet';
import { withLeaflet } from './context';
import GridLayer from './GridLayer';

var TileLayer =
/*#__PURE__*/
function (_GridLayer) {
  _inheritsLoose(TileLayer, _GridLayer);

  function TileLayer() {
    return _GridLayer.apply(this, arguments) || this;
  }

  var _proto = TileLayer.prototype;

  _proto.createLeafletElement = function createLeafletElement(props) {
    return new LeafletTileLayer(props.url, this.getOptions(props));
  };

  _proto.updateLeafletElement = function updateLeafletElement(fromProps, toProps) {
    _GridLayer.prototype.updateLeafletElement.call(this, fromProps, toProps);

    if (toProps.url !== fromProps.url) {
      this.leafletElement.setUrl(toProps.url);
    }
  };

  return TileLayer;
}(GridLayer);

export default withLeaflet(TileLayer);