/*!
 * rtween
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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default, rTween */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rTween", function() { return rTween; });
/* harmony import */ var _rTween__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rTween */ "./src/rTween.js");
/*
 * The MIT License (MIT)
 * Copyright (c) 2019. Wise Wild Web
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  @author : Nathanael Braun
 *  @contact : n8tz.js@gmail.com
 */

/* harmony default export */ __webpack_exports__["default"] = (_rTween__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);
var rTween = _rTween__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"];

/***/ }),

/***/ "./src/lines sync recursive ^\\.\\/.*$":
/*!*********************************!*\
  !*** ./src/lines sync ^\.\/.*$ ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./Ring": "./src/lines/Ring.js",
	"./Ring.js": "./src/lines/Ring.js",
	"./SVGPath": "./src/lines/SVGPath.js",
	"./SVGPath.js": "./src/lines/SVGPath.js",
	"./Tween": "./src/lines/Tween.js",
	"./Tween.js": "./src/lines/Tween.js"
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
webpackContext.id = "./src/lines sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./src/lines/Ring.js":
/*!***************************!*\
  !*** ./src/lines/Ring.js ***!
  \***************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Copyright (c) 2019. Nathanael Braun.  All rights reserved.
 *
 * This File is part of Caipi. You can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *  This project is dual licensed under AGPL and Commercial Licence.
 *
 * @author : Nathanael Braun
 * @contact : n8tz.js@gmail.com
 */
var PI = Math.PI,
    isNumber = __webpack_require__(/*! is */ "undefined?63a5").number,
    sin = Math.sin,
    cos = Math.cos;

module.exports = //function () {
function (scope, cfg, target) {
  target && scope && (scope = scope[target] = scope[target] || {}); // !

  var fn = "var _2PI=2*Math.PI,",
      axe1 = cfg.axes && cfg.axes[0] || 'x',
      // should factorise....
  axe2 = cfg.axes && cfg.axes[1] || 'y',
      factor1 = (cfg.factors && cfg.factors[0] || 1) * cfg.radius,
      // should factorise....
  factor2 = (cfg.factors && cfg.factors[1] || 1) * cfg.radius,
      startPos = (cfg.startPos || 0) * 2 * PI,
      length = isNumber(cfg.length) ? cfg.length : 1;
  fn += "pos1=(" + startPos + "+((lastPos+update)*_2PI)*" + length + " )%(_2PI)," + "pos2 = (" + startPos + "+(lastPos)*_2PI*" + length + " )%(_2PI);";
  fn += "scope." + axe1 + "+=" + factor1 + "*(Math.cos(pos1)-Math.cos(pos2));" + // ! optims
  "scope." + axe2 + " += " + factor2 + "*(Math.sin(pos1)-Math.sin(pos2));";
  return new Function("lastPos, update, scope, cfg, target", fn);
};

module.exports.isFactory = true;

/***/ }),

/***/ "./src/lines/SVGPath.js":
/*!******************************!*\
  !*** ./src/lines/SVGPath.js ***!
  \******************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Copyright (c) 2019. Nathanael Braun.  All rights reserved.
 *
 * This File is part of Caipi. You can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *  This project is dual licensed under AGPL and Commercial Licence.
 *
 * @author : Nathanael Braun
 * @contact : n8tz.js@gmail.com
 */
var cache = {},
    buildPath,
    getPoint;

if (typeof document == "undefined") {
  buildPath = function buildPath(P) {
    return cache[P] || __webpack_require__(/*! point-at-length */ "undefined?32aa")(P);
  };

  getPoint = function getPoint(P, p) {
    return cache[P].at(p);
  };
} else {
  buildPath = function buildPath(P) {
    var p = cache[P];

    if (!p) {
      cache[P] = p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute('d', P);
    }

    ;
  };

  getPoint = function getPoint(P, p) {
    return cache[P].getPointAtLength(p * cache[P].getTotalLength());
  };
}

module.exports = function (_scope, cfg, target) {
  // @todo incremental path reader
  var axe1 = cfg.axes && cfg.axes[0] || 'x',
      // should factorise better....
  axe2 = cfg.axes && cfg.axes[1] || 'y',
      lastPtsPos,
      lastPts;
  buildPath(cfg.path);
  return function (lastPos, update, scope, cfg, target) {
    var p1 = lastPtsPos == lastPos ? lastPts : getPoint(cfg.path, cfg.reverse ? 1 - lastPos : lastPos),
        p2 = lastPts = getPoint(cfg.path, cfg.reverse ? 1 - (lastPos + update) : lastPos + update);
    lastPtsPos = lastPos + update;
    scope[axe1] += (p2.x - p1.x) * 4;
    scope[axe2] += (p2.y - p1.y) * 4;
  };
};

module.exports.isFactory = true;

/***/ }),

/***/ "./src/lines/Tween.js":
/*!****************************!*\
  !*** ./src/lines/Tween.js ***!
  \****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

/*
 * Copyright (c) 2019. Nathanael Braun.  All rights reserved.
 *
 * This File is part of Caipi. You can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *  This project is dual licensed under AGPL and Commercial Licence.
 *
 * @author : Nathanael Braun
 * @contact : n8tz.js@gmail.com
 */
module.exports = function (_scope, cfg, target) {
  var fn = "";
  target && (fn += "scope = scope['" + target + "'];\n");

  for (var k in cfg.apply) {
    if (cfg.apply.hasOwnProperty(k)) {
      _scope && (_scope[k] = _scope[k] || 0);
      fn += "scope." + k + "+=(" + (cfg.easeFn ? "cfg.easeFn(lastPos+update)" + "- cfg.easeFn(lastPos)" : "update") + ") * cfg.apply." + k + ";";
    }
  }

  return new Function("lastPos, update, scope, cfg, target", fn);
};

module.exports.isFactory = true;

/***/ }),

/***/ "./src/rTween.js":
/*!***********************!*\
  !*** ./src/rTween.js ***!
  \***********************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RTween; });
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "undefined?e108");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "undefined?24b3");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "undefined?36a1");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! is */ "undefined?63a5");
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(is__WEBPACK_IMPORTED_MODULE_3__);




/*
 * The MIT License (MIT)
 * Copyright (c) 2019. Wise Wild Web
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  @author : Nathanael Braun
 *  @contact : n8tz.js@gmail.com
 */

/**
 * #  rTween
 *
 * Scalable, multiscope, reversible, delta based, interpolation/tweening engine
 *
 * ## rTween what ?
 *
 * - Tweening engine allowing to apply forward and backward multiples tweens on same
 * properties and multiple objects
 * - Allow live composition of classic tweens, circle tweens, SVG Path tweens, other
 * rTweens, etc
 * - Purely Abstract, no Dom deps, rTween don't apply the CSS itself
 * - Work in node & webpack environment
 *
 * @author Nathanael BRAUN
 * @contact n8tz.js@gmail.com
 * @licence AGPL-3.0
 */


var easingFN = __webpack_require__(/*! d3-ease */ "undefined?25b8"),
    isArray = is__WEBPACK_IMPORTED_MODULE_3___default.a.array,
    isNumber = is__WEBPACK_IMPORTED_MODULE_3___default.a.number,
    isString = is__WEBPACK_IMPORTED_MODULE_3___default.a.string,
    slice = Array.prototype.slice,
    push = Array.prototype.push,
    abs = Math.abs,
    forkedrTween = function forkedrTween(cfg) {
  this.__cPos = 0;
  this.__cIndex = 0;
  this.onScopeUpdated = false;
  this.__activeProcess = [];
  this.__outgoing = [];
  this.__incoming = [];
};

var // runner
_live = false,
    lastTm,
    _running = [];

var RTween =
/*#__PURE__*/
function () {
  function RTween(cfg, scope) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, RTween);

    this.scope = scope;
    cfg = cfg || {};
    this.__marks = [];
    this.__marksLength = [];
    this.__marksKeys = [];
    this.__processors = [];
    this.__config = [];
    this.__activeForks = [];
    this.__activeProcess = [];
    this.__activeProcess = [];
    this.__outgoing = [];
    this.__incoming = [];
    this.__cPos = 0;
    this.__cIndex = 0;
    this.__cMaxKey = 1;

    if (isArray(cfg)) {
      this.localLength = 1;
      this.mount(cfg, scope);
    } else {
      Object.assign(this, cfg);
      if (cfg.rTween) this.mount(cfg.rTween, scope);
    }
  }
  /**
   * Run this tween line from 0 to his duration using linear
   * @param target
   * @param cb
   * @param tm
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(RTween, [{
    key: "run",
    value: function run(target, cb, tm) {
      RTween.Runner.run(this, target, tm || this.duration, cb);
    }
    /**
     * Tween this tween line to 'to' during 'tm' ms using easing fn
     * @param to {int}
     * @param tm {int} duration in ms
     * @param easing {function} easing fn
     * @param tick {function} fn called at each tick
     * @param cb {function} fn called on complete
     */

  }, {
    key: "runTo",
    value: function runTo(to, tm) {
      var _this = this;

      var easing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (x) {
        return x;
      };
      var tick = arguments.length > 3 ? arguments[3] : undefined;
      var cb = arguments.length > 4 ? arguments[4] : undefined;
      var from = this.__cPos,
          length = to - from;

      _running.push({
        apply: function apply(pos, max) {
          var x = from + easing(pos / max) * length;

          _this.goTo(x);

          tick && tick(x);
        },
        duration: tm,
        cpos: 0,
        cb: cb
      });

      if (!_live) {
        _live = true;
        lastTm = Date.now(); // console.log("TL runner On");

        setTimeout(RTween.Runner._tick, 16);
      }
    }
    /**
     * Map process descriptors to get a runnable timeline
     * @method mount
     * @param map
     */

  }, {
    key: "mount",
    value: function mount(map, scope) {
      var i,
          ln,
          d = this.duration || 0,
          p = 0,
          max = 0,
          factory;

      for (i = 0, ln = map.length; i < ln; i++) {
        if (isString(map[i].easeFn)) map[i] = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, map[i], {
          easeFn: easingFN[map[i].easeFn] || false
        });

        if (map[i].type == "Subline") {
          factory = map[i].apply.fork(null, map[i], map[i].easeFn);
        } else {
          factory = __webpack_require__("./src/lines sync recursive ^\\.\\/.*$")("./" + (map[i].type || 'Event'));
        }

        if (!factory) {
          console.log('rTween : Anim not found : ' + map[i].type);
          continue;
        }

        if (!isNumber(map[i].from)) // no from so assume it's sync
          this.addProcess(d, d + map[i].duration, factory, map[i]), d += map[i].duration || 0;else // have from so assume it's async
          this.addProcess(map[i].from, map[i].from + map[i].duration, factory, map[i]), max = Math.max(max, map[i].from + map[i].duration);
      }

      this.duration = Math.max(d, max);
      return this;
    }
    /**
     * Clone this rTween
     * @method fork
     * @param fn
     * @param ctx
     * @param easeFn
     * @returns {forkedrTween}
     */

  }, {
    key: "fork",
    value: function fork(cfg) {
      this._masterLine = this._masterLine || this;
      forkedrTween.prototype = this._masterLine;
      return new forkedrTween(cfg);
    }
    /**
     * Map a process descriptor
     * @method addProcess
     * @param from
     * @param to
     * @param process
     * @param cfg
     * @returns {rTween}
     */

  }, {
    key: "addProcess",
    value: function addProcess(from, to, process, cfg) {
      var i = 0,
          _ln = process.localLength,
          ln = to - from || 0,
          key = this.__cMaxKey++,
          isTl = process instanceof RTween;
      if (isTl) process = process.fork(null, cfg);
      this.__activeForks[key] = true;
      this.__processors[key] = process.isFactory ? process(null, cfg, cfg.target) : process;
      this.__marksLength[key] = ln;
      this.__config[key] = cfg; // put start marker in the ordered marker list

      while (i <= this.__marks.length && this.__marks[i] < from) {
        i++;
      }

      this.__marks.splice(i, 0, from);

      this.__marksKeys.splice(i, 0, key); // put end marker in the ordered marker list


      while (i <= this.__marks.length && this.__marks[i] <= to) {
        i++;
      }

      this.__marks.splice(i, 0, to);

      this.__marksKeys.splice(i, 0, -key);

      return this;
    }
    /**
     *
     * @param key
     * @returns {*}
     * @private
     */

  }, {
    key: "_getIndex",
    value: function _getIndex(key) {
      return (key = this.__marksKeys.indexOf(key)) !== -1 ? key : false;
    }
    /**
     * apply to scope or this.scope the delta of the process mapped from cPos to 'to'
     * using a rTween length of 1
     * @method go
     * @param to
     * @param scope
     * @param reset
     */

  }, {
    key: "go",
    value: function go(to, scope, reset) {
      this.goTo(to * this.duration, scope, reset);
      this.__cRPos = to;
      return scope || this.scope;
    }
  }, {
    key: "getPosAt",
    value: function getPosAt(to, scope) {
      this.__activeProcess.length = 0;
      this.__outgoing.length = 0;
      this.__incoming.length = 0;
      this.__cPos = 0;
      this.__cIndex = 0;
      return this.go(to, scope);
    }
    /**
     * apply to scope or this.scope the delta of the process mapped from cPos to 'to'
     * using the mapped rTween length
     * @method goTo
     * @param to
     * @param scope
     * @param reset
     */

  }, {
    key: "goTo",
    value: function goTo(to, scope, reset) {
      scope = scope || this.scope;
      if (this.window) to = this.window.start + to / this.duration * this.window.length;

      if (!this._started) {
        this._started = true;
        this.__cIndex = this.__cPos = 0;
      }

      var i = this.__cIndex,
          p,
          ln,
          outgoing = this.__outgoing,
          incoming = this.__incoming,
          pos,
          _from,
          _to,
          d,
          key,
          mLn = this.__marks.length,
          diff = to - this.__cPos;

      if (reset) {
        this.__activeProcess.length = 0;
        this.__outgoing.length = 0;
        this.__incoming.length = 0; // reset forks
        //console.log('reset ', to);
        //for ( i = 0, ln = this.__processors.length ; i < ln ; i++ ) {
        //    if (this.__processors[i] instanceof rTween){
        //        this.__processors[i].goTo(0,0,true);
        //    }
        //}
      } // 1st ajust period, knowing which process are involved / leaving
      // while my indice target a marker/time period inferior to my pos


      while (i < mLn && to > this.__marks[i] || diff >= 0 && this.__marks[i] == to) {
        // if next marker is ending an active process
        if ((p = this.__activeProcess.indexOf(-this.__marksKeys[i])) != -1) {
          this.__activeProcess.splice(p, 1);

          outgoing.push(this.__marksKeys[i]); //console.log("close " + this.__marksKeys[i]);
        } // if next marker is process ending a process who just start (direction has
        // change)
        else if ((p = this.__activeProcess.indexOf(this.__marksKeys[i])) != -1) {
            this.__activeProcess.splice(p, 1);

            outgoing.push(this.__marksKeys[i]); //console.log("close after dir change" + this.__marksKeys[i]);
          } // if next marker is process ending a process who just start
          else if ((p = incoming.indexOf(-this.__marksKeys[i])) != -1) {
              incoming.splice(p, 1);
              outgoing.push(this.__marksKeys[i]); //console.log("close starting " + this.__marksKeys[i]);
            } else {
              incoming.push(this.__marksKeys[i]); //console.log("right say in " + this.__marksKeys[i]);
            }

        i++;
      } // while my indice-1 target a marker/time period superior to my pos


      while (i - 1 >= 0 && (to < this.__marks[i - 1] || diff < 0 && this.__marks[i - 1] == to)) {
        i--;

        if ((p = this.__activeProcess.indexOf(-this.__marksKeys[i])) != -1) {
          this.__activeProcess.splice(p, 1);

          outgoing.push(this.__marksKeys[i]); //console.log("left say out " + this.__marksKeys[i]);
        } // if next marker is process ending a process who just start (direction has
        // change)
        else if ((p = this.__activeProcess.indexOf(this.__marksKeys[i])) != -1) {
            this.__activeProcess.splice(p, 1);

            outgoing.push(this.__marksKeys[i]); //console.log("close after dir change" + this.__marksKeys[i]);
          } else if ((p = incoming.indexOf(-this.__marksKeys[i])) != -1) {
            incoming.splice(p, 1);
            outgoing.push(this.__marksKeys[i]); //console.log("left say out from incoming " + this.__marksKeys[i]);
          } else {
            //console.log("left say in " + this.__marksKeys[i]);
            incoming.push(this.__marksKeys[i]);
          }
      } // now dispatching deltas
      //console.log(incoming, outgoing, this.__activeProcess);


      this.__cIndex = i; // those leaving subline

      for (i = 0, ln = outgoing.length; i < ln; i++) {
        p = this._getIndex(outgoing[i]);
        key = abs(outgoing[i]);

        if (outgoing[i] < 0) {
          _from = Math.min(this.__marks[p], Math.max(this.__cPos, this.__marks[p] - this.__marksLength[key])) - (this.__marks[p] - this.__marksLength[key]);
          _to = this.__marksLength[key];
          pos = _from;
          d = _to - _from;
          pos = (this.localLength || 1) * pos / this.__marksLength[key];
          d = (this.localLength || 1) * d / this.__marksLength[key];
        } else {
          _from = Math.max(this.__marks[p], Math.min(this.__cPos, this.__marks[p] + this.__marksLength[key])) - this.__marks[p];
          _to = 0;
          pos = _from;
          d = _to - _from;
          pos = (this.localLength || 1) * pos / this.__marksLength[key];
          d = (this.localLength || 1) * d / this.__marksLength[key];
        } //
        //console.log("out " + this.__marksKeys[p] + " " + this.__marksLength[p]+
        //            '\npos:'+this.__cPos+
        //            '\nmark:'+this.__marks[p]+
        //            '\ninnerpos:'+pos+
        //            '\ndelta:'+d
        //);


        if (this.__processors[key].go) {
          this.__processors[key].go(pos + d, scope, reset);
        } else this.__processors[key](pos, d, scope, this.__config[key], this.__config[key].target || this.__config[key].$target && this.__context && this.__context[this.__config[key].$target]);
      } // those entering subline


      for (i = 0, ln = incoming.length; i < ln; i++) {
        p = this._getIndex(incoming[i]);
        key = abs(incoming[i]);

        if (incoming[i] < 0) {
          _from = this.__marksLength[key];
          _to = Math.max(this.__marks[p] - this.__marksLength[key], Math.min(this.__cPos + diff, this.__marks[p])) - (this.__marks[p] - this.__marksLength[key]);
          pos = _from;
          d = _to - _from;
          pos = (this.localLength || 1) * pos / this.__marksLength[key];
          d = (this.localLength || 1) * d / this.__marksLength[key];
        } else {
          _from = 0;
          _to = Math.max(this.__marks[p], Math.min(this.__cPos + diff, this.__marks[p] + this.__marksLength[key])) - this.__marks[p];
          pos = _from;
          d = _to - _from;
          pos = (this.localLength || 1) * pos / this.__marksLength[key];
          d = (this.localLength || 1) * d / this.__marksLength[key];
        } //console.log("in " + this.__marksKeys[p] + " " + this.__marksLength[p]+
        //            '\ndiff:'+diff+
        //            '\npos:'+this.__cPos+
        //            '\nmark:'+this.__marks[p]+
        //            '\n_from:'+_from+
        //            '\n_to:'+_to+
        //            '\ninnerpos:'+pos+
        //            '\ndelta:'+d
        //);


        if (this.__processors[key].go) {
          //console.log("in " + pos, d);
          this.__processors[key].go(pos, 0, true); //reset local fork


          this.__processors[key].go(pos + d, scope);
        } else if (!reset) this.__processors[key](pos, d, scope, this.__config[key], this.__config[key].target || this.__config[key].$target && this.__context && this.__context[this.__config[key].$target]);
      } // and those who where already there
      //if ( !reset )


      for (i = 0, ln = this.__activeProcess.length; i < ln; i++) {
        p = this._getIndex(this.__activeProcess[i]);
        key = abs(this.__activeProcess[i]); //d = (this.__cPos - diff)<this.__marks[p]?this.__cPos-this.__marks[p] : diff;

        pos = this.__activeProcess[i] < 0 ? this.__cPos - (this.__marks[p] - this.__marksLength[key]) : this.__cPos - this.__marks[p];
        pos = (this.localLength || 1) * pos / this.__marksLength[key];
        d = diff * (this.localLength || 1) / this.__marksLength[key]; //console.log("active " + p + " " + this.__marksLength[p]
        //            +'\nto:'+to
        //            +'\npos:'+this.__cPos
        //            +'\nmark:'+this.__marks[p]+
        //            '\ngdiff:'+diff68786k
        //            +'\ninnerpos:'+(pos * (this.localLength || 1)) /
        // abs(this.__marksLength[p]) +'\ndelta:'+(diff * (this.localLength || 1)) /
        // abs(this.__marksLength[p]) );

        if (this.__processors[key].go) {
          this.__processors[key].go(pos + d, scope);
        } else if (!reset) this.__processors[key](pos, d, scope, this.__config[key], this.__config[key].target || this.__config[key].$target && this.__context && this.__context[this.__config[key].$target]);
      }

      push.apply(this.__activeProcess, incoming);
      outgoing.length = 0;
      incoming.length = 0;
      this.__cPos = to;
      this.onScopeUpdated && this.onScopeUpdated(to, diff, scope);
    }
  }]);

  return RTween;
}();

RTween.Runner = {
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


/***/ }),

/***/ "undefined?24b3":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/classCallCheck" ***!
  \********************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/classCallCheck");

/***/ }),

/***/ "undefined?25b8":
/*!**************************!*\
  !*** external "d3-ease" ***!
  \**************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("d3-ease");

/***/ }),

/***/ "undefined?32aa":
/*!**********************************!*\
  !*** external "point-at-length" ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("point-at-length");

/***/ }),

/***/ "undefined?36a1":
/*!*****************************************************!*\
  !*** external "@babel/runtime/helpers/createClass" ***!
  \*****************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/createClass");

/***/ }),

/***/ "undefined?63a5":
/*!*********************!*\
  !*** external "is" ***!
  \*********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("is");

/***/ }),

/***/ "undefined?e108":
/*!******************************************************!*\
  !*** external "@babel/runtime/helpers/objectSpread" ***!
  \******************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/objectSpread");

/***/ })

/******/ });
//# sourceMappingURL=rTween.js.map