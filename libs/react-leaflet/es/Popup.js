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
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { Popup as LeafletPopup } from 'leaflet';
import { withLeaflet } from './context';
import DivOverlay from './DivOverlay';

var Popup =
/*#__PURE__*/
function (_DivOverlay) {
  _inheritsLoose(Popup, _DivOverlay);

  function Popup() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _DivOverlay.call.apply(_DivOverlay, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "onPopupOpen", function (_ref) {
      var popup = _ref.popup;

      if (popup === _this.leafletElement) {
        _this.onOpen();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onPopupClose", function (_ref2) {
      var popup = _ref2.popup;

      if (popup === _this.leafletElement) {
        _this.onClose();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onRender", function () {
      if (_this.props.autoPan !== false && _this.leafletElement.isOpen()) {
        if (_this.leafletElement._map && _this.leafletElement._map._panAnim) {
          _this.leafletElement._map._panAnim = undefined;
        }

        _this.leafletElement._adjustPan();
      }
    });

    return _this;
  }

  var _proto = Popup.prototype;

  _proto.getOptions = function getOptions(props) {
    return _extends({}, _DivOverlay.prototype.getOptions.call(this, props), {
      autoPan: false
    });
  };

  _proto.createLeafletElement = function createLeafletElement(props) {
    var options = this.getOptions(props);
    options.autoPan = props.autoPan !== false;
    return new LeafletPopup(options, props.leaflet.popupContainer);
  };

  _proto.updateLeafletElement = function updateLeafletElement(fromProps, toProps) {
    if (toProps.position !== fromProps.position) {
      this.leafletElement.setLatLng(toProps.position);
    }
  };

  _proto.componentDidMount = function componentDidMount() {
    var position = this.props.position;
    var _this$props$leaflet = this.props.leaflet,
        map = _this$props$leaflet.map,
        popupContainer = _this$props$leaflet.popupContainer;
    var el = this.leafletElement;

    if (map != null) {
      map.on({
        popupopen: this.onPopupOpen,
        popupclose: this.onPopupClose
      });
    }

    if (popupContainer) {
      // Attach to container component
      popupContainer.bindPopup(el);
    } else {
      // Attach to a Map
      if (position) {
        el.setLatLng(position);
      }

      el.openOn(map);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    var map = this.props.leaflet.map;

    if (map != null) {
      map.off({
        popupopen: this.onPopupOpen,
        popupclose: this.onPopupClose
      });
      map.removeLayer(this.leafletElement);
    }

    _DivOverlay.prototype.componentWillUnmount.call(this);
  };

  return Popup;
}(DivOverlay);

_defineProperty(Popup, "defaultProps", {
  pane: 'popupPane'
});

export default withLeaflet(Popup);