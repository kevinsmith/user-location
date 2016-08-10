/*!
 * UserLocation v0.0.1
 * Simple library to provide the current user's location, with an optional fallback method of obtaining their coordinates.
 * 
 * https://developers.geocarrot.com
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
	 * Simple library to provide the current user's location, with
	 * an optional fallback method of obtaining their coordinates.
	 *
	 * @class UserLocation
	 *
	 * @param {object} opt - Optional configuration
	 * @param {number} [opt.cacheTtl=604800] - Cache time-to-live in seconds
	 * @param {boolean|string} [opt.fallback=false] - Method of obtaining coordinates if initial try
	 * fails. Possible values: false, 'general', or 'exact'.
	 * @param {string} [opt.specificity='general'] - Initial method of obtaining coordinates. Possible
	 * values: 'general' or 'exact'.
	 * @returns {Promise} - When resolved, returns a coordinates object
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
	   * Get coordinates stored in a cookie.
	   *
	   * @private
	   * @return {object} Coordinates
	   */
	
	
	  _createClass(UserLocation, [{
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkMzlmNDI0ODc1NGI0M2QwZWZlZiIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9qcy1jb29raWUvc3JjL2pzLmNvb2tpZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDdENBOzs7Ozs7OztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7S0FlcUIsWTtBQUNuQiwyQkFJUTtBQUFBOztBQUFBLHNFQUFKLEVBQUk7O0FBQUEsOEJBSE4sUUFHTTtBQUFBLFNBSE4sUUFHTSxpQ0FISyxNQUdMO0FBQUEsOEJBRk4sUUFFTTtBQUFBLFNBRk4sUUFFTSxpQ0FGSyxLQUVMO0FBQUEsaUNBRE4sV0FDTTtBQUFBLFNBRE4sV0FDTSxvQ0FEUSxTQUNSOztBQUFBOztBQUNOLFVBQUssVUFBTCxHQUFrQixhQUFsQjs7QUFFQSxVQUFLLE1BQUwsR0FBYztBQUNaLGlCQUFVLElBREU7QUFFWixrQkFBVyxJQUZDO0FBR1osaUJBQVUsSUFIRSxFQUFkOztBQU1BLFVBQUssR0FBTCxHQUFXLEVBQUUsa0JBQUYsRUFBWSxrQkFBWixFQUFzQix3QkFBdEIsRUFBWDs7QUFFQSxTQUFNLGVBQWUsS0FBSyxRQUFMLEVBQXJCO0FBQ0EsU0FBSSx3QkFBSjtBQUNBLFNB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Q0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsNEJBQTJCO0FBQzNCLEVBQUMiLCJmaWxlIjoiVXNlckxvY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiVXNlckxvY2F0aW9uXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlVzZXJMb2NhdGlvblwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZDM5ZjQyNDg3NTRiNDNkMGVmZWZcbiAqKi8iLCJpbXBvcnQgQ29va2llcyBmcm9tICdqcy1jb29raWUnO1xuXG4vKipcbiAqIFNpbXBsZSBsaWJyYXJ5IHRvIHByb3ZpZGUgdGhlIGN1cnJlbnQgdXNlcidzIGxvY2F0aW9uLCB3aXRoXG4gKiBhbiBvcHRpb25hbCBmYWxsYmFjayBtZXRob2Qgb2Ygb2J0YWluaW5nIHRoZWlyIGNvb3JkaW5hdGVzLlxuICpcbiAqIEBjbGFzcyBVc2VyTG9jYXRpb25cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0IC0gT3B0aW9uYWwgY29uZmlndXJhdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHQuY2FjaGVUdGw9NjA0ODAwXSAtIENhY2hlIHRpbWUtdG8tbGl2ZSBpbiBzZWNvbmRzXG4gKiBAcGFyYW0ge2Jvb2xlYW58c3RyaW5nfSBbb3B0LmZhbGxiYWNrPWZhbHNlXSAtIE1ldGhvZCBvZiBvYnRhaW5pbmcgY29vcmRpbmF0ZXMgaWYgaW5pdGlhbCB0cnlcbiAqIGZhaWxzLiBQb3NzaWJsZSB2YWx1ZXM6IGZhbHNlLCAnZ2VuZXJhbCcsIG9yICdleGFjdCcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdC5zcGVjaWZpY2l0eT0nZ2VuZXJhbCddIC0gSW5pdGlhbCBtZXRob2Qgb2Ygb2J0YWluaW5nIGNvb3JkaW5hdGVzLiBQb3NzaWJsZVxuICogdmFsdWVzOiAnZ2VuZXJhbCcgb3IgJ2V4YWN0Jy5cbiAqIEByZXR1cm5zIHtQcm9taXNlfSAtIFdoZW4gcmVzb2x2ZWQsIHJldHVybnMgYSBjb29yZGluYXRlcyBvYmplY3RcbiAqIHdpdGggbGF0aXR1ZGUsIGxvbmdpdHVkZSwgYW5kIGFjY3VyYWN5LlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyTG9jYXRpb24ge1xuICBjb25zdHJ1Y3Rvcih7XG4gICAgY2FjaGVUdGwgPSA2MDQ4MDAsIC8vIDcgZGF5c1xuICAgIGZhbGxiYWNrID0gZmFsc2UsIC8vIElmICdzcGVjaWZpY2l0eScgZmFpbHNcbiAgICBzcGVjaWZpY2l0eSA9ICdnZW5lcmFsJyxcbiAgfSA9IHt9KSB7XG4gICAgdGhpcy5jb29raWVOYW1lID0gJ19fdWxfY29vcmRzJztcblxuICAgIHRoaXMuY29vcmRzID0ge1xuICAgICAgbGF0aXR1ZGU6IG51bGwsXG4gICAgICBsb25naXR1ZGU6IG51bGwsXG4gICAgICBhY2N1cmFjeTogbnVsbCwgLy8gaW4gbWV0ZXJzXG4gICAgfTtcblxuICAgIHRoaXMub3B0ID0geyBjYWNoZVR0bCwgZmFsbGJhY2ssIHNwZWNpZmljaXR5IH07XG5cbiAgICBjb25zdCBjYWNoZWRDb29yZHMgPSB0aGlzLmdldENhY2hlKCk7XG4gICAgbGV0IGZhbGxiYWNrUHJvbWlzZTtcbiAgICBsZXQgb3JpZ2luYWxQcm9taXNlO1xuXG4gICAgaWYgKFxuICAgICAgY2FjaGVkQ29vcmRzICYmXG4gICAgICBjYWNoZWRDb29yZHMub3B0aW9ucy5mYWxsYmFjayA9PT0gdGhpcy5vcHQuZmFsbGJhY2sgJiZcbiAgICAgIGNhY2hlZENvb3Jkcy5vcHRpb25zLnNwZWNpZmljaXR5ID09PSB0aGlzLm9wdC5zcGVjaWZpY2l0eVxuICAgICkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIHRoaXMuY29vcmRzID0gY2FjaGVkQ29vcmRzLmNvb3JkcztcbiAgICAgICAgcmVzb2x2ZSh0aGlzLmNvb3Jkcyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoc3BlY2lmaWNpdHkgPT09ICdleGFjdCcpIHtcbiAgICAgIG9yaWdpbmFsUHJvbWlzZSA9IHRoaXMuZ2V0RXhhY3QoKTtcbiAgICB9IGVsc2UgaWYgKHNwZWNpZmljaXR5ID09PSAnZ2VuZXJhbCcpIHtcbiAgICAgIG9yaWdpbmFsUHJvbWlzZSA9IHRoaXMuZ2V0R2VuZXJhbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29uZmlndXJhdGlvbiB2YWx1ZSBmb3IgbG9jYXRpb24gc3BlY2lmaWNpdHkuJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9yaWdpbmFsUHJvbWlzZVxuICAgICAgLnRoZW4oKCkgPT4gb3JpZ2luYWxQcm9taXNlKVxuICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgaWYgKGZhbGxiYWNrID09PSAnZXhhY3QnKSB7XG4gICAgICAgICAgZmFsbGJhY2tQcm9taXNlID0gdGhpcy5nZXRFeGFjdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGZhbGxiYWNrID09PSAnZ2VuZXJhbCcpIHtcbiAgICAgICAgICBmYWxsYmFja1Byb21pc2UgPSB0aGlzLmdldEdlbmVyYWwoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmYWxsYmFja1Byb21pc2UgPSBvcmlnaW5hbFByb21pc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsbGJhY2tQcm9taXNlO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGNvb3JkaW5hdGVzIHN0b3JlZCBpbiBhIGNvb2tpZS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybiB7b2JqZWN0fSBDb29yZGluYXRlc1xuICAgKi9cbiAgZ2V0Q2FjaGUoKSB7XG4gICAgcmV0dXJuIENvb2tpZXMuZ2V0SlNPTih0aGlzLmNvb2tpZU5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBsb2NhdGlvbiB1c2luZyBicm93c2VyJ3MgbmF0aXZlIGdlb2xvY2F0aW9uIEFQSS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybiB7UHJvbWlzZX0gLSBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24gd3JhcHBlZCBpbiBhIFByb21pc2VcbiAgICovXG4gIGdldEV4YWN0KCkge1xuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKFxuICAgICAgICAocG9zKSA9PiB7XG4gICAgICAgICAgdGhpcy5jb29yZHMubGF0aXR1ZGUgPSBwb3MuY29vcmRzLmxhdGl0dWRlO1xuICAgICAgICAgIHRoaXMuY29vcmRzLmxvbmdpdHVkZSA9IHBvcy5jb29yZHMubG9uZ2l0dWRlO1xuICAgICAgICAgIHRoaXMuY29vcmRzLmFjY3VyYWN5ID0gcG9zLmNvb3Jkcy5hY2N1cmFjeTtcbiAgICAgICAgICB0aGlzLnNldENhY2hlKHRoaXMuY29vcmRzKTtcbiAgICAgICAgICByZXNvbHZlKHRoaXMuY29vcmRzKTtcbiAgICAgICAgfSxcbiAgICAgICAgKGVycikgPT4ge1xuICAgICAgICAgIHJlamVjdChgJHtlcnIubWVzc2FnZX0gKGVycm9yIGNvZGU6ICR7ZXJyLmNvZGV9KWApO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGxvY2F0aW9uIHVzaW5nIE5la3VkbydzIElQIGFkZHJlc3MgbG9va3VwIHNlcnZpY2VcbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybiB7UHJvbWlzZX0gLSBQcm9taXNlIHdyYXBwZWQgYXJvdW5kIEZldGNoIHJlc3BvbnNlXG4gICAqL1xuICBnZXRHZW5lcmFsKCkge1xuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBmZXRjaCgnaHR0cHM6Ly9nZW9pcC5uZWt1ZG8uY29tL2FwaS8nLCB7fSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICByZXNwb25zZS5qc29uKClcbiAgICAgICAgICAgICAgLnRoZW4oKGpzb24pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoanNvbi50eXBlID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgICAgICByZWplY3QoanNvbi5tc2cpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAvLyBDb252ZXJ0IE1heG1pbmQncyBhY2N1cmFjeSBpbiBraWxvbWV0ZXJzIHRvIHRoaXMgbGliJ3Mgc3RhbmRhcmQgaW4gbWV0ZXJzXG4gICAgICAgICAgICAgICAgICB0aGlzLmNvb3Jkcy5hY2N1cmFjeSA9IGpzb24ubG9jYXRpb24uYWNjdXJhY3lfcmFkaXVzICogMTAwMDtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY29vcmRzLmxhdGl0dWRlID0ganNvbi5sb2NhdGlvbi5sYXRpdHVkZTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY29vcmRzLmxvbmdpdHVkZSA9IGpzb24ubG9jYXRpb24ubG9uZ2l0dWRlO1xuICAgICAgICAgICAgICAgICAgdGhpcy5zZXRDYWNoZSh0aGlzLmNvb3Jkcyk7XG4gICAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuY29vcmRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChyZXNwb25zZS5zdGF0dXNUZXh0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVyci5tZXNzYWdlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYXZlIGNvb3JkaW5hdGVzIHRvIGEgY29va2llLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge29iamVjdH0gY29vcmRzIC0gQ29vcmRpbmF0ZXMgb2JqZWN0XG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBzZXRDYWNoZShjb29yZHMpIHtcbiAgICBDb29raWVzLnNldChcbiAgICAgIHRoaXMuY29va2llTmFtZSxcbiAgICAgIHtcbiAgICAgICAgY29vcmRzLFxuICAgICAgICBvcHRpb25zOiB0aGlzLm9wdCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGV4cGlyZXM6IHRoaXMub3B0LmNhY2hlVHRsIC8gMjQgLyA2MCAvIDYwLCAvLyBDb252ZXJ0IHRvIGRheXMsIGFzIHJlcXVpcmVkIGJ5IENvb2tpZXNcbiAgICAgIH1cbiAgICApO1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqLyIsIi8qIVxuICogSmF2YVNjcmlwdCBDb29raWUgdjIuMS4yXG4gKiBodHRwczovL2dpdGh1Yi5jb20vanMtY29va2llL2pzLWNvb2tpZVxuICpcbiAqIENvcHlyaWdodCAyMDA2LCAyMDE1IEtsYXVzIEhhcnRsICYgRmFnbmVyIEJyYWNrXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuOyhmdW5jdGlvbiAoZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKGZhY3RvcnkpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBPbGRDb29raWVzID0gd2luZG93LkNvb2tpZXM7XG5cdFx0dmFyIGFwaSA9IHdpbmRvdy5Db29raWVzID0gZmFjdG9yeSgpO1xuXHRcdGFwaS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0d2luZG93LkNvb2tpZXMgPSBPbGRDb29raWVzO1xuXHRcdFx0cmV0dXJuIGFwaTtcblx0XHR9O1xuXHR9XG59KGZ1bmN0aW9uICgpIHtcblx0ZnVuY3Rpb24gZXh0ZW5kICgpIHtcblx0XHR2YXIgaSA9IDA7XG5cdFx0dmFyIHJlc3VsdCA9IHt9O1xuXHRcdGZvciAoOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXR0cmlidXRlcyA9IGFyZ3VtZW50c1sgaSBdO1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIGF0dHJpYnV0ZXMpIHtcblx0XHRcdFx0cmVzdWx0W2tleV0gPSBhdHRyaWJ1dGVzW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRmdW5jdGlvbiBpbml0IChjb252ZXJ0ZXIpIHtcblx0XHRmdW5jdGlvbiBhcGkgKGtleSwgdmFsdWUsIGF0dHJpYnV0ZXMpIHtcblx0XHRcdHZhciByZXN1bHQ7XG5cdFx0XHRpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIFdyaXRlXG5cblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRhdHRyaWJ1dGVzID0gZXh0ZW5kKHtcblx0XHRcdFx0XHRwYXRoOiAnLydcblx0XHRcdFx0fSwgYXBpLmRlZmF1bHRzLCBhdHRyaWJ1dGVzKTtcblxuXHRcdFx0XHRpZiAodHlwZW9mIGF0dHJpYnV0ZXMuZXhwaXJlcyA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0XHR2YXIgZXhwaXJlcyA9IG5ldyBEYXRlKCk7XG5cdFx0XHRcdFx0ZXhwaXJlcy5zZXRNaWxsaXNlY29uZHMoZXhwaXJlcy5nZXRNaWxsaXNlY29uZHMoKSArIGF0dHJpYnV0ZXMuZXhwaXJlcyAqIDg2NGUrNSk7XG5cdFx0XHRcdFx0YXR0cmlidXRlcy5leHBpcmVzID0gZXhwaXJlcztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0cmVzdWx0ID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuXHRcdFx0XHRcdGlmICgvXltcXHtcXFtdLy50ZXN0KHJlc3VsdCkpIHtcblx0XHRcdFx0XHRcdHZhbHVlID0gcmVzdWx0O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBjYXRjaCAoZSkge31cblxuXHRcdFx0XHRpZiAoIWNvbnZlcnRlci53cml0ZSkge1xuXHRcdFx0XHRcdHZhbHVlID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyh2YWx1ZSkpXG5cdFx0XHRcdFx0XHQucmVwbGFjZSgvJSgyM3wyNHwyNnwyQnwzQXwzQ3wzRXwzRHwyRnwzRnw0MHw1Qnw1RHw1RXw2MHw3Qnw3RHw3QykvZywgZGVjb2RlVVJJQ29tcG9uZW50KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YWx1ZSA9IGNvbnZlcnRlci53cml0ZSh2YWx1ZSwga2V5KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGtleSA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoa2V5KSk7XG5cdFx0XHRcdGtleSA9IGtleS5yZXBsYWNlKC8lKDIzfDI0fDI2fDJCfDVFfDYwfDdDKS9nLCBkZWNvZGVVUklDb21wb25lbnQpO1xuXHRcdFx0XHRrZXkgPSBrZXkucmVwbGFjZSgvW1xcKFxcKV0vZywgZXNjYXBlKTtcblxuXHRcdFx0XHRyZXR1cm4gKGRvY3VtZW50LmNvb2tpZSA9IFtcblx0XHRcdFx0XHRrZXksICc9JywgdmFsdWUsXG5cdFx0XHRcdFx0YXR0cmlidXRlcy5leHBpcmVzICYmICc7IGV4cGlyZXM9JyArIGF0dHJpYnV0ZXMuZXhwaXJlcy50b1VUQ1N0cmluZygpLCAvLyB1c2UgZXhwaXJlcyBhdHRyaWJ1dGUsIG1heC1hZ2UgaXMgbm90IHN1cHBvcnRlZCBieSBJRVxuXHRcdFx0XHRcdGF0dHJpYnV0ZXMucGF0aCAgICAmJiAnOyBwYXRoPScgKyBhdHRyaWJ1dGVzLnBhdGgsXG5cdFx0XHRcdFx0YXR0cmlidXRlcy5kb21haW4gICYmICc7IGRvbWFpbj0nICsgYXR0cmlidXRlcy5kb21haW4sXG5cdFx0XHRcdFx0YXR0cmlidXRlcy5zZWN1cmUgPyAnOyBzZWN1cmUnIDogJydcblx0XHRcdFx0XS5qb2luKCcnKSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJlYWRcblxuXHRcdFx0aWYgKCFrZXkpIHtcblx0XHRcdFx0cmVzdWx0ID0ge307XG5cdFx0XHR9XG5cblx0XHRcdC8vIFRvIHByZXZlbnQgdGhlIGZvciBsb29wIGluIHRoZSBmaXJzdCBwbGFjZSBhc3NpZ24gYW4gZW1wdHkgYXJyYXlcblx0XHRcdC8vIGluIGNhc2UgdGhlcmUgYXJlIG5vIGNvb2tpZXMgYXQgYWxsLiBBbHNvIHByZXZlbnRzIG9kZCByZXN1bHQgd2hlblxuXHRcdFx0Ly8gY2FsbGluZyBcImdldCgpXCJcblx0XHRcdHZhciBjb29raWVzID0gZG9jdW1lbnQuY29va2llID8gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7ICcpIDogW107XG5cdFx0XHR2YXIgcmRlY29kZSA9IC8oJVswLTlBLVpdezJ9KSsvZztcblx0XHRcdHZhciBpID0gMDtcblxuXHRcdFx0Zm9yICg7IGkgPCBjb29raWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHZhciBwYXJ0cyA9IGNvb2tpZXNbaV0uc3BsaXQoJz0nKTtcblx0XHRcdFx0dmFyIGNvb2tpZSA9IHBhcnRzLnNsaWNlKDEpLmpvaW4oJz0nKTtcblxuXHRcdFx0XHRpZiAoY29va2llLmNoYXJBdCgwKSA9PT0gJ1wiJykge1xuXHRcdFx0XHRcdGNvb2tpZSA9IGNvb2tpZS5zbGljZSgxLCAtMSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHZhciBuYW1lID0gcGFydHNbMF0ucmVwbGFjZShyZGVjb2RlLCBkZWNvZGVVUklDb21wb25lbnQpO1xuXHRcdFx0XHRcdGNvb2tpZSA9IGNvbnZlcnRlci5yZWFkID9cblx0XHRcdFx0XHRcdGNvbnZlcnRlci5yZWFkKGNvb2tpZSwgbmFtZSkgOiBjb252ZXJ0ZXIoY29va2llLCBuYW1lKSB8fFxuXHRcdFx0XHRcdFx0Y29va2llLnJlcGxhY2UocmRlY29kZSwgZGVjb2RlVVJJQ29tcG9uZW50KTtcblxuXHRcdFx0XHRcdGlmICh0aGlzLmpzb24pIHtcblx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdGNvb2tpZSA9IEpTT04ucGFyc2UoY29va2llKTtcblx0XHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHt9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKGtleSA9PT0gbmFtZSkge1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gY29va2llO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKCFrZXkpIHtcblx0XHRcdFx0XHRcdHJlc3VsdFtuYW1lXSA9IGNvb2tpZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHt9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdFx0YXBpLnNldCA9IGFwaTtcblx0XHRhcGkuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0cmV0dXJuIGFwaShrZXkpO1xuXHRcdH07XG5cdFx0YXBpLmdldEpTT04gPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gYXBpLmFwcGx5KHtcblx0XHRcdFx0anNvbjogdHJ1ZVxuXHRcdFx0fSwgW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcblx0XHR9O1xuXHRcdGFwaS5kZWZhdWx0cyA9IHt9O1xuXG5cdFx0YXBpLnJlbW92ZSA9IGZ1bmN0aW9uIChrZXksIGF0dHJpYnV0ZXMpIHtcblx0XHRcdGFwaShrZXksICcnLCBleHRlbmQoYXR0cmlidXRlcywge1xuXHRcdFx0XHRleHBpcmVzOiAtMVxuXHRcdFx0fSkpO1xuXHRcdH07XG5cblx0XHRhcGkud2l0aENvbnZlcnRlciA9IGluaXQ7XG5cblx0XHRyZXR1cm4gYXBpO1xuXHR9XG5cblx0cmV0dXJuIGluaXQoZnVuY3Rpb24gKCkge30pO1xufSkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vanMtY29va2llL3NyYy9qcy5jb29raWUuanNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9