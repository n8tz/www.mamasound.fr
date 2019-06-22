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

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.withLeaflet = exports.LeafletProvider = exports.LeafletConsumer = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

var _react = _interopRequireWildcard(require("react"));

var _createContext = (0, _react.createContext)({}),
    Consumer = _createContext.Consumer,
    Provider = _createContext.Provider;

var LeafletConsumer = Consumer;
exports.LeafletConsumer = LeafletConsumer;
var LeafletProvider = Provider;
exports.LeafletProvider = LeafletProvider;

var withLeaflet = function withLeaflet(WrappedComponent) {
  var WithLeafletComponent = function WithLeafletComponent(props, ref) {
    return _react.default.createElement(Consumer, null, function (leaflet) {
      return _react.default.createElement(WrappedComponent, (0, _extends2.default)({}, props, {
        leaflet: leaflet,
        ref: ref
      }));
    });
  };

  var name = // flowlint-next-line sketchy-null-string:off
  WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithLeafletComponent.displayName = "Leaflet(" + name + ")";
  var LeafletComponent = (0, _react.forwardRef)(WithLeafletComponent);
  (0, _hoistNonReactStatics.default)(LeafletComponent, WrappedComponent);
  return LeafletComponent;
};

exports.withLeaflet = withLeaflet;