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
import { Polygon as LeafletPolygon } from 'leaflet';
import { withLeaflet } from './context';
import Path from './Path';

var Polygon =
/*#__PURE__*/
function (_Path) {
  _inheritsLoose(Polygon, _Path);

  function Polygon() {
    return _Path.apply(this, arguments) || this;
  }

  var _proto = Polygon.prototype;

  _proto.createLeafletElement = function createLeafletElement(props) {
    return new LeafletPolygon(props.positions, this.getOptions(props));
  };

  _proto.updateLeafletElement = function updateLeafletElement(fromProps, toProps) {
    if (toProps.positions !== fromProps.positions) {
      this.leafletElement.setLatLngs(toProps.positions);
    }

    this.setStyleIfChanged(fromProps, toProps);
  };

  return Polygon;
}(Path);

export default withLeaflet(Polygon);