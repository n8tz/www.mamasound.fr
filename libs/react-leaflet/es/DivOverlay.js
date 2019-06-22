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

import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createPortal } from 'react-dom';
import MapComponent from './MapComponent';
import updateClassName from './utils/updateClassName';

var DivOverlay =
/*#__PURE__*/
function (_MapComponent) {
  _inheritsLoose(DivOverlay, _MapComponent);

  function DivOverlay(props) {
    var _this;

    _this = _MapComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onClose", function () {
      if (_this.props.onClose) {
        _this.props.onClose();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onOpen", function () {
      _this.forceUpdate(); // Re-render now that leafletElement is created


      if (_this.props.onOpen) {
        _this.props.onOpen();
      }
    });

    _this.leafletElement = _this.createLeafletElement(props);
    return _this;
  }

  var _proto = DivOverlay.prototype;

  _proto.createLeafletElement = function createLeafletElement(_props) {
    throw new Error('createLeafletElement() must be implemented');
  };

  _proto.updateLeafletElement = function updateLeafletElement(_prevProps, _props) {};

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    updateClassName(this.leafletElement._container, prevProps.className, this.props.className);
    this.updateLeafletElement(prevProps, this.props);

    if (this.leafletElement.isOpen()) {
      this.leafletElement.update();
      this.onRender();
    }
  };

  _proto.onRender = function onRender() {};

  _proto.render = function render() {
    if (this.leafletElement._contentNode) {
      return createPortal(this.props.children, this.leafletElement._contentNode);
    }

    return null;
  };

  return DivOverlay;
}(MapComponent);

export { DivOverlay as default };