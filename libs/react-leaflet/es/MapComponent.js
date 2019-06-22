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
import MapEvented from './MapEvented';

var MapComponent =
/*#__PURE__*/
function (_MapEvented) {
  _inheritsLoose(MapComponent, _MapEvented);

  function MapComponent() {
    return _MapEvented.apply(this, arguments) || this;
  }

  var _proto = MapComponent.prototype;

  _proto.getOptions = function getOptions(props) {
    if (props.pane != null) {
      return props;
    }

    if (props.leaflet != null && props.leaflet.pane != null) {
      return _extends({}, props, {
        pane: props.leaflet.pane
      });
    }

    return props;
  };

  return MapComponent;
}(MapEvented);

export { MapComponent as default };