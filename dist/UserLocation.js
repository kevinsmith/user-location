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
	  var _ref$apiKey = _ref.apiKey;
	  var apiKey = _ref$apiKey === undefined ? null : _ref$apiKey;
	  var _ref$cacheTtl = _ref.cacheTtl;
	  var cacheTtl = _ref$cacheTtl === undefined ? 604800 : _ref$cacheTtl;
	  var _ref$fallback = _ref.fallback;
	  var fallback = _ref$fallback === undefined ? 'exact' : _ref$fallback;
	  var _ref$specificity = _ref.specificity;
	  var specificity = _ref$specificity === undefined ? 'general' : _ref$specificity;
	
	  _classCallCheck(this, UserLocation);
	
	  var coords = {
	    latitude: null,
	    longitude: null,
	    accuracy: null
	  };
	
	  if (apiKey === null && (specificity === 'general' || fallback === 'general')) {
	    throw new Error('An API key must be included when using GeoCarrot\'s GeoIP lookup.');
	  }
	
	  var promise = new Promise(function (resolve, reject) {
	    if (specificity === 'exact') {
	      navigator.geolocation.getCurrentPosition(function (pos) {
	        coords.latitude = pos.coords.latitude;
	        coords.longitude = pos.coords.longitude;
	        coords.accuracy = pos.coords.accuracy;
	        resolve(coords);
	      }, function (err) {
	        reject(err.message + ' (error code: ' + err.code + ')');
	      });
	    } else if (specificity === 'general') {
	      fetch('https://geoip.maplasso.com/api/?key=' + apiKey, {}).then(function (response) {
	        if (response.ok) {
	          response.json().then(function (json) {
	            coords.latitude = json.data.attributes.location.latitude;
	            coords.longitude = json.data.attributes.location.longitude;
	            resolve(coords);
	          });
	        } else {
	          reject(response.statusText + ')');
	        }
	      }, function (err) {
	        reject('' + err.message);
	      });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2YjYwNWNmMzFmNzgyN2NkNDAyZSIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztLQ3RDcUIsWSxHQUNuQiw0QkFLRztBQUFBLDBCQUpELE1BSUM7QUFBQSxPQUpELE1BSUMsK0JBSlEsSUFJUjtBQUFBLDRCQUhELFFBR0M7QUFBQSxPQUhELFFBR0MsaUNBSFUsTUFHVjtBQUFBLDRCQUZELFFBRUM7QUFBQSxPQUZELFFBRUMsaUNBRlUsT0FFVjtBQUFBLCtCQURELFdBQ0M7QUFBQSxPQURELFdBQ0Msb0NBRGEsU0FDYjs7QUFBQTs7QUFDRCxPQUFNLFNBQVM7QUFDYixlQUFVLElBREc7QUFFYixnQkFBVyxJQUZFO0FBR2IsZUFBVTtBQUhHLElBQWY7O0FBTUEsT0FBSSxXQUFXLElBQVgsS0FBb0IsZ0JBQWdCLFNBQWhCLElBQTZCLGFBQWEsU0FBOUQsQ0FBSixFQUE4RTtBQUM1RSxXQUFNLElBQUksS0FBSixDQUFVLG1FQUFWLENBQU47QUFDRDs7QUFFRCxPQUFNLFVBQVUsSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFxQjtBQUMvQyxTQUFJLGdCQUFnQixPQUFwQixFQUE2QjtBQUMzQixpQkFBVSxXQUFWLENBQXNCLGtCQUF0QixDQUNFLFVBQUMsR0FBRCxFQUFTO0FBQ1AsZ0JBQU8sUUFBUCxHQUFrQixJQUFJLE1BQUosQ0FBVyxRQUE3QjtBQUNBLGdCQUFPLFNBQVAsR0FBbUIsSUFBSSxNQUFKLENBQVcsU0FBOUI7QUFDQSxnQkFBTyxRQUFQLEdBQWtCLElBQUksTUFBSixDQUFXLFFBQTdCO0FBQ0EsaUJBQVEsTUFBUjtBQUNELFFBTkgsRUFPRSxVQUFDLEdBQUQsRUFBUztBQUNQLGdCQUFVLElBQUksT0FBZCxzQkFBc0MsSUFBSSxJQUExQztBQUNELFFBVEg7QUFXRCxNQVpELE1BWU8sSUFBSSxnQkFBZ0IsU0FBcEIsRUFBK0I7QUFDcEMsc0RBQTZDLE1BQTdDLEVBQXVELEVBQXZELEVBQ0csSUFESCxDQUNRLFVBQUMsUUFBRCxFQUFjO0FBQ2xCLGFBQUksU0FBUyxFQUFiLEVBQWlCO0FBQ2Ysb0JBQVMsSUFBVCxHQUFnQixJQUFoQixDQUFxQixVQUFDLElBQUQsRUFBVTtBQUM3QixvQkFBTyxRQUFQLEdBQWtCLEtBQUssSUFBTCxDQUFVLFVBQVYsQ0FBcUIsUUFBckIsQ0FBOEIsUUFBaEQ7QUFDQSxvQkFBTyxTQUFQLEdBQW1CLEtBQUssSUFBTCxDQUFVLFVBQVYsQ0FBcUIsUUFBckIsQ0FBOEIsU0FBakQ7QUFDQSxxQkFBUSxNQUFSO0FBQ0QsWUFKRDtBQUtELFVBTkQsTUFNTztBQUNMLGtCQUFVLFNBQVMsVUFBbkI7QUFDRDtBQUNGLFFBWEgsRUFZRSxVQUFDLEdBQUQsRUFBUztBQUNQLHFCQUFVLElBQUksT0FBZDtBQUNELFFBZEg7QUFlRCxNQWhCTSxNQWdCQTtBQUNMLGFBQU0sSUFBSSxLQUFKLENBQVUsdURBQVYsQ0FBTjtBQUNEO0FBQ0YsSUFoQ2UsQ0FBaEI7O0FBa0NBLFdBQVEsR0FBUixDQUFZLE1BQVosRUFBb0IsUUFBcEIsRUFBOEIsUUFBOUI7O0FBRUEsVUFBTyxPQUFQO0FBQ0QsRTs7bUJBdERrQixZIiwiZmlsZSI6IlVzZXJMb2NhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlVzZXJMb2NhdGlvblwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJVc2VyTG9jYXRpb25cIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDZiNjA1Y2YzMWY3ODI3Y2Q0MDJlXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckxvY2F0aW9uIHtcbiAgY29uc3RydWN0b3Ioe1xuICAgIGFwaUtleSA9IG51bGwsXG4gICAgY2FjaGVUdGwgPSA2MDQ4MDAsIC8vIDcgZGF5c1xuICAgIGZhbGxiYWNrID0gJ2V4YWN0JywgLy8gSWYgSVAtYmFzZWQgZ2VvbG9jYXRpb24gZmFpbHNcbiAgICBzcGVjaWZpY2l0eSA9ICdnZW5lcmFsJyxcbiAgfSkge1xuICAgIGNvbnN0IGNvb3JkcyA9IHtcbiAgICAgIGxhdGl0dWRlOiBudWxsLFxuICAgICAgbG9uZ2l0dWRlOiBudWxsLFxuICAgICAgYWNjdXJhY3k6IG51bGwsXG4gICAgfTtcblxuICAgIGlmIChhcGlLZXkgPT09IG51bGwgJiYgKHNwZWNpZmljaXR5ID09PSAnZ2VuZXJhbCcgfHwgZmFsbGJhY2sgPT09ICdnZW5lcmFsJykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQW4gQVBJIGtleSBtdXN0IGJlIGluY2x1ZGVkIHdoZW4gdXNpbmcgR2VvQ2Fycm90XFwncyBHZW9JUCBsb29rdXAuJyk7XG4gICAgfVxuXG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmIChzcGVjaWZpY2l0eSA9PT0gJ2V4YWN0Jykge1xuICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKFxuICAgICAgICAgIChwb3MpID0+IHtcbiAgICAgICAgICAgIGNvb3Jkcy5sYXRpdHVkZSA9IHBvcy5jb29yZHMubGF0aXR1ZGU7XG4gICAgICAgICAgICBjb29yZHMubG9uZ2l0dWRlID0gcG9zLmNvb3Jkcy5sb25naXR1ZGU7XG4gICAgICAgICAgICBjb29yZHMuYWNjdXJhY3kgPSBwb3MuY29vcmRzLmFjY3VyYWN5O1xuICAgICAgICAgICAgcmVzb2x2ZShjb29yZHMpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgKGVycikgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KGAke2Vyci5tZXNzYWdlfSAoZXJyb3IgY29kZTogJHtlcnIuY29kZX0pYCk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChzcGVjaWZpY2l0eSA9PT0gJ2dlbmVyYWwnKSB7XG4gICAgICAgIGZldGNoKGBodHRwczovL2dlb2lwLm1hcGxhc3NvLmNvbS9hcGkvP2tleT0ke2FwaUtleX1gLCB7fSlcbiAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICByZXNwb25zZS5qc29uKCkudGhlbigoanNvbikgPT4ge1xuICAgICAgICAgICAgICAgIGNvb3Jkcy5sYXRpdHVkZSA9IGpzb24uZGF0YS5hdHRyaWJ1dGVzLmxvY2F0aW9uLmxhdGl0dWRlO1xuICAgICAgICAgICAgICAgIGNvb3Jkcy5sb25naXR1ZGUgPSBqc29uLmRhdGEuYXR0cmlidXRlcy5sb2NhdGlvbi5sb25naXR1ZGU7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShjb29yZHMpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlamVjdChgJHtyZXNwb25zZS5zdGF0dXNUZXh0fSlgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIChlcnIpID0+IHtcbiAgICAgICAgICAgIHJlamVjdChgJHtlcnIubWVzc2FnZX1gKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb25maWd1cmF0aW9uIHZhbHVlIGZvciBsb2NhdGlvbiBzcGVjaWZpY2l0eS4nKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnNvbGUubG9nKGFwaUtleSwgY2FjaGVUdGwsIGZhbGxiYWNrKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=