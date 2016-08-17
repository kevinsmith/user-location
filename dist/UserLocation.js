/*!
 * UserLocation v1.1.0
 * Simple library to get the current user's location, with an optional fallback method of obtaining their coordinates.
 * 
 * https://developers.kevinsmith.io
 * 
 * Licensed under Apache-2.0
 * 
 * Copyright 2016 Kevin Smith <kevin@hearsayinteractive.com>
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["UserLocation"] = factory();
	else
		root["UserLocation"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _jsCookie = __webpack_require__(1);
	
	var _jsCookie2 = _interopRequireDefault(_jsCookie);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Simple library to get the current user's location, with an
	 * optional fallback method of obtaining their coordinates.
	 *
	 * @class UserLocation
	 *
	 * @param {object} opt - Optional configuration
	 * @param {number} [opt.cacheTtl=604800] - Cache time-to-live in seconds
	 * @param {boolean|string} [opt.fallback=false] - Method of obtaining coordinates if initial try
	 * fails. Possible values: false, 'general', or 'exact'.
	 * @param {string} [opt.specificity='general'] - Initial method of obtaining coordinates. Possible
	 * values: 'general' or 'exact'.
	 * @return {Promise} - When resolved, returns a coordinates object
	 * with latitude, longitude, and accuracy.
	 */
	var UserLocation = function () {
	  function UserLocation() {
	    var _this = this;
	
	    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var _ref$cacheTtl = _ref.cacheTtl;
	    var cacheTtl = _ref$cacheTtl === undefined ? 604800 : _ref$cacheTtl;
	    var _ref$fallback = _ref.fallback;
	    var fallback = _ref$fallback === undefined ? false : _ref$fallback;
	    var _ref$specificity = _ref.specificity;
	    var specificity = _ref$specificity === undefined ? 'general' : _ref$specificity;
	
	    _classCallCheck(this, UserLocation);
	
	    this.cookieName = '__ul_coords';
	
	    this.coords = {
	      latitude: null,
	      longitude: null,
	      accuracy: null };
	
	    this.opt = { cacheTtl: cacheTtl, fallback: fallback, specificity: specificity };
	
	    this.preflightChecks();
	
	    var cachedCoords = this.getCache();
	    var fallbackPromise = void 0;
	    var originalPromise = void 0;
	
	    if (cachedCoords && cachedCoords.options.fallback === this.opt.fallback && cachedCoords.options.specificity === this.opt.specificity) {
	      return new Promise(function (resolve) {
	        _this.coords = cachedCoords.coords;
	        resolve(_this.coords);
	      });
	    }
	
	    if (specificity === 'exact') {
	      originalPromise = this.getExact();
	    } else if (specificity === 'general') {
	      originalPromise = this.getGeneral();
	    } else {
	      throw new Error('Invalid configuration value for location specificity.');
	    }
	
	    return originalPromise.then(function () {
	      return originalPromise;
	    }).catch(function () {
	      if (fallback === 'exact') {
	        fallbackPromise = _this.getExact();
	      } else if (fallback === 'general') {
	        fallbackPromise = _this.getGeneral();
	      } else {
	        fallbackPromise = originalPromise;
	      }
	
	      return fallbackPromise;
	    });
	  }
	
	  /**
	   * Ensure all required environment APIs are available.
	   *
	   * @return {void}
	   */
	
	
	  _createClass(UserLocation, [{
	    key: 'preflightChecks',
	    value: function preflightChecks() {
	      if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
	        throw new Error('The geolocation API is required but unavailable in this environment.');
	      }
	
	      if (typeof Promise === 'undefined') {
	        throw new Error('The Promise object is required but unavailable in this environment. ' + 'Please consider using a Promise polyfill to support all modern browsers.');
	      }
	
	      if (typeof fetch === 'undefined') {
	        throw new Error('The Fetch API is required but unavailable in this environment. ' + 'Please consider using a fetch polyfill to support all modern browsers.');
	      }
	    }
	
	    /**
	     * Get coordinates stored in a cookie.
	     *
	     * @private
	     * @return {object} Coordinates
	     */
	
	  }, {
	    key: 'getCache',
	    value: function getCache() {
	      return _jsCookie2.default.getJSON(this.cookieName);
	    }
	
	    /**
	     * Get location using browser's native geolocation API.
	     *
	     * @private
	     * @return {Promise} - navigator.geolocation wrapped in a Promise
	     */
	
	  }, {
	    key: 'getExact',
	    value: function getExact() {
	      var _this2 = this;
	
	      var promise = new Promise(function (resolve, reject) {
	        navigator.geolocation.getCurrentPosition(function (pos) {
	          _this2.coords.latitude = pos.coords.latitude;
	          _this2.coords.longitude = pos.coords.longitude;
	          _this2.coords.accuracy = pos.coords.accuracy;
	          _this2.setCache(_this2.coords);
	          resolve(_this2.coords);
	        }, function (err) {
	          reject(err.message + ' (error code: ' + err.code + ')');
	        });
	      });
	
	      return promise;
	    }
	
	    /**
	     * Get location using Nekudo's IP address lookup service
	     *
	     * @private
	     * @return {Promise} - Promise wrapped around Fetch response
	     */
	
	  }, {
	    key: 'getGeneral',
	    value: function getGeneral() {
	      var _this3 = this;
	
	      var promise = new Promise(function (resolve, reject) {
	        fetch('https://geoip.nekudo.com/api/', {}).then(function (response) {
	          if (response.ok) {
	            response.json().then(function (json) {
	              if (json.type === 'error') {
	                reject(json.msg);
	              } else {
	                // Convert Maxmind's accuracy in kilometers to this lib's standard in meters
	                _this3.coords.accuracy = json.location.accuracy_radius * 1000;
	                _this3.coords.latitude = json.location.latitude;
	                _this3.coords.longitude = json.location.longitude;
	                _this3.setCache(_this3.coords);
	                resolve(_this3.coords);
	              }
	            });
	          } else {
	            reject(response.statusText);
	          }
	        }).catch(function (err) {
	          reject(err.message);
	        });
	      });
	
	      return promise;
	    }
	
	    /**
	     * Save coordinates to a cookie.
	     *
	     * @private
	     * @param {object} coords - Coordinates object
	     * @return {void}
	     */
	
	  }, {
	    key: 'setCache',
	    value: function setCache(coords) {
	      _jsCookie2.default.set(this.cookieName, {
	        coords: coords,
	        options: this.opt
	      }, {
	        expires: this.opt.cacheTtl / 24 / 60 / 60 });
	    }
	  }]);
	
	  return UserLocation;
	}();
	
	exports.default = UserLocation;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * JavaScript Cookie v2.1.2
	 * https://github.com/js-cookie/js-cookie
	 *
	 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
	 * Released under the MIT license
	 */
	;(function (factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports === 'object') {
			module.exports = factory();
		} else {
			var OldCookies = window.Cookies;
			var api = window.Cookies = factory();
			api.noConflict = function () {
				window.Cookies = OldCookies;
				return api;
			};
		}
	}(function () {
		function extend () {
			var i = 0;
			var result = {};
			for (; i < arguments.length; i++) {
				var attributes = arguments[ i ];
				for (var key in attributes) {
					result[key] = attributes[key];
				}
			}
			return result;
		}
	
		function init (converter) {
			function api (key, value, attributes) {
				var result;
				if (typeof document === 'undefined') {
					return;
				}
	
				// Write
	
				if (arguments.length > 1) {
					attributes = extend({
						path: '/'
					}, api.defaults, attributes);
	
					if (typeof attributes.expires === 'number') {
						var expires = new Date();
						expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
						attributes.expires = expires;
					}
	
					try {
						result = JSON.stringify(value);
						if (/^[\{\[]/.test(result)) {
							value = result;
						}
					} catch (e) {}
	
					if (!converter.write) {
						value = encodeURIComponent(String(value))
							.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
					} else {
						value = converter.write(value, key);
					}
	
					key = encodeURIComponent(String(key));
					key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
					key = key.replace(/[\(\)]/g, escape);
	
					return (document.cookie = [
						key, '=', value,
						attributes.expires && '; expires=' + attributes.expires.toUTCString(), // use expires attribute, max-age is not supported by IE
						attributes.path    && '; path=' + attributes.path,
						attributes.domain  && '; domain=' + attributes.domain,
						attributes.secure ? '; secure' : ''
					].join(''));
				}
	
				// Read
	
				if (!key) {
					result = {};
				}
	
				// To prevent the for loop in the first place assign an empty array
				// in case there are no cookies at all. Also prevents odd result when
				// calling "get()"
				var cookies = document.cookie ? document.cookie.split('; ') : [];
				var rdecode = /(%[0-9A-Z]{2})+/g;
				var i = 0;
	
				for (; i < cookies.length; i++) {
					var parts = cookies[i].split('=');
					var cookie = parts.slice(1).join('=');
	
					if (cookie.charAt(0) === '"') {
						cookie = cookie.slice(1, -1);
					}
	
					try {
						var name = parts[0].replace(rdecode, decodeURIComponent);
						cookie = converter.read ?
							converter.read(cookie, name) : converter(cookie, name) ||
							cookie.replace(rdecode, decodeURIComponent);
	
						if (this.json) {
							try {
								cookie = JSON.parse(cookie);
							} catch (e) {}
						}
	
						if (key === name) {
							result = cookie;
							break;
						}
	
						if (!key) {
							result[name] = cookie;
						}
					} catch (e) {}
				}
	
				return result;
			}
	
			api.set = api;
			api.get = function (key) {
				return api(key);
			};
			api.getJSON = function () {
				return api.apply({
					json: true
				}, [].slice.call(arguments));
			};
			api.defaults = {};
	
			api.remove = function (key, attributes) {
				api(key, '', extend(attributes, {
					expires: -1
				}));
			};
	
			api.withConverter = init;
	
			return api;
		}
	
		return init(function () {});
	}));


/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmMzBjZjgyNDMyMWU2ZTBhZWE1NyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9qcy1jb29raWUvc3JjL2pzLmNvb2tpZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDdENBOzs7Ozs7OztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7S0FlcUIsWTtBQUNuQiwyQkFJUTtBQUFBOztBQUFBLHNFQUFKLEVBQUk7O0FBQUEsOEJBSE4sUUFHTTtBQUFBLFNBSE4sUUFHTSxpQ0FISyxNQUdMO0FBQUEsOEJBRk4sUUFFTTtBQUFBLFNBRk4sUUFFTSxpQ0FGSyxLQUVMO0FBQUEsaUNBRE4sV0FDTTtBQUFBLFNBRE4sV0FDTSxvQ0FEUSxTQUNSOztBQUFBOztBQUNOLFVBQUssVUFBTCxHQUFrQixhQUFsQjs7QUFFQSxVQUFLLE1BQUwsR0FBYztBQUNaLGlCQUFVLElBREU7QUFFWixrQkFBVyxJQUZDO0FBR1osaUJBQVUsSUFIRSxFQUFkOztBQU1BLFVBQUssR0FBTCxHQUFXLEVBQUUsa0JBQUYsRUFBWSxrQkFBWixFQUFzQix3QkFBdEIsRUFBWDs7QUFFQSxVQUFLLGVBQUw7O0FBRUEsU0FBTSxlQUFlLEtBQUssUUFBTCxFQUFyQjtBQUNBLFNB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QSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWM7QUFDZDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhCQUE2QjtBQUM3Qiw4QkFBNkI7QUFDN0IsOEJBQTZCO0FBQzdCLDRCQUEyQjtBQUMzQjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw0REFBMkQ7QUFDM0QsOEJBQTZCLEVBQUU7QUFDL0I7O0FBRUEsVUFBUyxvQkFBb0I7QUFDN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSw0QkFBMkI7QUFDM0IsRUFBQyIsImZpbGUiOiJVc2VyTG9jYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJVc2VyTG9jYXRpb25cIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiVXNlckxvY2F0aW9uXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBmMzBjZjgyNDMyMWU2ZTBhZWE1N1xuICoqLyIsImltcG9ydCBDb29raWVzIGZyb20gJ2pzLWNvb2tpZSc7XG5cbi8qKlxuICogU2ltcGxlIGxpYnJhcnkgdG8gZ2V0IHRoZSBjdXJyZW50IHVzZXIncyBsb2NhdGlvbiwgd2l0aCBhblxuICogb3B0aW9uYWwgZmFsbGJhY2sgbWV0aG9kIG9mIG9idGFpbmluZyB0aGVpciBjb29yZGluYXRlcy5cbiAqXG4gKiBAY2xhc3MgVXNlckxvY2F0aW9uXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdCAtIE9wdGlvbmFsIGNvbmZpZ3VyYXRpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0LmNhY2hlVHRsPTYwNDgwMF0gLSBDYWNoZSB0aW1lLXRvLWxpdmUgaW4gc2Vjb25kc1xuICogQHBhcmFtIHtib29sZWFufHN0cmluZ30gW29wdC5mYWxsYmFjaz1mYWxzZV0gLSBNZXRob2Qgb2Ygb2J0YWluaW5nIGNvb3JkaW5hdGVzIGlmIGluaXRpYWwgdHJ5XG4gKiBmYWlscy4gUG9zc2libGUgdmFsdWVzOiBmYWxzZSwgJ2dlbmVyYWwnLCBvciAnZXhhY3QnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtvcHQuc3BlY2lmaWNpdHk9J2dlbmVyYWwnXSAtIEluaXRpYWwgbWV0aG9kIG9mIG9idGFpbmluZyBjb29yZGluYXRlcy4gUG9zc2libGVcbiAqIHZhbHVlczogJ2dlbmVyYWwnIG9yICdleGFjdCcuXG4gKiBAcmV0dXJuIHtQcm9taXNlfSAtIFdoZW4gcmVzb2x2ZWQsIHJldHVybnMgYSBjb29yZGluYXRlcyBvYmplY3RcbiAqIHdpdGggbGF0aXR1ZGUsIGxvbmdpdHVkZSwgYW5kIGFjY3VyYWN5LlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyTG9jYXRpb24ge1xuICBjb25zdHJ1Y3Rvcih7XG4gICAgY2FjaGVUdGwgPSA2MDQ4MDAsIC8vIDcgZGF5c1xuICAgIGZhbGxiYWNrID0gZmFsc2UsIC8vIElmICdzcGVjaWZpY2l0eScgZmFpbHNcbiAgICBzcGVjaWZpY2l0eSA9ICdnZW5lcmFsJyxcbiAgfSA9IHt9KSB7XG4gICAgdGhpcy5jb29raWVOYW1lID0gJ19fdWxfY29vcmRzJztcblxuICAgIHRoaXMuY29vcmRzID0ge1xuICAgICAgbGF0aXR1ZGU6IG51bGwsXG4gICAgICBsb25naXR1ZGU6IG51bGwsXG4gICAgICBhY2N1cmFjeTogbnVsbCwgLy8gaW4gbWV0ZXJzXG4gICAgfTtcblxuICAgIHRoaXMub3B0ID0geyBjYWNoZVR0bCwgZmFsbGJhY2ssIHNwZWNpZmljaXR5IH07XG5cbiAgICB0aGlzLnByZWZsaWdodENoZWNrcygpO1xuXG4gICAgY29uc3QgY2FjaGVkQ29vcmRzID0gdGhpcy5nZXRDYWNoZSgpO1xuICAgIGxldCBmYWxsYmFja1Byb21pc2U7XG4gICAgbGV0IG9yaWdpbmFsUHJvbWlzZTtcblxuICAgIGlmIChcbiAgICAgIGNhY2hlZENvb3JkcyAmJlxuICAgICAgY2FjaGVkQ29vcmRzLm9wdGlvbnMuZmFsbGJhY2sgPT09IHRoaXMub3B0LmZhbGxiYWNrICYmXG4gICAgICBjYWNoZWRDb29yZHMub3B0aW9ucy5zcGVjaWZpY2l0eSA9PT0gdGhpcy5vcHQuc3BlY2lmaWNpdHlcbiAgICApIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICB0aGlzLmNvb3JkcyA9IGNhY2hlZENvb3Jkcy5jb29yZHM7XG4gICAgICAgIHJlc29sdmUodGhpcy5jb29yZHMpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHNwZWNpZmljaXR5ID09PSAnZXhhY3QnKSB7XG4gICAgICBvcmlnaW5hbFByb21pc2UgPSB0aGlzLmdldEV4YWN0KCk7XG4gICAgfSBlbHNlIGlmIChzcGVjaWZpY2l0eSA9PT0gJ2dlbmVyYWwnKSB7XG4gICAgICBvcmlnaW5hbFByb21pc2UgPSB0aGlzLmdldEdlbmVyYWwoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvbmZpZ3VyYXRpb24gdmFsdWUgZm9yIGxvY2F0aW9uIHNwZWNpZmljaXR5LicpO1xuICAgIH1cblxuICAgIHJldHVybiBvcmlnaW5hbFByb21pc2VcbiAgICAgIC50aGVuKCgpID0+IG9yaWdpbmFsUHJvbWlzZSlcbiAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgIGlmIChmYWxsYmFjayA9PT0gJ2V4YWN0Jykge1xuICAgICAgICAgIGZhbGxiYWNrUHJvbWlzZSA9IHRoaXMuZ2V0RXhhY3QoKTtcbiAgICAgICAgfSBlbHNlIGlmIChmYWxsYmFjayA9PT0gJ2dlbmVyYWwnKSB7XG4gICAgICAgICAgZmFsbGJhY2tQcm9taXNlID0gdGhpcy5nZXRHZW5lcmFsKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmFsbGJhY2tQcm9taXNlID0gb3JpZ2luYWxQcm9taXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbGxiYWNrUHJvbWlzZTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEVuc3VyZSBhbGwgcmVxdWlyZWQgZW52aXJvbm1lbnQgQVBJcyBhcmUgYXZhaWxhYmxlLlxuICAgKlxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgcHJlZmxpZ2h0Q2hlY2tzKCkge1xuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yID09PSAndW5kZWZpbmVkJyB8fCAhKCdnZW9sb2NhdGlvbicgaW4gbmF2aWdhdG9yKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZ2VvbG9jYXRpb24gQVBJIGlzIHJlcXVpcmVkIGJ1dCB1bmF2YWlsYWJsZSBpbiB0aGlzIGVudmlyb25tZW50LicpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgUHJvbWlzZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIFByb21pc2Ugb2JqZWN0IGlzIHJlcXVpcmVkIGJ1dCB1bmF2YWlsYWJsZSBpbiB0aGlzIGVudmlyb25tZW50LiAnICtcbiAgICAgICAgJ1BsZWFzZSBjb25zaWRlciB1c2luZyBhIFByb21pc2UgcG9seWZpbGwgdG8gc3VwcG9ydCBhbGwgbW9kZXJuIGJyb3dzZXJzLicpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZmV0Y2ggPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBGZXRjaCBBUEkgaXMgcmVxdWlyZWQgYnV0IHVuYXZhaWxhYmxlIGluIHRoaXMgZW52aXJvbm1lbnQuICcgK1xuICAgICAgICAnUGxlYXNlIGNvbnNpZGVyIHVzaW5nIGEgZmV0Y2ggcG9seWZpbGwgdG8gc3VwcG9ydCBhbGwgbW9kZXJuIGJyb3dzZXJzLicpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY29vcmRpbmF0ZXMgc3RvcmVkIGluIGEgY29va2llLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcmV0dXJuIHtvYmplY3R9IENvb3JkaW5hdGVzXG4gICAqL1xuICBnZXRDYWNoZSgpIHtcbiAgICByZXR1cm4gQ29va2llcy5nZXRKU09OKHRoaXMuY29va2llTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGxvY2F0aW9uIHVzaW5nIGJyb3dzZXIncyBuYXRpdmUgZ2VvbG9jYXRpb24gQVBJLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIG5hdmlnYXRvci5nZW9sb2NhdGlvbiB3cmFwcGVkIGluIGEgUHJvbWlzZVxuICAgKi9cbiAgZ2V0RXhhY3QoKSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oXG4gICAgICAgIChwb3MpID0+IHtcbiAgICAgICAgICB0aGlzLmNvb3Jkcy5sYXRpdHVkZSA9IHBvcy5jb29yZHMubGF0aXR1ZGU7XG4gICAgICAgICAgdGhpcy5jb29yZHMubG9uZ2l0dWRlID0gcG9zLmNvb3Jkcy5sb25naXR1ZGU7XG4gICAgICAgICAgdGhpcy5jb29yZHMuYWNjdXJhY3kgPSBwb3MuY29vcmRzLmFjY3VyYWN5O1xuICAgICAgICAgIHRoaXMuc2V0Q2FjaGUodGhpcy5jb29yZHMpO1xuICAgICAgICAgIHJlc29sdmUodGhpcy5jb29yZHMpO1xuICAgICAgICB9LFxuICAgICAgICAoZXJyKSA9PiB7XG4gICAgICAgICAgcmVqZWN0KGAke2Vyci5tZXNzYWdlfSAoZXJyb3IgY29kZTogJHtlcnIuY29kZX0pYCk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgbG9jYXRpb24gdXNpbmcgTmVrdWRvJ3MgSVAgYWRkcmVzcyBsb29rdXAgc2VydmljZVxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIFByb21pc2Ugd3JhcHBlZCBhcm91bmQgRmV0Y2ggcmVzcG9uc2VcbiAgICovXG4gIGdldEdlbmVyYWwoKSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGZldGNoKCdodHRwczovL2dlb2lwLm5la3Vkby5jb20vYXBpLycsIHt9KVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgIHJlc3BvbnNlLmpzb24oKVxuICAgICAgICAgICAgICAudGhlbigoanNvbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChqc29uLnR5cGUgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgICAgIHJlamVjdChqc29uLm1zZyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vIENvbnZlcnQgTWF4bWluZCdzIGFjY3VyYWN5IGluIGtpbG9tZXRlcnMgdG8gdGhpcyBsaWIncyBzdGFuZGFyZCBpbiBtZXRlcnNcbiAgICAgICAgICAgICAgICAgIHRoaXMuY29vcmRzLmFjY3VyYWN5ID0ganNvbi5sb2NhdGlvbi5hY2N1cmFjeV9yYWRpdXMgKiAxMDAwO1xuICAgICAgICAgICAgICAgICAgdGhpcy5jb29yZHMubGF0aXR1ZGUgPSBqc29uLmxvY2F0aW9uLmxhdGl0dWRlO1xuICAgICAgICAgICAgICAgICAgdGhpcy5jb29yZHMubG9uZ2l0dWRlID0ganNvbi5sb2NhdGlvbi5sb25naXR1ZGU7XG4gICAgICAgICAgICAgICAgICB0aGlzLnNldENhY2hlKHRoaXMuY29vcmRzKTtcbiAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5jb29yZHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KHJlc3BvbnNlLnN0YXR1c1RleHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyLm1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhdmUgY29vcmRpbmF0ZXMgdG8gYSBjb29raWUuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjb29yZHMgLSBDb29yZGluYXRlcyBvYmplY3RcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIHNldENhY2hlKGNvb3Jkcykge1xuICAgIENvb2tpZXMuc2V0KFxuICAgICAgdGhpcy5jb29raWVOYW1lLFxuICAgICAge1xuICAgICAgICBjb29yZHMsXG4gICAgICAgIG9wdGlvbnM6IHRoaXMub3B0LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZXhwaXJlczogdGhpcy5vcHQuY2FjaGVUdGwgLyAyNCAvIDYwIC8gNjAsIC8vIENvbnZlcnQgdG8gZGF5cywgYXMgcmVxdWlyZWQgYnkgQ29va2llc1xuICAgICAgfVxuICAgICk7XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiLyohXG4gKiBKYXZhU2NyaXB0IENvb2tpZSB2Mi4xLjJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9qcy1jb29raWUvanMtY29va2llXG4gKlxuICogQ29weXJpZ2h0IDIwMDYsIDIwMTUgS2xhdXMgSGFydGwgJiBGYWduZXIgQnJhY2tcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG47KGZ1bmN0aW9uIChmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0XHRkZWZpbmUoZmFjdG9yeSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIE9sZENvb2tpZXMgPSB3aW5kb3cuQ29va2llcztcblx0XHR2YXIgYXBpID0gd2luZG93LkNvb2tpZXMgPSBmYWN0b3J5KCk7XG5cdFx0YXBpLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR3aW5kb3cuQ29va2llcyA9IE9sZENvb2tpZXM7XG5cdFx0XHRyZXR1cm4gYXBpO1xuXHRcdH07XG5cdH1cbn0oZnVuY3Rpb24gKCkge1xuXHRmdW5jdGlvbiBleHRlbmQgKCkge1xuXHRcdHZhciBpID0gMDtcblx0XHR2YXIgcmVzdWx0ID0ge307XG5cdFx0Zm9yICg7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhdHRyaWJ1dGVzID0gYXJndW1lbnRzWyBpIF07XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gYXR0cmlidXRlcykge1xuXHRcdFx0XHRyZXN1bHRba2V5XSA9IGF0dHJpYnV0ZXNba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGZ1bmN0aW9uIGluaXQgKGNvbnZlcnRlcikge1xuXHRcdGZ1bmN0aW9uIGFwaSAoa2V5LCB2YWx1ZSwgYXR0cmlidXRlcykge1xuXHRcdFx0dmFyIHJlc3VsdDtcblx0XHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gV3JpdGVcblxuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdGF0dHJpYnV0ZXMgPSBleHRlbmQoe1xuXHRcdFx0XHRcdHBhdGg6ICcvJ1xuXHRcdFx0XHR9LCBhcGkuZGVmYXVsdHMsIGF0dHJpYnV0ZXMpO1xuXG5cdFx0XHRcdGlmICh0eXBlb2YgYXR0cmlidXRlcy5leHBpcmVzID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRcdHZhciBleHBpcmVzID0gbmV3IERhdGUoKTtcblx0XHRcdFx0XHRleHBpcmVzLnNldE1pbGxpc2Vjb25kcyhleHBpcmVzLmdldE1pbGxpc2Vjb25kcygpICsgYXR0cmlidXRlcy5leHBpcmVzICogODY0ZSs1KTtcblx0XHRcdFx0XHRhdHRyaWJ1dGVzLmV4cGlyZXMgPSBleHBpcmVzO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRyZXN1bHQgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG5cdFx0XHRcdFx0aWYgKC9eW1xce1xcW10vLnRlc3QocmVzdWx0KSkge1xuXHRcdFx0XHRcdFx0dmFsdWUgPSByZXN1bHQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGNhdGNoIChlKSB7fVxuXG5cdFx0XHRcdGlmICghY29udmVydGVyLndyaXRlKSB7XG5cdFx0XHRcdFx0dmFsdWUgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKHZhbHVlKSlcblx0XHRcdFx0XHRcdC5yZXBsYWNlKC8lKDIzfDI0fDI2fDJCfDNBfDNDfDNFfDNEfDJGfDNGfDQwfDVCfDVEfDVFfDYwfDdCfDdEfDdDKS9nLCBkZWNvZGVVUklDb21wb25lbnQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhbHVlID0gY29udmVydGVyLndyaXRlKHZhbHVlLCBrZXkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0a2V5ID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhrZXkpKTtcblx0XHRcdFx0a2V5ID0ga2V5LnJlcGxhY2UoLyUoMjN8MjR8MjZ8MkJ8NUV8NjB8N0MpL2csIGRlY29kZVVSSUNvbXBvbmVudCk7XG5cdFx0XHRcdGtleSA9IGtleS5yZXBsYWNlKC9bXFwoXFwpXS9nLCBlc2NhcGUpO1xuXG5cdFx0XHRcdHJldHVybiAoZG9jdW1lbnQuY29va2llID0gW1xuXHRcdFx0XHRcdGtleSwgJz0nLCB2YWx1ZSxcblx0XHRcdFx0XHRhdHRyaWJ1dGVzLmV4cGlyZXMgJiYgJzsgZXhwaXJlcz0nICsgYXR0cmlidXRlcy5leHBpcmVzLnRvVVRDU3RyaW5nKCksIC8vIHVzZSBleHBpcmVzIGF0dHJpYnV0ZSwgbWF4LWFnZSBpcyBub3Qgc3VwcG9ydGVkIGJ5IElFXG5cdFx0XHRcdFx0YXR0cmlidXRlcy5wYXRoICAgICYmICc7IHBhdGg9JyArIGF0dHJpYnV0ZXMucGF0aCxcblx0XHRcdFx0XHRhdHRyaWJ1dGVzLmRvbWFpbiAgJiYgJzsgZG9tYWluPScgKyBhdHRyaWJ1dGVzLmRvbWFpbixcblx0XHRcdFx0XHRhdHRyaWJ1dGVzLnNlY3VyZSA/ICc7IHNlY3VyZScgOiAnJ1xuXHRcdFx0XHRdLmpvaW4oJycpKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmVhZFxuXG5cdFx0XHRpZiAoIWtleSkge1xuXHRcdFx0XHRyZXN1bHQgPSB7fTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gVG8gcHJldmVudCB0aGUgZm9yIGxvb3AgaW4gdGhlIGZpcnN0IHBsYWNlIGFzc2lnbiBhbiBlbXB0eSBhcnJheVxuXHRcdFx0Ly8gaW4gY2FzZSB0aGVyZSBhcmUgbm8gY29va2llcyBhdCBhbGwuIEFsc28gcHJldmVudHMgb2RkIHJlc3VsdCB3aGVuXG5cdFx0XHQvLyBjYWxsaW5nIFwiZ2V0KClcIlxuXHRcdFx0dmFyIGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUgPyBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsgJykgOiBbXTtcblx0XHRcdHZhciByZGVjb2RlID0gLyglWzAtOUEtWl17Mn0pKy9nO1xuXHRcdFx0dmFyIGkgPSAwO1xuXG5cdFx0XHRmb3IgKDsgaSA8IGNvb2tpZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIHBhcnRzID0gY29va2llc1tpXS5zcGxpdCgnPScpO1xuXHRcdFx0XHR2YXIgY29va2llID0gcGFydHMuc2xpY2UoMSkuam9pbignPScpO1xuXG5cdFx0XHRcdGlmIChjb29raWUuY2hhckF0KDApID09PSAnXCInKSB7XG5cdFx0XHRcdFx0Y29va2llID0gY29va2llLnNsaWNlKDEsIC0xKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0dmFyIG5hbWUgPSBwYXJ0c1swXS5yZXBsYWNlKHJkZWNvZGUsIGRlY29kZVVSSUNvbXBvbmVudCk7XG5cdFx0XHRcdFx0Y29va2llID0gY29udmVydGVyLnJlYWQgP1xuXHRcdFx0XHRcdFx0Y29udmVydGVyLnJlYWQoY29va2llLCBuYW1lKSA6IGNvbnZlcnRlcihjb29raWUsIG5hbWUpIHx8XG5cdFx0XHRcdFx0XHRjb29raWUucmVwbGFjZShyZGVjb2RlLCBkZWNvZGVVUklDb21wb25lbnQpO1xuXG5cdFx0XHRcdFx0aWYgKHRoaXMuanNvbikge1xuXHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0Y29va2llID0gSlNPTi5wYXJzZShjb29raWUpO1xuXHRcdFx0XHRcdFx0fSBjYXRjaCAoZSkge31cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoa2V5ID09PSBuYW1lKSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSBjb29raWU7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoIWtleSkge1xuXHRcdFx0XHRcdFx0cmVzdWx0W25hbWVdID0gY29va2llO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBjYXRjaCAoZSkge31cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblx0XHRhcGkuc2V0ID0gYXBpO1xuXHRcdGFwaS5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRyZXR1cm4gYXBpKGtleSk7XG5cdFx0fTtcblx0XHRhcGkuZ2V0SlNPTiA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBhcGkuYXBwbHkoe1xuXHRcdFx0XHRqc29uOiB0cnVlXG5cdFx0XHR9LCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuXHRcdH07XG5cdFx0YXBpLmRlZmF1bHRzID0ge307XG5cblx0XHRhcGkucmVtb3ZlID0gZnVuY3Rpb24gKGtleSwgYXR0cmlidXRlcykge1xuXHRcdFx0YXBpKGtleSwgJycsIGV4dGVuZChhdHRyaWJ1dGVzLCB7XG5cdFx0XHRcdGV4cGlyZXM6IC0xXG5cdFx0XHR9KSk7XG5cdFx0fTtcblxuXHRcdGFwaS53aXRoQ29udmVydGVyID0gaW5pdDtcblxuXHRcdHJldHVybiBhcGk7XG5cdH1cblxuXHRyZXR1cm4gaW5pdChmdW5jdGlvbiAoKSB7fSk7XG59KSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9qcy1jb29raWUvc3JjL2pzLmNvb2tpZS5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=