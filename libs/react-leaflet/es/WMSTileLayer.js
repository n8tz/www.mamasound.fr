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

import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import { TileLayer } from 'leaflet';
import isEqual from 'fast-deep-equal';
import { withLeaflet } from './context';
import GridLayer from './GridLayer';
import { EVENTS_RE } from './MapEvented';

var WMSTileLayer =
/*#__PURE__*/
function (_GridLayer) {
  _inheritsLoose(WMSTileLayer, _GridLayer);

  function WMSTileLayer() {
    return _GridLayer.apply(this, arguments) || this;
  }

  var _proto = WMSTileLayer.prototype;

  _proto.createLeafletElement = function createLeafletElement(props) {
    var url = props.url,
        params = _objectWithoutPropertiesLoose(props, ["url"]);

    return new TileLayer.WMS(url, this.getOptions(params));
  };

  _proto.updateLeafletElement = function updateLeafletElement(fromProps, toProps) {
    _GridLayer.prototype.updateLeafletElement.call(this, fromProps, toProps);

    var prevUrl = fromProps.url,
        _po = fromProps.opacity,
        _pz = fromProps.zIndex,
        prevParams = _objectWithoutPropertiesLoose(fromProps, ["url", "opacity", "zIndex"]);

    var url = toProps.url,
        _o = toProps.opacity,
        _z = toProps.zIndex,
        params = _objectWithoutPropertiesLoose(toProps, ["url", "opacity", "zIndex"]);

    if (url !== prevUrl) {
      this.leafletElement.setUrl(url);
    }

    if (!isEqual(params, prevParams)) {
      this.leafletElement.setParams(params);
    }
  };

  _proto.getOptions = function getOptions(params) {
    var superOptions = _GridLayer.prototype.getOptions.call(this, params);

    return Object.keys(superOptions).reduce(function (options, key) {
      if (!EVENTS_RE.test(key)) {
        options[key] = superOptions[key];
      }

      return options;
    }, {});
  };

  return WMSTileLayer;
}(GridLayer);

export default withLeaflet(WMSTileLayer);