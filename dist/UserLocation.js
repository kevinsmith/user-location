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
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var UserLocation = function UserLocation(_ref) {
	  var apiKey = _ref.apiKey;
	  var _ref$cacheTtl = _ref.cacheTtl;
	  var cacheTtl = _ref$cacheTtl === undefined ? 604800 : _ref$cacheTtl;
	  var _ref$fallback = _ref.fallback;
	  var fallback = _ref$fallback === undefined ? 'exact' : _ref$fallback;
	  var _ref$specificity = _ref.specificity;
	  var specificity = _ref$specificity === undefined ? 'general' : _ref$specificity;
	
	  _classCallCheck(this, UserLocation);
	
	  var coordsLoaded = false;
	
	  var coords = {
	    latitude: null,
	    longitude: null,
	    accuracy: null
	  };
	
	  var promise = new Promise(function (resolve, reject) {
	    if (coordsLoaded) {
	      resolve(coords);
	    } else if (specificity === 'exact') {
	      navigator.geolocation.getCurrentPosition(function (pos) {
	        coordsLoaded = true;
	        coords.latitude = pos.coords.latitude;
	        coords.longitude = pos.coords.longitude;
	        coords.accuracy = pos.coords.accuracy;
	        resolve(coords);
	      }, function (err) {
	        reject(err.message + ' (error code: ' + err.code + ')');
	      });
	    } else if (specificity === 'general') {
	      // Use GeoIP lookup to get general area
	    } else {
	      throw new Error('Invalid configuration value for location specificity.');
	    }
	  });
	
	  console.log(apiKey, cacheTtl, fallback);
	
	  return promise;
	};
	
	exports.default = UserLocation;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4ZmNjNTQxZDhhNmY4YTJlZGI2YSIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztLQ3RDcUIsWSxHQUNuQiw0QkFLRztBQUFBLE9BSkQsTUFJQyxRQUpELE1BSUM7QUFBQSw0QkFIRCxRQUdDO0FBQUEsT0FIRCxRQUdDLGlDQUhVLE1BR1Y7QUFBQSw0QkFGRCxRQUVDO0FBQUEsT0FGRCxRQUVDLGlDQUZVLE9BRVY7QUFBQSwrQkFERCxXQUNDO0FBQUEsT0FERCxXQUNDLG9DQURhLFNBQ2I7O0FBQUE7O0FBQ0QsT0FBSSxlQUFlLEtBQW5COztBQUVBLE9BQU0sU0FBUztBQUNiLGVBQVUsSUFERztBQUViLGdCQUFXLElBRkU7QUFHYixlQUFVO0FBSEcsSUFBZjs7QUFNQSxPQUFNLFVBQVUsSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFxQjtBQUMvQyxTQUFJLFlBQUosRUFBa0I7QUFDaEIsZUFBUSxNQUFSO0FBQ0QsTUFGRCxNQUVPLElBQUksZ0JBQWdCLE9BQXBCLEVBQTZCO0FBQ2xDLGlCQUFVLFdBQVYsQ0FBc0Isa0JBQXRCLENBQ0UsVUFBQyxHQUFELEVBQVM7QUFDUCx3QkFBZSxJQUFmO0FBQ0EsZ0JBQU8sUUFBUCxHQUFrQixJQUFJLE1BQUosQ0FBVyxRQUE3QjtBQUNBLGdCQUFPLFNBQVAsR0FBbUIsSUFBSSxNQUFKLENBQVcsU0FBOUI7QUFDQSxnQkFBTyxRQUFQLEdBQWtCLElBQUksTUFBSixDQUFXLFFBQTdCO0FBQ0EsaUJBQVEsTUFBUjtBQUNELFFBUEgsRUFRRSxVQUFDLEdBQUQsRUFBUztBQUNQLGdCQUFVLElBQUksT0FBZCxzQkFBc0MsSUFBSSxJQUExQztBQUNELFFBVkg7QUFZRCxNQWJNLE1BYUEsSUFBSSxnQkFBZ0IsU0FBcEIsRUFBK0I7QUFDcEM7QUFDRCxNQUZNLE1BRUE7QUFDTCxhQUFNLElBQUksS0FBSixDQUFVLHVEQUFWLENBQU47QUFDRDtBQUNGLElBckJlLENBQWhCOztBQXVCQSxXQUFRLEdBQVIsQ0FBWSxNQUFaLEVBQW9CLFFBQXBCLEVBQThCLFFBQTlCOztBQUVBLFVBQU8sT0FBUDtBQUNELEU7O21CQXpDa0IsWSIsImZpbGUiOiJVc2VyTG9jYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJVc2VyTG9jYXRpb25cIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiVXNlckxvY2F0aW9uXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA4ZmNjNTQxZDhhNmY4YTJlZGI2YVxuICoqLyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJMb2NhdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHtcbiAgICBhcGlLZXksXG4gICAgY2FjaGVUdGwgPSA2MDQ4MDAsIC8vIDcgZGF5c1xuICAgIGZhbGxiYWNrID0gJ2V4YWN0JywgLy8gSWYgSVAtYmFzZWQgZ2VvbG9jYXRpb24gZmFpbHNcbiAgICBzcGVjaWZpY2l0eSA9ICdnZW5lcmFsJyxcbiAgfSkge1xuICAgIGxldCBjb29yZHNMb2FkZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0IGNvb3JkcyA9IHtcbiAgICAgIGxhdGl0dWRlOiBudWxsLFxuICAgICAgbG9uZ2l0dWRlOiBudWxsLFxuICAgICAgYWNjdXJhY3k6IG51bGwsXG4gICAgfTtcblxuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAoY29vcmRzTG9hZGVkKSB7XG4gICAgICAgIHJlc29sdmUoY29vcmRzKTtcbiAgICAgIH0gZWxzZSBpZiAoc3BlY2lmaWNpdHkgPT09ICdleGFjdCcpIHtcbiAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihcbiAgICAgICAgICAocG9zKSA9PiB7XG4gICAgICAgICAgICBjb29yZHNMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgY29vcmRzLmxhdGl0dWRlID0gcG9zLmNvb3Jkcy5sYXRpdHVkZTtcbiAgICAgICAgICAgIGNvb3Jkcy5sb25naXR1ZGUgPSBwb3MuY29vcmRzLmxvbmdpdHVkZTtcbiAgICAgICAgICAgIGNvb3Jkcy5hY2N1cmFjeSA9IHBvcy5jb29yZHMuYWNjdXJhY3k7XG4gICAgICAgICAgICByZXNvbHZlKGNvb3Jkcyk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAoZXJyKSA9PiB7XG4gICAgICAgICAgICByZWplY3QoYCR7ZXJyLm1lc3NhZ2V9IChlcnJvciBjb2RlOiAke2Vyci5jb2RlfSlgKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKHNwZWNpZmljaXR5ID09PSAnZ2VuZXJhbCcpIHtcbiAgICAgICAgLy8gVXNlIEdlb0lQIGxvb2t1cCB0byBnZXQgZ2VuZXJhbCBhcmVhXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29uZmlndXJhdGlvbiB2YWx1ZSBmb3IgbG9jYXRpb24gc3BlY2lmaWNpdHkuJyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zb2xlLmxvZyhhcGlLZXksIGNhY2hlVHRsLCBmYWxsYmFjayk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9