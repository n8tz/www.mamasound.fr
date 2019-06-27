/*!
 * react-rtween
 * Copyright (C) 2019  Nathanael Braun
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
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/MapOf.react_rtween_helpers_css_demux_____js.gen.js":
/*!****************************************************************!*\
  !*** ./src/MapOf.react_rtween_helpers_css_demux_____js.gen.js ***!
  \****************************************************************/
/*! exports provided: $all, backgroundColor, filter, transform, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$all", function() { return $all; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backgroundColor", function() { return backgroundColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filter", function() { return filter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transform", function() { return transform; });
/* This is a virtual file generated by webpack-inherit */
var req,
    _exports = {},
    root;
req = __webpack_require__("./src/helpers/css/demux sync recursive ^\\.\\/([^\\\\\\/]+)\\.js$");
req.keys().forEach(function (key) {
  var mod,
      name = key.match(/^\.\/([^\\\/]+)\.js$/),
      i = 0,
      modExport = _exports;
  name = name && name[1] || key.substr(2);
  name = name.split('/');
  mod = req(key);

  while (i < name.length - 1) {
    modExport = modExport[name[i]] = modExport[name[i]] || {}, i++;
  }

  modExport[name[i]] = Object.keys(mod).length === 1 && mod.default || mod;
});
var $all = _exports.$all;
var backgroundColor = _exports.backgroundColor;
var filter = _exports.filter;
var transform = _exports.transform;
/* harmony default export */ __webpack_exports__["default"] = (_exports);

/***/ }),

/***/ "./src/MapOf.react_rtween_helpers_css_demux_typed_____js.gen.js":
/*!**********************************************************************!*\
  !*** ./src/MapOf.react_rtween_helpers_css_demux_typed_____js.gen.js ***!
  \**********************************************************************/
/*! exports provided: color, int, multi, number, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "color", function() { return color; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "int", function() { return int; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multi", function() { return multi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "number", function() { return number; });
/* This is a virtual file generated by webpack-inherit */
var req,
    _exports = {},
    root;
req = __webpack_require__("./src/helpers/css/demux/typed sync recursive ^\\.\\/([^\\\\\\/]+)\\.js$");
req.keys().forEach(function (key) {
  var mod,
      name = key.match(/^\.\/([^\\\/]+)\.js$/),
      i = 0,
      modExport = _exports;
  name = name && name[1] || key.substr(2);
  name = name.split('/');
  mod = req(key);

  while (i < name.length - 1) {
    modExport = modExport[name[i]] = modExport[name[i]] || {}, i++;
  }

  modExport[name[i]] = Object.keys(mod).length === 1 && mod.default || mod;
});
var color = _exports.color;
var int = _exports.int;
var multi = _exports.multi;
var number = _exports.number;
/* harmony default export */ __webpack_exports__["default"] = (_exports);

/***/ }),

/***/ "./src/TweenAxis.js":
/*!**************************!*\
  !*** ./src/TweenAxis.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TweenAxis; });
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "undefined?cdfe");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "undefined?df9b");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "undefined?588e");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var shortid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! shortid */ "undefined?beec");
/* harmony import */ var shortid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(shortid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "undefined?3832");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! is */ "undefined?63a5");
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(is__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _TweenerContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TweenerContext */ "./src/TweenerContext.js");



/*
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






function setTarget(anims, target) {
  return anims.map(function (tween) {
    return _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, tween, {
      target: target
    });
  });
}

var TweenAxis =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0___default()(TweenAxis, _React$Component);

  function TweenAxis() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {};
    return _this;
  }

  var _proto = TweenAxis.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    var _this2 = this;

    if (this._tweenLines) {
      Object.keys(this._tweenLines).forEach(function (axe) {
        return _this2._previousTweener.rmScrollableAnim(_this2._tweenLines[axe], axe);
      });
    }

    delete this._previousTweener;
    delete this._previousScrollable;
  };

  _proto.render = function render() {
    var _this3 = this;

    var _this$props = this.props,
        children = _this$props.children,
        axe = _this$props.axe,
        scrollFirst = _this$props.scrollFirst,
        scrollableWindow = _this$props.scrollableWindow,
        inertia = _this$props.inertia,
        size = _this$props.size,
        defaultPosition = _this$props.defaultPosition,
        _this$props$items = _this$props.items,
        items = _this$props$items === void 0 ? [] : _this$props$items;
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_TweenerContext__WEBPACK_IMPORTED_MODULE_6__["default"].Consumer, null, function (tweener) {
      //if ( React.isValidElement(children) ) {
      //	children = React.cloneElement(
      //		children,
      //		{
      //			...tweener.tweenRef(id, style || children.props.style, initial, pos, noRef, reset),
      //			onDoubleClick: onDoubleClick && (e => onDoubleClick(e, tweener)),
      //			onClick      : onClick && (e => onClick(e, tweener))
      //		}
      //	);
      //
      //}
      if (!_this3._previousInertia || _this3._previousInertia !== inertia) {
        //....
        _this3._previousInertia = inertia;
        tweener.initAxis(axe, {
          inertia: inertia,
          size: size,
          scrollableWindow: scrollableWindow,
          defaultPosition: defaultPosition,
          scrollFirst: scrollFirst
        });
      }

      if (!_this3._previousTweener || _this3._previousTweener !== tweener) {
        // mk axe not modifiable
        _this3._previousTweener && _this3._lastTL && _this3._previousTweener.rmScrollableAnim(_this3._lastTL, axe);
        if (items.length) _this3._lastTL = tweener.addScrollableAnim(items, axe, size);
        _this3._previousTweener = tweener;
        _this3._previousTweens = items;
      } else if (_this3._previousTweens !== items) {
        _this3._lastTL && tweener.rmScrollableAnim(_this3._lastTL, axe);
        _this3._lastTL = null;
        if (items.length) _this3._lastTL = tweener.addScrollableAnim(items, axe, size);
        _this3._previousTweens = items;
      }

      return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null);
    });
  };

  return TweenAxis;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

TweenAxis.propTypes = {
  axe: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string.isRequired,
  items: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.array,
  inertia: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.any,
  defaultPosition: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number,
  size: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.any
};


/***/ }),

/***/ "./src/TweenRef.js":
/*!*************************!*\
  !*** ./src/TweenRef.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TweenRef; });
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "undefined?cdfe");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "undefined?df9b");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! is */ "undefined?63a5");
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(is__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "undefined?588e");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var shortid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! shortid */ "undefined?beec");
/* harmony import */ var shortid__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(shortid__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _TweenerContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TweenerContext */ "./src/TweenerContext.js");



/*
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





function setTarget(anims, target) {
  return anims.map(function (tween) {
    return _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, tween, {
      target: target
    });
  });
}

var TweenRef =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0___default()(TweenRef, _React$Component);

  function TweenRef() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {};
    _this.__tweenableId = shortid__WEBPACK_IMPORTED_MODULE_4___default.a.generate();
    return _this;
  }

  var _proto = TweenRef.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    var _this2 = this;

    if (this._tweenLines) {
      Object.keys(this._tweenLines).forEach(function (axe) {
        return _this2._currentTweener.rmScrollableAnim(_this2._tweenLines[axe], axe);
      });
    }

    if (this._currentTweener) {
      this._currentTweener.rmTweenRef(this.__tweenableId);

      this._currentTweener.setRootRef(undefined);
    }

    delete this._currentTweener;
    delete this._previousScrollable;
  };

  _proto.componentDidMount = function componentDidMount() {
    var _this$props = this.props,
        children = _this$props.children,
        _this$props$id = _this$props.id,
        id = _this$props$id === void 0 ? this.__tweenableId : _this$props$id,
        style = _this$props.style,
        initial = _this$props.initial,
        pos = _this$props.pos,
        noRef = _this$props.noRef,
        reset = _this$props.reset,
        tweener = _this$props.tweener,
        isRoot = _this$props.isRoot,
        tweenLines = _this$props.tweenLines,
        _this$props$onClick = _this$props.onClick,
        onClick = _this$props$onClick === void 0 ? children && children.props && children.props.onClick : _this$props$onClick,
        _this$props$onDoubleC = _this$props.onDoubleClick,
        onDoubleClick = _this$props$onDoubleC === void 0 ? children && children.props && children.props.onDoubleClick : _this$props$onDoubleC,
        target = this._currentTweener.getTweenableRef(id); //debugger


    var props = [].concat(target.style); //console.log(props)

    props.forEach(function (p) {
      return target.style[p] = "unset";
    });

    this._currentTweener._updateTweenRef(); //console.log({ ...this._currentTweener.getTweenableRef(id).style }, this._currentTweener)

  };

  _proto.render = function render() {
    var _this3 = this;

    var _this$props2 = this.props,
        children = _this$props2.children,
        _this$props2$id = _this$props2.id,
        id = _this$props2$id === void 0 ? this.__tweenableId : _this$props2$id,
        style = _this$props2.style,
        initial = _this$props2.initial,
        pos = _this$props2.pos,
        noRef = _this$props2.noRef,
        reset = _this$props2.reset,
        tweener = _this$props2.tweener,
        isRoot = _this$props2.isRoot,
        tweenLines = _this$props2.tweenLines,
        _this$props2$onClick = _this$props2.onClick,
        onClick = _this$props2$onClick === void 0 ? children && children.props && children.props.onClick : _this$props2$onClick,
        _this$props2$onDouble = _this$props2.onDoubleClick,
        onDoubleClick = _this$props2$onDouble === void 0 ? children && children.props && children.props.onDoubleClick : _this$props2$onDouble;
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_TweenerContext__WEBPACK_IMPORTED_MODULE_5__["default"].Consumer, null, function (parentTweener) {
      //@todo : should use didmount ?
      parentTweener = tweener || parentTweener;
      var twRef = parentTweener.tweenRef(id, style || children.props && children.props.style, initial, pos, noRef, reset);

      if (_this3._currentTweener !== parentTweener || _this3._previousScrollable !== tweenLines) {
        if (_this3._tweenLines) {
          Object.keys(_this3._tweenLines).forEach(function (axe) {
            return _this3._currentTweener.rmScrollableAnim(_this3._tweenLines[axe], axe);
          });
        }

        if (tweenLines && is__WEBPACK_IMPORTED_MODULE_2___default.a.array(tweenLines)) _this3._tweenLines = {
          scrollY: parentTweener.addScrollableAnim(setTarget(tweenLines, id))
        };else _this3._tweenLines = tweenLines && Object.keys(tweenLines).reduce(function (h, axe) {
          return h[axe] = parentTweener.addScrollableAnim(setTarget(tweenLines[axe], id), axe), h;
        }, {});
        if (_this3._currentTweener !== parentTweener) _this3._currentTweener && _this3._currentTweener.rmTweenRef(_this3.__tweenableId);
        twRef.style = _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, parentTweener._updateTweenRef(id));

        if (_this3.props.hasOwnProperty("isRoot")) {
          _this3._currentTweener && _this3._currentTweener.setRootRef(undefined);
          tweener.setRootRef(id);
        }

        _this3._currentTweener = parentTweener;
        _this3._previousScrollable = tweenLines;
      }

      if (react__WEBPACK_IMPORTED_MODULE_3___default.a.isValidElement(children)) {
        children = react__WEBPACK_IMPORTED_MODULE_3___default.a.cloneElement(children, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, twRef, {
          onDoubleClick: onDoubleClick && function (e) {
            return onDoubleClick(e, parentTweener);
          },
          onClick: onClick && function (e) {
            return onClick(e, parentTweener);
          }
        }));
      }

      return children;
    });
  };

  return TweenRef;
}(react__WEBPACK_IMPORTED_MODULE_3___default.a.Component);

TweenRef.propTypes = {};


/***/ }),

/***/ "./src/TweenerContext.js":
/*!*******************************!*\
  !*** ./src/TweenerContext.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "undefined?588e");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/*
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

var TweenerContext = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext(null);
/* harmony default export */ __webpack_exports__["default"] = (TweenerContext);

/***/ }),

/***/ "./src/asTweener.js":
/*!**************************!*\
  !*** ./src/asTweener.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return asTweener; });
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "undefined?e4e5");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "undefined?cdfe");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "undefined?df9b");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var d3_ease__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-ease */ "undefined?25b8");
/* harmony import */ var d3_ease__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(d3_ease__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! is */ "undefined?63a5");
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(is__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "undefined?588e");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-dom */ "undefined?5e9a");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var tween_axis__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tween-axis */ "undefined?a9ee");
/* harmony import */ var tween_axis__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(tween_axis__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _helpers_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./helpers/css */ "./src/helpers/css/index.js");
/* harmony import */ var _helpers_Inertia__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./helpers/Inertia */ "./src/helpers/Inertia.js");
/* harmony import */ var _TweenerContext__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./TweenerContext */ "./src/TweenerContext.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils */ "./src/utils.js");




/*
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









/**
 * @todo : clean & comments
 */

var isBrowserSide = new Function("try {return this===window;}catch(e){ return false;}")(),
    isArray = is__WEBPACK_IMPORTED_MODULE_4___default.a.array,
    _live,
    lastTm,
    _running = [];

var SimpleObjectProto = {}.constructor;
var Runner = {
  run: function run(tl, ctx, duration, cb) {
    var apply = function apply(pos, size) {
      return tl.go(pos / size, ctx);
    };

    _running.push({
      apply: apply,
      duration: duration,
      cpos: 0,
      cb: cb
    });

    tl.go(0, ctx, true); //reset tl

    if (!_live) {
      _live = true;
      lastTm = Date.now(); // console.log("TL runner On");

      setTimeout(this._tick, 16);
    }
  },
  _tick: function _tick() {
    var i = 0,
        o,
        tm = Date.now(),
        delta = tm - lastTm;
    lastTm = tm;

    for (; i < _running.length; i++) {
      _running[i].cpos = Math.min(delta + _running[i].cpos, _running[i].duration); //cpos

      _running[i].apply(_running[i].cpos, _running[i].duration); // console.log("TL runner ",_running[i][3]);


      if (_running[i].cpos == _running[i].duration) {
        _running[i].cb && setTimeout(_running[i].cb);
        _running.splice(i, 1), i--;
      }
    }

    if (_running.length) setTimeout(_tick, 16);else {
      // console.log("TL runner Off");
      _live = false;
    }
  }
};
/**
 * asTweener decorator
 * @param argz
 * @returns {*}
 */

function asTweener() {
  var _class, _temp;

  for (var _len = arguments.length, argz = new Array(_len), _key = 0; _key < _len; _key++) {
    argz[_key] = arguments[_key];
  }

  var BaseComponent = (!argz[0] || argz[0].prototype instanceof react__WEBPACK_IMPORTED_MODULE_5___default.a.Component || argz[0] === react__WEBPACK_IMPORTED_MODULE_5___default.a.Component) && argz.shift(),
      opts = (!argz[0] || argz[0] instanceof SimpleObjectProto) && argz.shift() || {};

  if (!BaseComponent) {
    return function (BaseComponent) {
      return asTweener(BaseComponent, opts);
    };
  }

  opts = _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({
    wheelRatio: 5,
    maxClickTm: 200,
    maxClickOffset: 100
  }, opts);
  return _temp = _class =
  /*#__PURE__*/
  function (_BaseComponent) {
    _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1___default()(TweenableComp, _BaseComponent);

    function TweenableComp() {
      var _this;

      _this = _BaseComponent.apply(this, arguments) || this;

      _this._updateNodeInertia = function () {
        var _ = _this._,
            current,
            ln = _.activeInertia.length;
        if (_this._inertiaRaf) cancelAnimationFrame(_this._inertiaRaf);

        for (var i = 0; ln > i; i++) {
          current = _.activeInertia[i];

          if (current.inertia.x.active || current.inertia.x.holding) {
            current.target.scrollLeft = ~~current.inertia.x.update();
          }

          if (current.inertia.y.active || current.inertia.y.holding) {
            current.target.scrollTop = ~~current.inertia.y.update();
          }

          if (!current.inertia.x.active && !current.inertia.y.active && !current.inertia.x.holding && !current.inertia.y.holding) {
            _.activeInertia.slice(i, 1);

            i--;
            ln--;
          }
        }

        if (ln !== 0) _this._inertiaRaf = requestAnimationFrame(_this._updateNodeInertia);else _this._inertiaRaf = null;
      };

      _this._ = {
        refs: {},
        muxByTarget: {}
      };
      _this._.box = {
        x: 100,
        y: 100,
        z: 800
      };
      _this._._rafLoop = _this._rafLoop.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this));
      _this.__isTweener = true;
      return _this;
    }

    var _proto = TweenableComp.prototype;

    _proto.resetTweenable = function resetTweenable() {
      var _this2 = this;

      var _ = this._;

      for (var _len2 = arguments.length, targets = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        targets[_key2] = arguments[_key2];
      }

      targets.forEach(function (t) {
        _this2.tweenRef(t, _.tweenRefOriginCss[t], _.iMapOrigin[t], null, null, true);
      });

      this._updateTweenRefs();
    }
    /**
     * Register tweenable element
     * return its current style
     * @param id
     * @param iStyle
     * @param iMap
     * @param pos
     * @param noref
     * @param mapReset
     * @returns {style,ref}
     */
    ;

    _proto.tweenRef = function tweenRef(id, iStyle, iMap, pos, noref, mapReset) {
      // ref initial style
      this.makeTweenable();
      var _ = this._,
          tweenableMap = {};
      var initials = {};
      if (!_.tweenRefs[id]) _.tweenRefTargets.push(id);

      if (_.tweenRefs[id] && (_.iMapOrigin[id] !== iMap || mapReset)) {
        // hot switch initial values
        _.iMapOrigin[id] = iMap;
        iStyle = iStyle || {};
        iMap = iMap || {};

        if (mapReset) {
          _.muxByTarget[id] = {};
          _.muxDataByTarget[id] = {};
          Object.keys(_.tweenRefCSS[id]) // unset
          .forEach(function (key) {
            return iStyle[key] = iStyle[key] || '';
          });
          _.tweenRefMaps[id] = tweenableMap = _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({}, _.tweenRefOrigin[id]);
          iStyle = _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({}, iStyle, Object(_helpers_css__WEBPACK_IMPORTED_MODULE_8__["deMuxTween"])(iMap, tweenableMap, initials, _.muxDataByTarget[id], _.muxByTarget[id], true));
          Object.assign(_.tweenRefCSS[id], _.tweenRefOriginCss[id]);
        } else {
          _.muxByTarget[id] = {}; // should reset only a part of.. complex
          //_.muxDataByTarget[id] = {};

          iStyle = _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({}, iStyle, Object(_helpers_css__WEBPACK_IMPORTED_MODULE_8__["deMuxTween"])(iMap, tweenableMap, initials, _.muxDataByTarget[id], _.muxByTarget[id], true, true)); // minus initial values

          Object.keys(_.tweenRefOrigin[id]).forEach(function (key) {
            return _.tweenRefMaps[id][key] -= _.tweenRefOrigin[id][key];
          }); // set defaults values in case of

          Object.keys(initials).forEach(function (key) {
            return _.tweenRefMaps[id][key] = is__WEBPACK_IMPORTED_MODULE_4___default.a.number(_.tweenRefMaps[id][key]) ? _.tweenRefMaps[id][key] : initials[key];
          }); // add new initial values

          Object.keys(tweenableMap).forEach(function (key) {
            return _.tweenRefMaps[id][key] += tweenableMap[key];
          });
          Object.keys(_.tweenRefMaps[id]) // unset
          .forEach(function (key) {
            //key == "width" &&
            if (_.tweenRefOrigin[id].hasOwnProperty(key) && !tweenableMap.hasOwnProperty(key)) {
              delete _.tweenRefMaps[id][key];
              delete _.muxByTarget[id][key];
            }
          });
          _.tweenRefOrigin[id] = _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({}, tweenableMap);
          _.tweenRefOriginCss[id] = _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({}, iStyle);
        } //let newCss        = {};
        //_.tweenRefMaps[t] = { ..._.tweenRefOrigin[t] };


        Object(_helpers_css__WEBPACK_IMPORTED_MODULE_8__["muxToCss"])(_.tweenRefMaps[id], _.tweenRefCSS[id], _.muxByTarget[id], _.muxDataByTarget[id], _.box);
      } else if (!_.tweenRefs[id]) {
        _.iMapOrigin[id] = iMap;
        iStyle = iStyle || {};
        iMap = iMap || {};
        _.tweenRefs[id] = true;
        _.muxByTarget[id] = _.muxByTarget[id] || {};
        _.muxDataByTarget[id] = _.muxDataByTarget[id] || {};
        iStyle = _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({}, iStyle, Object(_helpers_css__WEBPACK_IMPORTED_MODULE_8__["deMuxTween"])(iMap, tweenableMap, initials, _.muxDataByTarget[id], _.muxByTarget[id], true)); //_.tweenRefUnits[id] = extractUnits(iMap);
        //}

        _.tweenRefOrigin[id] = tweenableMap;
        _.tweenRefOriginCss[id] = _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({}, iStyle);
        _.tweenRefCSS[id] = iStyle;
        _.tweenRefMaps[id] = _.tweenRefMaps[id] || {}; // if this ref was initialized by its scroll anims we minus initial values

        Object.keys(tweenableMap).forEach(function (key) {
          if (_.tweenRefMaps[id].hasOwnProperty(key)) _.tweenRefMaps[id][key] -= initials[key];
        }); //
        // init / reset or get the tweenable view

        tweenableMap = Object.assign({}, initials, tweenableMap || {}); // set defaults values in case of
        // add new initial values

        Object.keys(tweenableMap).forEach(function (key) {
          return _.tweenRefMaps[id][key] = (_.tweenRefMaps[id][key] || 0) + tweenableMap[key];
        });
        tweenableMap = _.tweenRefMaps[id];
        Object(_helpers_css__WEBPACK_IMPORTED_MODULE_8__["muxToCss"])(tweenableMap, iStyle, _.muxByTarget[id], _.muxDataByTarget[id], _.box);
      } //console.log('tweenRef::tweenRef:519: ', id, { ...tweenableMap });


      if (noref) return {
        style: _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({}, _.tweenRefCSS[id])
      };else return {
        style: _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({}, _.tweenRefCSS[id]),
        ref: function ref(node) {
          return _.refs[id] = node;
        } // __tweenMap : this._.tweenRefMaps[id],
        // __tweenCSS : this._.tweenRefCSS[id]

      };
    };

    _proto.rmTweenRef = function rmTweenRef(id) {
      if (this._.tweenRefs[id]) {
        this._.tweenRefTargets.splice(this._.tweenRefTargets.indexOf(id), 1);

        delete this._.tweenRefs[id];
        delete this._.muxByTarget[id];
        delete this._.muxDataByTarget[id];
        delete this._.iMapOrigin[id];
        delete this._.tweenRefOrigin[id];
        delete this._.tweenRefCSS[id];
        delete this._.tweenRefMaps[id];
        delete this._.refs[id];
      }
    };

    _proto.setRootRef = function setRootRef(id) {
      this._.rootRef = id;
    } // ------------------------------------------------------------
    // -------------------- Pushable anims ------------------------
    // ------------------------------------------------------------

    /**
     * Push anims
     * @param anim
     * @param then
     * @param skipInit
     * @returns {rTween}
     */
    ;

    _proto.pushAnim = function pushAnim(anim, then, skipInit) {
      var _this3 = this;

      var sl,
          initial,
          muxed,
          initials = {};

      if (isArray(anim)) {
        sl = anim;
      } else {
        sl = anim.anims;
        initial = anim.initial;
      }

      if (!(sl instanceof tween_axis__WEBPACK_IMPORTED_MODULE_7___default.a)) {
        // tweenLine, initials, data, demuxers
        sl = Object(_helpers_css__WEBPACK_IMPORTED_MODULE_8__["deMuxLine"])(sl, initials, this._.muxDataByTarget, this._.muxByTarget);
        sl = new tween_axis__WEBPACK_IMPORTED_MODULE_7___default.a(sl, this._.tweenRefMaps);
        Object.keys(initials).forEach(function (id) {
          return Object.assign(_this3._.tweenRefMaps[id], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({}, initials[id], _this3._.tweenRefMaps[id]));
        });
      } // console.warn("Should start anim ", sl);


      this.makeTweenable();
      !skipInit && initial && Object.keys(initial).map(function (id) {
        return _this3.applyTweenState(id, initial[id], anim.reset);
      });
      sl.run(this._.tweenRefMaps, function () {
        var i = _this3._.runningAnims.indexOf(sl);

        if (i != -1) _this3._.runningAnims.splice(i, 1);
        then && then(sl);
      }); //launch

      this._.runningAnims.push(sl);

      if (!this._.live) {
        this._.live = true; //console.log("RAF On");

        requestAnimationFrame(this._._rafLoop = this._._rafLoop || this._rafLoop.bind(this));
      }

      return sl;
    };

    _proto.registerPropChangeAnim = function registerPropChangeAnim(propId, propValue, anims) {
      this._.rtweensByProp = this._.rtweensByProp || {};
      this._.rtween = this._.rtween || new tween_axis__WEBPACK_IMPORTED_MODULE_7___default.a();
      this._.rtweensByProp[propId] = this._.rtweensByProp[propId] || {};
      this._.rtweensByProp[propId][propValue] = this._.rtweensByProp[propId][propValue] || new tween_axis__WEBPACK_IMPORTED_MODULE_7___default.a();

      this._.rtweensByProp[propId][propValue].mount(anims);
    };

    _proto.registerStateChangeAnim = function registerStateChangeAnim(propId, propValue, anims) {
      this._.rtweensByStateProp = this._.rtweensByStateProp || {};
      this._.rtween = this._.rtween || new tween_axis__WEBPACK_IMPORTED_MODULE_7___default.a();
      this._.rtweensByStateProp[propId] = this._.rtweensByStateProp[propId] || {};
      this._.rtweensByStateProp[propId][propValue] = this._.rtweensByStateProp[propId][propValue] || new tween_axis__WEBPACK_IMPORTED_MODULE_7___default.a();

      this._.rtweensByStateProp[propId][propValue].mount(anims);
    };

    _proto.makeTweenable = function makeTweenable() {
      var _this4 = this;

      if (!this._.tweenEnabled) {
        this._.rtweensByProp = {};
        this._.rtweensByStateProp = {};
        this._.tweenRefCSS = {};
        this._.tweenRefs = {};
        this._.tweenRefMaps = {};
        this._.iMapOrigin = {};
        this._.tweenRefInitialData = {};
        this._.tweenEnabled = true;
        this._.tweenRefOrigin = {};
        this._.tweenRefOriginCss = {};
        this._.axes = {};
        this._.muxDataByTarget = this._.muxDataByTarget || {};
        this._.tweenRefDemuxed = this._.tweenRefDemuxed || {};
        this._.tweenRefTargets = this._.tweenRefTargets || [];
        this._.runningAnims = this._.runningAnims || [];
        isBrowserSide && window.addEventListener("resize", this._.onResize = function () {
          //@todo
          _this4._updateBox();

          _this4._updateTweenRefs();
        });
      }
    } // ------------------------------------------------------------
    // ------------------ Scrollable anims ------------------------
    // ------------------------------------------------------------

    /**
     * Tween this tween line to 'to' during 'tm' ms using easing fn
     * @param to {int}
     * @param tm {int} duration in ms
     * @param easing {function} easing fn
     * @param tick {function} fn called at each tick
     * @param cb {function} fn called on complete
     */
    ;

    _proto._runScrollGoTo = function _runScrollGoTo(axe, to, tm, easing, tick, cb) {
      var _this5 = this;

      if (easing === void 0) {
        easing = function easing(x) {
          return x;
        };
      }

      var from = this._.axes[axe].scrollPos,
          length = to - from;

      _running.push({
        apply: function apply(pos, max) {
          var x = from + easing(pos / max) * length;

          if (_this5._.tweenEnabled) {
            //console.log('TweenableComp::setPos:514: ', x);
            _this5._.axes[axe].tweenLines.forEach(function (sl) {
              return sl.goTo(x, _this5._.tweenRefMaps);
            });

            tick && tick(x);
          }
        },
        duration: tm,
        cpos: 0,
        cb: cb
      });

      if (!_live) {
        _live = true;
        lastTm = Date.now(); // console.log("TL runner On");

        setTimeout(Runner._tick, 16);
      }
    };

    _proto._getAxis = function _getAxis(axe) {
      if (axe === void 0) {
        axe = "scrollY";
      }

      var _ = this._;
      _.axes[axe] = _.axes[axe] || {
        tweenLines: [],
        scrollPos: opts.initialScrollPos && opts.initialScrollPos[axe] || 0,
        targetPos: 0,
        scrollableWindow: 0,
        scrollableArea: 0,
        inertia: new _helpers_Inertia__WEBPACK_IMPORTED_MODULE_9__["default"](_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({
          value: opts.initialScrollPos && opts.initialScrollPos[axe] || 0
        }, opts.axes && opts.axes[axe] && opts.axes[axe].inertia || {}))
      };
      return _.axes[axe];
    };

    _proto.getAxisState = function getAxisState() {
      var _ = this._,
          state = {};
      _.axes && Object.keys(_.axes).forEach(function (axe) {
        return state[axe] = _.axes[axe].targetPos || _.axes[axe].scrollPos;
      });
      return state;
    };

    _proto.initAxis = function initAxis(axe, _ref) {
      var _inertia = _ref.inertia,
          _ref$scrollableArea = _ref.scrollableArea,
          _scrollableArea = _ref$scrollableArea === void 0 ? 0 : _ref$scrollableArea,
          _scrollableWindow = _ref.scrollableWindow,
          defaultPosition = _ref.defaultPosition,
          scrollFirst = _ref.scrollFirst;

      this.makeTweenable();
      this.makeScrollable();

      var _ = this._,
          dim = _.axes[axe],
          scrollPos = dim ? dim.scrollPos : defaultPosition || 0,
          scrollableArea = Math.max(dim && dim.scrollableArea || 0, _scrollableArea),
          scrollableWindow = Math.max(dim && dim.scrollableWindow || 0, _scrollableWindow),
          targetPos = dim ? dim.targetPos : scrollPos,
          inertia = _inertia !== false && (dim ? dim.inertia : new _helpers_Inertia__WEBPACK_IMPORTED_MODULE_9__["default"](_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({}, _inertia || {}, {
        value: scrollPos
      }))),
          nextDescr = _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({}, _inertia || {}, {
        scrollFirst: scrollFirst,
        tweenLines: dim && dim.tweenLines || [],
        scrollPos: scrollPos,
        targetPos: targetPos,
        inertia: inertia,
        scrollableWindow: scrollableWindow,
        scrollableArea: scrollableArea
      });

      dim = this._.axes[axe] = nextDescr; //console.log('TweenableComp::initAxis:519: ', axe, dim.scrollPos);

      _inertia && (dim.inertia._.wayPoints = _inertia.wayPoints); //(_inertia) && (dim.inertia._.pos = scrollPos);
    };

    _proto.addScrollableAnim = function addScrollableAnim(anim, axe, size) {
      var _this6 = this;

      if (axe === void 0) {
        axe = "scrollY";
      }

      var sl,
          _ = this._,
          initials = {},
          dim = this._getAxis(axe);

      if (isArray(anim)) {
        sl = anim;
      } else {
        sl = anim.anims;
        size = anim.length;
      }

      if (!(sl instanceof tween_axis__WEBPACK_IMPORTED_MODULE_7___default.a)) {
        sl = Object(_helpers_css__WEBPACK_IMPORTED_MODULE_8__["deMuxLine"])(sl, initials, this._.muxDataByTarget, this._.muxByTarget);
        sl = new tween_axis__WEBPACK_IMPORTED_MODULE_7___default.a(sl, _.tweenRefMaps);
        Object.keys(initials).forEach(function (id) {
          _this6._.tweenRefMaps[id] = _this6._.tweenRefMaps[id] || {}, Object.assign(_this6._.tweenRefMaps[id], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({}, initials[id], _this6._.tweenRefMaps[id]));
        });
      }

      this.makeTweenable();
      this.makeScrollable(); // init scroll

      dim.tweenLines.push(sl);
      dim.scrollPos = dim.scrollPos || 0;
      dim.scrollableArea = dim.scrollableArea || 0;
      dim.scrollableArea = Math.max(dim.scrollableArea, sl.duration);
      dim.inertia.setBounds(0, dim.scrollableArea);
      sl.goTo(dim.scrollPos, this._.tweenRefMaps);

      this._updateTweenRefs(); //console.log('TweenableComp::addScrollableAnim:519: ', axe, dim.scrollPos);


      return sl;
    };

    _proto.rmScrollableAnim = function rmScrollableAnim(sl, axe) {
      if (axe === void 0) {
        axe = "scrollY";
      }

      var _ = this._,
          found,
          dim = this._getAxis(axe);

      var i = dim.tweenLines.indexOf(sl);

      if (i != -1) {
        dim.tweenLines.splice(i, 1);
        dim.scrollableArea = Math.max.apply(Math, dim.tweenLines.map(function (tl) {
          return tl.duration;
        }).concat([0]));
        dim.inertia.setBounds(0, dim.scrollableArea || 0);
        sl.goTo(0, this._.tweenRefMaps);
        found = true;
      }

      !found && console.warn("TweenAxis not found !");
    };

    _proto.scrollTo = function scrollTo(newPos, ms, axe, ease) {
      var _this7 = this;

      if (ms === void 0) {
        ms = 0;
      }

      if (axe === void 0) {
        axe = "scrollY";
      }

      return new Promise(function (resolve, reject) {
        if (_this7._.axes && _this7._.axes[axe]) {
          var oldPos = _this7._.axes[axe].targetPos,
              setPos = function setPos(pos) {
            //console.log('TweenableComp::setPos:514: ', this.constructor.displayName);
            _this7._.axes[axe].targetPos = _this7._.axes[axe].scrollPos = pos;

            if (_this7._.axes[axe].inertia) {
              _this7._.axes[axe].inertia.setPos(pos); //this._.axes[axe].inertia._doSnap()

            }

            _this7.componentDidScroll && _this7.componentDidScroll(~~pos, axe);

            _this7._updateTweenRefs();
          };

          newPos = Math.max(0, newPos);
          newPos = Math.min(newPos, _this7._.axes[axe].scrollableArea || 0);
          _this7._.axes[axe].targetPos = newPos;

          if (!ms) {
            _this7._.axes[axe].tweenLines.forEach(function (sl) {
              return sl.goTo(newPos, _this7._.tweenRefMaps);
            });

            setPos(newPos);
            resolve();
          } else {
            _this7._runScrollGoTo(axe, newPos, ms, d3_ease__WEBPACK_IMPORTED_MODULE_3__[ease], setPos, resolve);
          }

          if (!_this7._.live) {
            _this7._.live = true;
            requestAnimationFrame(_this7._._rafLoop);
          } //return !(oldPos - newPos);

        }
      });
    };

    _proto.makeScrollable = function makeScrollable() {
      if (!this._.scrollEnabled) {
        this._.scrollEnabled = true;
        this._.scrollHook = [];
        this._.activeInertia = [];

        this._registerScrollListeners();
      }
    };

    _proto.getScrollableNodes = function getScrollableNodes(node) {
      var _this8 = this;

      var scrollable = _utils__WEBPACK_IMPORTED_MODULE_11__["default"].findReactParents(node);
      scrollable = this.hookScrollableTargets && this.hookScrollableTargets(scrollable) || scrollable;
      return scrollable.map(function (id) {
        return is__WEBPACK_IMPORTED_MODULE_4___default.a.string(id) ? _this8._.refs[id] && react_dom__WEBPACK_IMPORTED_MODULE_6___default.a.findDOMNode(_this8._.refs[id]) || _this8.refs[id] || document.getElementById(id) : id;
      });
    };

    _proto._registerScrollListeners = function _registerScrollListeners() {
      var _this9 = this;

      var _static = this.constructor,
          _ = this._;

      if (this._.rendered) {
        var rootNode = this.getRootNode(),
            debounceTm = 0,
            debounceTr = 0,
            scrollLoad = {
          x: 0,
          y: 0
        },
            lastScrollEvt;

        if (!this._parentTweener && isBrowserSide) {
          if (!rootNode) console.warn("fail registering scroll listener !! ");else _utils__WEBPACK_IMPORTED_MODULE_11__["default"].addWheelEvent(rootNode, this._.onScroll = function (e) {
            //@todo
            var now = Date.now(),
                prevent;
            scrollLoad.y += e.deltaY;
            scrollLoad.x += e.deltaX;
            lastScrollEvt = e.originalEvent; //debounceTm    = debounceTm || now;
            //if ( debounceTr && debounceTm + 500 < now ) {
            //
            //	clearTimeout(debounceTr)
            //	this._doDispatch(document.elementFromPoint(lastScrollEvt.clientX,
            // lastScrollEvt.clientY), scrollLoad.x * 5, scrollLoad.y * 5) scrollLoad.y = 0;
            // scrollLoad.x = 0; debounceTm   = 0; //debounceTm = now; return; }
            // clearTimeout(debounceTr) //debounceTm = now; debounceTr = setTimeout( tm => {
            // debugger

            prevent = _this9._doDispatch(document.elementFromPoint(lastScrollEvt.clientX, lastScrollEvt.clientY), scrollLoad.x * 5, scrollLoad.y * 5);
            scrollLoad.y = 0;
            scrollLoad.x = 0;
            debounceTm = 0;
            debounceTr = lastScrollEvt = undefined;

            if (prevent) {
              e.originalEvent.stopPropagation();
              e.originalEvent.preventDefault();
            } //	},
            //	50
            //)
            // check if there scrollable stuff in dom targets


            ;
          });
          var lastStartTm, cLock, dX, parents, dY, parentsState;
          if (!rootNode) console.warn("fail registering drag listener !! ");else _utils__WEBPACK_IMPORTED_MODULE_11__["default"].addEvent(rootNode, this._.dragList = {
            'dragstart': function dragstart(e, touch, descr) {
              //@todo
              var tweener, x, y, i, style;
              parents = _this9.getScrollableNodes(e.target); //console.log("start")

              lastStartTm = Date.now();
              dX = 0;
              dY = 0;
              parentsState = []; //document.body.style.touchAction = 'none';
              //document.body.style.userSelect  = 'none';

              for (i = 0; i < parents.length; i++) {
                tweener = parents[i]; // react comp with tweener support

                if (tweener.__isTweener && tweener._.scrollEnabled) {
                  x = tweener._getAxis("scrollX");
                  y = tweener._getAxis("scrollY"); //x.inertia.startMove();
                  //y.inertia.startMove();
                  //parentsState[i] = { x: x.scrollPos, y: y.scrollPos };
                  //!x.inertiaFrame && tweener.applyInertia(x, "scrollX");
                  //!y.inertiaFrame && tweener.applyInertia(y, "scrollY");
                } else if (is__WEBPACK_IMPORTED_MODULE_4___default.a.element(tweener)) {
                  style = getComputedStyle(tweener, null);

                  if (/(auto|scroll)/.test(style.getPropertyValue("overflow") + style.getPropertyValue("overflow-x") + style.getPropertyValue("overflow-y"))) {
                    parentsState[i] = {
                      y: tweener.scrollTop,
                      x: tweener.scrollLeft,
                      scrollX: /(auto|scroll)/.test(style.getPropertyValue("overflow-x")),
                      scrollY: /(auto|scroll)/.test(style.getPropertyValue("overflow-y")) //inertia: this._activateNodeInertia(tweener)

                    }; //parentsState[i].inertia.x.startMove();
                    //parentsState[i].inertia.y.startMove();
                  }
                }
              }

              _this9._updateNodeInertia(); //e.stopPropagation();
              //e.preventDefault();

            },
            'click': function click(e, touch, descr) {
              //@todo
              if (lastStartTm && !(lastStartTm > Date.now() - opts.maxClickTm && Math.abs(dY) < opts.maxClickOffset && Math.abs(dX) < opts.maxClickOffset)) // skip tap & click
                {
                  e.preventDefault();
                  e.stopPropagation(); //console.log("prevented click", Math.abs(dX), Math.abs(dY))
                  //console.log(':o ' + (lastStartTm - Date.now()) + ' ' + dX + ' ' + dY)
                } //else console.log("click", Math.abs(dX), Math.abs(dY))

            },
            'drag': function drag(e, touch, descr) {
              //@todo
              var tweener, x, deltaX, xDispatched, vX, y, deltaY, yDispatched, vY, cState, i;
              dX = -(descr._lastPos.x - descr._startPos.x);
              dY = -(descr._lastPos.y - descr._startPos.y);

              if (lastStartTm && lastStartTm > Date.now() - opts.maxClickTm && Math.abs(dY) < opts.maxClickOffset && Math.abs(dX) < opts.maxClickOffset) // skip tap & click
                {
                  //console.log(':u ' + (lastStartTm - Date.now()) + ' ' + dX + ' ' + dY)
                  return;
                } else {
                xDispatched = !dX;
                yDispatched = !dY;

                if (opts.dragDirectionLock) {
                  if (cLock === "Y" || !cLock && Math.abs(dY * .5) > Math.abs(dX)) {
                    cLock = "Y";
                    dX = 0; //xDispatched = true;
                  } else if (cLock === "X" || !cLock && Math.abs(dX * .5) > Math.abs(dY)) {
                    cLock = "X";
                    dY = 0; //yDispatched = true;
                  }
                } //console.log("drag", dX, dY, cLock, opts.dragDirectionLock);


                for (i = 0; i < parents.length; i++) {
                  tweener = parents[i]; // react comp with tweener support

                  if (tweener.__isTweener && tweener._.scrollEnabled) {
                    x = tweener._getAxis("scrollX");
                    y = tweener._getAxis("scrollY");

                    if (!parentsState[i]) {
                      parentsState[i] = {
                        x: x.scrollPos,
                        y: y.scrollPos
                      };
                      x.inertia.startMove();
                      y.inertia.startMove();
                      !x.inertiaFrame && tweener.applyInertia(x, "scrollX");
                      !y.inertiaFrame && tweener.applyInertia(y, "scrollY");
                    }

                    deltaX = dX && dX / tweener._.box.x * (x.scrollableWindow || x.scrollableArea) || 0;
                    deltaY = dY && dY / tweener._.box.y * (y.scrollableWindow || y.scrollableArea) || 0;

                    if (!xDispatched && !tweener.isAxisOut("scrollX", parentsState[i].x + deltaX, true) && (!tweener.componentShouldScroll || tweener.componentShouldScroll("scrollX", deltaX))) {
                      x.inertia.hold(parentsState[i].x + deltaX);
                      xDispatched = true;
                    } //console.log("scrollY", tweener.isAxisOut("scrollY", parentsState[i].y
                    // + deltaY, true));


                    if (!yDispatched && !tweener.isAxisOut("scrollY", parentsState[i].y + deltaY, true) && (!tweener.componentShouldScroll || tweener.componentShouldScroll("scrollY", deltaY))) {
                      y.inertia.hold(parentsState[i].y + deltaY);
                      yDispatched = true;
                    }
                  } else if (is__WEBPACK_IMPORTED_MODULE_4___default.a.element(tweener)) {
                    cState = parentsState[i];

                    if (cState) {
                      if (!yDispatched && cState.scrollY && (dY < 0 && tweener.scrollTop !== 0 || dY > 0 && tweener.scrollTop !== tweener.scrollHeight - tweener.clientHeight)) {
                        //cState.lastY = cState.y + dY;
                        //
                        //tweener.scrollTo({
                        //	                 top: cState.y + dY,
                        //	                 //left    : undefined,
                        //	                 //behavior: 'smooth'
                        //                 })
                        //tweener.dispatchEvent(e)
                        //cState.inertia.y.hold(cState.y + dY)
                        //tweener.scrollTop = cState.y + dY;
                        if (opts.dragDirectionLock && cLock === "Y") return;else if (!opts.dragDirectionLock) {
                          return;
                        }
                        yDispatched = true;
                      } // let the node do this scroll


                      if (!xDispatched && cState.scrollX && (dX < 0 && tweener.scrollLeft !== 0 || dX > 0 && tweener.scrollLeft !== tweener.scrollWidth - tweener.clientWidth)) {
                        //cState.lastX = cState.x + dX;
                        //tweener.scrollTo({
                        //	                 left: cState.x + dX,
                        //	                 //behavior: 'smooth'
                        //                 })
                        //tweener.dispatchEvent(e)
                        //tweener.scrollTo(style.x + dX)
                        //cState.inertia.x.hold(cState.x + dX)
                        //tweener.scrollLeft = cState.x + dX;
                        xDispatched = true;
                      } // let the node do this scroll

                    }
                  }
                }

                if (yDispatched && xDispatched) {
                  e.stopPropagation();
                  e.preventDefault(); //return;
                } //dX = 0;
                //dY = 0;

              }
            },
            'dropped': function dropped(e, touch, descr) {
              var tweener, x, deltaX, xDispatched, vX, y, deltaY, yDispatched, vY, cState, i;
              cLock = undefined; //lastStartTm                     = undefined;
              //document.body.style.userSelect  = '';
              //document.body.style.touchAction = '';

              for (i = 0; i < parents.length; i++) {
                tweener = parents[i]; // react comp with tweener support

                if (tweener.__isTweener && tweener._.scrollEnabled && parentsState[i]) {
                  tweener._getAxis("scrollY").inertia.release();

                  tweener._getAxis("scrollX").inertia.release();
                } //else if ( is.element(tweener) ) {
                //	cState = parentsState[i];
                //	if ( cState ) {
                //		cState.inertia.x.release();
                //		cState.inertia.y.release();
                //	}
                //}

              }

              if (lastStartTm && lastStartTm > Date.now() - opts.maxClickTm && Math.abs(dY) < opts.maxClickOffset && Math.abs(dX) < opts.maxClickOffset) // skip tap
                // &
                // click
                {
                  e.stopPropagation();
                  e.preventDefault(); //console.log("prevented", Math.abs(dX), Math.abs(dY))

                  return;
                } else {} //console.log("not prevented", Math.abs(dX), Math.abs(dY))
              //lastStartTm = 0;


              parents = parentsState = null;
            }
          }, null, opts.enableMouseDrag);
        }

        this._.doRegister = !!rootNode;
      } else {
        this._.doRegister = true;
      }
    } // ------------------------------------------------------------
    // --------------- Inertia & scroll modifiers -----------------
    // ------------------------------------------------------------
    ;

    _proto.applyInertia = function applyInertia(dim, axe) {
      var _this10 = this;

      var x = dim.inertia.update();

      this._.axes[axe].tweenLines.forEach(function (sl) {
        _this10._.axes[axe].targetPos = _this10._.axes[axe].scrollPos = x;
        sl.goTo(x, _this10._.tweenRefMaps);
      }); //console.log("scroll at " + x, axe, dim.inertia.active || dim.inertia.holding);
      //this.scrollTo(x, 0, axe);


      this.componentDidScroll && this.componentDidScroll(x, axe);

      this._updateTweenRefs();

      if (dim.inertia.active || dim.inertia.holding) {
        dim.inertiaFrame = setTimeout(this.applyInertia.bind(this, dim, axe));
      } else {
        dim.inertiaFrame = null; //console.log("complete");
      }
    };

    _proto.isInertiaActive = function isInertiaActive() {
      //todo
      var _ = this._,
          active = false;
      _.axes && Object.keys(_.axes).forEach(function (axe) {
        return active = active || _.axes[axe] && _.axes[axe].inertia.active;
      });
      return active;
    };

    _proto._activateNodeInertia = function _activateNodeInertia(node) {
      var _ = this._,
          i = _.activeInertia.findIndex(function (item) {
        return item.target === node;
      });

      if (i === -1) {
        _.activeInertia.push({
          inertia: {
            x: new _helpers_Inertia__WEBPACK_IMPORTED_MODULE_9__["default"]({
              max: node.scrollWidth - node.offsetLeft,
              value: node.scrollLeft
            }),
            y: new _helpers_Inertia__WEBPACK_IMPORTED_MODULE_9__["default"]({
              max: node.scrollHeight - node.offsetHeight,
              value: node.scrollTop
            })
          },
          target: node
        });

        i = _.activeInertia.length - 1;
      }

      return _.activeInertia[i].inertia;
    };

    _proto.dispatchScroll = function dispatchScroll(delta, axe) {
      if (axe === void 0) {
        axe = "scrollY";
      }

      var prevent,
          dim = this._.axes[axe],
          oldPos = dim && dim.scrollPos,
          newPos = oldPos + delta;

      if (dim && oldPos !== newPos) {
        //console.log("dispatch " + delta, this.constructor.displayName);
        dim.inertia.dispatch(delta, 100);
        !dim.inertiaFrame && this.applyInertia(dim, axe); //this.scrollTo(newPos, 0, axe)
      }

      return prevent;
    };

    _proto.isAxisOut = function isAxisOut(axis, v, abs) {
      var _ = this._,
          dim = _.axes && _.axes[axis],
          pos = abs ? v : dim && dim.scrollPos + v;
      return !dim || pos <= 0 || pos >= dim.scrollableArea;
    };

    _proto._doDispatch = function _doDispatch(target, dx, dy, holding) {
      var style,
          Comps,
          headTarget = target,
          nodeInertia,
          i; // check if there scrollable stuff in dom targets
      // get all the parents components & dom node of an dom element ( from fibers )

      Comps = this.getScrollableNodes(headTarget); //console.log("dispatching ", dx, dy, Comps);

      for (i = 0; i < Comps.length; i++) {
        // react comp with tweener support
        if (Comps[i].__isTweener) {
          if (!Comps[i].isAxisOut("scrollX", dx) && (!Comps[i].componentShouldScroll || Comps[i].componentShouldScroll("scrollX", dx))) {
            Comps[i].dispatchScroll(dx, "scrollX", holding);
            dx = 0;
          }

          if (!Comps[i].isAxisOut("scrollY", dy) && (!Comps[i].componentShouldScroll || Comps[i].componentShouldScroll("scrollY", dy))) {
            Comps[i].dispatchScroll(dy, "scrollY", holding);
            dy = 0;
          }
        } // dom element
        else if (is__WEBPACK_IMPORTED_MODULE_4___default.a.element(Comps[i])) {
            style = getComputedStyle(Comps[i], null);

            if (/(auto|scroll)/.test(style.getPropertyValue("overflow") + style.getPropertyValue("overflow-x") + style.getPropertyValue("overflow-y"))) {
              if (dy < 0 && Comps[i].scrollTop !== 0 || dy > 0 && Comps[i].scrollTop !== Comps[i].scrollHeight - Comps[i].clientHeight) {
                return; //nodeInertia.y.dispatch(dy * 10)
                //dy = 0;
              } // let the node do this scroll
              //if ( nodeInertia.x.isOutbound(dx) ) {
              //	nodeInertia.x.dispatch(dx * 10)
              //	dx = 0;
              //} // let the node do this scroll

            } //headTarget = headTarget.parentNode;
            //if ( headTarget === document || headTarget === target )
            //	break;

          }

        if (!dx && !dy) break;
      }

      this._updateNodeInertia();

      if (!dx && !dy) return true;
    } // ------------------------------------------------------------
    // ------------------ Motion/FSM anims ------------------------
    // ------------------------------------------------------------
    ;

    _proto.applyTweenState = function applyTweenState(id, map, reset) {
      var _this11 = this;

      var tmap = {},
          initials = {};
      Object(_helpers_css__WEBPACK_IMPORTED_MODULE_8__["deMuxTween"])(map, tmap, initials, this._.muxDataByTarget[id], this._.muxByTarget[id]);
      Object.keys(tmap).map(function (p) {
        return _this11._.tweenRefMaps[id][p] = (!reset && _this11._.tweenRefMaps[id][p] || initials[p]) + tmap[p];
      });
    };

    _proto.updateRefStyle = function updateRefStyle(target, style, postPone) {
      var _this12 = this;

      var _ = this._,
          initials = {};
      if (isArray(target) && isArray(style)) return target.map(function (m, i) {
        return _this12.updateRefStyle(m, style[i], postPone);
      });
      if (isArray(target)) return target.map(function (m) {
        return _this12.updateRefStyle(m, style, postPone);
      });
      if (!this._.tweenRefCSS) this.makeTweenable();
      Object(_helpers_css__WEBPACK_IMPORTED_MODULE_8__["deMuxTween"])(style, _.tweenRefMaps[target], initials, _.muxDataByTarget[target], _.muxByTarget[target], true);

      this._updateTweenRef(target); //Object.assign(initials, _.tweenRefCSS[target]);
      //_.tweenRefCSS[target] = initials;

    };

    _proto._updateBox = function _updateBox() {
      var node = this.getRootNode();

      if (node) {
        this._.box.inited = true;
        this._.box.x = node.offsetWidth;
        this._.box.y = node.offsetHeight;
      }
    };

    _proto.getTweenableRef = function getTweenableRef(id) {
      return this._.refs[id] && react_dom__WEBPACK_IMPORTED_MODULE_6___default.a.findDOMNode(this._.refs[id]);
    };

    _proto.getRootNode = function getRootNode() {
      return this._.rootRef && this.getTweenableRef(this._.rootRef) || react_dom__WEBPACK_IMPORTED_MODULE_6___default.a.findDOMNode(this);
    };

    _proto._rafLoop = function _rafLoop() {
      this._updateTweenRefs();

      if (this._.runningAnims.length) {
        requestAnimationFrame(this._._rafLoop);
      } else {
        //this._.live && console.log("RAF off", this.constructor.displayName);
        this._.live = false;
      }
    };

    _proto._updateTweenRefs = function _updateTweenRefs() {
      if (this._.tweenEnabled) {
        for (var i = 0, target, node, style; i < this._.tweenRefTargets.length; i++) {
          target = this._.tweenRefTargets[i];
          style = this._updateTweenRef(target);
        }
      }
    };

    _proto._updateTweenRef = function _updateTweenRef(target) {
      var node;
      this._.tweenRefCSS[target] && Object(_helpers_css__WEBPACK_IMPORTED_MODULE_8__["muxToCss"])(this._.tweenRefMaps[target], this._.tweenRefCSS[target], this._.muxByTarget[target], this._.muxDataByTarget[target], this._.box);
      node = this.getTweenableRef(target);
      node && Object.assign(node.style, this._.tweenRefCSS[target]);
      return this._.tweenRefCSS[target];
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      var node = this.getRootNode();

      if (this._.tweenEnabled) {
        this._.tweenEnabled = false;
        window.removeEventListener("resize", this._.onResize);
      }

      if (this._.scrollEnabled) {
        this._.scrollEnabled = false; //this._.axes          = undefined;

        node && this._.onScroll && !this._parentTweener && _utils__WEBPACK_IMPORTED_MODULE_11__["default"].rmWheelEvent(node, this._.onScroll);
        node && this._.dragList && _utils__WEBPACK_IMPORTED_MODULE_11__["default"].removeEvent(node, this._.dragList);
      }

      _BaseComponent.prototype.componentWillUnmount && _BaseComponent.prototype.componentWillUnmount.apply(this, arguments);
    };

    _proto.componentDidMount = function componentDidMount() {
      var _this13 = this;

      var _static = this.constructor;
      this._.rendered = true;

      if (this._.tweenEnabled) {
        // debugger;
        this._updateBox();

        this._updateTweenRefs();
      }

      if (this._.delayedMotionTarget) {
        this.goToMotionStateId(this._.delayedMotionTarget);
        delete this._.delayedMotionTarget;
      }

      if (_static.scrollableAnim) {
        if (is__WEBPACK_IMPORTED_MODULE_4___default.a.array(_static.scrollableAnim)) this.addScrollableAnim(_static.scrollableAnim);else Object.keys(_static.scrollableAnim).forEach(function (axe) {
          return _this13.addScrollableAnim(_static.scrollableAnim[axe], axe);
        });
      }

      if (this._.doRegister || this.__isFirst) {
        this._registerScrollListeners();

        this._.doRegister = false;
      }

      _BaseComponent.prototype.componentDidMount && _BaseComponent.prototype.componentDidMount.apply(this, arguments);
    };

    _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
      var _this14 = this;

      if (this._.tweenEnabled) {
        this._updateBox();

        this._updateTweenRefs();

        this._.rtweensByProp && Object.keys(prevProps).forEach(function (k) {
          return _this14._.rtweensByProp[k] && _this14.props[k] !== prevProps[k] && _this14._.rtweensByProp[k][_this14.props[k]] && _this14.pushAnim(_this14._.rtweensByProp[k][_this14.props[k]]
          /*get current pos*/
          );
        }, this);
        this._.rtweensByStateProp && prevState && Object.keys(prevState).forEach(function (k) {
          return _this14._.rtweensByStateProp[k] && _this14.state[k] !== prevState[k] && _this14._.rtweensByStateProp[k][_this14.state[k]] && _this14.pushAnim(_this14._.rtweensByStateProp[k][_this14.state[k]]
          /*get current pos*/
          );
        }, this);
      }

      _BaseComponent.prototype.componentDidUpdate && _BaseComponent.prototype.componentDidUpdate.apply(this, arguments);
    };

    _proto.render = function render() {
      var _this15 = this;

      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_TweenerContext__WEBPACK_IMPORTED_MODULE_10__["default"].Consumer, null, function (parentTweener) {
        _this15._parentTweener = parentTweener;
        return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_TweenerContext__WEBPACK_IMPORTED_MODULE_10__["default"].Provider, {
          value: _this15
        }, _BaseComponent.prototype.render.call(_this15));
      });
    };

    return TweenableComp;
  }(BaseComponent), _class.displayName = String.fromCharCode(0xD83E, 0xDDD9) + (BaseComponent.displayName || BaseComponent.name), _temp;
}

/***/ }),

/***/ "./src/helpers/Inertia.js":
/*!********************************!*\
  !*** ./src/helpers/Inertia.js ***!
  \********************************/
/*! exports provided: applyInertia, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyInertia", function() { return applyInertia; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Inertia; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "undefined?df9b");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);


/*
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
var is = __webpack_require__(/*! is */ "undefined?63a5"),
    easingFn = __webpack_require__(/*! d3-ease */ "undefined?25b8"),
    signOf = function sign(x) {
  return typeof x === 'number' ? x ? x < 0 ? -1 : 1 : x === x ? x : NaN : NaN;
},
    abs = Math.abs,
    floor = Math.floor,
    round = Math.round,
    min = Math.min,
    max = Math.max,
    consts = {
  velocityResetTm: 150,
  clickTm: 250
};

function applyInertia(_) {
  var velSign = signOf(_.lastVelocity); // calc momentum distance...
  // get nb loop needed to get vel < .05

  _.loopsTarget = floor(Math.log(.05 / abs(_.lastVelocity)) / Math.log(.9)); // get velocity sum basing on nb loops needed

  _.loopsVelSum = (Math.pow(.9, _.loopsTarget) - abs(_.lastVelocity)) / (.9 - 1); // deduce real dist of momentum

  _.targetDist = _.loopsVelSum * _.refFPS * velSign / 1000 || 0;
  _.targetDuration = abs(_.loopsTarget * _.refFPS * velSign) || 0;
}
var inertiaByNode = {
  nodes: [],
  inertia: []
};
/**
 * Main inertia class
 * @class Caipi slideshow
 * @type {module.exports}
 */

var Inertia =
/*#__PURE__*/
function () {
  function Inertia(opt) {
    var _ = this._ = {};

    _.conf = _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.constructor.config, opt);
    this.active = false;
    _.pos = opt.value || 0;
    _.refFPS = 16;
    _.min = opt.min || 0;
    _.max = opt.max || 0;
    _.currentStop = 0;
    _.lastInertiaPos = 0;
    _.stops = _.conf.stops;
    _.wayPoints = _.conf.wayPoints;
    _.inertiaFn = easingFn.easePolyOut;
    _.targetWayPointIndex = 0;
  }

  var _proto = Inertia.prototype;

  _proto.update = function update(at) {
    if (at === void 0) {
      at = Date.now();
    }

    var _ = this._,
        nextValue,
        loop;

    if (!_.inertia) {
      if (_.conf.shouldLoop) {
        while (loop = _.conf.shouldLoop(_.pos)) {
          this.teleport(loop);
        }
      }

      return _.pos;
    }

    var pos = _.inertiaFn((at - _.inertiaStartTm) / _.targetDuration) * _.targetDist,
        delta = pos - _.lastInertiaPos;

    _.lastInertiaPos = pos;

    if (at - _.inertiaStartTm >= _.targetDuration) {
      _.inertia = this.active = false;
      _.lastInertiaPos = delta = 0;

      if (_.conf.onInertiaEnd) {
        _.conf.onInertiaEnd(_.pos, _.targetWayPoint);
      }
    }

    delta = delta || 0; //console.log(_.pos + delta);

    nextValue = _.pos + delta;

    if (_.conf.shouldLoop) {
      while (loop = _.conf.shouldLoop(nextValue)) {
        //console.warn("loop", loop);
        nextValue += loop;
        this.teleport(loop);
      }
    }

    _.pos = nextValue;
    return nextValue;
  };

  _proto.setPos = function setPos(pos) {
    var _ = this._,
        nextValue;
    _.inertia = false;
    this.active = false;
    _.lastInertiaPos = 0;
    _.targetDist = 0;
    _.pos = pos;

    if (_.conf.bounds) {
      _.pos = max(_.pos, _.max);
      _.pos = min(_.pos, _.min);
    }
  };

  _proto.teleport = function teleport(loopDist) {
    var _ = this._,
        nextValue;
    if (!_.inertia) return _.pos += loopDist;
    _.lastInertiaPos += loopDist;
    _.pos += loopDist;
  };

  _proto.dispatch = function dispatch(delta, tm) {
    if (tm === void 0) {
      tm = 500;
    }

    var _ = this._,
        now = Date.now(),
        pos;
    this.active = true; //console.log("dispatch", delta);

    if (!_.inertia || signOf(delta) !== signOf(_.targetDist)) {
      _.inertia = true;
      _.lastInertiaPos = 0;
      _.inertiaStartTm = _.inertiaLastTm = now;
      _.targetDist = delta;
      _.targetDuration = tm;
    } else {
      _.inertiaStartTm = _.inertiaLastTm = now;
      _.lastInertiaPos = 0;
      _.targetDist += delta;
      _.targetDuration += tm;
    }

    this._doSnap(signOf(delta), 750);
  };

  _proto.isOutbound = function isOutbound(delta) {
    var _ = this._,
        loop,
        pos = _.targetDist + (_.pos - (_.lastInertiaPos || 0)) + delta;

    if (_.conf.shouldLoop) {
      while (loop = _.conf.shouldLoop(nextValue)) {
        //console.warn("loop", loop);
        pos += loop;
      }
    }

    return pos > _.min && pos < _.max;
  };

  _proto._doSnap = function _doSnap(forceSnap, maxDuration) {
    if (maxDuration === void 0) {
      maxDuration = 2000;
    }

    var _ = this._,
        pos = _.targetDist + (_.pos - (_.lastInertiaPos || 0)),
        target,
        mid,
        i,
        i2;

    if (_.wayPoints && _.wayPoints.length) {
      for (i = 0; i < _.wayPoints.length; i++) {
        if (_.wayPoints[i].at > pos) break;
      }

      if (i == _.wayPoints.length) {
        i--;
      } else if (i === 0) {
        i = 0;
      } else {
        mid = _.wayPoints[i - 1].at + (_.wayPoints[i].at - _.wayPoints[i - 1].at) / 2;
        if (forceSnap) forceSnap < 0 && i--;else if (pos < mid) i--;
      }

      if (_.conf.maxJump && is.number(_.targetWayPointIndex)) {
        var d = i - _.targetWayPointIndex; //console.log('Inertia::_doSnap:154: ', i);

        if (d) {
          i -= d;
          i += _.conf.maxJump * (d / abs(d));
        } //console.log('Inertia::_doSnap:154: ', i);

      }

      target = _.wayPoints[i].at;

      if (_.conf.willSnap) {
        _.conf.willSnap(i, _.wayPoints[i]);
      }

      _.lastInertiaPos = _.lastInertiaPos || 0;
      target = target - (_.pos - _.lastInertiaPos);
      _.targetDuration = max(50, min(maxDuration, abs(_.targetDuration / _.targetDist * target))) || 0; //console.log("do snap", i, target, _.targetDist, _.targetDuration);

      _.targetDist = target;
      _.targetWayPoint = _.wayPoints[i];
      _.targetWayPointIndex = i;
    } else {
      target = ~~(_.pos - _.lastInertiaPos);

      if (!_.conf.infinite) {
        if (target > _.max) {
          target = _.max - target;
          _.targetDuration = min(maxDuration, abs(_.targetDuration / _.targetDist * target));
          _.targetDist = target;
        } else if (target < _.min) {
          target = _.min - target;
          _.targetDuration = min(maxDuration, abs(_.targetDuration / _.targetDist * target));
          _.targetDist = target;
        }
      }
    }
  };

  _proto.setBounds = function setBounds(min, max) {
    var _ = this._;
    _.min = min;
    _.max = max;
  };

  _proto.startMove = function startMove() {
    var _ = this._;
    _.baseTS = _.startTS = Date.now() / 1000;
    _.lastVelocity = _.lastIVelocity = 0;
    _.lastAccel = 0;
    _.posDiff = 0;
    this.active = true;
    this.holding = true;
    _.inertia = false;
  };

  _proto.hold = function hold(pos) {
    var _ = this._,
        loop;

    if (_.conf.shouldLoop) {
      while (loop = _.conf.shouldLoop(pos)) {
        //console.warn("loop", loop);
        pos += loop;
      }

      while (loop = _.conf.shouldLoop(_.pos)) {
        //console.warn("loop", loop);
        _.pos += loop;
      }
    }

    var now = Date.now() / 1000,
        //e.timeStamp,
    sinceLastPos = now - _.baseTS,
        delta = pos - _.pos,
        iVel = delta / sinceLastPos; //if (is.nan(pos))
    //	debugger
    //console.log("hold", pos, _.pos);

    _.lastIVelocity = iVel;
    _.lastVelocity = iVel;
    _.baseTS = now;

    if (_.conf.bounds) {
      if (pos > _.max) {
        pos = _.max + min((pos - _.max) / 10, 10);
      } else if (pos < _.min) {
        pos = _.min - min((_.min - pos) / 10, 10);
      }
    }

    _.pos = pos;
  };

  _proto.release = function release() {
    var _ = this._,
        velSign = signOf(_.lastVelocity);
    this.holding = false;

    if (_.conf.bounds) {
      if (_.pos > _.max) {
        this.active = true;
        _.inertia = true;
        _.lastInertiaPos = 0;
        _.inertiaStartTm = _.inertiaLastTm = Date.now();
        _.targetDist = _.max - _.pos;
        _.targetDuration = abs(_.targetDist * 10);
      } else if (_.pos < _.min) {
        this.active = true;
        _.inertia = true;
        _.lastInertiaPos = 0;
        _.inertiaStartTm = _.inertiaLastTm = Date.now();
        _.targetDist = _.pos - _.min;
        _.targetDuration = abs(_.targetDist * 10);
      }
    } else {
      // calc momentum distance...
      applyInertia(_);
      if (!_.targetDuration) _.targetDuration = 50; //console.log(_);

      this.active = true;
      _.inertia = true;
      _.lastInertiaPos = 0;
      _.inertiaStartTm = _.inertiaLastTm = Date.now();
    }

    this._doSnap(null, 500);
  };

  return Inertia;
}();



/***/ }),

/***/ "./src/helpers/css/cssUtils.js":
/*!*************************************!*\
  !*** ./src/helpers/css/cssUtils.js ***!
  \*************************************/
/*! exports provided: expandShorthandProperty, isShorthandProperty, isValidDeclaration, canAnimate, getProperty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "expandShorthandProperty", function() { return expandShorthandProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isShorthandProperty", function() { return isShorthandProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidDeclaration", function() { return isValidDeclaration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canAnimate", function() { return canAnimate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProperty", function() { return getProperty; });
/*
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
var props = {
  "margin": {
    "properties": ["marginTop", "marginRight", "marginBottom", "marginLeft"]
  },
  "marginBottom": {
    "types": ["length"]
  },
  "marginLeft": {
    "types": ["length"]
  },
  "marginRight": {
    "types": ["length"]
  },
  "marginTop": {
    "types": ["length"]
  },
  "padding": {
    "properties": ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"]
  },
  "paddingBottom": {
    "types": ["length"]
  },
  "paddingLeft": {
    "types": ["length"]
  },
  "paddingRight": {
    "types": ["length"]
  },
  "paddingTop": {
    "types": ["length"]
  },
  "bottom": {
    "types": ["length-percentage-calc"]
  },
  "left": {
    "types": ["length-percentage-calc"]
  },
  "right": {
    "types": ["length-percentage-calc"]
  },
  "top": {
    "types": ["length-percentage-calc"]
  },
  "zIndex": {
    "types": ["integer"]
  },
  "width": {
    "types": ["length-percentage-calc"]
  },
  "maxWidth": {
    "types": ["length-percentage-calc"]
  },
  "minWidth": {
    "types": ["length-percentage-calc"]
  },
  "height": {
    "types": ["length-percentage-calc"]
  },
  "maxHeight": {
    "types": ["length-percentage-calc"]
  },
  "minHeight": {
    "types": ["length-percentage-calc"]
  },
  "lineHeight": {
    "types": ["number", "length"]
  },
  "verticalAlign": {
    "types": ["length"]
  },
  "visibility": {
    "types": ["visibility"]
  },
  "borderSpacing": {
    "types": ["length"],
    "multiple": true
  },
  "color": {
    "types": ["color"]
  },
  "opacity": {
    "types": ["number"]
  },
  "background": {
    "properties": ["backgroundColor", "backgroundPosition", "backgroundSize"]
  },
  "backgroundColor": {
    "types": ["color"]
  },
  "backgroundPosition": {
    "types": ["length-percentage-calc"],
    "multiple": true,
    "repeatable": true
  },
  "backgroundSize": {
    "types": ["length-percentage-calc"],
    "multiple": true,
    "repeatable": true
  },
  "border": {
    "properties": ["borderColor", "borderWidth"]
  },
  "borderBottom": {
    "properties": ["borderBottomColor", "borderBottomWidth"]
  },
  "borderLeft": {
    "properties": ["borderLeftColor", "borderLeftWidth"]
  },
  "borderRight": {
    "properties": ["borderRightColor", "borderRightWidth"]
  },
  "borderTop": {
    "properties": ["borderTopColor", "borderTopWidth"]
  },
  "borderColor": {
    "properties": ["borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor"]
  },
  "borderWidth": {
    "properties": ["borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth"]
  },
  "borderBottomColor": {
    "types": ["color"]
  },
  "borderLeftColor": {
    "types": ["color"]
  },
  "borderRightColor": {
    "types": ["color"]
  },
  "borderTopColor": {
    "types": ["color"]
  },
  "borderBottomWidth": {
    "types": ["length"]
  },
  "borderLeftWidth": {
    "types": ["length"]
  },
  "borderRightWidth": {
    "types": ["length"]
  },
  "borderTopWidth": {
    "types": ["length"]
  },
  "borderRadius": {
    "properties": ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"]
  },
  "borderTopLeftRadius": {
    "types": ["length-percentage-calc"],
    "multiple": true
  },
  "borderTopRightRadius": {
    "types": ["length-percentage-calc"],
    "multiple": true
  },
  "borderBottomRightRadius": {
    "types": ["length-percentage-calc"],
    "multiple": true
  },
  "borderBottomLeftRadius": {
    "types": ["length-percentage-calc"],
    "multiple": true
  },
  "boxShadow": {
    "types": ["shadow-list"]
  },
  "caretColor": {
    "types": ["color"]
  },
  "outline": {
    "properties": ["outlineColor", "outlineWidth"]
  },
  "outlineColor": {
    "types": ["color"]
  },
  "outlineWidth": {
    "types": ["length"]
  },
  "outlineOffset": {
    "types": ["length"]
  },
  "flex": {
    "properties": ["flexGrow", "flexShrink", "flexBasis"]
  },
  "flexGrow": {
    "types": ["number"]
  },
  "flexShrink": {
    "types": ["number"]
  },
  "flexBasis": {
    "types": ["length-percentage-calc"]
  },
  "order": {
    "types": ["integer"]
  },
  "font": {
    "properties": ["fontWeight", "fontStretch", "fontSize", "lineHeight"]
  },
  "fontWeight": {
    "types": ["font-weight"]
  },
  "fontStretch": {
    "types": ["font-stretch"]
  },
  "fontSize": {
    "types": ["length"]
  },
  "fontSizeAdjust": {
    "types": ["number"]
  },
  "gridTemplateColumns": {
    "types": ["length-percentage-calc"],
    "multiple": true
  },
  "gridTemplateRows": {
    "types": ["length-percentage-calc"],
    "multiple": true
  },
  "gridTemplate": {
    "properties": ["gridTemplateRows", "gridTemplateColumns"]
  },
  "grid": {
    "properties": ["gridTemplateRows", "gridTemplateColumns"]
  },
  "gridRowGap": {
    "types": ["length-percentage-calc"]
  },
  "gridColumnGap": {
    "types": ["length-percentage-calc"]
  },
  "gridGap": {
    "properties": ["gridRowGap", "gridColumnGap"]
  },
  "clip": {
    "types": ["rectangle"]
  },
  "clipPath": {
    "types": ["basic-shape"]
  },
  "mask": {
    "properties": ["maskPosition", "maskSize"]
  },
  "maskPosition": {
    "types": ["length-percentage-calc"],
    "multiple": true,
    "repeatable": true
  },
  "maskSize": {
    "types": ["length-percentage-calc"],
    "multiple": true,
    "repeatable": true
  },
  "shapeOutside": {
    "types": ["basic-shape"]
  },
  "shapeMargin": {
    "types": ["length-percentage-calc"]
  },
  "shapeImageThreshold": {
    "types": ["number"]
  },
  "scrollPadding": {
    "properties": ["scrollPaddingTop", "scrollPaddingRight", "scrollPaddingBottom", "scrollPaddingLeft"]
  },
  "scrollPaddingTop": {
    "types": ["length-percentage-calc"]
  },
  "scrollPaddingRight": {
    "types": ["length-percentage-calc"]
  },
  "scrollPaddingBottom": {
    "types": ["length-percentage-calc"]
  },
  "scrollPaddingLeft": {
    "types": ["length-percentage-calc"]
  },
  "scrollPaddingBlock": {
    "properties": ["scrollPaddingBlockStart", "scrollPaddingBlockEnd"]
  },
  "scrollPaddingBlockStart": {
    "types": ["length-percentage-calc"]
  },
  "scrollPaddingBlockEnd": {
    "types": ["length-percentage-calc"]
  },
  "scrollPaddingInline": {
    "properties": ["scrollPaddingInlineStart", "scrollPaddingInlineEnd"]
  },
  "scrollPaddingInlineStart": {
    "types": ["length-percentage-calc"]
  },
  "scrollPaddingInlineEnd": {
    "types": ["length-percentage-calc"]
  },
  "scrollSnapMargin": {
    "properties": ["scrollSnapMarginTop", "scrollSnapMarginRight", "scrollSnapMarginBottom", "scrollSnapMarginLeft"]
  },
  "scrollSnapMarginTop": {
    "types": ["length"]
  },
  "scrollSnapMarginRight": {
    "types": ["length"]
  },
  "scrollSnapMarginBottom": {
    "types": ["length"]
  },
  "scrollSnapMarginLeft": {
    "types": ["length"]
  },
  "scrollSnapMarginBlock": {
    "properties": ["scrollSnapMarginBlockStart", "scrollSnapMarginBlockEnd"]
  },
  "scrollSnapMarginBlockStart": {
    "types": ["length"]
  },
  "scrollSnapMarginBlockEnd": {
    "types": ["length"]
  },
  "scrollSnapMarginInline": {
    "properties": ["scrollSnapMarginInlineStart", "scrollSnapMarginInlineEnd"]
  },
  "scrollSnapMarginInlineStart": {
    "types": ["length"]
  },
  "scrollSnapMarginInlineEnd": {
    "types": ["length"]
  },
  "textDecoration": {
    "properties": ["textDecorationColor"]
  },
  "textDecorationColor": {
    "types": ["color"]
  },
  "textEmphasis": {
    "properties": ["textEmphasisColor"]
  },
  "textEmphasisColor": {
    "types": ["color"]
  },
  "textShadow": {
    "types": ["shadow-list"]
  },
  "columns": {
    "properties": ["columnWidth", "columnCount"]
  },
  "columnWidth": {
    "types": ["length"]
  },
  "columnCount": {
    "types": ["integer"]
  },
  "columnGap": {
    "types": ["length-percentage-calc"]
  },
  "columnRule": {
    "properties": ["columnRuleColor", "columnRuleWidth"]
  },
  "columnRuleColor": {
    "types": ["color"]
  },
  "columnRuleWidth": {
    "types": ["length"]
  },
  "letterSpacing": {
    "types": ["length"]
  },
  "tabSize": {
    "types": ["length"]
  },
  "textIndent": {
    "types": ["length-percentage-calc"]
  },
  "wordSpacing": {
    "types": ["length-percentage-calc"]
  },
  "transform": {
    "types": ["transform"]
  },
  "transformOrigin": {
    "types": ["length-percentage-calc"],
    "multiple": true
  },
  "perspective": {
    "types": ["length"]
  },
  "perspectiveOrigin": {
    "types": ["length-percentage-calc"],
    "multiple": true
  } //
  ///**
  // * List of animatable types used by properties, with descriptions of how to interpolate each type.
  // * Data taken from https://www.w3.org/TR/css3-transitions/#animatable-types and some other W3C specs.
  // *
  // * @type {Object}
  // */
  //exports.types = {
  //	'color'                 : {
  //		name: 'color',
  //		href: 'https://www.w3.org/TR/css3-transitions/#animtype-color'
  //	},
  //	'length'                : {
  //		name: 'length',
  //		href: 'https://www.w3.org/TR/css3-transitions/#animtype-length'
  //	},
  //	'percentage'            : {
  //		name: 'percentage',
  //		href: 'https://www.w3.org/TR/css3-transitions/#animtype-percentage'
  //	},
  //	'length-percentage-calc': {
  //		name: 'length, percentage, or calc',
  //		href: 'https://www.w3.org/TR/css3-transitions/#animtype-lpcalc'
  //	},
  //	'integer'               : {
  //		name: 'integer',
  //		href: 'https://www.w3.org/TR/css3-transitions/#animtype-integer'
  //	},
  //	'font-weight'           : {
  //		name: 'font weight',
  //		href: 'https://www.w3.org/TR/css3-transitions/#animtype-font-weight'
  //	},
  //	'number'                : {
  //		name: 'number',
  //		href: 'https://www.w3.org/TR/css3-transitions/#animtype-number'
  //	},
  //	'rectangle'             : {
  //		name: 'rectangle',
  //		href: 'https://www.w3.org/TR/css3-transitions/#animtype-rect'
  //	},
  //	'visibility'            : {
  //		name: 'visibility',
  //		href: 'https://www.w3.org/TR/css3-transitions/#animtype-visibility'
  //	},
  //	'shadow-list'           : {
  //		name: 'shadow list',
  //		href: 'https://www.w3.org/TR/css3-transitions/#animtype-shadow-list'
  //	},
  //	// Other specs
  //	'transform'             : {
  //		name: 'transform',
  //		href: 'https://www.w3.org/TR/css3-transforms/#interpolation-of-transforms'
  //	},
  //	'font-stretch'          : {
  //		name: 'font stretch',
  //		href: 'https://www.w3.org/TR/css3-fonts/#font-stretch-animation'
  //	},
  //	'basic-shape'           : {
  //		name: 'basic shape',
  //		href: 'https://www.w3.org/TR/css-shapes-1/#basic-shape-interpolation'
  //	},
  //};
  //

};
function expandShorthandProperty(property, value, target) {
  if (target === void 0) {
    target = {};
  }

  var type = props[property],
      childProps = type && type.properties,
      values = value.split(' ');
  if (type.multiple) childProps && childProps.forEach(function (k, i) {
    target[k] = values[i % values.length];
  });else childProps && childProps.forEach(function (k, i) {
    if (values[i]) target[k] = values[i];
  });
  return target;
}
;
function isShorthandProperty(property) {
  var type = props[property],
      childProps = type && type.properties;
  return childProps && !!childProps.length;
}
;
function isValidDeclaration(property, value) {
  return !!props[property];
}
;
/**
 * Check if a CSS property can be animated
 * @param  {string} property CSS property name
 * @return {boolean}         True if the property can be animated
 */

function canAnimate(property) {
  return props.hasOwnProperty(property);
}
;
/**
 * Get a definition of how a CSS property can be animated
 * @param  {string} property CSS property name
 * @param  {boolean} expand  Expand definitions for sub-properties, when available
 * @return {object}          Property definition, or null if it can't be animated
 */

function getProperty(property, expand) {
  if (!exports.canAnimate(property)) {
    return null;
  }

  var prop = props[property];
  var ret = {
    name: property
  };
  Object.keys(prop).forEach(function (key) {
    var value = prop[key];

    if (Array.isArray(value)) {
      if (key === 'properties' && expand) {
        value = value.map(function (subProp) {
          return exports.getProperty(subProp, expand);
        });
      } else {
        value = value.slice(); // clone
      }
    }

    ret[key] = value;
  });
  return ret;
}
;

/***/ }),

/***/ "./src/helpers/css/demux sync recursive ^\\.\\/([^\\\\\\/]+)\\.js$":
/*!*********************************************************!*\
  !*** ./src/helpers/css/demux sync ^\.\/([^\\\/]+)\.js$ ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./$all.js": "./src/helpers/css/demux/$all.js",
	"./backgroundColor.js": "./src/helpers/css/demux/backgroundColor.js",
	"./filter.js": "./src/helpers/css/demux/filter.js",
	"./transform.js": "./src/helpers/css/demux/transform.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/helpers/css/demux sync recursive ^\\.\\/([^\\\\\\/]+)\\.js$";

/***/ }),

/***/ "./src/helpers/css/demux/$all.js":
/*!***************************************!*\
  !*** ./src/helpers/css/demux/$all.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! is */ "undefined?63a5");
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(is__WEBPACK_IMPORTED_MODULE_0__);
/*
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


var unitsRe = new RegExp("([+-]?(?:[0-9]*[.])?[0-9]+)\\s*(" + ['em', 'ex', '%', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax'].join('|') + ")"),
    abs = Math.abs,
    floatCut = function floatCut(v, l) {
  var p = Math.pow(10, l);
  return Math.round(v * p) / p;
},
    defaultUnits = {
  left: 'px',
  right: 'px',
  top: 'px',
  bottom: 'px',
  width: 'px',
  height: 'px'
},
    defaultValue = {
  opacity: 1
};

function demux(key, tweenable, target, data, box) {
  var value;
  value = data[key + "_" + 0] || defaultUnits[key] ? floatCut(tweenable[key + "_" + 0], 2) + (data[key + "_" + 0] || defaultUnits[key]) : floatCut(tweenable[key + "_" + 0], 2);

  if (data[key] && data[key].length > 1) {
    for (var i = 1; i < data[key].length; i++) {
      if (tweenable[key + "_" + i] < 0) value += " - " + abs(floatCut(tweenable[key + "_" + i], 2)) + (data[key + "_" + i] || defaultUnits[key]);else value += " + " + floatCut(tweenable[key + "_" + i], 2) + (data[key + "_" + i] || defaultUnits[key]);
    }

    value = "calc(" + value + ")";
  }

  target[key] = value;
}

/* harmony default export */ __webpack_exports__["default"] = (function (key, value, target, data, initials, forceUnits) {
  data[key] = data[key] || [];

  if (is__WEBPACK_IMPORTED_MODULE_0___default.a.array(value)) {
    for (var i = 0; i < value.length; i++) {
      data[key][i] = true;
      mux(key + "_" + i, key, value[i] || 0, target, data, initials, forceUnits);
    }
  } else {
    data[key][0] = true;
    mux(key + "_" + 0, key, value || 0, target, data, initials, forceUnits);
  }

  return demux;
});

function mux(key, baseKey, value, target, data, initials, forceUnits) {
  var match = is__WEBPACK_IMPORTED_MODULE_0___default.a.string(value) ? value.match(unitsRe) : false;
  initials[key] = is__WEBPACK_IMPORTED_MODULE_0___default.a.number(initials[key]) ? initials[key] : defaultValue[baseKey] || 0;

  if (match) {
    if (!forceUnits && data[key] && data[key] !== match[2]) {
      console.warn("Have != units on prop ! Ignore ", key, "present:" + data[key], "new:" + match[2]);
      target[key] = 0;
    } else {
      data[key] = match[2];
      target[key] = parseFloat(match[1]);
    }
  } else {
    target[key] = parseFloat(value); //if ( !data[key] && baseKey in defaultUnits )
    //	data[key] = defaultUnits[baseKey];
  }

  return demux;
}

/***/ }),

/***/ "./src/helpers/css/demux/backgroundColor.js":
/*!**************************************************!*\
  !*** ./src/helpers/css/demux/backgroundColor.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _typed_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typed/color */ "./src/helpers/css/demux/typed/color.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _typed_color__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/*
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


/***/ }),

/***/ "./src/helpers/css/demux/filter.js":
/*!*****************************************!*\
  !*** ./src/helpers/css/demux/filter.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! is */ "undefined?63a5");
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(is__WEBPACK_IMPORTED_MODULE_0__);
/*
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


var unitsRe = new RegExp("([+-]?(?:[0-9]*[.])?[0-9]+)\\s*(" + ['em', 'ex', '%', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax'].join('|') + ")"),
    floatCut = function floatCut(v, l) {
  var p = Math.pow(10, l);
  return Math.round(v * p) / p;
},
    defaultUnits = {
  blur: 'px',
  brightness: '%',
  contrast: '%',
  dropShadow: true,
  grayscale: '%',
  hueRotate: 'deg',
  invert: "%",
  opacity: "%",
  saturate: "%",
  sepia: "%"
};

var filters = {};

function demux(key, tweenable, target, data, box) {
  if (data["filter_head"] === key) {
    var _filters = "";
    Object.keys(data[key]).forEach(function (fkey) {
      var dkey = key + '_' + fkey;
      data[key][fkey] = true;
      _filters += fkey + "(" + floatCut(tweenable[dkey], 2) + data[dkey] + ") ";
    });
    target.filter = _filters;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (function (key, value, target, data, initials) {
  data["filter_head"] = data["filter_head"] || key;
  data[key] = data[key] || {};
  initials[key] = 0;
  Object.keys(value).forEach(function (fkey) {
    var fValue = value[fkey],
        dkey = key + '_' + fkey,
        match = is__WEBPACK_IMPORTED_MODULE_0___default.a.string(fValue) ? fValue.match(unitsRe) : false;
    data[key][fkey] = true;
    initials[dkey] = 0;

    if (match) {
      if (data[dkey] && data[dkey] !== match[2]) {
        console.warn("Have != units on prop ! Ignore ", dkey, "present:" + data[dkey], "new:" + match[2]);
        target[dkey] = 0;
      } else {
        data[dkey] = match[2];
        target[dkey] = parseFloat(match[1]);
      }
    } else {
      target[dkey] = fValue;
      if (!data[dkey] && fkey in defaultUnits) data[dkey] = defaultUnits[fkey];
    }
  });
  return demux;
});

/***/ }),

/***/ "./src/helpers/css/demux/transform.js":
/*!********************************************!*\
  !*** ./src/helpers/css/demux/transform.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "undefined?df9b");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! is */ "undefined?63a5");
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(is__WEBPACK_IMPORTED_MODULE_1__);


/*
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


var unitsRe = new RegExp("([+-]?(?:[0-9]*[.])?[0-9]+)\\s*(" + ['\\w+', 'cap', 'ch', 'em', 'ic', 'ex', '%', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax'].join('|') + ")"),
    floatCut = function floatCut(v, l) {
  var p = Math.pow(10, l);
  return Math.round(v * p) / p;
},
    defaultUnits = {
  //matrix     : true,
  //translate  : 'px',
  translateX: 'px',
  translateY: 'px',
  translateZ: 'px',
  scale: '',
  //scaleX     : 'px',
  //scaleY     : 'px',
  rotate: 'deg',
  //skew       : 'deg',
  skewX: 'deg',
  skewY: 'deg',
  //matrix3d   : true,
  //translate3d: true,
  //scale3d    : true,
  scaleZ: 'px',
  //rotate3d   : true,
  rotateX: 'deg',
  rotateY: 'deg',
  rotateZ: 'deg',
  perspective: 'px'
};

function demux(key, tweenable, target, data, box) {
  if (data["transform_head"] === key) {
    var transforms = "";
    data[key].forEach(function (tmap, i) {
      if (tmap === void 0) {
        tmap = {};
      }

      return Object.keys(tmap).forEach(function (fkey) {
        var dkey = key + '_' + fkey + '_' + i,
            value;
        if (data[dkey] === 'deg') tweenable[dkey] = tweenable[dkey] % 360;

        if (data[dkey] === 'box') {
          if (fkey === "translateX") value = tweenable[dkey] * box.x;else if (fkey === "translateY") value = tweenable[dkey] * box.y;else if (fkey === "translateZ") value = tweenable[dkey] * box.z;
          transforms += fkey + "(" + floatCut(value, 2) + "px) ";
        } else {
          value = tweenable[dkey];
          transforms += fkey + "(" + floatCut(value, 2) + data[dkey] + ") ";
        }
      });
    });
    target.transform = transforms;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (function (key, value, target, data, initials, forceUnits) {
  data["transform_head"] = data["transform_head"] || key;
  data[key] = data[key] || [{}];
  initials[key] = 0;
  if (!is__WEBPACK_IMPORTED_MODULE_1___default.a.array(value)) value = [value];
  value.forEach(function (tmap, i) {
    var baseData = {}; //data[key][i]       = forceUnits ? {} : data[key][i] || {};

    tmap && Object.keys(tmap).forEach(function (fkey) {
      var fValue = tmap[fkey],
          dkey = key + '_' + fkey + '_' + i,
          match = is__WEBPACK_IMPORTED_MODULE_1___default.a.string(fValue) ? fValue.match(unitsRe) : false;
      baseData[fkey] = true;
      initials[dkey] = 0;

      if (match) {
        if (!forceUnits && data[dkey] && data[dkey] !== match[2]) {
          console.warn("Have != units on prop ! Ignore ", dkey, "present:" + data[dkey], "new:" + match[2]);
          target[dkey] = 0;
        } else {
          data[dkey] = match[2];
          target[dkey] = parseFloat(match[1]);
        }
      } else {
        target[dkey] = fValue;
        if (!data[dkey] && fkey in defaultUnits) data[dkey] = defaultUnits[fkey];
      }
    });
    data[key][i] = forceUnits ? _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, baseData, data[key][i] || {}) : _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, data[key][i] || {}, baseData);
  });
  return demux;
});

/***/ }),

/***/ "./src/helpers/css/demux/typed sync recursive ^\\.\\/([^\\\\\\/]+)\\.js$":
/*!***************************************************************!*\
  !*** ./src/helpers/css/demux/typed sync ^\.\/([^\\\/]+)\.js$ ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./color.js": "./src/helpers/css/demux/typed/color.js",
	"./int.js": "./src/helpers/css/demux/typed/int.js",
	"./multi.js": "./src/helpers/css/demux/typed/multi.js",
	"./number.js": "./src/helpers/css/demux/typed/number.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/helpers/css/demux/typed sync recursive ^\\.\\/([^\\\\\\/]+)\\.js$";

/***/ }),

/***/ "./src/helpers/css/demux/typed/color.js":
/*!**********************************************!*\
  !*** ./src/helpers/css/demux/typed/color.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var color_rgba__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! color-rgba */ "undefined?a742");
/* harmony import */ var color_rgba__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(color_rgba__WEBPACK_IMPORTED_MODULE_0__);
/*
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


function demux(key, tweenable, target, data) {
  target[key] = "rgba(" + tweenable[key + '_r'] + ", " + tweenable[key + '_g'] + ", " + tweenable[key + '_b'] + ", " + tweenable[key + '_a'] + ")";
}

/* harmony default export */ __webpack_exports__["default"] = (function (key, value, target, data, initials) {
  var vect = color_rgba__WEBPACK_IMPORTED_MODULE_0___default()(value);
  target[key + '_r'] = vect[0];
  target[key + '_g'] = vect[1];
  target[key + '_b'] = vect[2];
  target[key + '_a'] = vect[3];
  initials[key + '_r'] = 0;
  initials[key + '_g'] = 0;
  initials[key + '_b'] = 0;
  initials[key + '_a'] = 1;
  return demux;
});

/***/ }),

/***/ "./src/helpers/css/demux/typed/int.js":
/*!********************************************!*\
  !*** ./src/helpers/css/demux/typed/int.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! is */ "undefined?63a5");
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(is__WEBPACK_IMPORTED_MODULE_0__);
/*
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


var unitsRe = new RegExp("([+-]?(?:[0-9]*[.])?[0-9]+)\\s*(" + ['em', 'ex', '%', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax'].join('|') + ")"),
    floatCut = function floatCut(v, l) {
  var p = Math.pow(10, l);
  return Math.round(v * p) / p;
},
    defaultUnits = {
  left: 'px',
  right: 'px',
  top: 'px',
  bottom: 'px',
  width: 'px',
  height: 'px'
};

function demux(key, tweenable, target, data, box) {
  target[key] = ~~(data[key] ? tweenable[key] + data[key] : tweenable[key]);
}

/* harmony default export */ __webpack_exports__["default"] = (function (key, value, target, data, initials, forceUnits) {
  //if ( cssAnimProps.canAnimate(key) ) {
  var match = is__WEBPACK_IMPORTED_MODULE_0___default.a.string(value) ? value.match(unitsRe) : false; //let how = cssAnimProps.getProperty(key);
  //console.log(how);

  initials[key] = 0;

  if (match) {
    if (!forceUnits && data[key] && data[key] !== match[2]) {
      console.warn("Have != units on prop ! Ignore ", key, "present:" + data[key], "new:" + match[2]);
      target[key] = 0;
    } else {
      data[key] = match[2];
      target[key] = ~~match[1];
    }
  } else {
    target[key] = ~~value;
    if (!data[key] && key in defaultUnits) data[key] = defaultUnits[key];
  } //}
  //else {
  //	// just do nothing
  //	//data[key]=
  //}


  return demux;
});

/***/ }),

/***/ "./src/helpers/css/demux/typed/multi.js":
/*!**********************************************!*\
  !*** ./src/helpers/css/demux/typed/multi.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! is */ "undefined?63a5");
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(is__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _number__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./number */ "./src/helpers/css/demux/typed/number.js");
/*
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



var floatCut = function floatCut(v) {
  if (v === void 0) {
    v = 0;
  }

  return v.toFixed(3);
},
    alias = {
  top: '0%',
  bottom: '100%',
  center: '50%',
  left: '0%',
  right: '100%'
};

function demux(key, tweenable, target, data, box, offset) {
  var count = data[key],
      v = '',
      nowhere = {};

  for (var i = 0; i < count; i++) {
    _number__WEBPACK_IMPORTED_MODULE_1__["default"].demux(key + '_' + i, tweenable, nowhere, data, box, offset);
    v += nowhere[key + '_' + i] + ' ';
  }

  target[key] = v;
}

/* harmony default export */ __webpack_exports__["default"] = (function (count) {
  return function (key, value, target, data, initials) {
    var values = value.split(' '),
        v;
    data[key] = count;

    for (var i = 0; i < count; i++) {
      v = values[i % values.length];
      v = is__WEBPACK_IMPORTED_MODULE_0___default.a.string(v) && alias[v] || v;
      Object(_number__WEBPACK_IMPORTED_MODULE_1__["default"])(key + '_' + i, v, target, data, initials);
    }

    return demux;
  };
});

/***/ }),

/***/ "./src/helpers/css/demux/typed/number.js":
/*!***********************************************!*\
  !*** ./src/helpers/css/demux/typed/number.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! is */ "undefined?63a5");
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(is__WEBPACK_IMPORTED_MODULE_0__);
/*
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


var units = ['box', 'em', 'ex', '%', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax'],
    unitsRe = new RegExp("([+-]?(?:[0-9]*[.])?[0-9]+)\\s*(" + units.join('|') + ")"),
    floatCut = function floatCut(v) {
  if (v === void 0) {
    v = 0;
  }

  return v.toFixed(3);
},
    defaultUnits = {
  left: 'px',
  right: 'px',
  top: 'px',
  bottom: 'px',
  width: 'px',
  height: 'px'
},
    defaultBox = {
  left: 'x',
  right: 'x',
  top: 'y',
  bottom: 'y',
  width: 'x',
  height: 'y'
},
    defaultValue = {
  opacity: 1
};

function demuxOne(key, twVal, baseKey, data, box) {
  var value = twVal,
      unit = data[baseKey][key] || defaultUnits[baseKey];

  if (unit === 'box') {
    value = value * (box[defaultBox[baseKey]] || box.x);
    unit = 'px';
  } //if ( Math.abs(value) < .0001 && value !== 0 )


  return unit ? floatCut(value) + unit : floatCut(value);
}

function demux(key, tweenable, target, data, box) {
  var value,
      i = 0;
  value = "";

  for (var rKey in data[key]) {
    if (data[key].hasOwnProperty(rKey)) {
      if (tweenable[rKey] < 0) value += (i ? " - " : "-") + demuxOne(rKey, -tweenable[rKey], key, data, box);else value += (i ? " + " : "") + demuxOne(rKey, tweenable[rKey], key, data, box);
      i++;
    }
  }

  if (i > 1) value = "calc(" + value + ")";
  target[key] = value;
}

function muxer(key, value, target, data, initials, forceUnits) {
  data[key] = data[key] || {};

  if (is__WEBPACK_IMPORTED_MODULE_0___default.a.array(value)) {
    for (var i = 0; i < value.length; i++) {
      muxOne(key, value[i] || 0, target, data, initials, forceUnits);
    }
  } else {
    muxOne(key, value || 0, target, data, initials, forceUnits);
  }

  return demux;
}

function muxOne(key, value, target, data, initials, forceUnits) {
  var match = is__WEBPACK_IMPORTED_MODULE_0___default.a.string(value) ? value.match(unitsRe) : false,
      unit = match && match[2] || defaultUnits[key],
      unitKey = units.indexOf(unit),
      realKey = unitKey !== -1 && key + '_' + unitKey || key;
  initials[realKey] = defaultValue[key] || 0;
  data[key][realKey] = unit;

  if (match) {
    target[realKey] = parseFloat(match[1]);
  } else {
    target[realKey] = parseFloat(value);
  }

  return demux;
}

;
muxer.demux = demux;
/* harmony default export */ __webpack_exports__["default"] = (muxer);

/***/ }),

/***/ "./src/helpers/css/index.js":
/*!**********************************!*\
  !*** ./src/helpers/css/index.js ***!
  \**********************************/
/*! exports provided: muxToCss, deMuxTween, deMuxLine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "muxToCss", function() { return muxToCss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deMuxTween", function() { return deMuxTween; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deMuxLine", function() { return deMuxLine; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "undefined?df9b");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _cssUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cssUtils */ "./src/helpers/css/cssUtils.js");
/* harmony import */ var _demux_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./demux/(*).js */ "./src/MapOf.react_rtween_helpers_css_demux_____js.gen.js");
/* harmony import */ var _demux_typed_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./demux/typed/(*).js */ "./src/MapOf.react_rtween_helpers_css_demux_typed_____js.gen.js");


/*
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




var cssDemux = _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, _demux_js__WEBPACK_IMPORTED_MODULE_2__, {
  height: _demux_typed_js__WEBPACK_IMPORTED_MODULE_3__["number"],
  width: _demux_typed_js__WEBPACK_IMPORTED_MODULE_3__["number"],
  top: _demux_typed_js__WEBPACK_IMPORTED_MODULE_3__["number"],
  left: _demux_typed_js__WEBPACK_IMPORTED_MODULE_3__["number"],
  right: _demux_typed_js__WEBPACK_IMPORTED_MODULE_3__["number"],
  bottom: _demux_typed_js__WEBPACK_IMPORTED_MODULE_3__["number"],
  marginTop: _demux_typed_js__WEBPACK_IMPORTED_MODULE_3__["number"],
  marginLeft: _demux_typed_js__WEBPACK_IMPORTED_MODULE_3__["number"],
  marginRight: _demux_typed_js__WEBPACK_IMPORTED_MODULE_3__["number"],
  marginBottom: _demux_typed_js__WEBPACK_IMPORTED_MODULE_3__["number"],
  paddingTop: _demux_typed_js__WEBPACK_IMPORTED_MODULE_3__["number"],
  paddingLeft: _demux_typed_js__WEBPACK_IMPORTED_MODULE_3__["number"],
  paddingRight: _demux_typed_js__WEBPACK_IMPORTED_MODULE_3__["number"],
  paddingBottom: _demux_typed_js__WEBPACK_IMPORTED_MODULE_3__["number"],
  transformOrigin: Object(_demux_typed_js__WEBPACK_IMPORTED_MODULE_3__["multi"])(2),
  zIndex: _demux_typed_js__WEBPACK_IMPORTED_MODULE_3__["int"] //rotate       : transforms,
  //rotateX      : transforms,
  //rotateY      : transforms,
  //x            : transforms,
  //y            : transforms,
  //z            : transforms,
  //_x           : transforms,
  //_y           : transforms,
  //_z           : transforms,
  //blur         : transforms,
  //perspective  : transforms

});

function muxToCss(tweenable, css, demuxers, data, box) {
  Object.keys(demuxers).forEach(function (key) {
    //if ( key === 'zIndex' ) debugger
    demuxers[key](key, tweenable, css, data, box);
  });
}
function deMuxTween(tween, deMuxedTween, initials, data, demuxers, forceUnits, reOrder) {
  var fTween = {},
      excluded = {};
  Object.keys(tween).forEach(function (key) {
    if (cssDemux[key]) fTween[key] = tween[key];else if (Object(_cssUtils__WEBPACK_IMPORTED_MODULE_1__["isValidDeclaration"])(key, tween[key])) {
      if (Object(_cssUtils__WEBPACK_IMPORTED_MODULE_1__["isShorthandProperty"])(key)) {
        Object(_cssUtils__WEBPACK_IMPORTED_MODULE_1__["expandShorthandProperty"])(key, tween[key], fTween);
      } else fTween[key] = tween[key];
    } else excluded[key] = tween[key];
  });
  Object.keys(fTween).forEach(function (key) {
    if (cssDemux[key]) {
      //key, value, target, data, initials
      demuxers[key] = cssDemux[key](key, fTween[key], deMuxedTween, data, initials, forceUnits, reOrder);
    } else demuxers[key] = Object(_demux_typed_js__WEBPACK_IMPORTED_MODULE_3__["number"])(key, fTween[key], deMuxedTween, data, initials, forceUnits, reOrder);
  });
  return excluded;
}
function deMuxLine(tweenLine, initials, data, demuxers) {
  return tweenLine.reduce(function (line, tween) {
    var demuxedTween = {};
    demuxers[tween.target] = demuxers[tween.target] || {};
    initials[tween.target] = initials[tween.target] || {};
    data[tween.target] = data[tween.target] || {};
    deMuxTween(tween.apply, demuxedTween, initials[tween.target], data[tween.target], demuxers[tween.target]);
    line.push(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, tween, {
      apply: demuxedTween
    }));
    return line;
  }, []);
}

/***/ }),

/***/ "./src/helpers/tweenTools.js":
/*!***********************************!*\
  !*** ./src/helpers/tweenTools.js ***!
  \***********************************/
/*! exports provided: offset, scale, reverse, addCss, extractCss, target, shiftTransforms */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "offset", function() { return offset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reverse", function() { return reverse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addCss", function() { return addCss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractCss", function() { return extractCss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "target", function() { return target; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shiftTransforms", function() { return shiftTransforms; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "undefined?df9b");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! is */ "undefined?63a5");
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(is__WEBPACK_IMPORTED_MODULE_1__);


/*
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

function offset(items, start) {
  if (start === void 0) {
    start = 0;
  }

  items = is__WEBPACK_IMPORTED_MODULE_1___default.a.array(items) ? items : items && [items] || items;
  return items.map(function (item) {
    return _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, item, {
      from: item.from + start
    });
  });
}
function scale(items, duration) {
  if (duration === void 0) {
    duration = 0;
  }

  items = is__WEBPACK_IMPORTED_MODULE_1___default.a.array(items) ? items : items && [items] || items; // get items current duration

  var iDuration = 0;
  items.forEach(function (item) {
    iDuration = Math.max(iDuration, item.from + item.duration);
  });
  return items.map(function (item) {
    return _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, item, {
      from: item.from / iDuration * duration,
      duration: item.duration / iDuration * duration
    });
  });
}

function inverseValues(v) {
  if (is__WEBPACK_IMPORTED_MODULE_1___default.a.number(v)) return -v;
  if (is__WEBPACK_IMPORTED_MODULE_1___default.a.object(v)) return Object.keys(v).reduce(function (h, key) {
    return h[key] = inverseValues(v[key]), h;
  }, {});
  if (is__WEBPACK_IMPORTED_MODULE_1___default.a.array(v)) return v.map(function (item) {
    return inverseValues(item);
  });
  var values = v.split(/(\-?\d+(?:\.\d+)?|\-?\.\d+)/ig);
  return values.map(function (val, i) {
    return i % 2 ? -parseFloat(val) : val;
  }).join("");
}

function reverse(items) {
  items = is__WEBPACK_IMPORTED_MODULE_1___default.a.array(items) ? items : items && [items] || items; // get items current duration

  var iDuration = 0;
  items.forEach(function (item) {
    iDuration = Math.max(iDuration, item.from + item.duration);
  });
  return items.map(function (item) {
    item = _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, item, {
      from: iDuration - (item.from + item.duration),
      apply: inverseValues(item.apply)
    });
    return item;
  });
}
function addCss(target) {
  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  var source = sources.shift();

  for (var key in source) {
    if (!source.hasOwnProperty(key)) continue;

    if (is__WEBPACK_IMPORTED_MODULE_1___default.a.object(source[key])) {
      if (!target[key]) {
        target[key] = {};
      }

      addCss(target[key], source[key]);
    } else if (is__WEBPACK_IMPORTED_MODULE_1___default.a.array(source[key])) {
      if (!target[key]) {
        target[key] = [];
      }

      addCss(target[key], source[key]);
    } else {
      target[key] = addAllType(target[key], source[key]);
    }
  }

  return sources.length && addCss.apply(void 0, [target].concat(sources)) || target;
}

function addAllType(v1, v2) {
  if (!v1) return v2;
  if (!v2) return v1;
  var values1 = ('' + v1).split(/(\-?\d+(?:\.\d+)?|\-?\.\d+)/ig),
      values2 = ('' + v2).split(/(\-?\d+(?:\.\d+)?|\-?\.\d+)/ig),
      r = values1.map(function (val, i) {
    return i % 2 ? parseFloat(val) + parseFloat(values2[i] || 0) : val;
  }).filter(function (i) {
    return i !== '';
  });
  return r.length === 1 ? parseInt(r[0]) : r.join("");
}

function extractCss(items, inverse) {
  var css = {};
  items = is__WEBPACK_IMPORTED_MODULE_1___default.a.array(items) ? items : items && [items] || items;
  items.forEach(function (item) {
    addCss(css, item.apply);
  });
  if (inverse) css = inverseValues(css); //if ( inverse && css.hasOwnProperty('opacity') )
  //	css.opacity -= 1;

  return css;
}
function target(items, target) {
  items = is__WEBPACK_IMPORTED_MODULE_1___default.a.array(items) ? items : items && [items] || items;
  return items.map(function (item) {
    return _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, item, {
      target: target
    });
  });
}
function shiftTransforms(items, shift) {
  if (shift === void 0) {
    shift = 1;
  }

  items = is__WEBPACK_IMPORTED_MODULE_1___default.a.array(items) ? items : items && [items] || items;
  return items.map(function (item) {
    var t = item.apply && item.apply.transform;

    if (t) {
      t = is__WEBPACK_IMPORTED_MODULE_1___default.a.array(t) ? t : [t];

      for (var i = 0; i < shift; i++) {
        t.unshift({});
      }

      item = _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, item, {
        apply: _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, item.apply, {
          transform: t
        })
      });
    }

    return item;
  });
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: asTweener, withTweener, tweenTools, Tweenable, TweenRef, TweenerContext, TweenAxis, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tweenable", function() { return Tweenable; });
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "undefined?cdfe");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "undefined?588e");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _asTweener__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./asTweener */ "./src/asTweener.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asTweener", function() { return _asTweener__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _TweenAxis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TweenAxis */ "./src/TweenAxis.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TweenAxis", function() { return _TweenAxis__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _TweenRef__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TweenRef */ "./src/TweenRef.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TweenRef", function() { return _TweenRef__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _withTweener__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./withTweener */ "./src/withTweener.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withTweener", function() { return _withTweener__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _TweenerContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TweenerContext */ "./src/TweenerContext.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TweenerContext", function() { return _TweenerContext__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _helpers_tweenTools_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./helpers/tweenTools.js */ "./src/helpers/tweenTools.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "tweenTools", function() { return _helpers_tweenTools_js__WEBPACK_IMPORTED_MODULE_7__; });


var _class;

/*
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








var Tweenable = Object(_asTweener__WEBPACK_IMPORTED_MODULE_2__["default"])(_class =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0___default()(Tweenable, _Component);

  function Tweenable() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Tweenable.prototype;

  _proto.render = function render() {
    return this.props.children;
  };

  return Tweenable;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"])) || _class;


/* harmony default export */ __webpack_exports__["default"] = (Tweenable);

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
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
var is = __webpack_require__(/*! is */ "undefined?63a5"),
    floatCut = function floatCut(v, l) {
  var p = Math.pow(10, l);
  return Math.round(v * p) / p;
},
    min = Math.min,
    max = Math.max,
    isBrowser = typeof window !== 'undefined',
    _dom = isBrowser ? {
  prefix: /webkit/i.test(navigator.appVersion) ? 'webkit' : /firefox/i.test(navigator.userAgent) ? 'Moz' : /trident/i.test(navigator.userAgent) ? 'ms' : 'opera' in window ? 'O' : '',
  dashedPrefix: /webkit/i.test(navigator.appVersion) ? '-webkit-' : /firefox/i.test(navigator.userAgent) ? '-moz-' : /trident/i.test(navigator.userAgent) ? '-ms-' : 'opera' in window ? '-o-' : ''
} : {
  prefix: '',
  dashedPrefix: ''
},
    __ = {
  onPageHided: [],
  onPageShown: [],
  dragging: [],
  dragEnabled: [],
  dragEnabledDesc: [],
  fingers: {},
  nbFingers: 0,
  dragstartAnywhere: function dragstartAnywhere(e) {
    var o,
        me = __,
        i = me.dragEnabled.indexOf(this),
        finger,
        desc,
        fingers = [];

    if (i === -1) {
      return;
    } //e.preventDefault();
    //e.stopPropagation();


    if (!me.nbFingers) {
      Dom.addEvent(document, {
        'touchmove': me.dragAnywhere,
        'mousemove': me.dragAnywhere,
        'touchend': me.dropAnywhere,
        'mouseup': me.dropAnywhere
      });
      Dom.addEvent(this, {
        'click': me.dropWithoutClick
      }, null, null, true);
    }

    if (e.changedTouches && e.changedTouches.length) {
      fingers = e.changedTouches;
    } else fingers.push(e);

    for (var t = 0, ln = fingers.length; t < ln; t++) {
      finger = fingers[t];
      desc = me.dragEnabledDesc[i];
      if (desc.nbFingers) continue;
      me.nbFingers++;
      me.fingers[finger.identifier] = me.fingers[finger.identifier] || [];
      me.fingers[finger.identifier].push(desc);
      desc.nbFingers++;
      desc._startPos.x = _dom.prefix == 'MS' ? finger.x : finger.pageX;
      desc._startPos.y = _dom.prefix == 'MS' ? finger.y : finger.pageY;
      desc._startTs = e.timeStamp;
      desc._lastPos.x = _dom.prefix == 'MS' ? finger.x : finger.pageX;
      desc._lastPos.y = _dom.prefix == 'MS' ? finger.y : finger.pageY;

      for (o = 0; o < desc.dragstart.length; o++) {
        desc.dragstart[o][0].call(desc.dragstart[o][1] || this, e, finger, desc);
      }
    }
  },
  dragAnywhere: function dragAnywhere(e) {
    var _this = this;

    var o,
        me = __,
        finger,
        fingers = [],
        stopped,
        desc = __.dragging[0];

    if (e.changedTouches && e.changedTouches.length) {
      fingers = e.changedTouches;
    } else fingers.push(e);

    for (var i = 0, ln = fingers.length; i < ln; i++) {
      finger = fingers[i];
      desc = me.fingers[finger.identifier];
      me.fingers[finger.identifier] && me.fingers[finger.identifier].forEach(function (desc) {
        if (stopped) {
          desc._lastPos.x = desc._startPos.x = _dom.prefix == 'MS' ? finger.x : finger.pageX;
          desc._lastPos.y = desc._startPos.y = _dom.prefix == 'MS' ? finger.y : finger.pageY;
          return;
        }

        desc._lastPos.x = _dom.prefix == 'MS' ? finger.x : finger.pageX;
        desc._lastPos.y = _dom.prefix == 'MS' ? finger.y : finger.pageY;

        for (o = 0; o < desc.drag.length; o++) {
          stopped = desc.drag[o][0].call(desc.drag[o][1] || _this, e, finger, desc) === false;
        }
      });
    }
  },
  dropWithoutClick: function dropWithoutClick(e) {
    if (__.preventNextClick) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      __.preventNextClick = false;
    }

    Dom.removeEvent(this, {
      'click': this.dropWithoutClick
    });
  },
  dropAnywhere: function dropAnywhere(e) {
    var _this2 = this;

    var o,
        me = __,
        finger,
        fingers = [],
        prevent;

    if (e.changedTouches && e.changedTouches.length) {
      fingers = e.changedTouches;
    } else fingers.push(e);

    for (var i = 0, ln = fingers.length; i < ln; i++) {
      finger = fingers[i];
      me.nbFingers--;
      me.fingers[finger.identifier] && me.fingers[finger.identifier].forEach(function (desc) {
        desc.nbFingers--;
        prevent = prevent || desc.mouseDrag && e.timeStamp - desc._startTs > 250;
        desc._lastPos.x = _dom.prefix == 'MS' ? finger.x : finger.pageX;
        desc._lastPos.y = _dom.prefix == 'MS' ? finger.y : finger.pageY;

        for (o = 0; o < desc.dropped.length; o++) {
          desc.dropped[o][0].call(desc.dropped[o][1] || _this2, e, finger, desc);
        }
      });
      me.fingers[finger.identifier] = null;
    }

    if (prevent) {
      me.preventNextClick = true;
    }

    if (!me.nbFingers) {
      Dom.removeEvent(document, {
        'touchmove': me.dragAnywhere,
        'mousemove': me.dragAnywhere,
        'touchend': me.dropAnywhere,
        'mouseup': me.dropAnywhere
      });
    }
  },
  getDraggable: function getDraggable(node, mouseDrag) {
    var i = this.dragEnabled.indexOf(node),
        desc;

    if (i === -1) {
      this.dragEnabled.push(node);
      this.dragEnabledDesc.push(desc = {
        mouseDrag: mouseDrag,
        nbFingers: 0,
        locks: 0,
        _startPos: {
          x: 0,
          y: 0
        },
        _lastPos: {
          x: 0,
          y: 0
        },
        dragstart: [],
        drag: [],
        dragEnd: [],
        dropped: []
      }); //debugger;

      Dom.addEvent(node, {
        'mousedown': mouseDrag && this.dragstartAnywhere,
        'touchstart': this.dragstartAnywhere
      }, null, null, true);
    } else desc = this.dragEnabledDesc[i];

    return desc;
  },
  freeDraggable: function freeDraggable(node) {
    var i = this.dragEnabled.indexOf(node),
        desc;

    if (i !== -1) {
      this.dragEnabled.splice(i, 1);
      this.dragEnabledDesc.splice(i, 1);
      Dom.removeEvent(node, {
        'mousedown': this.dragstartAnywhere,
        'touchstart': this.dragstartAnywhere
      });
    }
  },
  addOverflowEvent: function addFlowListener(element, fn) {
    var type = 'over',
        flow = type == 'over';
    element.addEventListener('OverflowEvent' in window ? 'overflowchanged' : type + 'flow', function (e) {
      if (e.type == type + 'flow' || e.orient == 0 && e.horizontalOverflow == flow || e.orient == 1 && e.verticalOverflow == flow || e.orient == 2 && e.horizontalOverflow == flow && e.verticalOverflow == flow) {
        return fn.call(this, e);
      }
    }, false);
  },
  addEvent: function addEvent(node, type, fn, bubble) {
    if (node.addEventListener) {
      node.addEventListener(type, fn, bubble);
    } else if (node.attachEvent) {
      node.attachEvent('on' + type, fn.related = function (e) {
        return fn.call(node, e);
      });
    }
  },
  removeEvent: function removeEvent(node, type, fn, bubble) {
    if (node.removeEventListener) {
      node.removeEventListener(type, fn, bubble);
    } else if (node.attachEvent) {
      node.detachEvent('on' + type, fn.related);
    }
  },
  rmDragFn: function rmDragFn(arr, fn, scope) {
    for (var i = 0, ln = arr.length; i < ln; i++) {
      if (arr[i][0] === fn) return arr.splice(i, 1);
    }

    console.warn("Rm event : Listener not found !!");
  },
  _createElement: function _createElement(tag, opt, refs, parent) {
    var a,
        o,
        i,
        ln,
        node = parent || document.createElement(tag); //if (parent) opt = {content:opt};

    if (opt) for (o in opt) {
      if (opt.hasOwnProperty(o) && opt[o] !== undefined && !_createElementAttr.hasOwnProperty(o)) {
        a = document.createAttribute(o);
        a.value = opt[o];
        node.setAttributeNode(a);
      }
    }
    refs && opt.$id && (refs[opt.$id] = node);
    opt.style && Dom.applyCss(node, opt.style);
    opt.cls && Dom.addCls(node, opt.cls);

    if (opt.events) {
      for (o in opt.events) {
        if (opt.events.hasOwnProperty(o) && o !== "$scope") Dom.addEvent(node, o, opt.events[o], opt.events.$scope);
      }
    }

    if (opt.content) {
      if (typeof opt.content === 'string' || typeof opt.content[o] == 'number') {
        node.innerHTML = opt.content;
      } else if (opt.content instanceof Array) {
        for (i = 0, ln = opt.content.length; i < ln; i++) {
          node.appendChild(typeof opt.content[i] == 'string' || typeof opt.content[i] == 'number' || !opt.content[i] ? document.createTextNode(opt.content[i] || '') : isElement(opt.content[i]) ? opt.content[i] : __createElement(opt.content[i].tagName || 'div', opt.content[i], refs));
        }
      } else {
        node.appendChild(opt.content instanceof HTMLElement ? opt.content : __createElement(opt.content.tagName || 'div', opt.content, refs));
      }
    }

    return node;
  }
},
    Dom = {
  addEvent: function addEvent(node, type, fn, mouseDrag, bubble) {
    if (is.object(type)) {
      for (var o in type) {
        if (type.hasOwnProperty(o)) this.addEvent(node, o, type[o], mouseDrag, bubble);
      }

      return;
    } else if (type == 'dragstart') {
      __.getDraggable(node, mouseDrag).dragstart.push([fn, mouseDrag]);
    } else if (type == 'drag') {
      __.getDraggable(node, mouseDrag).drag.push([fn, mouseDrag]);
    } else if (type == 'dropped') {
      __.getDraggable(node, mouseDrag).dropped.push([fn, mouseDrag]);
    } else {
      if (node.addEventListener) {
        node.addEventListener(type, fn, {
          passive: false
        });
      } else if (node.attachEvent) {
        node.attachEvent('on' + type, fn.related = function (e) {
          return fn.call(node, e);
        });
      }
    }
  },
  removeEvent: function removeEvent(node, type, fn, scope, bubble) {
    var i, desc;

    if (is.object(type)) {
      for (var o in type) {
        if (type.hasOwnProperty(o)) this.removeEvent(node, o, type[o], scope);
      }
    } else if (/^(drag|drop)/.test(type)) {
      desc = __.getDraggable(node);

      __.rmDragFn(desc[type], fn, scope);

      if (!desc.dragstart.length && !desc.drag.length && !desc.dragEnd.length && !desc.dropped.length) __.freeDraggable(node);
    } else {
      if (node.removeEventListener) {
        node.removeEventListener(type, fn, bubble);
      } else if (node.attachEvent) {
        node.detachEvent('on' + type, fn.related);
      }
    }
  },
  offset: function offset(elem) {
    // @todo
    var dims = {
      top: 0,
      left: 0,
      width: elem.offsetWidth,
      height: elem.offsetHeight
    };

    while (elem) {
      dims.top = dims.top + parseInt(elem.offsetTop);
      dims.left = dims.left + parseInt(elem.offsetLeft);
      elem = elem.offsetParent;
    }

    return dims;
  },
  addWheelEvent: isBrowser && function (window, document) {
    var prefix = "",
        _addEventListener,
        _rmEventListener,
        onwheel,
        support; // detect event model


    if (window.addEventListener) {
      _addEventListener = "addEventListener";
      _rmEventListener = "removeEventListener";
    } else {
      _addEventListener = "attachEvent";
      _rmEventListener = "detachEvent";
      prefix = "on";
    } // detect available wheel event


    support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
    document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
    "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

    var addWheelListener = function addWheelListener(elem, callback, scope, useCapture) {
      _addWheelListener(elem, support, callback, scope, useCapture); // handle MozMousePixelScroll in older Firefox


      if (support == "DOMMouseScroll") {
        _addWheelListener(elem, "MozMousePixelScroll", callback, scope, useCapture);
      }
    }; // Reasonable defaults


    var PIXEL_STEP = 10;
    var LINE_HEIGHT = 40;
    var PAGE_HEIGHT = 800;

    function normalizeWheel(
    /*object*/
    event)
    /*object*/
    {
      var sX = 0,
          sY = 0,
          // spinX, spinY
      pX = 0,
          pY = 0; // pixelX, pixelY
      // Legacy

      if ('detail' in event) {
        sY = event.detail;
      }

      if ('wheelDelta' in event) {
        sY = -event.wheelDelta / 120;
      }

      if ('wheelDeltaY' in event) {
        sY = -event.wheelDeltaY / 120;
      }

      if ('wheelDeltaX' in event) {
        sX = -event.wheelDeltaX / 120;
      } // side scrolling on FF with DOMMouseScroll


      if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
        sX = sY;
        sY = 0;
      }

      pX = sX * PIXEL_STEP;
      pY = sY * PIXEL_STEP;

      if ('deltaY' in event) {
        pY = event.deltaY;
      }

      if ('deltaX' in event) {
        pX = event.deltaX;
      }

      if ((pX || pY) && event.deltaMode) {
        if (event.deltaMode == 1) {
          // delta in LINE units
          pX *= LINE_HEIGHT;
          pY *= LINE_HEIGHT;
        } else {
          // delta in PAGE units
          pX *= PAGE_HEIGHT;
          pY *= PAGE_HEIGHT;
        }
      } // Fall-back if spin cannot be determined


      if (pX && !sX) {
        sX = pX < 1 ? -1 : 1;
      }

      if (pY && !sY) {
        sY = pY < 1 ? -1 : 1;
      }

      return {
        spinX: sX,
        spinY: sY,
        pixelX: pX,
        pixelY: pY
      };
    }

    function _addWheelListener(elem, eventName, callback, scope, useCapture) {
      elem[_addEventListener](prefix + eventName, callback._wheelList = function (originalEvent) {
        !originalEvent && (originalEvent = window.event); // create a normalized event object

        var event = {
          // keep a ref to the original event object
          originalEvent: originalEvent,
          target: originalEvent.target || originalEvent.srcElement,
          type: "wheel",
          deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
          deltaX: 0,
          delatZ: 0,
          preventDefault: function preventDefault() {
            originalEvent.preventDefault ? originalEvent.preventDefault() : originalEvent.returnValue = false;
          },
          normalized: normalizeWheel(originalEvent)
        }; // calculate deltaY (and deltaX) according to the event

        if (support == "mousewheel") {
          event.deltaY = -1 / 40 * originalEvent.wheelDelta; // Webkit also support wheelDeltaX
          //                            originalEvent.wheelDeltaX && ( event.deltaX = - 1/40 *
          // originalEvent.wheelDeltaX );
        } else if (support == "wheel" && _dom.prefix == "Moz") {
          event.deltaY = originalEvent.deltaY / 3;
        } else if (support == "wheel") {
          event.deltaY = originalEvent.deltaY / 100;
        } else {
          event.deltaY = originalEvent.deltaY;
        } //                        if (typeof originalEvent.wheelDeltaY !== 'number')
        //                            event.wheelDeltaY = originalEvent.deltaY/100;
        //                        event.wheelDelta = deltaY*120;
        // it's time to fire the callback


        return callback.call(scope || this, event);
      }, useCapture || false);
    }

    return addWheelListener;
  }(window, document),
  rmWheelEvent: isBrowser && function (window, document) {
    var prefix = "",
        _rmEventListener,
        onwheel,
        support; // detect event model


    if (addEventListener) {
      _rmEventListener = "removeEventListener";
    } else {
      _rmEventListener = "detachEvent";
      prefix = "on";
    } // detect available wheel event


    support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
    document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
    "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

    var rmWheelListener = function rmWheelListener(elem, callback, scope, useCapture) {
      _EventListener(elem, support, callback, scope, useCapture); // handle MozMousePixelScroll in older Firefox


      if (support == "DOMMouseScroll") {
        _EventListener(elem, "MozMousePixelScroll", callback, scope, useCapture);
      }
    };

    function _EventListener(elem, eventName, callback, scope, useCapture) {
      elem[_rmEventListener](prefix + eventName, callback._wheelList);
    }

    return rmWheelListener;
  }(window, document),

  /**
   * Find the react component that generate element dom node
   * @param element
   * @returns {[React.Component]}
   */
  findReactParents: function findReactParents(element) {
    var fiberNode,
        comps = [element];

    for (var key in element) {
      if (key.startsWith('__reactInternalInstance$')) {
        fiberNode = element[key];

        while (fiberNode.return) {
          if (fiberNode.stateNode && !comps.includes(fiberNode.stateNode)) comps.push(fiberNode.stateNode);
          fiberNode = fiberNode.return;
        }

        return comps;
      }
    }

    return element.parentNode && this.findReactParents(element.parentNode);
  }
};

/* harmony default export */ __webpack_exports__["default"] = (Dom);

/***/ }),

/***/ "./src/withTweener.js":
/*!****************************!*\
  !*** ./src/withTweener.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return withTweener; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "undefined?df9b");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "undefined?cdfe");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "undefined?588e");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! is */ "undefined?63a5");
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(is__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _TweenerContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TweenerContext */ "./src/TweenerContext.js");



/*
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



var SimpleObjectProto = {}.constructor;
/**
 * asTweener decorator
 * @param argz
 * @returns {*}
 */

function withTweener() {
  for (var _len = arguments.length, argz = new Array(_len), _key = 0; _key < _len; _key++) {
    argz[_key] = arguments[_key];
  }

  var BaseComponent = (!argz[0] || argz[0].prototype instanceof react__WEBPACK_IMPORTED_MODULE_2___default.a.Component || argz[0] === react__WEBPACK_IMPORTED_MODULE_2___default.a.Component) && argz.shift(),
      opts = (!argz[0] || argz[0] instanceof SimpleObjectProto) && argz.shift() || {};

  if (!(BaseComponent && (BaseComponent.prototype instanceof react__WEBPACK_IMPORTED_MODULE_2___default.a.Component || BaseComponent === react__WEBPACK_IMPORTED_MODULE_2___default.a.Component))) {
    return function (BaseComponent) {
      return withTweener(BaseComponent, opts);
    };
  }

  var TweenerToProps =
  /*#__PURE__*/
  function (_React$Component) {
    _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1___default()(TweenerToProps, _React$Component);

    function TweenerToProps() {
      return _React$Component.apply(this, arguments) || this;
    }

    var _proto = TweenerToProps.prototype;

    _proto.render = function render() {
      var _this = this;

      return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_TweenerContext__WEBPACK_IMPORTED_MODULE_4__["default"].Consumer, null, function (tweener) {
        return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(BaseComponent, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, _this.props, {
          tweener: tweener,
          ref: _this.props.forwardedRef
        }));
      });
    };

    return TweenerToProps;
  }(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

  TweenerToProps.displayName = BaseComponent.displayName || BaseComponent.name;
  var withRef = react__WEBPACK_IMPORTED_MODULE_2___default.a.forwardRef(function (props, ref) {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(TweenerToProps, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
      forwardedRef: ref
    }));
  });
  withRef.displayName = TweenerToProps.displayName;
  return withRef;
}

/***/ }),

/***/ "undefined?25b8":
/*!**************************!*\
  !*** external "d3-ease" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("d3-ease");

/***/ }),

/***/ "undefined?3832":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "undefined?588e":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "undefined?5e9a":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),

/***/ "undefined?63a5":
/*!*********************!*\
  !*** external "is" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("is");

/***/ }),

/***/ "undefined?a742":
/*!*****************************!*\
  !*** external "color-rgba" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("color-rgba");

/***/ }),

/***/ "undefined?a9ee":
/*!*****************************!*\
  !*** external "tween-axis" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tween-axis");

/***/ }),

/***/ "undefined?beec":
/*!**************************!*\
  !*** external "shortid" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("shortid");

/***/ }),

/***/ "undefined?cdfe":
/*!*******************************************************!*\
  !*** external "@babel/runtime/helpers/inheritsLoose" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/inheritsLoose");

/***/ }),

/***/ "undefined?df9b":
/*!*************************************************!*\
  !*** external "@babel/runtime/helpers/extends" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/extends");

/***/ }),

/***/ "undefined?e4e5":
/*!***************************************************************!*\
  !*** external "@babel/runtime/helpers/assertThisInitialized" ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/assertThisInitialized");

/***/ })

/******/ });
//# sourceMappingURL=react-rtween.js.map