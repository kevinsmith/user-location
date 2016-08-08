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
	
	  var location = {};
	
	  if (specificity === 'exact') {
	    navigator.geolocation.getCurrentPosition(function (pos) {
	      console.log(pos.coords);
	    }, function (err) {
	      throw new Error(err.message + ' (error code: ' + err.code + ')');
	    });
	  } else if (specificity === 'general') {
	    // Use GeoIP lookup to get general area
	  } else {
	    throw new Error('Invalid configuration value for location specificity.');
	  }
	
	  location = 'something';
	
	  console.log(apiKey, cacheTtl, fallback, location);
	
	  return location;
	};
	
	exports.default = UserLocation;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA3MmRmNGZkYzM0YTdjNWZlNWMyNCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztLQ3RDcUIsWSxHQUNuQiw0QkFLRztBQUFBLE9BSkQsTUFJQyxRQUpELE1BSUM7QUFBQSw0QkFIRCxRQUdDO0FBQUEsT0FIRCxRQUdDLGlDQUhVLE1BR1Y7QUFBQSw0QkFGRCxRQUVDO0FBQUEsT0FGRCxRQUVDLGlDQUZVLE9BRVY7QUFBQSwrQkFERCxXQUNDO0FBQUEsT0FERCxXQUNDLG9DQURhLFNBQ2I7O0FBQUE7O0FBQ0QsT0FBSSxXQUFXLEVBQWY7O0FBRUEsT0FBSSxnQkFBZ0IsT0FBcEIsRUFBNkI7QUFDM0IsZUFBVSxXQUFWLENBQXNCLGtCQUF0QixDQUNFLFVBQUMsR0FBRCxFQUFTO0FBQ1AsZUFBUSxHQUFSLENBQVksSUFBSSxNQUFoQjtBQUNELE1BSEgsRUFJRSxVQUFDLEdBQUQsRUFBUztBQUNQLGFBQU0sSUFBSSxLQUFKLENBQWEsSUFBSSxPQUFqQixzQkFBeUMsSUFBSSxJQUE3QyxPQUFOO0FBQ0QsTUFOSDtBQVFELElBVEQsTUFTTyxJQUFJLGdCQUFnQixTQUFwQixFQUErQjtBQUNwQztBQUNELElBRk0sTUFFQTtBQUNMLFdBQU0sSUFBSSxLQUFKLENBQVUsdURBQVYsQ0FBTjtBQUNEOztBQUVELGNBQVcsV0FBWDs7QUFFQSxXQUFRLEdBQVIsQ0FBWSxNQUFaLEVBQW9CLFFBQXBCLEVBQThCLFFBQTlCLEVBQXdDLFFBQXhDOztBQUVBLFVBQU8sUUFBUDtBQUNELEU7O21CQTdCa0IsWSIsImZpbGUiOiJVc2VyTG9jYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJVc2VyTG9jYXRpb25cIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiVXNlckxvY2F0aW9uXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA3MmRmNGZkYzM0YTdjNWZlNWMyNFxuICoqLyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJMb2NhdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHtcbiAgICBhcGlLZXksXG4gICAgY2FjaGVUdGwgPSA2MDQ4MDAsIC8vIDcgZGF5c1xuICAgIGZhbGxiYWNrID0gJ2V4YWN0JywgLy8gSWYgSVAtYmFzZWQgZ2VvbG9jYXRpb24gZmFpbHNcbiAgICBzcGVjaWZpY2l0eSA9ICdnZW5lcmFsJyxcbiAgfSkge1xuICAgIGxldCBsb2NhdGlvbiA9IHt9O1xuXG4gICAgaWYgKHNwZWNpZmljaXR5ID09PSAnZXhhY3QnKSB7XG4gICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKFxuICAgICAgICAocG9zKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2cocG9zLmNvb3Jkcyk7XG4gICAgICAgIH0sXG4gICAgICAgIChlcnIpID0+IHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZXJyLm1lc3NhZ2V9IChlcnJvciBjb2RlOiAke2Vyci5jb2RlfSlgKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHNwZWNpZmljaXR5ID09PSAnZ2VuZXJhbCcpIHtcbiAgICAgIC8vIFVzZSBHZW9JUCBsb29rdXAgdG8gZ2V0IGdlbmVyYWwgYXJlYVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29uZmlndXJhdGlvbiB2YWx1ZSBmb3IgbG9jYXRpb24gc3BlY2lmaWNpdHkuJyk7XG4gICAgfVxuXG4gICAgbG9jYXRpb24gPSAnc29tZXRoaW5nJztcblxuICAgIGNvbnNvbGUubG9nKGFwaUtleSwgY2FjaGVUdGwsIGZhbGxiYWNrLCBsb2NhdGlvbik7XG5cbiAgICByZXR1cm4gbG9jYXRpb247XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==