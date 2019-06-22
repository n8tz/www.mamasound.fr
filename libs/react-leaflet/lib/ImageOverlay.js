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

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _leaflet = require("leaflet");

var _context = require("./context");

var _MapLayer2 = _interopRequireDefault(require("./MapLayer"));

var ImageOverlay =
/*#__PURE__*/
function (_MapLayer) {
  (0, _inheritsLoose2.default)(ImageOverlay, _MapLayer);

  function ImageOverlay() {
    return _MapLayer.apply(this, arguments) || this;
  }

  var _proto = ImageOverlay.prototype;

  _proto.createLeafletElement = function createLeafletElement(props) {
    var el = new _leaflet.ImageOverlay(props.url, props.bounds, this.getOptions(props));
    this.contextValue = (0, _extends2.default)({}, props.leaflet, {
      popupContainer: el
    });
    return el;
  };

  _proto.updateLeafletElement = function updateLeafletElement(fromProps, toProps) {
    if (toProps.url !== fromProps.url) {
      this.leafletElement.setUrl(toProps.url);
    }

    if (toProps.bounds !== fromProps.bounds) {
      this.leafletElement.setBounds((0, _leaflet.latLngBounds)(toProps.bounds));
    }

    if (toProps.opacity !== fromProps.opacity) {
      this.leafletElement.setOpacity(toProps.opacity);
    }

    if (toProps.zIndex !== fromProps.zIndex) {
      this.leafletElement.setZIndex(toProps.zIndex);
    }
  };

  return ImageOverlay;
}(_MapLayer2.default);

var _default = (0, _context.withLeaflet)(ImageOverlay);

exports.default = _default;