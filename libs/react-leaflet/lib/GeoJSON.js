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

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _leaflet = require("leaflet");

var _context = require("./context");

var _Path2 = _interopRequireDefault(require("./Path"));

var GeoJSON =
/*#__PURE__*/
function (_Path) {
  (0, _inheritsLoose2.default)(GeoJSON, _Path);

  function GeoJSON() {
    return _Path.apply(this, arguments) || this;
  }

  var _proto = GeoJSON.prototype;

  _proto.createLeafletElement = function createLeafletElement(props) {
    return new _leaflet.GeoJSON(props.data, this.getOptions(props));
  };

  _proto.updateLeafletElement = function updateLeafletElement(fromProps, toProps) {
    if (typeof toProps.style === 'function') {
      this.setStyle(toProps.style);
    } else {
      this.setStyleIfChanged(fromProps, toProps);
    }
  };

  return GeoJSON;
}(_Path2.default);

var _default = (0, _context.withLeaflet)(GeoJSON);

exports.default = _default;