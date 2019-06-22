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

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _leaflet = require("leaflet");

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _context = require("./context");

var _GridLayer2 = _interopRequireDefault(require("./GridLayer"));

var _MapEvented = require("./MapEvented");

var WMSTileLayer =
/*#__PURE__*/
function (_GridLayer) {
  (0, _inheritsLoose2.default)(WMSTileLayer, _GridLayer);

  function WMSTileLayer() {
    return _GridLayer.apply(this, arguments) || this;
  }

  var _proto = WMSTileLayer.prototype;

  _proto.createLeafletElement = function createLeafletElement(props) {
    var url = props.url,
        params = (0, _objectWithoutPropertiesLoose2.default)(props, ["url"]);
    return new _leaflet.TileLayer.WMS(url, this.getOptions(params));
  };

  _proto.updateLeafletElement = function updateLeafletElement(fromProps, toProps) {
    _GridLayer.prototype.updateLeafletElement.call(this, fromProps, toProps);

    var prevUrl = fromProps.url,
        _po = fromProps.opacity,
        _pz = fromProps.zIndex,
        prevParams = (0, _objectWithoutPropertiesLoose2.default)(fromProps, ["url", "opacity", "zIndex"]);
    var url = toProps.url,
        _o = toProps.opacity,
        _z = toProps.zIndex,
        params = (0, _objectWithoutPropertiesLoose2.default)(toProps, ["url", "opacity", "zIndex"]);

    if (url !== prevUrl) {
      this.leafletElement.setUrl(url);
    }

    if (!(0, _fastDeepEqual.default)(params, prevParams)) {
      this.leafletElement.setParams(params);
    }
  };

  _proto.getOptions = function getOptions(params) {
    var superOptions = _GridLayer.prototype.getOptions.call(this, params);

    return Object.keys(superOptions).reduce(function (options, key) {
      if (!_MapEvented.EVENTS_RE.test(key)) {
        options[key] = superOptions[key];
      }

      return options;
    }, {});
  };

  return WMSTileLayer;
}(_GridLayer2.default);

var _default = (0, _context.withLeaflet)(WMSTileLayer);

exports.default = _default;