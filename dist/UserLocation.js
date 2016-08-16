/*!
 * UserLocation v1.0.0
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmZTQ0NDQwNDdiMTEzZWJhYzBjNCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9qcy1jb29raWUvc3JjL2pzLmNvb2tpZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDdENBOzs7Ozs7OztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7S0FlcUIsWTtBQUNuQiwyQkFJUTtBQUFBOztBQUFBLHNFQUFKLEVBQUk7O0FBQUEsOEJBSE4sUUFHTTtBQUFBLFNBSE4sUUFHTSxpQ0FISyxNQUdMO0FBQUEsOEJBRk4sUUFFTTtBQUFBLFNBRk4sUUFFTSxpQ0FGSyxLQUVMO0FBQUEsaUNBRE4sV0FDTTtBQUFBLFNBRE4sV0FDTSxvQ0FEUSxTQUNSOztBQUFBOztBQUNOLFVBQUssVUFBTCxHQUFrQixhQUFsQjs7QUFFQSxVQUFLLE1BQUwsR0FBYztBQUNaLGlCQUFVLElBREU7QUFFWixrQkFBVyxJQUZDO0FBR1osaUJBQVUsSUFIRSxFQUFkOztBQU1BLFVBQUssR0FBTCxHQUFXLEVBQUUsa0JBQUYsRUFBWSxrQkFBWixFQUFzQix3QkFBdEIsRUFBWDs7QUFFQSxTQUFNLGVBQWUsS0FBSyxRQUFMLEVBQXJCO0FBQ0EsU0FBSSx3QkFBSjtBQUNBLFNB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Q0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsNEJBQTJCO0FBQzNCLEVBQUMiLCJmaWxlIjoiVXNlckxvY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiVXNlckxvY2F0aW9uXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlVzZXJMb2NhdGlvblwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZmU0NDQ0MDQ3YjExM2ViYWMwYzRcbiAqKi8iLCJpbXBvcnQgQ29va2llcyBmcm9tICdqcy1jb29raWUnO1xuXG4vKipcbiAqIFNpbXBsZSBsaWJyYXJ5IHRvIGdldCB0aGUgY3VycmVudCB1c2VyJ3MgbG9jYXRpb24sIHdpdGggYW5cbiAqIG9wdGlvbmFsIGZhbGxiYWNrIG1ldGhvZCBvZiBvYnRhaW5pbmcgdGhlaXIgY29vcmRpbmF0ZXMuXG4gKlxuICogQGNsYXNzIFVzZXJMb2NhdGlvblxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHQgLSBPcHRpb25hbCBjb25maWd1cmF0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdC5jYWNoZVR0bD02MDQ4MDBdIC0gQ2FjaGUgdGltZS10by1saXZlIGluIHNlY29uZHNcbiAqIEBwYXJhbSB7Ym9vbGVhbnxzdHJpbmd9IFtvcHQuZmFsbGJhY2s9ZmFsc2VdIC0gTWV0aG9kIG9mIG9idGFpbmluZyBjb29yZGluYXRlcyBpZiBpbml0aWFsIHRyeVxuICogZmFpbHMuIFBvc3NpYmxlIHZhbHVlczogZmFsc2UsICdnZW5lcmFsJywgb3IgJ2V4YWN0Jy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0LnNwZWNpZmljaXR5PSdnZW5lcmFsJ10gLSBJbml0aWFsIG1ldGhvZCBvZiBvYnRhaW5pbmcgY29vcmRpbmF0ZXMuIFBvc3NpYmxlXG4gKiB2YWx1ZXM6ICdnZW5lcmFsJyBvciAnZXhhY3QnLlxuICogQHJldHVybiB7UHJvbWlzZX0gLSBXaGVuIHJlc29sdmVkLCByZXR1cm5zIGEgY29vcmRpbmF0ZXMgb2JqZWN0XG4gKiB3aXRoIGxhdGl0dWRlLCBsb25naXR1ZGUsIGFuZCBhY2N1cmFjeS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckxvY2F0aW9uIHtcbiAgY29uc3RydWN0b3Ioe1xuICAgIGNhY2hlVHRsID0gNjA0ODAwLCAvLyA3IGRheXNcbiAgICBmYWxsYmFjayA9IGZhbHNlLCAvLyBJZiAnc3BlY2lmaWNpdHknIGZhaWxzXG4gICAgc3BlY2lmaWNpdHkgPSAnZ2VuZXJhbCcsXG4gIH0gPSB7fSkge1xuICAgIHRoaXMuY29va2llTmFtZSA9ICdfX3VsX2Nvb3Jkcyc7XG5cbiAgICB0aGlzLmNvb3JkcyA9IHtcbiAgICAgIGxhdGl0dWRlOiBudWxsLFxuICAgICAgbG9uZ2l0dWRlOiBudWxsLFxuICAgICAgYWNjdXJhY3k6IG51bGwsIC8vIGluIG1ldGVyc1xuICAgIH07XG5cbiAgICB0aGlzLm9wdCA9IHsgY2FjaGVUdGwsIGZhbGxiYWNrLCBzcGVjaWZpY2l0eSB9O1xuXG4gICAgY29uc3QgY2FjaGVkQ29vcmRzID0gdGhpcy5nZXRDYWNoZSgpO1xuICAgIGxldCBmYWxsYmFja1Byb21pc2U7XG4gICAgbGV0IG9yaWdpbmFsUHJvbWlzZTtcblxuICAgIGlmIChcbiAgICAgIGNhY2hlZENvb3JkcyAmJlxuICAgICAgY2FjaGVkQ29vcmRzLm9wdGlvbnMuZmFsbGJhY2sgPT09IHRoaXMub3B0LmZhbGxiYWNrICYmXG4gICAgICBjYWNoZWRDb29yZHMub3B0aW9ucy5zcGVjaWZpY2l0eSA9PT0gdGhpcy5vcHQuc3BlY2lmaWNpdHlcbiAgICApIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICB0aGlzLmNvb3JkcyA9IGNhY2hlZENvb3Jkcy5jb29yZHM7XG4gICAgICAgIHJlc29sdmUodGhpcy5jb29yZHMpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHNwZWNpZmljaXR5ID09PSAnZXhhY3QnKSB7XG4gICAgICBvcmlnaW5hbFByb21pc2UgPSB0aGlzLmdldEV4YWN0KCk7XG4gICAgfSBlbHNlIGlmIChzcGVjaWZpY2l0eSA9PT0gJ2dlbmVyYWwnKSB7XG4gICAgICBvcmlnaW5hbFByb21pc2UgPSB0aGlzLmdldEdlbmVyYWwoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvbmZpZ3VyYXRpb24gdmFsdWUgZm9yIGxvY2F0aW9uIHNwZWNpZmljaXR5LicpO1xuICAgIH1cblxuICAgIHJldHVybiBvcmlnaW5hbFByb21pc2VcbiAgICAgIC50aGVuKCgpID0+IG9yaWdpbmFsUHJvbWlzZSlcbiAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgIGlmIChmYWxsYmFjayA9PT0gJ2V4YWN0Jykge1xuICAgICAgICAgIGZhbGxiYWNrUHJvbWlzZSA9IHRoaXMuZ2V0RXhhY3QoKTtcbiAgICAgICAgfSBlbHNlIGlmIChmYWxsYmFjayA9PT0gJ2dlbmVyYWwnKSB7XG4gICAgICAgICAgZmFsbGJhY2tQcm9taXNlID0gdGhpcy5nZXRHZW5lcmFsKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmFsbGJhY2tQcm9taXNlID0gb3JpZ2luYWxQcm9taXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbGxiYWNrUHJvbWlzZTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjb29yZGluYXRlcyBzdG9yZWQgaW4gYSBjb29raWUuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEByZXR1cm4ge29iamVjdH0gQ29vcmRpbmF0ZXNcbiAgICovXG4gIGdldENhY2hlKCkge1xuICAgIHJldHVybiBDb29raWVzLmdldEpTT04odGhpcy5jb29raWVOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgbG9jYXRpb24gdXNpbmcgYnJvd3NlcidzIG5hdGl2ZSBnZW9sb2NhdGlvbiBBUEkuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IC0gbmF2aWdhdG9yLmdlb2xvY2F0aW9uIHdyYXBwZWQgaW4gYSBQcm9taXNlXG4gICAqL1xuICBnZXRFeGFjdCgpIHtcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihcbiAgICAgICAgKHBvcykgPT4ge1xuICAgICAgICAgIHRoaXMuY29vcmRzLmxhdGl0dWRlID0gcG9zLmNvb3Jkcy5sYXRpdHVkZTtcbiAgICAgICAgICB0aGlzLmNvb3Jkcy5sb25naXR1ZGUgPSBwb3MuY29vcmRzLmxvbmdpdHVkZTtcbiAgICAgICAgICB0aGlzLmNvb3Jkcy5hY2N1cmFjeSA9IHBvcy5jb29yZHMuYWNjdXJhY3k7XG4gICAgICAgICAgdGhpcy5zZXRDYWNoZSh0aGlzLmNvb3Jkcyk7XG4gICAgICAgICAgcmVzb2x2ZSh0aGlzLmNvb3Jkcyk7XG4gICAgICAgIH0sXG4gICAgICAgIChlcnIpID0+IHtcbiAgICAgICAgICByZWplY3QoYCR7ZXJyLm1lc3NhZ2V9IChlcnJvciBjb2RlOiAke2Vyci5jb2RlfSlgKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBsb2NhdGlvbiB1c2luZyBOZWt1ZG8ncyBJUCBhZGRyZXNzIGxvb2t1cCBzZXJ2aWNlXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IC0gUHJvbWlzZSB3cmFwcGVkIGFyb3VuZCBGZXRjaCByZXNwb25zZVxuICAgKi9cbiAgZ2V0R2VuZXJhbCgpIHtcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZmV0Y2goJ2h0dHBzOi8vZ2VvaXAubmVrdWRvLmNvbS9hcGkvJywge30pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgcmVzcG9uc2UuanNvbigpXG4gICAgICAgICAgICAgIC50aGVuKChqc29uKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGpzb24udHlwZSA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICAgICAgcmVqZWN0KGpzb24ubXNnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgLy8gQ29udmVydCBNYXhtaW5kJ3MgYWNjdXJhY3kgaW4ga2lsb21ldGVycyB0byB0aGlzIGxpYidzIHN0YW5kYXJkIGluIG1ldGVyc1xuICAgICAgICAgICAgICAgICAgdGhpcy5jb29yZHMuYWNjdXJhY3kgPSBqc29uLmxvY2F0aW9uLmFjY3VyYWN5X3JhZGl1cyAqIDEwMDA7XG4gICAgICAgICAgICAgICAgICB0aGlzLmNvb3Jkcy5sYXRpdHVkZSA9IGpzb24ubG9jYXRpb24ubGF0aXR1ZGU7XG4gICAgICAgICAgICAgICAgICB0aGlzLmNvb3Jkcy5sb25naXR1ZGUgPSBqc29uLmxvY2F0aW9uLmxvbmdpdHVkZTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q2FjaGUodGhpcy5jb29yZHMpO1xuICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmNvb3Jkcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QocmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnIubWVzc2FnZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICAvKipcbiAgICogU2F2ZSBjb29yZGluYXRlcyB0byBhIGNvb2tpZS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtvYmplY3R9IGNvb3JkcyAtIENvb3JkaW5hdGVzIG9iamVjdFxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgc2V0Q2FjaGUoY29vcmRzKSB7XG4gICAgQ29va2llcy5zZXQoXG4gICAgICB0aGlzLmNvb2tpZU5hbWUsXG4gICAgICB7XG4gICAgICAgIGNvb3JkcyxcbiAgICAgICAgb3B0aW9uczogdGhpcy5vcHQsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBleHBpcmVzOiB0aGlzLm9wdC5jYWNoZVR0bCAvIDI0IC8gNjAgLyA2MCwgLy8gQ29udmVydCB0byBkYXlzLCBhcyByZXF1aXJlZCBieSBDb29raWVzXG4gICAgICB9XG4gICAgKTtcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCIvKiFcbiAqIEphdmFTY3JpcHQgQ29va2llIHYyLjEuMlxuICogaHR0cHM6Ly9naXRodWIuY29tL2pzLWNvb2tpZS9qcy1jb29raWVcbiAqXG4gKiBDb3B5cmlnaHQgMjAwNiwgMjAxNSBLbGF1cyBIYXJ0bCAmIEZhZ25lciBCcmFja1xuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbjsoZnVuY3Rpb24gKGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXHRcdGRlZmluZShmYWN0b3J5KTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgT2xkQ29va2llcyA9IHdpbmRvdy5Db29raWVzO1xuXHRcdHZhciBhcGkgPSB3aW5kb3cuQ29va2llcyA9IGZhY3RvcnkoKTtcblx0XHRhcGkubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHdpbmRvdy5Db29raWVzID0gT2xkQ29va2llcztcblx0XHRcdHJldHVybiBhcGk7XG5cdFx0fTtcblx0fVxufShmdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIGV4dGVuZCAoKSB7XG5cdFx0dmFyIGkgPSAwO1xuXHRcdHZhciByZXN1bHQgPSB7fTtcblx0XHRmb3IgKDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGF0dHJpYnV0ZXMgPSBhcmd1bWVudHNbIGkgXTtcblx0XHRcdGZvciAodmFyIGtleSBpbiBhdHRyaWJ1dGVzKSB7XG5cdFx0XHRcdHJlc3VsdFtrZXldID0gYXR0cmlidXRlc1trZXldO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0ZnVuY3Rpb24gaW5pdCAoY29udmVydGVyKSB7XG5cdFx0ZnVuY3Rpb24gYXBpIChrZXksIHZhbHVlLCBhdHRyaWJ1dGVzKSB7XG5cdFx0XHR2YXIgcmVzdWx0O1xuXHRcdFx0aWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBXcml0ZVxuXG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcblx0XHRcdFx0YXR0cmlidXRlcyA9IGV4dGVuZCh7XG5cdFx0XHRcdFx0cGF0aDogJy8nXG5cdFx0XHRcdH0sIGFwaS5kZWZhdWx0cywgYXR0cmlidXRlcyk7XG5cblx0XHRcdFx0aWYgKHR5cGVvZiBhdHRyaWJ1dGVzLmV4cGlyZXMgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdFx0dmFyIGV4cGlyZXMgPSBuZXcgRGF0ZSgpO1xuXHRcdFx0XHRcdGV4cGlyZXMuc2V0TWlsbGlzZWNvbmRzKGV4cGlyZXMuZ2V0TWlsbGlzZWNvbmRzKCkgKyBhdHRyaWJ1dGVzLmV4cGlyZXMgKiA4NjRlKzUpO1xuXHRcdFx0XHRcdGF0dHJpYnV0ZXMuZXhwaXJlcyA9IGV4cGlyZXM7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHJlc3VsdCA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcblx0XHRcdFx0XHRpZiAoL15bXFx7XFxbXS8udGVzdChyZXN1bHQpKSB7XG5cdFx0XHRcdFx0XHR2YWx1ZSA9IHJlc3VsdDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHt9XG5cblx0XHRcdFx0aWYgKCFjb252ZXJ0ZXIud3JpdGUpIHtcblx0XHRcdFx0XHR2YWx1ZSA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcodmFsdWUpKVxuXHRcdFx0XHRcdFx0LnJlcGxhY2UoLyUoMjN8MjR8MjZ8MkJ8M0F8M0N8M0V8M0R8MkZ8M0Z8NDB8NUJ8NUR8NUV8NjB8N0J8N0R8N0MpL2csIGRlY29kZVVSSUNvbXBvbmVudCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFsdWUgPSBjb252ZXJ0ZXIud3JpdGUodmFsdWUsIGtleSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRrZXkgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGtleSkpO1xuXHRcdFx0XHRrZXkgPSBrZXkucmVwbGFjZSgvJSgyM3wyNHwyNnwyQnw1RXw2MHw3QykvZywgZGVjb2RlVVJJQ29tcG9uZW50KTtcblx0XHRcdFx0a2V5ID0ga2V5LnJlcGxhY2UoL1tcXChcXCldL2csIGVzY2FwZSk7XG5cblx0XHRcdFx0cmV0dXJuIChkb2N1bWVudC5jb29raWUgPSBbXG5cdFx0XHRcdFx0a2V5LCAnPScsIHZhbHVlLFxuXHRcdFx0XHRcdGF0dHJpYnV0ZXMuZXhwaXJlcyAmJiAnOyBleHBpcmVzPScgKyBhdHRyaWJ1dGVzLmV4cGlyZXMudG9VVENTdHJpbmcoKSwgLy8gdXNlIGV4cGlyZXMgYXR0cmlidXRlLCBtYXgtYWdlIGlzIG5vdCBzdXBwb3J0ZWQgYnkgSUVcblx0XHRcdFx0XHRhdHRyaWJ1dGVzLnBhdGggICAgJiYgJzsgcGF0aD0nICsgYXR0cmlidXRlcy5wYXRoLFxuXHRcdFx0XHRcdGF0dHJpYnV0ZXMuZG9tYWluICAmJiAnOyBkb21haW49JyArIGF0dHJpYnV0ZXMuZG9tYWluLFxuXHRcdFx0XHRcdGF0dHJpYnV0ZXMuc2VjdXJlID8gJzsgc2VjdXJlJyA6ICcnXG5cdFx0XHRcdF0uam9pbignJykpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZWFkXG5cblx0XHRcdGlmICgha2V5KSB7XG5cdFx0XHRcdHJlc3VsdCA9IHt9O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBUbyBwcmV2ZW50IHRoZSBmb3IgbG9vcCBpbiB0aGUgZmlyc3QgcGxhY2UgYXNzaWduIGFuIGVtcHR5IGFycmF5XG5cdFx0XHQvLyBpbiBjYXNlIHRoZXJlIGFyZSBubyBjb29raWVzIGF0IGFsbC4gQWxzbyBwcmV2ZW50cyBvZGQgcmVzdWx0IHdoZW5cblx0XHRcdC8vIGNhbGxpbmcgXCJnZXQoKVwiXG5cdFx0XHR2YXIgY29va2llcyA9IGRvY3VtZW50LmNvb2tpZSA/IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOyAnKSA6IFtdO1xuXHRcdFx0dmFyIHJkZWNvZGUgPSAvKCVbMC05QS1aXXsyfSkrL2c7XG5cdFx0XHR2YXIgaSA9IDA7XG5cblx0XHRcdGZvciAoOyBpIDwgY29va2llcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgcGFydHMgPSBjb29raWVzW2ldLnNwbGl0KCc9Jyk7XG5cdFx0XHRcdHZhciBjb29raWUgPSBwYXJ0cy5zbGljZSgxKS5qb2luKCc9Jyk7XG5cblx0XHRcdFx0aWYgKGNvb2tpZS5jaGFyQXQoMCkgPT09ICdcIicpIHtcblx0XHRcdFx0XHRjb29raWUgPSBjb29raWUuc2xpY2UoMSwgLTEpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHR2YXIgbmFtZSA9IHBhcnRzWzBdLnJlcGxhY2UocmRlY29kZSwgZGVjb2RlVVJJQ29tcG9uZW50KTtcblx0XHRcdFx0XHRjb29raWUgPSBjb252ZXJ0ZXIucmVhZCA/XG5cdFx0XHRcdFx0XHRjb252ZXJ0ZXIucmVhZChjb29raWUsIG5hbWUpIDogY29udmVydGVyKGNvb2tpZSwgbmFtZSkgfHxcblx0XHRcdFx0XHRcdGNvb2tpZS5yZXBsYWNlKHJkZWNvZGUsIGRlY29kZVVSSUNvbXBvbmVudCk7XG5cblx0XHRcdFx0XHRpZiAodGhpcy5qc29uKSB7XG5cdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRjb29raWUgPSBKU09OLnBhcnNlKGNvb2tpZSk7XG5cdFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChrZXkgPT09IG5hbWUpIHtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IGNvb2tpZTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICgha2V5KSB7XG5cdFx0XHRcdFx0XHRyZXN1bHRbbmFtZV0gPSBjb29raWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGNhdGNoIChlKSB7fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXHRcdGFwaS5zZXQgPSBhcGk7XG5cdFx0YXBpLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdHJldHVybiBhcGkoa2V5KTtcblx0XHR9O1xuXHRcdGFwaS5nZXRKU09OID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGFwaS5hcHBseSh7XG5cdFx0XHRcdGpzb246IHRydWVcblx0XHRcdH0sIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG5cdFx0fTtcblx0XHRhcGkuZGVmYXVsdHMgPSB7fTtcblxuXHRcdGFwaS5yZW1vdmUgPSBmdW5jdGlvbiAoa2V5LCBhdHRyaWJ1dGVzKSB7XG5cdFx0XHRhcGkoa2V5LCAnJywgZXh0ZW5kKGF0dHJpYnV0ZXMsIHtcblx0XHRcdFx0ZXhwaXJlczogLTFcblx0XHRcdH0pKTtcblx0XHR9O1xuXG5cdFx0YXBpLndpdGhDb252ZXJ0ZXIgPSBpbml0O1xuXG5cdFx0cmV0dXJuIGFwaTtcblx0fVxuXG5cdHJldHVybiBpbml0KGZ1bmN0aW9uICgpIHt9KTtcbn0pKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2pzLWNvb2tpZS9zcmMvanMuY29va2llLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==