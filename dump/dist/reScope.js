/*!
 * MIT License
 * 
 * Copyright (c) 2018 Wise Wild Web
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/Scope.js":
/*!**********************!*\
  !*** ./src/Scope.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "undefined?4d9b");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "undefined?188d");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "undefined?24b3");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "undefined?03c7");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "undefined?20a8");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "undefined?e4e5");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "undefined?36a1");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "undefined?74ba");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! is */ "undefined?63a5");
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(is__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var shortid__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! shortid */ "undefined?beec");
/* harmony import */ var shortid__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(shortid__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _utils_Emitter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/Emitter */ "./src/utils/Emitter.js");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/utils */ "./src/utils/utils.js");









(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};

/*
 *
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





var __proto__push = function __proto__push(target, id, parent) {
  var fn = function fn() {};

  fn.prototype = parent ? new parent._[id]() : target[id] || {};
  target[id] = new fn();
  target._[id] = fn;
},
    allScopes = {};
/**
 * Base Scope object
 */


var Scope =
/*#__PURE__*/
function (_EventEmitter) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(Scope, _EventEmitter);

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(Scope, null, [{
    key: "stateMapToRefList",
    // if > 0, will wait 'persistenceTm' ms before destroy when dispose reach 0
    // all active scopes

    /**
     * get a parsed reference list from stateMap
     * @param _ref
     * @returns {{storeId, path, alias: *, ref: *}}
     */
    value: function stateMapToRefList(sm) {
      var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var _refs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      var actions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var path = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
      var applier;
      Object.keys(sm).forEach(function (key) {
        var cpath = path ? path + '.' + key : key;
        sm[key] instanceof Scope.scopeRef ? _refs.push(sm[key].path + ':' + cpath) : sm[key] && sm[key] instanceof Function ? key === "$apply" ? applier = sm[key] : actions[key] = sm[key] : sm[key] && sm[key].prototype instanceof Scope.Store ? _refs.push(sm[key].as(cpath)) : //key === "$actions" ?
        //Object.assign(actions, sm[key]) :
        state[cpath] = sm[key]; //: this.stateMapToRefList(sm[key], _refs, path + '.' + key)
      });
      return applier;
    }
  }, {
    key: "getScope",
    value: function getScope(scopes) {
      var skey = is__WEBPACK_IMPORTED_MODULE_8___default.a.array(scopes) ? scopes.sort(function (a, b) {
        if (a.firstname < b.firstname) return -1;
        if (a.firstname > b.firstname) return 1;
        return 0;
      }).join('+') : scopes;
      return allScopes[skey] = allScopes[skey] || new Scope({}, {
        id: skey
      });
    }
  }]);

  /**
   * Init a ReScope scope
   *
   * @param storesMap {Object} Object with the initial stores definition / instances
   * @param config {Object} Scope config
   * {
   *     parent {scope} @optional parent scope
   *
   *     id {string} @optional id ( if this id exist storesMap will be merge on the 'id'
   *     scope)
   *     key {string} @optional key of the scope ( if no id is set, the scope id will be (parent.id+'>'+key)
   *     incrementId {bool} @optional true to add a suffix id, if the provided key or id globally exist
   *
   *     state {Object} @optional initial state by store alias
   *     data {Object} @optional initial data by store alias
   *
   *     rootEmitter {bool} @optional true to not being destabilized by parent
   *     boundedActions {array | regexp} @optional list or regexp of actions not propagated to the parent
   *     autoDestroy {true | false | 'inherit'}
   *     persistenceTm {number) if > 0, will wait 'persistenceTm' ms before destroy when
   *     dispose reach 0 autoDestroy  {bool} will trigger retain & dispose after start
   *  }
   * @returns {Scope}
   */
  function Scope(storesMap) {
    var _this;

    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        parent = _ref2.parent,
        upperScope = _ref2.upperScope,
        key = _ref2.key,
        id = _ref2.id,
        snapshot = _ref2.snapshot,
        state = _ref2.state,
        data = _ref2.data,
        _ref2$incrementId = _ref2.incrementId,
        incrementId = _ref2$incrementId === void 0 ? !!key : _ref2$incrementId,
        persistenceTm = _ref2.persistenceTm,
        autoDestroy = _ref2.autoDestroy,
        rootEmitter = _ref2.rootEmitter,
        boundedActions = _ref2.boundedActions;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, Scope);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Scope).call(this));
    var _ = {
      keyPID: upperScope && upperScope._id || parent && parent._id || shortid__WEBPACK_IMPORTED_MODULE_9___default.a.generate(),
      key: key,
      incrementId: incrementId,
      baseId: id
    }; // generate / set this scope id

    id = id || key && _.keyPID + '>' + key;
    _.isLocalId = !id;
    id = id || "_____" + shortid__WEBPACK_IMPORTED_MODULE_9___default.a.generate();

    if (allScopes[id] && !incrementId) {
      // overwrite existing scope
      _this._id = id;
      allScopes[id].register(storesMap);
      return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(_this, allScopes[id]);
    } else if (allScopes[id] && incrementId) {
      // generate key id
      var i = -1;

      while (allScopes[id + '[' + ++i + ']']) {
        ;
      }

      id = id + '[' + i + ']';
    } // register this scope in the static Scope.scopes


    allScopes[id] = _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this);
    _this._id = id;
    _this._rev = 0;
    _this._ = _;
    _this.actions = {};
    _this.stores = {};
    _this.state = {};
    _this.data = {};
    _this.parent = parent;
    if (autoDestroy == 'inherit') autoDestroy = parent && parent._autoDestroy;
    _this._autoDestroy = autoDestroy;
    _.persistenceTm = persistenceTm || _this.constructor.persistenceTm;
    if (parent && parent.dead) throw new Error("Can't use a dead scope as parent !");

    __proto__push(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), 'actions', parent);

    __proto__push(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), 'stores', parent);

    __proto__push(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), 'state', parent);

    __proto__push(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), 'data', parent);

    _this.sources = [];
    _.childScopes = [];
    _.childScopesList = [];
    _.unStableChilds = 0;
    _.seenChilds = 0;
    _._listening = {};
    _._scope = {};
    _._mixed = [];
    _._mixedList = [];
    _.followers = [];
    _this.__retains = {
      all: 0
    };
    _this.__locks = {
      all: 1
    }; // todo

    _._boundedActions = is__WEBPACK_IMPORTED_MODULE_8___default.a.array(boundedActions) ? {
      test: boundedActions.includes.bind(boundedActions)
    } : boundedActions; // register to the parent scope

    if (parent) {
      parent.retain("isMyParent");

      if (!rootEmitter) {
        !parent._stable && _this.wait("waitingParent");
        parent.on(_._parentList = {
          'stable': function stable(s) {
            return _this.release("waitingParent");
          },
          'unstable': function unstable(s) {
            return _this.wait("waitingParent");
          },
          'update': function update(s) {
            return _this._propag();
          }
        });
      } else {
        parent.on(_._parentList = {
          'update': function update(s) {
            return _this._propag();
          }
        });
      } // this.register(parent.__scope, state, data);

    } // register this scope stores


    _this.register(storesMap, state, data);

    _this.__locks.all--;
    _this._stable = !_this.__locks.all;

    if (parent) {
      parent._addChild(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this));
    } // restore snapshots


    _this.restore(snapshot);

    if (autoDestroy) setTimeout(function (tm) {
      _this.retain("autoDestroy");

      _this.dispose("autoDestroy");
    });
    return _this;
  }
  /**
   *
   * Mount the stores in storesList, in this scope or in its parents or mixed scopes
   *
   * @param storeIdList {string|storeRef} Store name, Array of Store names, or Rescope
   *     store ref from Store::as or Store:as
   * @param state
   * @param data
   * @returns {Scope}
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(Scope, [{
    key: "mount",
    value: function mount(storeIdList, snapshot, state, data) {
      var _this2 = this;

      if (is__WEBPACK_IMPORTED_MODULE_8___default.a.array(storeIdList)) {
        storeIdList.forEach(function (storeId) {
          return _this2._mount(storeId, snapshot, state, data);
        });
      } else {
        this._mount.apply(this, arguments);
      }

      return this;
    }
  }, {
    key: "_mount",
    value: function _mount(id, snapshot, state, data) {
      var ref,
          _ = this._;
      ref = this.parseRef(id);
      if (id == "$parent") return;

      if (!_._scope[ref.storeId]) {
        var _this$parent;

        //ask mixed || parent
        if (_._mixed.reduceRight(function (mounted, ctx) {
          return mounted || ctx._mount(id, snapshot, state, data);
        }, false) || !this.parent) return;
        return (_this$parent = this.parent)._mount.apply(_this$parent, arguments);
      } else {
        var store = _._scope[ref.storeId],
            taskQueue = [];

        if (Scope.isStoreClass(store)) {
          _._scope[ref.storeId] = new store(this, {
            //snapshot,
            name: ref.storeId,
            state: state,
            data: data
          }, taskQueue);

          while (taskQueue.length) {
            taskQueue.shift()();
          }
        } else if (Scope.isScopeClass(store)) {
          store = _._scope[ref.storeId] = new store({
            $parent: this
          }, {
            key: ref.storeId,
            incrementId: true,
            upperScope: this //autoDestroy: true
            //parent: this

          }); //_._scope[ ref.storeId ].retain("scopedChildScope");
          //_watchStore(ref.storeId);

          if (ref.path.length > 1) _._scope[ref.storeId].mount(ref.path.slice(1).join('.'), snapshot, state, data); //else return _._scope[ ref.storeId ];
        }

        if (Scope.isStore(store)) {
          if (state !== undefined && data === undefined) store.setState(state);else if (state !== undefined) store.state = state;
          if (data !== undefined) store.push(data);
        }

        if (Scope.isScope(store)) {
          if (state !== undefined) store.setState(state);
          if (ref.path.length > 1) store._mount(ref.path.slice(1).join('.'));
        }

        this._watchStore(ref.storeId);
      }

      return _._scope[ref.storeId];
    }
    /**
     * Register stores in storesMap & link them in the protos
     * @param storesMap
     * @param state
     * @param data
     */

  }, {
    key: "register",
    value: function register(storesMap) {
      var _this3 = this;

      var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      this.relink(storesMap, this, false, false);
      Object.keys(storesMap).forEach(function (id) {
        if (id === "$parent") return;
        if (!Scope.isScopable(storesMap[id])) return console.warn("RS: ", _this3._id, ", can't register not scopable object :", id);

        if (storesMap[id].singleton || is__WEBPACK_IMPORTED_MODULE_8___default.a.fn(storesMap[id]) && (state[id] || data[id])) {
          _this3._mount(id, undefined, state[id], data[id]);
        } else if (state[id] || data[id]) {
          if (data[id]) {
            if (state[id]) _this3.stores[id].state = state[id];

            _this3.stores[id].push(data[id]);
          } else if (state[id]) {
            _this3.stores[id].setState(state[id]);
          }
        } else {
          _this3._watchStore(id);
        }
      });
    }
    /**
     * Map srcCtx store's on targetCtx headers proto's
     * @param srcCtx
     * @param targetCtx
     * @param state
     * @param data
     */

  }, {
    key: "relink",
    value: function relink(srcCtx) {
      var _this4 = this;

      var targetCtx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      var external = arguments.length > 2 ? arguments[2] : undefined;
      var force = arguments.length > 3 ? arguments[3] : undefined;
      var _ = this._,
          me = this;
      Object.keys(srcCtx).forEach(function (id) {
        var hotReloading, actions, activeActions; // same store def : ignore

        if (!force && targetCtx._._scope[id] === srcCtx[id] || targetCtx._._scope[id] && targetCtx._._scope[id].constructor === srcCtx[id]) return; // hot switch

        if (!force && targetCtx._._scope[id]) {
          if (!external && !is__WEBPACK_IMPORTED_MODULE_8___default.a.fn(targetCtx._._scope[id])) {
            // mounted store
            targetCtx._._scope[id].__proto__ = srcCtx[id].prototype;
            targetCtx._._scope[id].__onHotReloaded && targetCtx._._scope[id].__onHotReloaded(srcCtx[id]);
          } else if (!external && is__WEBPACK_IMPORTED_MODULE_8___default.a.fn(targetCtx._._scope[id])) targetCtx._._scope[id] = srcCtx[id];
        } else if (!force && !external) _._scope[id] = srcCtx[id]; // map the store id


        Object.defineProperty(targetCtx._.stores.prototype, id, {
          enumerable: true,
          configurable: true,
          get: function get() {
            return _._scope[id];
          }
        });
        activeActions = targetCtx._.actions.prototype; // not mapping hierarchic scopes

        if (id !== "$parent") {
          // map state & data
          Object.defineProperty(targetCtx._.state.prototype, id, {
            enumerable: true,
            configurable: true,
            get: function get() {
              return _._scope[id] && _._scope[id].state;
            },
            set: function set(v) {
              return _this4._mount(id, undefined, v);
            }
          });
          Object.defineProperty(targetCtx._.data.prototype, id, {
            enumerable: true,
            configurable: true,
            get: function get() {
              return _._scope[id] && _._scope[id].data;
            },
            set: function set(v) {
              return _this4._mount(id, undefined, undefined, v);
            }
          }); // action mapping

          actions = srcCtx[id] instanceof Scope.Store ? srcCtx[id].constructor.actions : srcCtx[id].actions;
          if (Scope.isScopeClass(_._scope[id])) _this4._mount(id);

          if (Scope.isScope(_._scope[id])) {
            // map hierarchic scopes
            if (activeActions[id]) console.warn("RS : Sub scope actions is mapped over an existing function !", id);
            activeActions[id] = _._scope[id].actions;
          } else if (!Scope.isStore(_._scope[id]) && !Scope.isStoreClass(_._scope[id])) return;

          actions && _this4._mapActions(actions, activeActions, id);
        } else {
          activeActions[id] = srcCtx[id].actions;
        } // remount the store if it was hot reloaded


        if (hotReloading) _this4._mount(id, null, hotReloading);
      });
    }
    /**
     * Map & bounds actions from stores
     * todo : unmap actions
     * @param actions
     * @param target
     * @param storeId
     * @private
     */

  }, {
    key: "_mapActions",
    value: function _mapActions(actions, target, storeId) {
      for (var act in actions) {
        if (actions.hasOwnProperty(act)) {
          if (is__WEBPACK_IMPORTED_MODULE_8___default.a.object(actions[act])) {
            // hirarchised actions
            if (target[act] && !is__WEBPACK_IMPORTED_MODULE_8___default.a.object(target[act])) console.warn("RS : Actions namespace is mapped over an existing function !", storeId, act);
            target[act] = target[act] || {
              __targetStores: 0
            };

            this._mapActions(actions[act], target[act]);

            target[act].__targetStores++;
          } else if (target.hasOwnProperty(act)) target[act].__targetStores++;else {
            if (is__WEBPACK_IMPORTED_MODULE_8___default.a.object(target[act])) console.warn("RS : Action is mapped over existing namespace  !", storeId, act);
            target[act] = this.dispatch.bind(this, act);
            target[act].__targetStores = 1;
          }
        }
      }
    }
    /**
     * Make this scope watching the local store 'id'
     * @param id
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_watchStore",
    value: function _watchStore(id) {
      var _this5 = this;

      var _ = this._;

      if (!_._listening[id] && !is__WEBPACK_IMPORTED_MODULE_8___default.a.fn(_._scope[id])) {
        !_._scope[id]._autoDestroy && _._scope[id].retain("scoped");
        !_._scope[id].isStable() && this.wait(id);

        _._scope[id].on(_._listening[id] = {
          'destroy': function destroy(s) {
            delete _._listening[id];
            _._scope[id] = _._scope[id].constructor;
          },
          'update': function update(s) {
            return _this5.propag();
          },
          'stable': function stable(s) {
            return _this5.release(id);
          },
          'unstable': function unstable(s) {
            return _this5.wait(id);
          }
        });
      }

      return true;
    }
    /**
     * Mix targetCtx on this scope
     * Mixed scope parents are NOT mapped
     * @param targetCtx
     */

  }, {
    key: "mixin",
    value: function mixin(targetCtx) {
      var _this6 = this;

      var parent = this.parent,
          lists,
          _ = this._;

      _._mixed.push(targetCtx);

      targetCtx.retain("mixedTo");
      if (!targetCtx._stable) this.wait(targetCtx._id);

      _._mixedList.push(lists = {
        'stable': function stable(s) {
          return _this6.release(targetCtx._id);
        },
        'unstable': function unstable(s) {
          return _this6.wait(targetCtx._id);
        },
        'update': function update(s) {
          return _this6._propag();
        }
      });

      targetCtx.on(lists); // reset protos
      // push new proto with parent

      __proto__push(this, 'actions', parent);

      __proto__push(this, 'stores', parent);

      __proto__push(this, 'state', parent);

      __proto__push(this, 'data', parent); // bind local accessors in the new proto


      this.relink(_._scope, this, false, true);

      _._mixed.forEach(function (ctx) {
        // push protos
        __proto__push(_this6, 'actions');

        __proto__push(_this6, 'stores');

        __proto__push(_this6, 'state');

        __proto__push(_this6, 'data');

        _this6.stores.__origin = "mixed " + ctx._id; // write mixed accessors

        ctx.relink(ctx._._scope, _this6, true, true);
      });
    }
    /**
     * Bind stores from this scope, his parents or mixed scopes to obj
     *
     * @param target {React.Component|Store|function}
     * @param key {string} stores keys to bind updates
     * @param as
     * @param setInitial {boolean} false to not propag initial value (default : true)
     */

  }, {
    key: "bind",
    value: function bind(target, key, as) {
      var _this7 = this;

      var setInitial = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var revMap = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var lastRevs, data, refKeys;
      if (key && !is__WEBPACK_IMPORTED_MODULE_8___default.a.array(key)) key = [key];

      if (as === false || as === true) {
        setInitial = as;
        as = null;
      }

      refKeys = key.map(function (id) {
        return is__WEBPACK_IMPORTED_MODULE_8___default.a.string(id) ? id : id.name;
      }).map(function (id) {
        return _this7.parseRef(id);
      });

      this._.followers.push([target, key, as || undefined, lastRevs = refKeys.reduce(function (revs, ref) {
        revs[ref.storeId] = revs[ref.storeId] || {
          rev: 0,
          refs: []
        };
        revs[ref.storeId].refs.push(ref);
        return revs;
      }, revMap)]);

      this.mount(key);
      this.retainStores(Object.keys(lastRevs), 'listeners');

      if (setInitial && this._stable) {
        data = this.getUpdates(lastRevs);
        if (!data) return this;

        if (typeof target != "function") {
          if (as) target.setState(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, as, data));else target.setState(data);
        } else {
          target(data);
        }
      }

      return this;
    }
    /**
     * Un bind this scope off the given component-keys
     * @param target
     * @param key
     * @returns {Array.<*>}
     */

  }, {
    key: "unBind",
    value: function unBind(target, key, as) {
      var followers = this._.followers,
          i = followers && followers.length;

      while (followers && i--) {
        if (followers[i][0] === target && '' + followers[i][1] == '' + key && followers[i][2] == as) {
          this.disposeStores(Object.keys(followers[i][3]), 'listeners');
          return followers.splice(i, 1);
        }
      }
    }
    /**
     * Mount the stores in storeIdList from this scope, its parents and mixed scope
     * Bind them to 'to'
     * Hook 'to' so it will auto unbind on 'destroy' or 'componentWillUnmount'
     * @param target
     * @param storeIdList
     * @param bind
     * @returns {Object} Initial outputs of the stores in 'storesList'
     */

  }, {
    key: "map",
    value: function map(target, storeIdList) {
      var _this8 = this;

      var bind = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var revMap = arguments.length > 3 ? arguments[3] : undefined;
      var Store = this.constructor.Store;
      storeIdList = is__WEBPACK_IMPORTED_MODULE_8___default.a.array(storeIdList) ? storeIdList : [storeIdList];
      var refList = storeIdList.map(this.parseRef);
      this.mount(storeIdList);

      if (bind && target instanceof Store) {
        Store.map(target, storeIdList, this, this, false);
      } else if (bind) {
        this.bind(target, storeIdList, undefined, false);
        var mixedCWUnmount,
            unMountKey = target.isReactComponent ? "componentWillUnmount" : "destroy";

        if (target.hasOwnProperty(unMountKey)) {
          mixedCWUnmount = target[unMountKey];
        }

        target[unMountKey] = function () {
          delete target[unMountKey];
          if (mixedCWUnmount) target[unMountKey] = mixedCWUnmount;

          _this8.unBind(target, storeIdList);

          return target[unMountKey] && target[unMountKey].apply(target, arguments);
        };
      }

      return revMap && this.getUpdates(revMap) || refList.reduce(function (data, ref) {
        Object(_utils_utils__WEBPACK_IMPORTED_MODULE_11__["walknSet"])(data, ref.alias || ref.path, _this8.retrieve(ref.path));
        return data;
      }, {});
    }
    /**
     * Get current data value from json path
     * @param path
     * @returns {string|*}
     */

  }, {
    key: "retrieve",
    value: function retrieve() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      path = is__WEBPACK_IMPORTED_MODULE_8___default.a.string(path) ? path.split('.') : path;
      return path && this.stores[path[0]] && this.stores[path[0]].retrieve && this.stores[path[0]].retrieve(path.slice(1));
    }
    /**
     * Restore all nodes in a jsonPath
     * @param path
     * @returns {string|*}
     */

  }, {
    key: "restoreRefPath",
    value: function restoreRefPath() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      path = is__WEBPACK_IMPORTED_MODULE_8___default.a.string(path) ? path.split('.') : path;
      var obj,
          i = 0,
          cScope = this;

      while (i < path.length) {
        obj = cScope.stores[path[i]];

        if (Scope.isScopeClass(obj) || Scope.isStoreClass(obj)) {
          cScope.mount(path[0]);
          obj = cScope.stores[path[i]];
        }

        if (Scope.isScope(obj)) {
          cScope = obj;
          i++;
        } else if (Scope.isStore(obj)) {
          obj.restore();
          break;
        } else {
          break;
        }
      }
    }
    /**
     * Get target store from json path
     * @param path
     * @returns {string|*}
     */

  }, {
    key: "retrieveStore",
    value: function retrieveStore() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      path = is__WEBPACK_IMPORTED_MODULE_8___default.a.string(path) ? path.split('.') : path;
      return path && path.length && (path.length != 1 && this.stores[path[0]].retrieveStore ? this.stores[path[0]].retrieveStore(path.slice(1)) : path.length == 1 && this.stores[path[0]]);
    }
    /**
     * Get or update stores revisions in 'storesRevMap'
     * @param storesRevMap
     * @param local
     * @returns {{}}
     */

  }, {
    key: "getStoresRevs",
    value: function getStoresRevs() {
      var storesRevMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var local = arguments.length > 1 ? arguments[1] : undefined;
      var ctx = this._._scope;

      if (!storesRevMap) {
        storesRevMap = {};
      }

      Object.keys(ctx).forEach(function (id) {
        if (id == "$parent") return;

        if (!is__WEBPACK_IMPORTED_MODULE_8___default.a.fn(ctx[id])) {
          storesRevMap[id] = ctx[id]._rev;
        } else if (!storesRevMap.hasOwnProperty(id)) storesRevMap[id] = false;
      });

      if (!local) {
        this._._mixed.reduce(function (updated, ctx) {
          return ctx.getStoresRevs(storesRevMap), storesRevMap;
        }, storesRevMap);

        this.parent && this.parent.getStoresRevs(storesRevMap);
      }

      return storesRevMap;
    }
    /**
     * Recursively get all stores revs
     * @param childs
     * @returns {Array}
     * @private
     */

  }, {
    key: "_getRevMap",
    value: function _getRevMap() {
      var storesRevMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var ctx = this._._scope;
      Object.keys(ctx).forEach(function (id) {
        if (id == "$parent" || storesRevMap[id]) return;
        storesRevMap[id] = {
          rev: ctx[id]._rev,
          refs: []
        };
      });

      this._._mixed.reduceRight(function (storesRevMap, ctx) {
        return ctx._getRevMap(storesRevMap);
      }, storesRevMap);

      this.parent && this.parent._getRevMap(storesRevMap);
      return storesRevMap;
    }
    /**
     * Get updated output basing storesRevMap's revisions.
     * If a store in 'storesRevMap' was updated; add it to 'output' & update storesRevMap
     * @param storesRevMap
     * @param output
     * @param updated
     * @returns {*|{}}
     */

  }, {
    key: "getRefsUpdates",
    value: function getRefsUpdates(refs, revMap, output) {
      var _this9 = this;

      revMap = revMap || refs.map(function (id) {
        return is__WEBPACK_IMPORTED_MODULE_8___default.a.string(id) ? id : id.name;
      }).map(function (id) {
        return _this9.parseRef(id);
      }).reduce(function (revs, ref) {
        revs[ref.storeId] = revs[ref.storeId] || {
          rev: 0,
          refs: []
        };
        revs[ref.storeId].refs.push(ref);
        return revs;
      }, {});
      return this.getUpdates(revMap, output);
    }
    /**
     * Get or update output basing storesRevMap's revisions.
     * If a store in 'storesRevMap' was updated; add it to 'output' & update storesRevMap
     * @param storesRevMap
     * @param output
     * @param updated
     * @returns {*|{}}
     */

  }, {
    key: "getUpdates",
    value: function getUpdates(storesRevMap, output, updated) {
      var _this10 = this;

      output = output || {};
      storesRevMap = storesRevMap || this._getRevMap();
      Object.keys(storesRevMap).forEach(function (id) {
        var store = _this10.stores[id];
        storesRevMap[id] = storesRevMap[id] || {
          rev: 0,
          refs: []
        };

        if (store && is__WEBPACK_IMPORTED_MODULE_8___default.a.fn(store)) {
          updated = true;
          output[id] = undefined;
        } else if (store && store._rev > storesRevMap[id].rev) {
          storesRevMap[id].rev = store._rev;
          updated = true;
          storesRevMap[id].refs.forEach(function (ref) {
            output[ref.alias] = _this10.retrieve(ref.path);
          });
        }
      });
      return updated && output;
    }
    /**
     * Recursively get all child scopes
     * @param childs
     * @returns {Array}
     * @private
     */

  }, {
    key: "_getAllChilds",
    value: function _getAllChilds() {
      var childs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      childs.push.apply(childs, _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(this._.childScopes));

      this._.childScopes.forEach(function (ctx) {
        ctx._getAllChilds(childs);
      });

      return childs;
    }
    /**
     * Serialize all active stores state & data in every childs & mixed scopes
     *
     * Scopes without key or id are ignored
     * @param output
     * @returns {{}}
     */

  }, {
    key: "serialize",
    value: function serialize() {
      var cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var output = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var ctx = this._._scope,
          _this$_ = this._,
          baseId = _this$_.baseId,
          key = _this$_.key,
          keyPID = _this$_.keyPID,
          incrementId = _this$_.incrementId,
          alias = cfg.alias,
          parentAlias = cfg.parentAlias,
          sid = key ? (parentAlias || keyPID) + '>' + key : alias || parentAlias && parentAlias + '/' + baseId || this._id; //alias = alias || baseId;

      return this.serialize_ex(cfg, output, sid, alias, ["$parent"]);
    }
  }, {
    key: "serialize_ex",
    value: function serialize_ex() {
      var _this11 = this;

      var cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var output = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var sid = arguments.length > 2 ? arguments[2] : undefined;
      var alias = arguments.length > 3 ? arguments[3] : undefined;
      var exclude = arguments.length > 4 ? arguments[4] : undefined;
      var _ = this._,
          ctx = _._scope,
          incrementId = _.incrementId,
          _cfg$withChilds = cfg.withChilds,
          withChilds = _cfg$withChilds === void 0 ? true : _cfg$withChilds,
          _cfg$withMixed = cfg.withMixed,
          withMixed = _cfg$withMixed === void 0 ? true : _cfg$withMixed,
          norefs = cfg.norefs;

      if (Object(_utils_utils__WEBPACK_IMPORTED_MODULE_11__["keyWalknGet"])(output, sid)) {
        if (!incrementId) // done
          return output;else if (incrementId) {
          // generate key id
          var i = -1;

          while (Object(_utils_utils__WEBPACK_IMPORTED_MODULE_11__["keyWalknGet"])(output, sid + '[' + ++i + ']')) {
            ;
          }

          sid = sid + '[' + i + ']';
        }
      }

      Object(_utils_utils__WEBPACK_IMPORTED_MODULE_11__["keyWalknSet"])(output, sid, {});
      Object.keys(ctx).forEach(function (id) {
        if (exclude.includes(id) || Scope.isStoreClass(ctx[id]) || Scope.isScopeClass(ctx[id])) return;
        ctx[id].serialize(_objectSpread({}, cfg, {
          parentAlias: sid
        }), output);
      });
      withChilds && _.childScopes.forEach(function (ctx) {
        !ctx._.isLocalId && ctx.serialize({
          withChild: true,
          withParents: false,
          parentAlias: sid,
          withMixed: withMixed,
          norefs: norefs
        }, output);
      });
      withMixed && _._mixed.forEach(function (ctx) {
        !ctx._.isLocalId && ctx.serialize({
          withChild: false,
          withParents: false,
          withMixed: withMixed,
          norefs: norefs
        }, output);
      });

      if (alias) {
        output = Object.keys(output).reduce(function (h, k) {
          return h[k === _this11._id ? alias : k] = output[k], h;
        }, {});
      }

      return output;
    }
    /**
     * Restore state & data from the serialize fn
     * @param snapshot
     * @param force
     */

  }, {
    key: "restore",
    value: function restore(snapshot) {
      var _this12 = this;

      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : is__WEBPACK_IMPORTED_MODULE_8___default.a.bool(cfg) && cfg;
      var ctx = this._._scope,
          snap;

      if (snapshot && cfg && cfg.alias && cfg.alias != this._id) {
        snap = _objectSpread({}, snapshot, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, this._id, snapshot[cfg.alias]));
        delete snap[cfg.alias];
        snapshot = snap;
      }

      snapshot = snapshot && Object(_utils_utils__WEBPACK_IMPORTED_MODULE_11__["keyWalknGet"])(snapshot, this._id) || this.takeSnapshotByKey(this._id);
      if (!snapshot) return;
      this._.snapshot = _objectSpread({}, snapshot);
      snap = snapshot['/'];
      snapshot['/'] = _objectSpread({}, snap);
      snap && Object.keys(snap).forEach(function (name) {
        if (name == "$parent") return;

        if (ctx[name]) {
          if (force && !is__WEBPACK_IMPORTED_MODULE_8___default.a.fn(ctx[name])) ctx[name].destroy();

          _this12._mount(name); // quiet

        }
      });

      this._._mixed.forEach(function (ctx) {
        !ctx._.isLocalId && ctx.restore(undefined, force);
      });

      this._.childScopes.forEach(function (ctx) {
        !ctx._.isLocalId && ctx.restore(undefined, force);
      });
    }
  }, {
    key: "getSnapshotByKey",
    value: function getSnapshotByKey(key, local) {
      // only have the local snap
      if (this._.snapshot && key.startsWith(this._id)) {
        var obj = Object(_utils_utils__WEBPACK_IMPORTED_MODULE_11__["keyWalknGet"])(this._.snapshot, key.substr(this._id.length));
        return obj;
      } else return !local && this.parent && this.parent.getSnapshotByKey(key) || this.stores.$parent && this.stores.$parent.getSnapshotByKey(key);
    }
  }, {
    key: "getSnapshotByKeyExt",
    value: function getSnapshotByKeyExt(snapshot, key, local) {
      // only have the local snap
      if (snapshot) {
        var obj = Object(_utils_utils__WEBPACK_IMPORTED_MODULE_11__["keyWalknGet"])(snapshot, key);
        return obj;
      }
    }
  }, {
    key: "takeSnapshotByKey",
    value: function takeSnapshotByKey(key, local) {
      if (this._.snapshot && key.startsWith(this._id)) {
        var obj = Object(_utils_utils__WEBPACK_IMPORTED_MODULE_11__["keyWalknGet"])(this._.snapshot, key.substr(this._id.length));

        if (obj) {
          this.deleteSnapshotByKey(key, true);
        }

        return obj;
      } else return !local && this.parent && this.parent.takeSnapshotByKey(key) || this.stores.$parent && this.stores.$parent.takeSnapshotByKey(key);
    }
  }, {
    key: "deleteSnapshotByKey",
    value: function deleteSnapshotByKey(key, local) {
      if (this._.snapshot && key.startsWith(this._id)) {
        var obj = Object(_utils_utils__WEBPACK_IMPORTED_MODULE_11__["keyWalknGet"])(this._.snapshot, key.substr(this._id.length).replace(/^(.*[\>|\/])[^\>|\/]+$/ig, '$1'));
        if (obj) delete obj[key.replace(/^.*[\>|\/]([^\>|\/]+)$/ig, '$1')];
      }

      return !local && this.parent && this.parent.deleteSnapshotByKey(key) || this.stores.$parent && this.stores.$parent.deleteSnapshotByKey(key);
    }
  }, {
    key: "setState",
    value: function setState(pState) {
      var _this13 = this;

      Object.keys(pState).forEach(function (k) {
        return _this13.state[k] = pState[k];
      });
    }
    /**
     * get a parsed reference
     * @param _ref
     * @returns {{storeId, path, alias: *, ref: *}}
     */

  }, {
    key: "parseRef",
    value: function parseRef(_ref) {
      if (typeof _ref !== 'string') {
        // @todo : rm this
        this.register(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, _ref.name, _ref.store));
        _ref = _ref.name;
      }

      var ref = _ref.split(':');

      ref[0] = ref[0].split('.');
      return {
        storeId: ref[0][0],
        path: ref[0],
        alias: ref[1] || ref[0][ref[0].length - 1],
        ref: _ref
      };
    }
    /**
     * Dispatch an action to the top parent & mixed scopes, in all stores
     * todo
     * @param action
     * @param data
     * @returns {Scope}
     */

  }, {
    key: "dispatch",
    value: function dispatch(action) {
      var _this$parent2;

      for (var _len = arguments.length, argz = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        argz[_key - 1] = arguments[_key];
      }

      if (this.dead) {
        console.warn("Dispatch was called on a dead scope, check you're async functions in this stack...", new Error().stack);
        return;
      }

      var bActs = this._._boundedActions;

      for (var storeId in this._._scope) {
        var _this$_$_scope$storeI;

        if (storeId === "$parent") continue;
        if (!is__WEBPACK_IMPORTED_MODULE_8___default.a.fn(this._._scope[storeId])) (_this$_$_scope$storeI = this._._scope[storeId]).trigger.apply(_this$_$_scope$storeI, [action].concat(argz));
      }

      if (bActs && bActs.test(action)) return this;

      this._._mixed.forEach(function (ctx) {
        return ctx.dispatch.apply(ctx, [action].concat(argz));
      });

      this.parent && (_this$parent2 = this.parent).dispatch.apply(_this$parent2, [action].concat(argz));
      return this;
    }
  }, {
    key: "trigger",
    value: function trigger() {
      this.dispatch.apply(this, arguments);
    }
    /**
     * once('stable', cb)
     * @param obj {React.Component|Store|function)
     * @param key {string} optional key where to map the public state
     */

  }, {
    key: "then",
    value: function then(cb) {
      var _this14 = this;

      if (!this._stable) return this.once('stable', function (e) {
        return _this14.then(cb);
      });
      return cb(this.data);
    }
  }, {
    key: "onceStableTree",
    value: function onceStableTree(cb) {
      var _this15 = this;

      if (this._.unStableChilds) return this.once('stableTree', function (e) {
        return _this15.onceStableTree(cb);
      });
      return cb(this.data);
    }
    /**
     * Call retain on the scoped stores basing the given list
     *
     * @param stores
     * @param reason
     */

  }, {
    key: "retainStores",
    value: function retainStores() {
      var _this16 = this;

      var stores = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var reason = arguments.length > 1 ? arguments[1] : undefined;
      stores.forEach(function (id) {
        return _this16.stores[id] && _this16.stores[id].retain && _this16.stores[id].retain(reason);
      });
    }
    /**
     * Call retain on the scoped stores
     *
     * @param stores
     * @param reason
     */

  }, {
    key: "disposeStores",
    value: function disposeStores() {
      var _this17 = this;

      var stores = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var reason = arguments.length > 1 ? arguments[1] : undefined;
      stores.forEach(function (id) {
        return _this17.stores[id] && _this17.stores[id].dispose && _this17.stores[id].dispose(reason);
      });
    }
    /**
     * Keep the scope unstable until release is called
     * @param reason
     */

  }, {
    key: "wait",
    value: function wait(reason) {
      //console.log("wait", reason);
      this._stable && !this.__locks.all && this.emit("unstable", this);
      this._stable = false;
      this.__locks.all++;

      if (reason) {
        this.__locks[reason] = this.__locks[reason] || 0;
        this.__locks[reason]++;
      }
    }
    /**
     * Stabilize the scope if no more locks remain (wait fn)
     * @param reason
     */

  }, {
    key: "release",
    value: function release(reason) {
      var _this18 = this;

      if (reason) {
        if (this.__locks[reason] == 0) console.error("Release more than locking !", reason);
        this.__locks[reason] = this.__locks[reason] || 0;
        this.__locks[reason]--;
      }

      if (!reason && this.__locks.all == 0) console.error("Release more than locking !");
      this.__locks.all--;

      if (!this.__locks.all) {
        if (this._.stabilizerTM) return;
        this._.stabilizerTM && clearTimeout(this._.stabilizerTM);
        this._.stabilizerTM = setTimeout(function (e) {
          _this18._.stabilizerTM = null;
          if (_this18.__locks.all) return;
          _this18._.propagTM && clearTimeout(_this18._.propagTM);
          _this18._rev++;
          _this18._stable = true;

          _this18.emit("stable", _this18);

          !_this18.dead && _this18._propag(); // stability can induce destroy
        });
      }
    }
    /**
     * Propag stores updates basing theirs last updates
     */

  }, {
    key: "propag",
    value: function propag() {
      var _this19 = this;

      this._.propagTM && clearTimeout(this._.propagTM);
      this._.propagTM = setTimeout(function (e) {
        _this19._.propagTM = null;

        _this19._propag();
      }, 2);
    }
  }, {
    key: "_propag",
    value: function _propag() {
      var _this20 = this;

      if (this._.followers.length) this._.followers.forEach(function (_ref3) {
        var obj = _ref3[0],
            key = _ref3[1],
            as = _ref3[2],
            lastRevs = _ref3[3],
            remaps = _ref3[3];

        var data = _this20.getUpdates(lastRevs);

        if (!data) return;

        if (typeof obj != "function") {
          //console.log("setState ",obj, Object.keys(data))
          if (as) obj.setState(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, as, data));else obj.setState(data);
        } else {
          obj(data, lastRevs && _objectSpread({}, lastRevs) || "no revs");
        } // lastRevs &&
        // key.forEach(id => (lastRevs[id] = this.stores[id] &&
        // this.stores[id]._rev || 0));

      });
      this.emit("update", this.getUpdates());
    }
    /**
     * is stable
     * @returns bool
     */

  }, {
    key: "isStable",
    value: function isStable() {
      return this._stable;
    }
    /**
     * is stable tree
     * @returns bool
     */

  }, {
    key: "isStableTree",
    value: function isStableTree() {
      return !this._.unStableChilds;
    }
    /**
     * Register children
     * @param scope
     * @private
     */

  }, {
    key: "_addChild",
    value: function _addChild(scope) {
      var _this21 = this;

      this._.childScopes.push(scope);

      this._.seenChilds++;
      var lists = {
        'stable': function stable(s) {
          _this21._.unStableChilds--;
          if (!_this21._.unStableChilds) _this21.emit("stableTree", _this21);
        },
        'unstable': function unstable(s) {
          _this21._.unStableChilds++;
          if (1 == _this21._.unStableChilds) _this21.emit("unstableTree", _this21);
        },
        'stableTree': function stableTree(s) {
          _this21._.unStableChilds--;
          if (!_this21._.unStableChilds) _this21.emit("stableTree", _this21);
        },
        'unstableTree': function unstableTree(s) {
          _this21._.unStableChilds++;
          if (1 == _this21._.unStableChilds) _this21.emit("unstableTree", _this21);
        },
        'destroy': function destroy(ctx) {
          if (ctx._.unStableChilds) _this21._.unStableChilds--;
          if (!ctx.isStable()) _this21._.unStableChilds--;
          if (!_this21._.unStableChilds) _this21.emit("stableTree", _this21);
        }
      },
          wasStable = this._.unStableChilds;
      !scope.isStable() && this._.unStableChilds++;
      scope._.unStableChilds && this._.unStableChilds++;

      this._.childScopesList.push(lists);

      if (!wasStable && this._.unStableChilds) this.emit("unstableTree", this);
      scope.on(lists);
    }
  }, {
    key: "_rmChild",
    value: function _rmChild(ctx) {
      var i = this._.childScopes.indexOf(ctx),
          wasStable = this._.unStableChilds;

      if (i != -1) {
        this._.childScopes.splice(i, 1);

        !ctx.isStable() && this._.unStableChilds--;
        ctx._.unStableChilds && this._.unStableChilds--;
        ctx.un(this._.childScopesList.splice(i, 1)[0]);
        if (wasStable && !this._.unStableChilds) this.emit("stableTree");
      }
    }
  }, {
    key: "retain",
    value: function retain(reason) {
      this.__retains.all++; //console.log("retain", this._id, reason);

      if (reason) {
        this.__retains[reason] = this.__retains[reason] || 0;
        this.__retains[reason]++;
      }
    }
  }, {
    key: "dispose",
    value: function dispose(reason) {
      var _this22 = this;

      //console.log("dispose", this._id, reason);
      if (reason) {
        if (!this.__retains[reason]) throw new Error("Dispose more than retaining : " + reason);
        this.__retains[reason]--;
      }

      if (!this.__retains.all) throw new Error("Dispose more than retaining !");
      this.__retains.all--;

      if (!this.__retains.all) {
        //console.log("dispose do destroy ", this._id, this._persistenceTm);
        if (this._.persistenceTm) {
          this._.destroyTM && clearTimeout(this._.destroyTM);
          this._.destroyTM = setTimeout(function (e) {
            _this22.then(function (s) {
              !_this22.__retains.all && !_this22.dead && _this22.destroy();
            });
          }, this._.persistenceTm);
        } else {
          this.then(function (s) {
            return !_this22.__retains.all && !_this22.dead && _this22.destroy();
          });
        }
      }
    }
    /**
     * order destroy of local stores
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var _this23 = this;

      var ctx = this._._scope;

      _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(this._.childScopes).map(function (scope) {
        return scope.destroy();
      });

      for (var key in ctx) {
        if (!is__WEBPACK_IMPORTED_MODULE_8___default.a.fn(ctx[key])) {
          if (key == "$parent") continue;
          !ctx[key]._autoDestroy && ctx[key].dispose("scoped");
        }
      }

      this._.stabilizerTM && clearTimeout(this._.stabilizerTM);
      this._.propagTM && clearTimeout(this._.propagTM);
      Object.keys(this._._listening).forEach(function (id) {
        return id !== "$parent" && _this23._._scope[id].removeListener(_this23._._listening[id]);
      });

      while (this._._mixedList.length) {
        this._._mixed[0].removeListener(this._._mixedList.shift());

        this._._mixed.shift().dispose("mixedTo");
      }

      _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(this._.followers).map(function (follower) {
        return _this23.unBind.apply(_this23, _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(follower));
      });

      if (this._._parentList) {
        this.parent._rmChild(this);

        this.parent.removeListener(this._._parentList);
        this.parent.dispose("isMyParent");
        this._._parentList = null;
      }

      this.dead = true;
      delete allScopes[this._id];
      this.emit("destroy", this);
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return Scope;
}(_utils_Emitter__WEBPACK_IMPORTED_MODULE_10__["default"]);

Scope.persistenceTm = 1;
Scope.Store = null;

Scope.scopeRef = function scopeRef(path) {
  this.path = path;
};

Scope.scopes = allScopes;

Scope.isScopable = function (obj) {
  return Scope.isScope(obj) || Scope.isScopeClass(obj) || Scope.isStore(obj) || Scope.isStoreClass(obj);
};

Scope.isScope = function (obj) {
  return obj instanceof Scope;
};

Scope.isScopeClass = function (obj) {
  return Scope.isPrototypeOf(obj) || obj === Scope;
};

var _default = Scope;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(__proto__push, "__proto__push", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\Scope.js");
  reactHotLoader.register(allScopes, "allScopes", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\Scope.js");
  reactHotLoader.register(Scope, "Scope", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\Scope.js");
  reactHotLoader.register(_default, "default", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\Scope.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/Store.js":
/*!**********************!*\
  !*** ./src/Store.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "undefined?188d");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "undefined?4d9b");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "undefined?24b3");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "undefined?36a1");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "undefined?03c7");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "undefined?e4e5");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "undefined?20a8");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "undefined?56eb");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "undefined?74ba");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8__);










(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};

/*
 *   The MIT License (MIT)
 *   Copyright (c) 2019. Wise Wild Web
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
var is = __webpack_require__(/*! is */ "undefined?63a5"),
    Scope = __webpack_require__(/*! ./Scope */ "./src/Scope.js")["default"],
    _require = __webpack_require__(/*! ./utils/utils */ "./src/utils/utils.js"),
    keyWalknSet = _require.keyWalknSet,
    keyWalknGet = _require.keyWalknGet,
    EventEmitter = __webpack_require__(/*! ./utils/Emitter */ "./src/utils/Emitter.js")["default"],
    TaskSequencer = __webpack_require__(/*! ./utils/TaskSequencer */ "./src/utils/TaskSequencer.js")["default"],
    shortid = __webpack_require__(/*! shortid */ "undefined?beec"),
    objProto = Object.getPrototypeOf({});

var Store =
/*#__PURE__*/
function (_EventEmitter) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8___default()(Store, _EventEmitter);

  //static use                  = [];// overridable list of source stores
  // overridable list of store that will allow push if updated
  // default state

  /**
   * if retain goes to 0 :
   * false to not destroy,
   * 0 to sync auto destroy
   * Ms to autodestroy after tm ms if no retain has been called
   * @type {boolean|Int}
   */

  /**
   * Constructor, will build a rescope store
   *
   * (scope, {require,use,apply,state, data})
   * (scope)
   *
   * @param scope {object} scope where to find the other stores (default : static
   *     staticScope )
   * @param keys {Array} (passed to Store::map) Ex : ["session", "otherNamedStore:key",
   *     otherStore.as("otherKey")]
   */
  function Store() {
    var _this$_require, _this$_require2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, Store);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Store).call(this));
    var argz = Array.prototype.slice.call(arguments),
        _static = _this.constructor,
        scope = argz[0] instanceof Scope ? argz.shift() : _static.scope ? Scope.getScope(_static.scope) : is.string(argz[0]) ? Scope.getScope(argz.shift()) : _static.staticScope,
        cfg = argz[0] && !is.array(argz[0]) && !is.string(argz[0]) ? argz.shift() : {},
        taskQueue = is.array(argz[0]) ? argz.shift() : null,
        name = cfg.name || _static.name,
        watchs = cfg.use || [],
        apply = cfg.apply || null,
        initialState = _static.state || _static.initialState || _static.defaultState;
    _this._uid = cfg._uid || shortid.generate();
    _this.__retains = {
      all: 0
    };
    _this.__locks = {
      all: 0
    };
    _this._onStabilize = []; // autoDestroyTm

    _this._autoDestroy = !!_this._persistenceTm;
    _this._persistenceTm = cfg.persistenceTm || _static.persistenceTm || (cfg.autoDestroy || _static.autoDestroy) && 5;
    _this._cfg = cfg;

    if (cfg && cfg.on) {
      _this.on(cfg.on);
    }

    _this.name = name;

    if (scope.stores) {
      _this.scopeObj = scope;
      _this.scope = scope.stores;
    } else {
      _this.scopeObj = new Scope(scope);
      _this.scope = scope.stores;
    } // standardized scope access


    _this.$scope = _this.scopeObj;
    _this.$stores = _this.scopeObj.stores;
    _this.$actions = _this.scopeObj.actions;
    _this.$dispatch = _this.scopeObj.dispatch.bind(_this.scopeObj);
    _this._rev = _this.constructor._rev || 0;
    _this._revs = {};
    _this.stores = {};
    _this._require = [];
    _this._sources = [name]; // register source stores

    if (is.array(_static.use)) {
      _this._use = [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(watchs), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()((_static.use || []).map(function (key) {
        var ref = key.match(/^(\!?)([^\:]*)(?:\:(.*))?$/);

        if (ref[1]) {
          var ref2 = ref[2].split('.');

          _this._require.push(ref[3] || ref2[ref2.length - 1]); // require check value of the aliased
          // imported value


          return key.substr(1);
        }

        return key;
      })));
    } else {
      _this._use = [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(watchs), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(_static.use ? Object.keys(_static.use).map(function (key) {
        var ref = key.match(/^(\!?)(.*)$/);
        ref[1] && _this._require.push(_static.use[key]);
        return ref[2] + (_static.use[key] === true ? '' : ':' + _static.use[key]);
      }) : []));
    }

    if (_static.require) (_this$_require = _this._require).push.apply(_this$_require, _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(_static.require));
    if (cfg.require) (_this$_require2 = _this._require).push.apply(_this$_require2, _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(cfg.require));
    _this._followers = [];
    _this._changesSW = initialState || {};
    _this.state = initialState && {};
    if (apply) _this.apply = apply;
    /**
     * Initial state isn't fully initialized ( childs constructors can set it )
     * Scope based instance have taskQueue to delay init synchronously, if not
     * present we use setTimeout
     */

    if (taskQueue) {
      taskQueue.push(_this._afterConstructor.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this)));
    } else setTimeout(_this._afterConstructor.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this)));

    return _this;
  }
  /**
   * Get the incoming state ( for immediate state relative actions )
   * @returns {{}|*}
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(Store, [{
    key: "_afterConstructor",
    value: function _afterConstructor() {
      var cfg = this._cfg,
          _static = this.constructor,
          snapshot = this.restore(undefined, true),
          initialState = this.state,
          initialData = this.data,
          applied;
      {
        if (initialData) this.data = initialData;else if (_static.data !== undefined) this.data = _objectSpread({}, _static.data);else if (cfg.hasOwnProperty("data")) this.data = cfg.data;
        if (cfg.hasOwnProperty("state") && cfg.state !== undefined) initialState = _objectSpread({}, initialState, {}, cfg.state);

        if (this.data === undefined) {
          if (initialState || this._use.length) {
            // sync apply
            this._nextState = this._changesSW = _objectSpread({}, this._changesSW, {}, initialState || {}, {}, this.$scope.map(this, this._use));
            this.state = {};

            if (this.shouldApply(this._nextState) && this.data === undefined) {
              this.data = this.apply(this.data, this._nextState, this._changesSW);
              applied = true;
              this.state = this._changesSW;
              this._nextState = this._changesSW = null;
            }
          }
        } else {
          applied = true;
          this.state = _objectSpread({}, this._changesSW, {}, initialState || {}, {}, this.$scope.map(this, this._use));
          this._nextState = this._changesSW = null;
        }
      }

      if ((this.data !== undefined || applied) && !this.__locks.all) {
        this._stable = true;
        this._rev++;
      } else {
        this._stable = false;

        if (!_static.managed && !this.state && (!this._use || !this._use.length)) {
          console.warn("ReScope store '", this.name, "' have no initial data, state or use. It can't stabilize...");
        }
      }

      !this._stable && this.emit('unstable', this.state);
    }
    /**
     * Overridable method to know if a data change should be propag to the listening
     * stores & components
     */

  }, {
    key: "shouldPropag",
    value: function shouldPropag(nDatas) {
      return true;
    }
    /**
     * Overridable method to choose if this store should be serialized,
     * If not it will be applied normally when restoring
     * @returns {boolean}
     */

  }, {
    key: "shouldSerialize",
    value: function shouldSerialize() {
      return true;
    }
  }, {
    key: "hasDataChange",
    value: function hasDataChange(nDatas) {
      var _static = this.constructor,
          r,
          cDatas = this.data;
      r = !cDatas && nDatas || cDatas !== nDatas;
      !r && cDatas && Object.keys(cDatas).forEach(function (key) {
        r = r || (nDatas ? cDatas[key] !== nDatas[key] : cDatas && cDatas[key]);
      });
      !r && nDatas && Object.keys(nDatas).forEach(function (key) {
        r = r || (nDatas ? cDatas[key] !== nDatas[key] : cDatas && cDatas[key]);
      });
      return r;
    }
    /**
     * Overridable method to know if a state change should be applied
     */

  }, {
    key: "shouldApply",
    value: function shouldApply() {
      var _this2 = this;

      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state;
      var _static = this.constructor;
      return !!this.isComplete(state) && (is.array(_static.follow) ? _static.follow.reduce(function (r, i) {
        return r || state && state[i];
      }, false) : _static.follow ? Object.keys(_static.follow).reduce(function (r, i) {
        return r || state && is.fn(_static.follow[i]) && _static.follow[i].call(_this2, state[i]) || _static.follow[i] && state[i] !== _this2.state[i];
      }, false) : true);
    }
    /**
     * Overridable applier / remapper
     * If state or lastPublicState are simple hash maps apply will return {...data,
     * ...state} if not it will return the last private state
     * @param data
     * @param state
     * @returns {*}
     */

  }, {
    key: "apply",
    value: function apply(data, state, changes) {
      return state;
    }
    /**
     * Debounce this store propagation ( & reducing )
     * @param cb
     */

  }, {
    key: "stabilize",
    value: function stabilize(cb) {
      cb && this.once('stable', cb);
      if (this._stabilizer) return;
      this._stable && this.emit('unstable', this.state, this.data);
      this._stable = false;
      this._stabilizer = TaskSequencer.pushTask(this, 'pushState');
    }
    /**
     * Walk n get
     * @param path
     * @param i
     * @param obj
     * @returns {*|{}}
     */

  }, {
    key: "retrieve",
    value: function retrieve(path) {
      var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var obj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.data;
      path = is.string(path) ? path.split('.') : path;
      return !obj || !path || !path.length ? obj : path.length == i + 1 ? obj[path[i]] : this.retrieve(path, i + 1, obj[path[i]]);
    }
  }, {
    key: "dispatch",
    value: function dispatch(action) {
      var _this$scopeObj;

      for (var _len = arguments.length, argz = new Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) {
        argz[_key2 - 1] = arguments[_key2];
      }

      (_this$scopeObj = this.scopeObj).dispatch.apply(_this$scopeObj, [action].concat(argz));
    }
  }, {
    key: "trigger",
    value: function trigger(action) {
      var actions = this.constructor.actions;

      if (actions && actions[action]) {
        var _actions$action;

        for (var _len2 = arguments.length, argz = new Array(_len2 > 1 ? _len2 - 1 : 0), _key3 = 1; _key3 < _len2; _key3++) {
          argz[_key3 - 1] = arguments[_key3];
        }

        var ns = (_actions$action = actions[action]).call.apply(_actions$action, [this].concat(argz));

        if (is["function"](ns)) ns = ns(this.nextState);
        ns && this.setState(ns);
      }
    }
    /**
     * Set & Push the result data to followers if stable
     * @param cb
     */

  }, {
    key: "push",
    value: function push(data, force, cb) {
      cb = force === true ? cb : force;
      force = force === true;

      if (!force && !this.hasDataChange(data)) {
        cb && cb();

        if (!this.__locks.all) {
          var stable = this._stable;
          this._stable = true;
          !stable && this.emit('stable', this.state, this.data); //this._stabilizer = null;
        }

        return false;
      }

      this.data = data;
      this.wait();
      this.release(cb);
    }
    /**
     * Call the apply fn using the current accumulated state update then, push the
     * resulting data if stable
     * @param forcedState
     */

  }, {
    key: "pushState",
    value: function pushState(forcedState) {
      this._stabilizer = null;
      if (!forcedState && !this._changesSW && this.data) return;
      var nextState = forcedState || this._nextState || this.state,
          nextData;
      Object.keys(nextState).forEach(function (key) {
        return nextState[key] === undefined && delete nextState[key];
      });
      nextData = this.apply(this.data, nextState, this._changesSW);
      this.state = nextState;
      this._nextState = null;
      this._changesSW = null;

      if (!forcedState && !this.hasDataChange(nextData)) {
        if (!this.__locks.all) {
          var stable = this._stable;
          this._stable = true;
          !stable && this.emit('stable', this.state, this.data);
          this._stabilizer = null;
        }

        return false;
      }

      this.data = nextData;
      this.wait();
      this.release();
    }
    /**
     * Add 'pState' to the current accumulated state updates
     * & wait source stores stabilization before pushing these state updates
     * @param pState
     * @param cb
     */

  }, {
    key: "setState",
    value: function setState(pState, cb, sync) {
      var change,
          changes = this._changesSW = this._changesSW || {},
          nextState = this._nextState = this._nextState || _objectSpread({}, this.state),
          key;

      for (key in pState) {
        if (!this.state || changes.hasOwnProperty(key) // todo
        && pState[key] !== changes[key] || pState.hasOwnProperty(key) && pState[key] !== this.state[key]) {
          change = true;
          nextState[key] = changes[key] = pState[key];
        }
      }

      if (!this.shouldApply(nextState)) {
        return;
      }

      if (sync) {
        this.pushState();
        cb && cb();
      } else {
        if (change) {
          this.stabilize(cb);
        } else cb && cb();
      }

      return this;
    }
    /**
     * Update the current state & push it
     * @param pState
     * @param cb
     */

  }, {
    key: "setStateSync",
    value: function setStateSync(pState) {
      var i = 0,
          change,
          changes = this._changesSW = this._changesSW || {};

      for (var k in pState) {
        if (!this.state || pState.hasOwnProperty(k) && pState[k] !== this.state[k] //||
        //(this.state[k] && pState[k] && (pState[k]._rev != this._revs[k]))// rev/hash update
        ) {
          change = true;
          this._revs[k] = pState[k] && pState[k]._rev || true;
          changes[k] = pState[k];
        }
      }

      this.shouldApply(_objectSpread({}, this.state || {}, {}, changes)) && this.pushState();
      return this.data;
    }
    /**
     * get a store-key pair for Store::map
     * @param {string} name
     * @returns {{store: Store, name: *}}
     */

  }, {
    key: "as",
    value: function as(name) {
      return {
        store: this,
        name: name
      };
    }
  }, {
    key: "on",
    value: function on(lists) {
      var _this3 = this;

      if (!is.string(lists) && lists) Object.keys(lists).forEach(function (k) {
        return _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Store.prototype), "on", _this3).call(_this3, k, lists[k]);
      });else _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Store.prototype), "on", this).apply(this, arguments);
    }
  }, {
    key: "removeListener",
    value: function removeListener(lists) {
      var _this4 = this;

      if (!is.string(lists) && lists) Object.keys(lists).forEach(function (k) {
        return _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Store.prototype), "removeListener", _this4).call(_this4, k, lists[k]);
      });else _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Store.prototype), "removeListener", this).apply(this, arguments);
    }
    /**
     * is complete (all requiered keys are here)
     * @returns bool
     */

  }, {
    key: "isComplete",
    value: function isComplete() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state;
      return !this._require || !this._require.length || state && this._require.reduce(function (r, key) {
        return r && state[key];
      }, true);
    }
    /**
     * is stable
     * @returns bool
     */

  }, {
    key: "isStable",
    value: function isStable() {
      return this._stable;
    }
    /**
     * Serialize state & data with sources refs
     * @returns bool
     */

  }, {
    key: "serialize",
    value: function serialize() {
      var _this5 = this;

      var cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var output = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var sId = cfg.parentAlias || this.scopeObj._id,
          refsCount = 0,
          refs = !cfg.norefs && is.array(this._use) && this._use.reduce(function (map, key) {
        var ref = _this5.$scope.parseRef(key),
            store = _this5.$stores[ref.storeId];

        if (store && Store.isStore(store) && !store.scopeObj._.isLocalId) refsCount++, map[ref.alias] = ref.path;
        return map;
      }, {}),
          state = this.state || {},
          persistent = this.shouldSerialize();

      if (!persistent) {
        keyWalknSet(output, sId + '/' + this.name, {
          dataRefs: cfg.dataRefs,
          refs: refs
        });
        return output;
      }

      var stateKeys = Object.keys(state) || [],
          stateRefs = stateKeys.map(function (k) {
        return state[k];
      }),
          inRefsCount = 0,
          dataRefs = cfg.dataRefs || {},
          inRefs = !cfg.norefs && this.data && Object.keys(this.data).reduce(function (map, key) {
        var ref = stateRefs.indexOf(_this5.data[key]);
        if (ref != -1) inRefsCount++, map[key] = stateKeys[ref];
        return map;
      }, {}),
          snap = {
        dataRefs: cfg.dataRefs,
        state: state && (cfg.norefs ? _objectSpread({}, state) : Object.keys(state).reduce(function (h, k) {
          return !refs[k] && (h[k] = state[k]), h;
        }, {})),
        data: (this.data && this.data.__proto__ === objProto ? Object.keys(this.data).reduce(function (h, k) {
          if (!inRefs[k] && !dataRefs[k]) {
            h[k] = _this5.data[k];
            inRefsCount++;
          }

          return h;
        }, {}) : (is.bool(this.data) || is.number(this.data) || is.string(this.data)) && this.data) || undefined
      };
      refs && refsCount && (snap.refs = refs);
      inRefs && inRefsCount && (snap.inRefs = inRefs);
      keyWalknSet(output, sId + '/' + this.name, snap);
      return output;
    }
    /**
     * restore state & data
     * @returns bool
     */

  }, {
    key: "restore",
    value: function restore(snapshot, immediate) {
      var _this6 = this;

      snapshot = snapshot && keyWalknGet(snapshot, this.scopeObj._id + '/' + this.name) || this.$scope.takeSnapshotByKey(this.scopeObj._id + '/' + this.name);
      if (!snapshot) return;

      if (snapshot) {
        if (!this.isStable() && !immediate) this.then(function () {
          return _this6.restore(snapshot);
        });
        this.state = _objectSpread({}, snapshot.state);
        snapshot.refs && Object.keys(snapshot.refs).forEach(function (key) {
          //todo
          _this6.state[key] = _this6.$scope.retrieve(snapshot.refs[key]);
        });

        if (snapshot.inRefs === true) {
          this.data = _objectSpread({}, this.state);
        } else {
          this.data = snapshot.data;
          snapshot.inRefs && Object.keys(snapshot.inRefs).forEach(function (key) {
            //todo
            _this6.data[key] = _this6.state[snapshot.inRefs[key]]; //else
            //    console.warn('not found : ', key, snap && snap.refs[ key ])
          });
        }

        if (snapshot.dataRefs) {
          this.data = this.data || {};
          Object.keys(snapshot.dataRefs).forEach(function (key) {
            //todo
            _this6.$scope.restoreRefPath(snapshot.dataRefs[key]);

            _this6.data[key] = _this6.$scope.retrieve(snapshot.dataRefs[key]);
          });
        }
      }
    }
    /**
     * Bind this store changes to the given component-key
     * @param obj {React.Component|Store|function)
     * @param key {string} optional key where to map the public state
     */

  }, {
    key: "bind",
    value: function bind(obj, key) {
      var setInitial = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var path = arguments.length > 3 ? arguments[3] : undefined;

      this._followers.push([obj, key, path]);

      if (setInitial && this.data && this._stable) {
        var data = path ? this.retrieve(path) : this.data;

        if (typeof obj != "function") {
          if (key) obj.setState(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, key, data));else obj.setState(data);
        } else {
          obj(data);
        }
      }
    }
    /**
     * Un bind this store off the given component-key
     * @param obj
     * @param key
     * @returns {Array.<*>}
     */

  }, {
    key: "unBind",
    value: function unBind(obj, key, path) {
      var followers = this._followers,
          i = followers && followers.length;

      while (followers && i--) {
        if (followers[i][0] === obj && followers[i][1] === key && followers[i][2] === path) return followers.splice(i, 1);
      }
    }
    /**
     * once('stable', cb)
     * @param obj {React.Component|Store|function)
     * @param key {string} optional key where to map the public state
     */

  }, {
    key: "then",
    value: function then(cb) {
      var _this7 = this;

      if (this._stable) return cb(this.data);
      this.once('stable', function (e) {
        return cb(_this7.data);
      });
    }
    /**
     * Add a lock so the store will not propag it data untill release() is call
     * @param previous {Store|number|Array} @optional wf to wait, releases to wait or
     *     array of stuff to wait
     * @returns {this}
     */

  }, {
    key: "wait",
    value: function wait(previous) {
      if (typeof previous == "number") return this.__locks.all += previous;
      if (is.array(previous)) return previous.map(this.wait.bind(this));
      this._stable && this.emit('unstable', this.state, this.data);
      this._stable = false;
      this.__locks.all++;
      var reason = is.string(previous) ? previous : null;

      if (reason) {
        this.__locks[reason] = this.__locks[reason] || 0;
        this.__locks[reason]++;
      }

      if (previous && is.fn(previous.then)) {
        previous.then(this.release.bind(this, null));
      }

      return this;
    }
    /**
     * Decrease locks for this store, if it reach 0 ,
     * it will be propagated to the followers,
     * then, all stuff passed to "then" call back will be exec / released
     * @param desync
     * @returns {*}
     */

  }, {
    key: "release",
    value: function release(reason, cb) {
      var _static = this.constructor,
          me = this;
      var i = 0,
          wasStable = this._stable;

      if (is.fn(reason)) {
        cb = reason;
        reason = null;
      }

      if (reason) {
        if (this.__locks[reason] == 0) console.error("Release more than locking !", reason);
        this.__locks[reason] = this.__locks[reason] || 0;
        this.__locks[reason]--;
      }

      if (!reason && this.__locks.all == 0) console.error("Release more than locking !");

      if (! --this.__locks.all && this.isComplete()) {
        var propag = this.shouldPropag(this.data);
        this._stable = true;
        propag && this._rev++; //

        if (propag && this._followers.length) this._followers.forEach(function propag(follower) {
          var data = follower[2] ? me.retrieve(follower[2]) : me.data; //if ( !data ) return;

          if (typeof follower[0] == "function") {
            follower[0](data);
          } else {
            //cb && i++;
            follower[0].setState(follower[1] ? _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, follower[1], data) : data //,
            //cb && (
            //    () => (!(--i) && cb())
            //)
            );
          }
        }); //else

        !wasStable && this.emit('stable', this.data);
        propag && this.emit('update', this.data);
        cb && cb();
      } else cb && this.then(cb);

      return this;
    }
  }, {
    key: "propag",
    value: function propag(data) {
      this.emit('update', data);
    }
  }, {
    key: "retain",
    value: function retain(reason) {
      this.__retains.all++;

      if (reason) {
        this.__retains[reason] = this.__retains[reason] || 0;
        this.__retains[reason]++;
      }
    }
  }, {
    key: "dispose",
    value: function dispose(reason) {
      var _this8 = this;

      //console.warn("dispose", reason, this.__retains);
      if (reason) {
        if (!this.__retains[reason]) {
          throw new Error("RS : Dispose more than retaining on store '" + this.name + "' : " + reason);
        }

        this.__retains[reason]--;
      }

      if (this.__retains.all == 0) {
        throw new Error("RS : Dispose more than retaining on store " + this.name);
      }

      this.__retains.all--;

      if (!this.__retains.all) {
        if (this._persistenceTm) {
          this._destroyTM && clearTimeout(this._destroyTM);
          this._destroyTM = setTimeout(function (e) {
            _this8._destroyTM = null; //this.then(s => {

            !_this8.__retains.all && !_this8.dead && _this8.destroy(); //});
          }, this._persistenceTm);
        } else {
          //this.then(s =>
          !this.__retains.all && !this.dead && this.destroy(); //);
        }
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      //  console.log("destroy", this._uid);
      if (this._stabilizer) {
        this._stabilizer = null;
        clearTimeout(this._stabilizer);
      }

      this.emit('destroy', this);
      if (this._followers.length) this._followers.forEach(function (follower) {
        if (typeof follower[0] !== "function") {
          if (follower[0].stores) delete follower[0].stores[follower[1]];
        }
      });
      this._followers.length = 0;
      this.constructor._rev = this.rev;
      this.dead = true;
      this._revs = this.data = this.state = this.scope = null;
      this.removeAllListeners();
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }, {
    key: "nextState",
    get: function get() {
      return this._nextState || this.state;
    }
  }]);

  return Store;
}(EventEmitter);
/**
 * get a static aliased reference of a store
 * @param {string} name
 * @returns {{store: Store, name: *}}
 */


Store.follow = void 0;
Store.require = void 0;
Store.staticScope = new Scope({}, {
  id: "static"
});
Store.state = undefined;
Store.persistenceTm = false;

Store.as = function (name) {
  return {
    store: this,
    name: name
  };
};
/**
 * @todo
 * Map all named stores in {keys} to the {object}'s state
 * Hook componentWillUnmount (for react comp) or destroy to unBind them automatically
 * @static
 * @param object {Object} target state aware object (React.Component|Store|...)
 * @param keys {Array} Ex : ["session", "otherStaticNamedStore:key",
 *     store.as('anotherKey')]
 */


Store.map = function (cStore, keys, scope, origin) {
  var setInitial = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var targetRevs = cStore._revs || {};
  var targetScope = cStore.stores || (cStore.stores = {});
  var initialOutputs = {};
  keys = is.array(keys) ? _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(keys) : [keys];
  scope = scope || Store.staticScope;
  keys = keys.filter( // @todo : use query refs
  // (store)(\.store)*(\[(\*|(props)\w+)+)\])?(\:alias)
  function (key) {
    var _cStore$_sources;

    if (!key) {
      console.error("Not a mappable store item '" + key + "' in " + origin + ' !!');
      return false;
    }

    var name, alias, path, store, _key;

    if (key.store && key.name) {
      alias = name = key.name;
      store = key.store;
    } else if (is.fn(key)) {
      name = alias = key.name || key.defaultName;
      store = key;
    } else {
      _key = key.match(/([^\.\:]+)((?:\.[^\.\:]+)*)(?:\:([^\.\:]+))?/);
      name = _key[1];
      path = _key[2] && _key[2].substr(1);
      store = scope.stores[_key[1]];
      alias = _key[3] || path && path.match(/([^\.]*)$/)[0] || _key[1];
    }

    if (!store) {
      var i = [];

      for (var o in scope.stores) {
        i.push(o);
      }

      console.error("Not a mappable store item '" + name + "/" + alias + "' in " + (cStore.name || cStore) + ' !!', store, _key, scope.stores, i);
      return false;
    }

    if (Scope.isScopeClass(store)) scope._mount(name);

    if (Scope.isScope(store)) {
      store = scope._mount(key);
    } else if (targetRevs[name]) return false; // ignore dbl uses for now


    if (is.fn(store)) {
      scope._mount(name);

      scope.stores[name].bind(cStore, alias, setInitial, path);
    } else {
      store.bind(cStore, alias, setInitial, path);
    } // give initial store weight basing sources


    scope.stores[name]._sources && (_cStore$_sources = cStore._sources).push.apply(_cStore$_sources, _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(scope.stores[name]._sources));
    targetRevs[alias] = targetRevs[alias] || true;
    !targetScope[name] && (targetScope[name] = scope.stores[name]);
    if (scope.stores[name].hasOwnProperty('data')) initialOutputs[name] = scope.data[name];
    return true;
  }); // ... @todo

  cStore.once('destroy', function () {
    keys.map(function (key) {
      var name, alias, path, store;

      if (key.store && key.name) {
        alias = name = key.name;
        store = key.store;
      } else if (is.fn(key)) {
        name = alias = key.name || key.defaultName;
        store = scope.stores[name];
      } else {
        key = key.match(/([^\.\:]+)((?:\.[^\.\:]+)*)(?:\:([^\.\:]+))?/);
        name = key[1];
        path = key[2] && key[2].substr(1);
        store = scope.stores[key[1]];
        alias = key[3] || path && path.match(/([^\.]*)$/)[0] || key[1];
      }

      store && !is.fn(store) && store.unBind(cStore, alias, path);
    });
  });
  return initialOutputs;
};

Store.isStore = Scope.isStore = function (obj) {
  return obj instanceof Store;
};

Store.isStoreClass = Scope.isStoreClass = function (obj) {
  return Store.isPrototypeOf(obj) || obj === Store;
};

var _default = Store;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Scope, "Scope", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\Store.js");
  reactHotLoader.register(EventEmitter, "EventEmitter", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\Store.js");
  reactHotLoader.register(TaskSequencer, "TaskSequencer", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\Store.js");
  reactHotLoader.register(objProto, "objProto", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\Store.js");
  reactHotLoader.register(Store, "Store", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\Store.js");
  reactHotLoader.register(_default, "default", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\Store.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: Scope, Store, scopeRef, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module, global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Scope", function() { return Scope; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scopeRef", function() { return scopeRef; });
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};

/*
 *   The MIT License (MIT)
 *   Copyright (c) 2019. Wise Wild Web
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
var $global = typeof window !== 'undefined' ? window : global,
    Scope = __webpack_require__(/*! ./Scope */ "./src/Scope.js")["default"],
    Store = __webpack_require__(/*! ./Store */ "./src/Store.js")["default"];

var RS = $global.___rescope || {};

function scopeRef(map, key) {
  map[key] = new Scope.scopeRef(map[key]);
  return map;
}

;

if ($global.___rescope) {
  console.warn("ReScope is defined multiple times !! \nCheck you're packaging");
  Scope = RS.Scope;
  Store = RS.Store;
  scopeRef = RS.scopeRef;
} else {
  $global.___rescope = RS;
  Scope.Store = Store;
}


var _default = {
  Scope: Scope,
  Store: Store,
  scopeRef: scopeRef
};
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register($global, "$global", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\index.js");
  reactHotLoader.register(Scope, "Scope", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\index.js");
  reactHotLoader.register(Store, "Store", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\index.js");
  reactHotLoader.register(RS, "RS", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\index.js");
  reactHotLoader.register(scopeRef, "scopeRef", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\index.js");
  reactHotLoader.register(_default, "default", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\index.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module), __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/utils/Emitter.js":
/*!******************************!*\
  !*** ./src/utils/Emitter.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Emitter; });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "undefined?4d9b");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "undefined?24b3");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "undefined?36a1");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! is */ "undefined?63a5");
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(is__WEBPACK_IMPORTED_MODULE_3__);




(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};

/*
 *   The MIT License (MIT)
 *   Copyright (c) 2019. Wise Wild Web
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */


var Emitter =
/*#__PURE__*/
function () {
  function Emitter() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Emitter);

    this._events = {};
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Emitter, [{
    key: "on",
    value: function on(evt, cb) {
      var _this = this;

      if (!is__WEBPACK_IMPORTED_MODULE_3___default.a.string(evt) && evt) return Object.keys(evt).forEach(function (k) {
        return _this.on(k, evt[k]);
      });
      this._events[evt] = this._events[evt] || [];

      this._events[evt].push(cb);
    }
  }, {
    key: "un",
    value: function un(evt, cb) {
      var _this2 = this;

      if (!is__WEBPACK_IMPORTED_MODULE_3___default.a.string(evt) && evt) return Object.keys(evt).forEach(function (k) {
        return _this2.un(k, evt[k]);
      });
      if (!this._events[evt]) return;

      var i = this._events[evt].indexOf(cb);

      this._events[evt].splice(i, 1);
    }
  }, {
    key: "emit",
    value: function emit(evt) {
      if (!this._events[evt]) return;

      var lists = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(this._events[evt]);

      for (var _len = arguments.length, argz = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        argz[_key - 1] = arguments[_key];
      }

      for (var i = 0; i < lists.length; i++) {
        lists[i].apply(lists, argz);
      }
    }
  }, {
    key: "addListener",
    value: function addListener() {
      this.on.apply(this, arguments);
    }
  }, {
    key: "removeListener",
    value: function removeListener() {
      this.un.apply(this, arguments);
    }
  }, {
    key: "removeAllListeners",
    value: function removeAllListeners() {
      this._events = {};
    }
  }, {
    key: "once",
    value: function once(evt, cb) {
      var _this3 = this;

      var _fn;

      this.on(evt, _fn = function fn() {
        _this3.un(evt, _fn);

        cb.apply(void 0, arguments);
      });
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return Emitter;
}();


;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Emitter, "Emitter", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\utils\\Emitter.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/utils/TaskSequencer.js":
/*!************************************!*\
  !*** ./src/utils/TaskSequencer.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module, process) {(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};

/*
 *   The MIT License (MIT)
 *   Copyright (c) 2019. Wise Wild Web
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

/**
 * Minimal push sequencer, apply stores specific task in the right order
 */
var taskQueue = [],
    curWeight = 0,
    maxWeight = 0,
    minWeight = 0,
    taskCount = 0,
    deSync = false,
    deSyncMaxTasks = 10,
    task,
    isRunning,
    errorCatcher = {
  lastError: null,
  dispatch: function dispatch(error) {
    errorCatcher.disable();

    if (task && task[0].handleError) {
      task[0].handleError(error, task);
    } else if (task) console.error("ReScope : An apply task has failed !!", task[1], " on ", task[0].name || task[0].constructor.name, '\n', error);

    isRunning = false;
    task = null;
    runNow();
  },
  enable: typeof window !== 'undefined' ? function () {
    window.addEventListener('error', errorCatcher.dispatch);
  } : function () {
    process.on('uncaughtException', errorCatcher.dispatch);
  },
  disable: typeof window !== 'undefined' ? function () {
    window.removeEventListener('error', errorCatcher.dispatch);
  } : function () {
    process.removeListener('uncaughtException', errorCatcher.dispatch);
  }
};

function runNow() {
  if (!isRunning) {
    run();
  }
}

function run() {
  var from = Date.now();
  isRunning = true;
  errorCatcher.enable();

  while (taskCount) {
    // try for the current weight
    while (!(taskQueue[curWeight] && taskQueue[curWeight].length)) {
      curWeight++;
    }

    taskCount--;
    task = taskQueue[curWeight].shift(); //console.log("Task : ", task[1], " on ", task[0].name);

    try {
      !task[0].dead && task[0][task[1]](task[2]);
    } catch (e) {
      return errorCatcher.dispatch(e);
    }
  }

  task = undefined;
  errorCatcher.disable();
  isRunning = false;

  if (taskCount) {
    setTimeout(runNow);
  }
} //
//index.setTaskDeSync = ( nb ) => {
//    if ( nb === false )
//        return deSync = false;
//    else if ( nb === true ) {
//        deSync         = true;
//        deSyncMaxTasks = 10;
//    }
//    else (is.int(nb))
//    {
//        deSync         = true;
//        deSyncMaxTasks = nb;
//    }
//};


var _default = {
  pushTask: function pushTask(obj, fn, argz) {
    /**
     * The more a store have sources, the more it should be processed first
     * So leafs stores stay sync, and root stores receive merged state updates;
     * global state stay coherent
     *
     * This mean whatever the number of stores & the complexity of the deps,
     * updating a store state will update its synchrone child stores immediately
     *
     *
     * @type {*|number}
     */
    var weight = obj._sources && obj._sources.length || 1,
        stack = taskQueue[weight] = taskQueue[weight] || [];
    maxWeight = Math.max(maxWeight, weight);
    curWeight = Math.min(curWeight, weight);
    taskCount++; //console.log("Push Task : ", fn, " on ", obj.name, weight);

    stack.push([obj, fn, argz]);
    setTimeout(runNow, 0);
    return stack.length;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(taskQueue, "taskQueue", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\utils\\TaskSequencer.js");
  reactHotLoader.register(curWeight, "curWeight", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\utils\\TaskSequencer.js");
  reactHotLoader.register(maxWeight, "maxWeight", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\utils\\TaskSequencer.js");
  reactHotLoader.register(minWeight, "minWeight", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\utils\\TaskSequencer.js");
  reactHotLoader.register(taskCount, "taskCount", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\utils\\TaskSequencer.js");
  reactHotLoader.register(deSync, "deSync", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\utils\\TaskSequencer.js");
  reactHotLoader.register(deSyncMaxTasks, "deSyncMaxTasks", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\utils\\TaskSequencer.js");
  reactHotLoader.register(task, "task", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\utils\\TaskSequencer.js");
  reactHotLoader.register(isRunning, "isRunning", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\utils\\TaskSequencer.js");
  reactHotLoader.register(errorCatcher, "errorCatcher", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\utils\\TaskSequencer.js");
  reactHotLoader.register(runNow, "runNow", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\utils\\TaskSequencer.js");
  reactHotLoader.register(run, "run", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\utils\\TaskSequencer.js");
  reactHotLoader.register(_default, "default", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\utils\\TaskSequencer.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module), __webpack_require__(/*! ./../../node_modules/process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./src/utils/utils.js":
/*!****************************!*\
  !*** ./src/utils/utils.js ***!
  \****************************/
/*! exports provided: walknSet, walknGet, keyWalknSet, keyWalknGet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "walknSet", function() { return walknSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "walknGet", function() { return walknGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyWalknSet", function() { return keyWalknSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyWalknGet", function() { return keyWalknGet; });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "undefined?4d9b");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);


(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};

/*
 *   The MIT License (MIT)
 *   Copyright (c) 2019. Wise Wild Web
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */
var is = __webpack_require__(/*! is */ "undefined?63a5");

function walknSet(obj, path, value, stack) {
  if (is.string(path)) path = path.split('.');
  if (!path.length) return false;else if (path.length == 1) return obj[path[0]] = stack ? [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(obj[path[0]] || []), [value]) : value;else return walknSet(obj[path[0]] = obj[path[0]] || {}, path.slice(1), value, stack);
}
function walknGet(obj, path, isKey) {
  if (is.string(path)) path = path.split('.');
  return path.length ? obj[path[0]] && walknGet(obj[path[0]], path.slice(1)) : obj;
} //@todo

function keyWalknSet(obj, path, value, stack) {
  if (is.string(path)) path = path.split(/(\>|\/)/ig).filter(function (v) {
    return v !== '>' && v;
  });
  return walknSet(obj, path, value);
}
function keyWalknGet(obj, path, isKey) {
  if (is.string(path)) path = path.split(/(\>|\/)/ig).filter(function (v) {
    return v !== '>' && v;
  });
  return path.length ? obj[path[0]] && walknGet(obj[path[0]], path.slice(1)) : obj;
}
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(walknSet, "walknSet", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\utils\\utils.js");
  reactHotLoader.register(walknGet, "walknGet", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\utils\\utils.js");
  reactHotLoader.register(keyWalknSet, "keyWalknSet", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\utils\\utils.js");
  reactHotLoader.register(keyWalknGet, "keyWalknGet", "G:\\n8tz\\libs\\rScopes\\rescope\\src\\utils\\utils.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi reScope/index ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! reScope/index */"./src/index.js");


/***/ }),

/***/ "undefined?03c7":
/*!*******************************************************************!*\
  !*** external "@babel/runtime/helpers/possibleConstructorReturn" ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/possibleConstructorReturn");

/***/ }),

/***/ "undefined?188d":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/defineProperty" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/defineProperty");

/***/ }),

/***/ "undefined?20a8":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/getPrototypeOf" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/getPrototypeOf");

/***/ }),

/***/ "undefined?24b3":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/classCallCheck" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/classCallCheck");

/***/ }),

/***/ "undefined?36a1":
/*!*****************************************************!*\
  !*** external "@babel/runtime/helpers/createClass" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/createClass");

/***/ }),

/***/ "undefined?4d9b":
/*!***********************************************************!*\
  !*** external "@babel/runtime/helpers/toConsumableArray" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/toConsumableArray");

/***/ }),

/***/ "undefined?56eb":
/*!*********************************************!*\
  !*** external "@babel/runtime/helpers/get" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/get");

/***/ }),

/***/ "undefined?63a5":
/*!*********************!*\
  !*** external "is" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("is");

/***/ }),

/***/ "undefined?74ba":
/*!**************************************************!*\
  !*** external "@babel/runtime/helpers/inherits" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/inherits");

/***/ }),

/***/ "undefined?beec":
/*!**************************!*\
  !*** external "shortid" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("shortid");

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
//# sourceMappingURL=reScope.js.map