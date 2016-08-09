/*!
 * UserLocation v0.0.1
 * Simple library to get a user's current location using the GeoIP service from GeoCarrot.
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
	
	var UserLocation = function () {
	  function UserLocation(_ref) {
	    var _ref$apiKey = _ref.apiKey;
	    var apiKey = _ref$apiKey === undefined ? null : _ref$apiKey;
	    var _ref$cacheTtl = _ref.cacheTtl;
	    var cacheTtl = _ref$cacheTtl === undefined ? 604800 : _ref$cacheTtl;
	    var _ref$fallback = _ref.fallback;
	    var fallback = _ref$fallback === undefined ? 'exact' : _ref$fallback;
	    var _ref$specificity = _ref.specificity;
	    var specificity = _ref$specificity === undefined ? 'general' : _ref$specificity;
	
	    _classCallCheck(this, UserLocation);
	
	    this.coords = {
	      latitude: null,
	      longitude: null,
	      accuracy: null
	    };
	    this.opt = { apiKey: apiKey, cacheTtl: cacheTtl, fallback: fallback, specificity: specificity };
	    var promise = void 0;
	
	    console.log(this.opt);
	
	    if (this.opt.apiKey === null && (this.opt.specificity === 'general' || this.opt.fallback === 'general')) {
	      throw new Error('An API key must be included when using GeoCarrot\'s GeoIP lookup.');
	    }
	
	    if (specificity === 'exact') {
	      promise = this.getExact();
	    } else if (specificity === 'general') {
	      promise = this.getGeneral();
	    } else {
	      throw new Error('Invalid configuration value for location specificity.');
	    }
	
	    return promise;
	  }
	
	  _createClass(UserLocation, [{
	    key: 'getExact',
	    value: function getExact() {
	      var _this = this;
	
	      var promise = new Promise(function (resolve, reject) {
	        navigator.geolocation.getCurrentPosition(function (pos) {
	          _this.coords.latitude = pos.coords.latitude;
	          _this.coords.longitude = pos.coords.longitude;
	          _this.coords.accuracy = pos.coords.accuracy;
	          resolve(_this.coords);
	        }, function (err) {
	          reject(err.message + ' (error code: ' + err.code + ')');
	        });
	      });
	
	      return promise;
	    }
	  }, {
	    key: 'getGeneral',
	    value: function getGeneral() {
	      var _this2 = this;
	
	      var promise = new Promise(function (resolve, reject) {
	        fetch('https://geoip.maplasso.com/api/?key=' + _this2.opt.apiKey, {}).then(function (response) {
	          if (response.ok) {
	            response.json().then(function (json) {
	              _this2.coords.latitude = json.data.attributes.location.latitude;
	              _this2.coords.longitude = json.data.attributes.location.longitude;
	              resolve(_this2.coords);
	            });
	          } else {
	            reject(response.statusText + ')');
	          }
	        }, function (err) {
	          reject('' + err.message);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxZDhiYzBkZTUzYjljNDJjNGFjMCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0tDdENxQixZO0FBQ25CLCtCQUtHO0FBQUEsNEJBSkQsTUFJQztBQUFBLFNBSkQsTUFJQywrQkFKUSxJQUlSO0FBQUEsOEJBSEQsUUFHQztBQUFBLFNBSEQsUUFHQyxpQ0FIVSxNQUdWO0FBQUEsOEJBRkQsUUFFQztBQUFBLFNBRkQsUUFFQyxpQ0FGVSxPQUVWO0FBQUEsaUNBREQsV0FDQztBQUFBLFNBREQsV0FDQyxvQ0FEYSxTQUNiOztBQUFBOztBQUNELFVBQUssTUFBTCxHQUFjO0FBQ1osaUJBQVUsSUFERTtBQUVaLGtCQUFXLElBRkM7QUFHWixpQkFBVTtBQUhFLE1BQWQ7QUFLQSxVQUFLLEdBQUwsR0FBVyxFQUFFLGNBQUYsRUFBVSxrQkFBVixFQUFvQixrQkFBcEIsRUFBOEIsd0JBQTlCLEVBQVg7QUFDQSxTQUFJLGdCQUFKOztBQUVBLGFBQVEsR0FBUixDQUFZLEtBQUssR0FBakI7O0FBRUEsU0FDRSxLQUFLLEdBQUwsQ0FBUyxNQUFULEtBQW9CLElBQXBCLEtBQ0MsS0FBSyxHQUFMLENBQVMsV0FBVCxLQUF5QixTQUF6QixJQUFzQyxLQUFLLEdBQUwsQ0FBUyxRQUFULEtBQXNCLFNBRDdELENBREYsRUFHRTtBQUNBLGFBQU0sSUFBSSxLQUFKLENBQVUsbUVBQVYsQ0FBTjtBQUNEOztBQUVELFNBQUksZ0JBQWdCLE9BQXBCLEVBQTZCO0FBQzNCLGlCQUFVLEtBQUssUUFBTCxFQUFWO0FBQ0QsTUFGRCxNQUVPLElBQUksZ0JBQWdCLFNBQXBCLEVBQStCO0FBQ3BDLGlCQUFVLEtBQUssVUFBTCxFQUFWO0FBQ0QsTUFGTSxNQUVBO0FBQ0wsYUFBTSxJQUFJLEtBQUosQ0FBVSx1REFBVixDQUFOO0FBQ0Q7O0FBRUQsWUFBTyxPQUFQO0FBQ0Q7Ozs7Z0NBRVU7QUFBQTs7QUFDVCxXQUFNLFVBQVUsSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFxQjtBQUMvQyxtQkFBVSxXQUFWLENBQXNCLGtCQUF0QixDQUNFLFVBQUMsR0FBRCxFQUFTO0FBQ1AsaUJBQUssTUFBTCxDQUFZLFFBQVosR0FBdUIsSUFBSSxNQUFKLENBQVcsUUFBbEM7QUFDQSxpQkFBSyxNQUFMLENBQVksU0FBWixHQUF3QixJQUFJLE1BQUosQ0FBVyxTQUFuQztBQUNBLGlCQUFLLE1BQUwsQ0FBWSxRQUFaLEdBQXVCLElBQUksTUFBSixDQUFXLFFBQWxDO0FBQ0EsbUJBQVEsTUFBSyxNQUFiO0FBQ0QsVUFOSCxFQU9FLFVBQUMsR0FBRCxFQUFTO0FBQ1Asa0JBQVUsSUFBSSxPQUFkLHNCQUFzQyxJQUFJLElBQTFDO0FBQ0QsVUFUSDtBQVdELFFBWmUsQ0FBaEI7O0FBY0EsY0FBTyxPQUFQO0FBQ0Q7OztrQ0FFWTtBQUFBOztBQUNYLFdBQU0sVUFBVSxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCO0FBQy9DLHdEQUE2QyxPQUFLLEdBQUwsQ0FBUyxNQUF0RCxFQUFnRSxFQUFoRSxFQUNHLElBREgsQ0FDUSxVQUFDLFFBQUQsRUFBYztBQUNsQixlQUFJLFNBQVMsRUFBYixFQUFpQjtBQUNmLHNCQUFTLElBQVQsR0FBZ0IsSUFBaEIsQ0FBcUIsVUFBQyxJQUFELEVBQVU7QUFDN0Isc0JBQUssTUFBTCxDQUFZLFFBQVosR0FBdUIsS0FBSyxJQUFMLENBQVUsVUFBVixDQUFxQixRQUFyQixDQUE4QixRQUFyRDtBQUNBLHNCQUFLLE1BQUwsQ0FBWSxTQUFaLEdBQXdCLEtBQUssSUFBTCxDQUFVLFVBQVYsQ0FBcUIsUUFBckIsQ0FBOEIsU0FBdEQ7QUFDQSx1QkFBUSxPQUFLLE1BQWI7QUFDRCxjQUpEO0FBS0QsWUFORCxNQU1PO0FBQ0wsb0JBQVUsU0FBUyxVQUFuQjtBQUNEO0FBQ0YsVUFYSCxFQVlFLFVBQUMsR0FBRCxFQUFTO0FBQ1AsdUJBQVUsSUFBSSxPQUFkO0FBQ0QsVUFkSDtBQWVELFFBaEJlLENBQWhCOztBQWtCQSxjQUFPLE9BQVA7QUFDRDs7Ozs7O21CQXpFa0IsWSIsImZpbGUiOiJVc2VyTG9jYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJVc2VyTG9jYXRpb25cIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiVXNlckxvY2F0aW9uXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAxZDhiYzBkZTUzYjljNDJjNGFjMFxuICoqLyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJMb2NhdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHtcbiAgICBhcGlLZXkgPSBudWxsLFxuICAgIGNhY2hlVHRsID0gNjA0ODAwLCAvLyA3IGRheXNcbiAgICBmYWxsYmFjayA9ICdleGFjdCcsIC8vIElmIElQLWJhc2VkIGdlb2xvY2F0aW9uIGZhaWxzXG4gICAgc3BlY2lmaWNpdHkgPSAnZ2VuZXJhbCcsXG4gIH0pIHtcbiAgICB0aGlzLmNvb3JkcyA9IHtcbiAgICAgIGxhdGl0dWRlOiBudWxsLFxuICAgICAgbG9uZ2l0dWRlOiBudWxsLFxuICAgICAgYWNjdXJhY3k6IG51bGwsXG4gICAgfTtcbiAgICB0aGlzLm9wdCA9IHsgYXBpS2V5LCBjYWNoZVR0bCwgZmFsbGJhY2ssIHNwZWNpZmljaXR5IH07XG4gICAgbGV0IHByb21pc2U7XG5cbiAgICBjb25zb2xlLmxvZyh0aGlzLm9wdCk7XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLm9wdC5hcGlLZXkgPT09IG51bGwgJiZcbiAgICAgICh0aGlzLm9wdC5zcGVjaWZpY2l0eSA9PT0gJ2dlbmVyYWwnIHx8IHRoaXMub3B0LmZhbGxiYWNrID09PSAnZ2VuZXJhbCcpXG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FuIEFQSSBrZXkgbXVzdCBiZSBpbmNsdWRlZCB3aGVuIHVzaW5nIEdlb0NhcnJvdFxcJ3MgR2VvSVAgbG9va3VwLicpO1xuICAgIH1cblxuICAgIGlmIChzcGVjaWZpY2l0eSA9PT0gJ2V4YWN0Jykge1xuICAgICAgcHJvbWlzZSA9IHRoaXMuZ2V0RXhhY3QoKTtcbiAgICB9IGVsc2UgaWYgKHNwZWNpZmljaXR5ID09PSAnZ2VuZXJhbCcpIHtcbiAgICAgIHByb21pc2UgPSB0aGlzLmdldEdlbmVyYWwoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvbmZpZ3VyYXRpb24gdmFsdWUgZm9yIGxvY2F0aW9uIHNwZWNpZmljaXR5LicpO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgZ2V0RXhhY3QoKSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oXG4gICAgICAgIChwb3MpID0+IHtcbiAgICAgICAgICB0aGlzLmNvb3Jkcy5sYXRpdHVkZSA9IHBvcy5jb29yZHMubGF0aXR1ZGU7XG4gICAgICAgICAgdGhpcy5jb29yZHMubG9uZ2l0dWRlID0gcG9zLmNvb3Jkcy5sb25naXR1ZGU7XG4gICAgICAgICAgdGhpcy5jb29yZHMuYWNjdXJhY3kgPSBwb3MuY29vcmRzLmFjY3VyYWN5O1xuICAgICAgICAgIHJlc29sdmUodGhpcy5jb29yZHMpO1xuICAgICAgICB9LFxuICAgICAgICAoZXJyKSA9PiB7XG4gICAgICAgICAgcmVqZWN0KGAke2Vyci5tZXNzYWdlfSAoZXJyb3IgY29kZTogJHtlcnIuY29kZX0pYCk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIGdldEdlbmVyYWwoKSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGZldGNoKGBodHRwczovL2dlb2lwLm1hcGxhc3NvLmNvbS9hcGkvP2tleT0ke3RoaXMub3B0LmFwaUtleX1gLCB7fSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICByZXNwb25zZS5qc29uKCkudGhlbigoanNvbikgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmNvb3Jkcy5sYXRpdHVkZSA9IGpzb24uZGF0YS5hdHRyaWJ1dGVzLmxvY2F0aW9uLmxhdGl0dWRlO1xuICAgICAgICAgICAgICB0aGlzLmNvb3Jkcy5sb25naXR1ZGUgPSBqc29uLmRhdGEuYXR0cmlidXRlcy5sb2NhdGlvbi5sb25naXR1ZGU7XG4gICAgICAgICAgICAgIHJlc29sdmUodGhpcy5jb29yZHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChgJHtyZXNwb25zZS5zdGF0dXNUZXh0fSlgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIChlcnIpID0+IHtcbiAgICAgICAgICByZWplY3QoYCR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==