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

var _context = require("./context");

var _Path2 = _interopRequireDefault(require("./Path"));

var Circle =
/*#__PURE__*/
function (_Path) {
  (0, _inheritsLoose2.default)(Circle, _Path);

  function Circle() {
    return _Path.apply(this, arguments) || this;
  }

  var _proto = Circle.prototype;

  _proto.createLeafletElement = function createLeafletElement(props) {
    var center = props.center,
        radius = props.radius,
        options = (0, _objectWithoutPropertiesLoose2.default)(props, ["center", "radius"]);
    return new _leaflet.Circle(center, radius, this.getOptions(options));
  };

  _proto.updateLeafletElement = function updateLeafletElement(fromProps, toProps) {
    if (toProps.center !== fromProps.center) {
      this.leafletElement.setLatLng(toProps.center);
    }

    if (toProps.radius !== fromProps.radius) {
      this.leafletElement.setRadius(toProps.radius);
    }
  };

  return Circle;
}(_Path2.default);

var _default = (0, _context.withLeaflet)(Circle);

exports.default = _default;