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
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Simple library to provide the current user's location, with
	 * an optional fallback method of obtaining their coordinates.
	 *
	 * @class UserLocation
	 *
	 * @param {Object} opt - Optional configuration
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
	
	    this.coords = {
	      latitude: null,
	      longitude: null,
	      accuracy: null };
	
	    this.opt = { cacheTtl: cacheTtl, fallback: fallback, specificity: specificity };
	
	    var fallbackPromise = void 0;
	    var originalPromise = void 0;
	
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
	   * Get location using browser's native geolocation API.
	   *
	   * @return {Promise} - navigator.geolocation wrapped in a Promise
	   */
	
	
	  _createClass(UserLocation, [{
	    key: 'getExact',
	    value: function getExact() {
	      var _this2 = this;
	
	      var promise = new Promise(function (resolve, reject) {
	        navigator.geolocation.getCurrentPosition(function (pos) {
	          _this2.coords.latitude = pos.coords.latitude;
	          _this2.coords.longitude = pos.coords.longitude;
	          _this2.coords.accuracy = pos.coords.accuracy;
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
	  }]);
	
	  return UserLocation;
	}();
	
	exports.default = UserLocation;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5NGI4NmIyNmUwOWMwMjAwMzFmMCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdENBOzs7Ozs7Ozs7Ozs7Ozs7S0FlcUIsWTtBQUNuQiwyQkFJUTtBQUFBOztBQUFBLHNFQUFKLEVBQUk7O0FBQUEsOEJBSE4sUUFHTTtBQUFBLFNBSE4sUUFHTSxpQ0FISyxNQUdMO0FBQUEsOEJBRk4sUUFFTTtBQUFBLFNBRk4sUUFFTSxpQ0FGSyxLQUVMO0FBQUEsaUNBRE4sV0FDTTtBQUFBLFNBRE4sV0FDTSxvQ0FEUSxTQUNSOztBQUFBOztBQUNOLFVBQUssTUFBTCxHQUFjO0FBQ1osaUJBQVUsSUFERTtBQUVaLGtCQUFXLElBRkM7QUFHWixpQkFBVSxJQUhFLEVBQWQ7O0FBTUEsVUFBSyxHQUFMLEdBQVcsRUFBRSxrQkFBRixFQUFZLGtCQUFaLEVBQXNCLHdCQUF0QixFQUFYOztBQUVBLFNBQUksd0JBQUo7QUFDQSxTQUFJLHdCQUFKOztBQUVBLFNBQUksZ0JBQWdCLE9BQXBCLEVBQTZCO0FBQzNCLHlCQUFrQixLQUFLLFFBQUwsRUFBbEI7QUFDRCxNQUZELE1BRU8sSUFBSSxnQkFBZ0IsU0FBcEIsRUFBK0I7QUFDcEMseUJBQWtCLEtBQUssVUFBTCxFQUFsQjtBQUNELE1BRk0sTUFFQTtBQUNMLGFBQU0sSUFBSSxLQUFKLENBQVUsdURBQVYsQ0FBTjtBQUNEOztBQUVELFlBQU8sZ0JBQ0osSUFESSxDQUNDO0FBQUEsY0FBTSxlQUFOO0FBQUEsTUFERCxFQUVKLEtBRkksQ0FFRSxZQUFNO0FBQ1gsV0FBSSxhQUFhLE9BQWpCLEVBQTBCO0FBQ3hCLDJCQUFrQixNQUFLLFFBQUwsRUFBbEI7QUFDRCxRQUZELE1BRU8sSUFBSSxhQUFhLFNBQWpCLEVBQTRCO0FBQ2pDLDJCQUFrQixNQUFLLFVBQUwsRUFBbEI7QUFDRCxRQUZNLE1BRUE7QUFDTCwyQkFBa0IsZUFBbEI7QUFDRDs7QUFFRCxjQUFPLGVBQVA7QUFDRCxNQVpJLENBQVA7QUFhRDs7QUFFRDs7Ozs7Ozs7O2dDQUtXO0FBQUE7O0FBQ1QsV0FBTSxVQUFVLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDL0MsbUJBQVUsV0FBVixDQUFzQixrQkFBdEIsQ0FDRSxVQUFDLEdBQUQsRUFBUztBQUNQLGtCQUFLLE1BQUwsQ0FBWSxRQUFaLEdBQXVCLElBQUksTUFBSixDQUFXLFFBQWxDO0FBQ0Esa0JBQUssTUFBTCxDQUFZLFNBQVosR0FBd0IsSUFBSSxNQUFKLENBQVcsU0FBbkM7QUFDQSxrQkFBSyxNQUFMLENBQVksUUFBWixHQUF1QixJQUFJLE1BQUosQ0FBVyxRQUFsQztBQUNBLG1CQUFRLE9BQUssTUFBYjtBQUNELFVBTkgsRUFPRSxVQUFDLEdBQUQsRUFBUztBQUNQLGtCQUFVLElBQUksT0FBZCxzQkFBc0MsSUFBSSxJQUExQztBQUNELFVBVEg7QUFXRCxRQVplLENBQWhCOztBQWNBLGNBQU8sT0FBUDtBQUNEOztBQUVEOzs7Ozs7OztrQ0FLYTtBQUFBOztBQUNYLFdBQU0sVUFBVSxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCO0FBQy9DLGVBQU0sK0JBQU4sRUFBdUMsRUFBdkMsRUFDRyxJQURILENBQ1EsVUFBQyxRQUFELEVBQWM7QUFDbEIsZUFBSSxTQUFTLEVBQWIsRUFBaUI7QUFDZixzQkFBUyxJQUFULEdBQ0csSUFESCxDQUNRLFVBQUMsSUFBRCxFQUFVO0FBQ2QsbUJBQUksS0FBSyxJQUFMLEtBQWMsT0FBbEIsRUFBMkI7QUFDekIsd0JBQU8sS0FBSyxHQUFaO0FBQ0QsZ0JBRkQsTUFFTztBQUNMO0FBQ0Esd0JBQUssTUFBTCxDQUFZLFFBQVosR0FBdUIsS0FBSyxRQUFMLENBQWMsZUFBZCxHQUFnQyxJQUF2RDtBQUNBLHdCQUFLLE1BQUwsQ0FBWSxRQUFaLEdBQXVCLEtBQUssUUFBTCxDQUFjLFFBQXJDO0FBQ0Esd0JBQUssTUFBTCxDQUFZLFNBQVosR0FBd0IsS0FBSyxRQUFMLENBQWMsU0FBdEM7QUFDQSx5QkFBUSxPQUFLLE1BQWI7QUFDRDtBQUNGLGNBWEg7QUFhRCxZQWRELE1BY087QUFDTCxvQkFBTyxTQUFTLFVBQWhCO0FBQ0Q7QUFDRixVQW5CSCxFQW9CRyxLQXBCSCxDQW9CUyxVQUFDLEdBQUQsRUFBUztBQUNkLGtCQUFPLElBQUksT0FBWDtBQUNELFVBdEJIO0FBdUJELFFBeEJlLENBQWhCOztBQTBCQSxjQUFPLE9BQVA7QUFDRDs7Ozs7O21CQWhHa0IsWSIsImZpbGUiOiJVc2VyTG9jYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJVc2VyTG9jYXRpb25cIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiVXNlckxvY2F0aW9uXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA5NGI4NmIyNmUwOWMwMjAwMzFmMFxuICoqLyIsIi8qKlxuICogU2ltcGxlIGxpYnJhcnkgdG8gcHJvdmlkZSB0aGUgY3VycmVudCB1c2VyJ3MgbG9jYXRpb24sIHdpdGhcbiAqIGFuIG9wdGlvbmFsIGZhbGxiYWNrIG1ldGhvZCBvZiBvYnRhaW5pbmcgdGhlaXIgY29vcmRpbmF0ZXMuXG4gKlxuICogQGNsYXNzIFVzZXJMb2NhdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHQgLSBPcHRpb25hbCBjb25maWd1cmF0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdC5jYWNoZVR0bD02MDQ4MDBdIC0gQ2FjaGUgdGltZS10by1saXZlIGluIHNlY29uZHNcbiAqIEBwYXJhbSB7Ym9vbGVhbnxzdHJpbmd9IFtvcHQuZmFsbGJhY2s9ZmFsc2VdIC0gTWV0aG9kIG9mIG9idGFpbmluZyBjb29yZGluYXRlcyBpZiBpbml0aWFsIHRyeVxuICogZmFpbHMuIFBvc3NpYmxlIHZhbHVlczogZmFsc2UsICdnZW5lcmFsJywgb3IgJ2V4YWN0Jy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0LnNwZWNpZmljaXR5PSdnZW5lcmFsJ10gLSBJbml0aWFsIG1ldGhvZCBvZiBvYnRhaW5pbmcgY29vcmRpbmF0ZXMuIFBvc3NpYmxlXG4gKiB2YWx1ZXM6ICdnZW5lcmFsJyBvciAnZXhhY3QnLlxuICogQHJldHVybnMge1Byb21pc2V9IC0gV2hlbiByZXNvbHZlZCwgcmV0dXJucyBhIGNvb3JkaW5hdGVzIG9iamVjdFxuICogd2l0aCBsYXRpdHVkZSwgbG9uZ2l0dWRlLCBhbmQgYWNjdXJhY3kuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJMb2NhdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHtcbiAgICBjYWNoZVR0bCA9IDYwNDgwMCwgLy8gNyBkYXlzXG4gICAgZmFsbGJhY2sgPSBmYWxzZSwgLy8gSWYgJ3NwZWNpZmljaXR5JyBmYWlsc1xuICAgIHNwZWNpZmljaXR5ID0gJ2dlbmVyYWwnLFxuICB9ID0ge30pIHtcbiAgICB0aGlzLmNvb3JkcyA9IHtcbiAgICAgIGxhdGl0dWRlOiBudWxsLFxuICAgICAgbG9uZ2l0dWRlOiBudWxsLFxuICAgICAgYWNjdXJhY3k6IG51bGwsIC8vIGluIG1ldGVyc1xuICAgIH07XG5cbiAgICB0aGlzLm9wdCA9IHsgY2FjaGVUdGwsIGZhbGxiYWNrLCBzcGVjaWZpY2l0eSB9O1xuXG4gICAgbGV0IGZhbGxiYWNrUHJvbWlzZTtcbiAgICBsZXQgb3JpZ2luYWxQcm9taXNlO1xuXG4gICAgaWYgKHNwZWNpZmljaXR5ID09PSAnZXhhY3QnKSB7XG4gICAgICBvcmlnaW5hbFByb21pc2UgPSB0aGlzLmdldEV4YWN0KCk7XG4gICAgfSBlbHNlIGlmIChzcGVjaWZpY2l0eSA9PT0gJ2dlbmVyYWwnKSB7XG4gICAgICBvcmlnaW5hbFByb21pc2UgPSB0aGlzLmdldEdlbmVyYWwoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvbmZpZ3VyYXRpb24gdmFsdWUgZm9yIGxvY2F0aW9uIHNwZWNpZmljaXR5LicpO1xuICAgIH1cblxuICAgIHJldHVybiBvcmlnaW5hbFByb21pc2VcbiAgICAgIC50aGVuKCgpID0+IG9yaWdpbmFsUHJvbWlzZSlcbiAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgIGlmIChmYWxsYmFjayA9PT0gJ2V4YWN0Jykge1xuICAgICAgICAgIGZhbGxiYWNrUHJvbWlzZSA9IHRoaXMuZ2V0RXhhY3QoKTtcbiAgICAgICAgfSBlbHNlIGlmIChmYWxsYmFjayA9PT0gJ2dlbmVyYWwnKSB7XG4gICAgICAgICAgZmFsbGJhY2tQcm9taXNlID0gdGhpcy5nZXRHZW5lcmFsKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmFsbGJhY2tQcm9taXNlID0gb3JpZ2luYWxQcm9taXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbGxiYWNrUHJvbWlzZTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBsb2NhdGlvbiB1c2luZyBicm93c2VyJ3MgbmF0aXZlIGdlb2xvY2F0aW9uIEFQSS5cbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZX0gLSBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24gd3JhcHBlZCBpbiBhIFByb21pc2VcbiAgICovXG4gIGdldEV4YWN0KCkge1xuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKFxuICAgICAgICAocG9zKSA9PiB7XG4gICAgICAgICAgdGhpcy5jb29yZHMubGF0aXR1ZGUgPSBwb3MuY29vcmRzLmxhdGl0dWRlO1xuICAgICAgICAgIHRoaXMuY29vcmRzLmxvbmdpdHVkZSA9IHBvcy5jb29yZHMubG9uZ2l0dWRlO1xuICAgICAgICAgIHRoaXMuY29vcmRzLmFjY3VyYWN5ID0gcG9zLmNvb3Jkcy5hY2N1cmFjeTtcbiAgICAgICAgICByZXNvbHZlKHRoaXMuY29vcmRzKTtcbiAgICAgICAgfSxcbiAgICAgICAgKGVycikgPT4ge1xuICAgICAgICAgIHJlamVjdChgJHtlcnIubWVzc2FnZX0gKGVycm9yIGNvZGU6ICR7ZXJyLmNvZGV9KWApO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGxvY2F0aW9uIHVzaW5nIE5la3VkbydzIElQIGFkZHJlc3MgbG9va3VwIHNlcnZpY2VcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZX0gLSBQcm9taXNlIHdyYXBwZWQgYXJvdW5kIEZldGNoIHJlc3BvbnNlXG4gICAqL1xuICBnZXRHZW5lcmFsKCkge1xuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBmZXRjaCgnaHR0cHM6Ly9nZW9pcC5uZWt1ZG8uY29tL2FwaS8nLCB7fSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICByZXNwb25zZS5qc29uKClcbiAgICAgICAgICAgICAgLnRoZW4oKGpzb24pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoanNvbi50eXBlID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgICAgICByZWplY3QoanNvbi5tc2cpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAvLyBDb252ZXJ0IE1heG1pbmQncyBhY2N1cmFjeSBpbiBraWxvbWV0ZXJzIHRvIHRoaXMgbGliJ3Mgc3RhbmRhcmQgaW4gbWV0ZXJzXG4gICAgICAgICAgICAgICAgICB0aGlzLmNvb3Jkcy5hY2N1cmFjeSA9IGpzb24ubG9jYXRpb24uYWNjdXJhY3lfcmFkaXVzICogMTAwMDtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY29vcmRzLmxhdGl0dWRlID0ganNvbi5sb2NhdGlvbi5sYXRpdHVkZTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY29vcmRzLmxvbmdpdHVkZSA9IGpzb24ubG9jYXRpb24ubG9uZ2l0dWRlO1xuICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmNvb3Jkcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QocmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnIubWVzc2FnZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==