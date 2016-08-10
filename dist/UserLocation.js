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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4MzEwNzQ1YWY2ZjhjOWU3YTY2YSIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0tDdENxQixZO0FBQ25CLDJCQUlRO0FBQUE7O0FBQUEsc0VBQUosRUFBSTs7QUFBQSw4QkFITixRQUdNO0FBQUEsU0FITixRQUdNLGlDQUhLLE1BR0w7QUFBQSw4QkFGTixRQUVNO0FBQUEsU0FGTixRQUVNLGlDQUZLLEtBRUw7QUFBQSxpQ0FETixXQUNNO0FBQUEsU0FETixXQUNNLG9DQURRLFNBQ1I7O0FBQUE7O0FBQ04sVUFBSyxNQUFMLEdBQWM7QUFDWixpQkFBVSxJQURFO0FBRVosa0JBQVcsSUFGQztBQUdaLGlCQUFVLElBSEUsRUFBZDtBQUtBLFVBQUssR0FBTCxHQUFXLEVBQUUsa0JBQUYsRUFBWSxrQkFBWixFQUFzQix3QkFBdEIsRUFBWDtBQUNBLFNBQUksd0JBQUo7QUFDQSxTQUFJLHdCQUFKOztBQUVBLFNBQUksZ0JBQWdCLE9BQXBCLEVBQTZCO0FBQzNCLHlCQUFrQixLQUFLLFFBQUwsRUFBbEI7QUFDRCxNQUZELE1BRU8sSUFBSSxnQkFBZ0IsU0FBcEIsRUFBK0I7QUFDcEMseUJBQWtCLEtBQUssVUFBTCxFQUFsQjtBQUNELE1BRk0sTUFFQTtBQUNMLGFBQU0sSUFBSSxLQUFKLENBQVUsdURBQVYsQ0FBTjtBQUNEOztBQUVELFlBQU8sZ0JBQ0osSUFESSxDQUNDO0FBQUEsY0FBTSxlQUFOO0FBQUEsTUFERCxFQUVKLEtBRkksQ0FFRSxZQUFNO0FBQ1gsV0FBSSxhQUFhLE9BQWpCLEVBQTBCO0FBQ3hCLDJCQUFrQixNQUFLLFFBQUwsRUFBbEI7QUFDRCxRQUZELE1BRU8sSUFBSSxhQUFhLFNBQWpCLEVBQTRCO0FBQ2pDLDJCQUFrQixNQUFLLFVBQUwsRUFBbEI7QUFDRCxRQUZNLE1BRUE7QUFDTCwyQkFBa0IsZUFBbEI7QUFDRDs7QUFFRCxjQUFPLGVBQVA7QUFDRCxNQVpJLENBQVA7QUFhRDs7OztnQ0FFVTtBQUFBOztBQUNULFdBQU0sVUFBVSxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCO0FBQy9DLG1CQUFVLFdBQVYsQ0FBc0Isa0JBQXRCLENBQ0UsVUFBQyxHQUFELEVBQVM7QUFDUCxrQkFBSyxNQUFMLENBQVksUUFBWixHQUF1QixJQUFJLE1BQUosQ0FBVyxRQUFsQztBQUNBLGtCQUFLLE1BQUwsQ0FBWSxTQUFaLEdBQXdCLElBQUksTUFBSixDQUFXLFNBQW5DO0FBQ0Esa0JBQUssTUFBTCxDQUFZLFFBQVosR0FBdUIsSUFBSSxNQUFKLENBQVcsUUFBbEM7QUFDQSxtQkFBUSxPQUFLLE1BQWI7QUFDRCxVQU5ILEVBT0UsVUFBQyxHQUFELEVBQVM7QUFDUCxrQkFBVSxJQUFJLE9BQWQsc0JBQXNDLElBQUksSUFBMUM7QUFDRCxVQVRIO0FBV0QsUUFaZSxDQUFoQjs7QUFjQSxjQUFPLE9BQVA7QUFDRDs7O2tDQUVZO0FBQUE7O0FBQ1gsV0FBTSxVQUFVLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDL0MsZUFBTSwrQkFBTixFQUF1QyxFQUF2QyxFQUNHLElBREgsQ0FDUSxVQUFDLFFBQUQsRUFBYztBQUNsQixlQUFJLFNBQVMsRUFBYixFQUFpQjtBQUNmLHNCQUFTLElBQVQsR0FDRyxJQURILENBQ1EsVUFBQyxJQUFELEVBQVU7QUFDZCxtQkFBSSxLQUFLLElBQUwsS0FBYyxPQUFsQixFQUEyQjtBQUN6Qix3QkFBTyxLQUFLLEdBQVo7QUFDRCxnQkFGRCxNQUVPO0FBQ0w7QUFDQSx3QkFBSyxNQUFMLENBQVksUUFBWixHQUF1QixLQUFLLFFBQUwsQ0FBYyxlQUFkLEdBQWdDLElBQXZEO0FBQ0Esd0JBQUssTUFBTCxDQUFZLFFBQVosR0FBdUIsS0FBSyxRQUFMLENBQWMsUUFBckM7QUFDQSx3QkFBSyxNQUFMLENBQVksU0FBWixHQUF3QixLQUFLLFFBQUwsQ0FBYyxTQUF0QztBQUNBLHlCQUFRLE9BQUssTUFBYjtBQUNEO0FBQ0YsY0FYSDtBQWFELFlBZEQsTUFjTztBQUNMLG9CQUFPLFNBQVMsVUFBaEI7QUFDRDtBQUNGLFVBbkJILEVBb0JHLEtBcEJILENBb0JTLFVBQUMsR0FBRCxFQUFTO0FBQ2Qsa0JBQU8sSUFBSSxPQUFYO0FBQ0QsVUF0Qkg7QUF1QkQsUUF4QmUsQ0FBaEI7O0FBMEJBLGNBQU8sT0FBUDtBQUNEOzs7Ozs7bUJBcEZrQixZIiwiZmlsZSI6IlVzZXJMb2NhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlVzZXJMb2NhdGlvblwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJVc2VyTG9jYXRpb25cIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDgzMTA3NDVhZjZmOGM5ZTdhNjZhXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckxvY2F0aW9uIHtcbiAgY29uc3RydWN0b3Ioe1xuICAgIGNhY2hlVHRsID0gNjA0ODAwLCAvLyA3IGRheXNcbiAgICBmYWxsYmFjayA9IGZhbHNlLCAvLyBJZiAnc3BlY2lmaWNpdHknIGZhaWxzXG4gICAgc3BlY2lmaWNpdHkgPSAnZ2VuZXJhbCcsXG4gIH0gPSB7fSkge1xuICAgIHRoaXMuY29vcmRzID0ge1xuICAgICAgbGF0aXR1ZGU6IG51bGwsXG4gICAgICBsb25naXR1ZGU6IG51bGwsXG4gICAgICBhY2N1cmFjeTogbnVsbCwgLy8gaW4gbWV0ZXJzXG4gICAgfTtcbiAgICB0aGlzLm9wdCA9IHsgY2FjaGVUdGwsIGZhbGxiYWNrLCBzcGVjaWZpY2l0eSB9O1xuICAgIGxldCBmYWxsYmFja1Byb21pc2U7XG4gICAgbGV0IG9yaWdpbmFsUHJvbWlzZTtcblxuICAgIGlmIChzcGVjaWZpY2l0eSA9PT0gJ2V4YWN0Jykge1xuICAgICAgb3JpZ2luYWxQcm9taXNlID0gdGhpcy5nZXRFeGFjdCgpO1xuICAgIH0gZWxzZSBpZiAoc3BlY2lmaWNpdHkgPT09ICdnZW5lcmFsJykge1xuICAgICAgb3JpZ2luYWxQcm9taXNlID0gdGhpcy5nZXRHZW5lcmFsKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb25maWd1cmF0aW9uIHZhbHVlIGZvciBsb2NhdGlvbiBzcGVjaWZpY2l0eS4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3JpZ2luYWxQcm9taXNlXG4gICAgICAudGhlbigoKSA9PiBvcmlnaW5hbFByb21pc2UpXG4gICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICBpZiAoZmFsbGJhY2sgPT09ICdleGFjdCcpIHtcbiAgICAgICAgICBmYWxsYmFja1Byb21pc2UgPSB0aGlzLmdldEV4YWN0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZmFsbGJhY2sgPT09ICdnZW5lcmFsJykge1xuICAgICAgICAgIGZhbGxiYWNrUHJvbWlzZSA9IHRoaXMuZ2V0R2VuZXJhbCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZhbGxiYWNrUHJvbWlzZSA9IG9yaWdpbmFsUHJvbWlzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxsYmFja1Byb21pc2U7XG4gICAgICB9KTtcbiAgfVxuXG4gIGdldEV4YWN0KCkge1xuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKFxuICAgICAgICAocG9zKSA9PiB7XG4gICAgICAgICAgdGhpcy5jb29yZHMubGF0aXR1ZGUgPSBwb3MuY29vcmRzLmxhdGl0dWRlO1xuICAgICAgICAgIHRoaXMuY29vcmRzLmxvbmdpdHVkZSA9IHBvcy5jb29yZHMubG9uZ2l0dWRlO1xuICAgICAgICAgIHRoaXMuY29vcmRzLmFjY3VyYWN5ID0gcG9zLmNvb3Jkcy5hY2N1cmFjeTtcbiAgICAgICAgICByZXNvbHZlKHRoaXMuY29vcmRzKTtcbiAgICAgICAgfSxcbiAgICAgICAgKGVycikgPT4ge1xuICAgICAgICAgIHJlamVjdChgJHtlcnIubWVzc2FnZX0gKGVycm9yIGNvZGU6ICR7ZXJyLmNvZGV9KWApO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBnZXRHZW5lcmFsKCkge1xuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBmZXRjaCgnaHR0cHM6Ly9nZW9pcC5uZWt1ZG8uY29tL2FwaS8nLCB7fSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICByZXNwb25zZS5qc29uKClcbiAgICAgICAgICAgICAgLnRoZW4oKGpzb24pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoanNvbi50eXBlID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgICAgICByZWplY3QoanNvbi5tc2cpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAvLyBDb252ZXJ0IE1heG1pbmQncyBhY2N1cmFjeSBpbiBraWxvbWV0ZXJzIHRvIHRoaXMgbGliJ3Mgc3RhbmRhcmQgaW4gbWV0ZXJzXG4gICAgICAgICAgICAgICAgICB0aGlzLmNvb3Jkcy5hY2N1cmFjeSA9IGpzb24ubG9jYXRpb24uYWNjdXJhY3lfcmFkaXVzICogMTAwMDtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY29vcmRzLmxhdGl0dWRlID0ganNvbi5sb2NhdGlvbi5sYXRpdHVkZTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY29vcmRzLmxvbmdpdHVkZSA9IGpzb24ubG9jYXRpb24ubG9uZ2l0dWRlO1xuICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmNvb3Jkcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QocmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnIubWVzc2FnZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==