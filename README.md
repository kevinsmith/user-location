# UserLocation

A simple library to get the current user's location, with an optional fallback method of obtaining their coordinates.

It can be messy, convoluted work to get a user's location and cache it for quick retrieval later if you write the code yourself. It only makes sense to package it up into an easy-to-use library. So that's what I did.

Lookup methods include:
- exact location (within ~30m), but it requires the user's permission
- general location (within ~10km) without user input

## Requirements

UserLocation requires support for ES2015 Promises and the Fetch API. I recommend GitHub's [Fetch polyfill](https://github.com/github/fetch) and the [ES6-Promise polyfill](https://github.com/stefanpenner/es6-promise) to bring the following browser support:

### Browser Compatibility

- Chrome 42.0+
- Firefox 39+
- Internet Explorer 10+
- Opera 29+
- Safari 6.1+

**Note:** For front-end use only. Not compatible with a Node.js server-side environment.

## Quick Example

Since location lookup isn't an instant operation, UserLocation uses a [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) to deliver coordinates as soon as they're available.

```
var location = new UserLocation({
  cacheTtl: 300,
  fallback: 'exact'
});

location
  .then(function(coords) {
    console.log(coords);
  })
  .catch(function(err) {
    throw new Error(err);
  });
```

## Installation

UserLocation can be loaded as a standard ES2015 module or through a module loader that supports AMD or CommonJS formats.

RequireJS (AMD module loader):

```
// Assuming UserLocation.min.js is in the same folder as this script
requirejs(['UserLocation.min'], function(UserLocation) {
  var location = new UserLocation({...
});
```

Browserify (CommonJS module loader):

```
// Assuming UserLocation.min.js is in the same folder as this script
var UserLocation = require('./UserLocation.min');

var location = new UserLocation({...
```

Or simply include the library via a script tag for access to `UserLocation` as a global.

```
<script src="UserLocation.min.js"></script>
<script>
  var location = new UserLocation({...
</script>
```

## Usage

### Options

A configuration object is not required when instantiating UserLocation, but there are a few options available.

```
var location = new UserLocation({
  option: value
});
```

| Option | Type | Default | Description |
|-------------|----------------|---------|------------------------------------------------------------------------------------------------------|
| cacheTtl | number | 604800 | Cache time-to-live in seconds. (Default is 7 days.) |
| fallback | boolean/string | false | Method of obtaining coordinates if initial try fails. Possible values: false, 'general', or 'exact'. |
| specificity | string | 'general' | Initial method of obtaining coordinates. Possible values: 'general' or 'exact'. |                    |

### Return

UserLocation returns a promise, so be sure you understand [how ES2015 promises work](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). In short, you can call the `.then()` method on the promise with an anonymous function that takes the returned coordinates as the first argument, like so:

```
location.then(function(coords) {
  // do something with coords
});
```

This ensures you're not trying to make use of the coordinates before they're available. Promises are a big improvement over the old callback pattern because you can use the promise's results repeatedly throughout your code, whereas a callback is a once-and-done situation.

```
location.then(function(coords) {
  // make use of coordinates in one place
});

// ...

location.then(function(coords) {
  // do something else with those coords in a totally different place in your code
});
```

## Bug Reports

If you think you've found a bug, please post a good quality bug report in [this project's GitHub Issues](https://github.com/kevinsmith/user-location/issues). Quoting from [Coen Jacobs](https://coenjacobs.me/2013/12/06/effective-bug-reports-on-github/), this is how you can best help me understand and fix the issue:

- The title **explains the issue** in just a couple words
- The description **is detailed enough** and contains at least:
  - **steps to reproduce** the issue
  - what the expected result is and **what actually happens**
  - the **version** of the software being used
  - versions of **relevant external software** (e.g. browser and operating system)
- Explain **what you’ve already done** trying to fix this issue
- The report is **written in proper English**

## Thanks

Huge thanks to [nekudo.com](https://nekudo.com) for setting up the free, speedy, and secure IP location lookup service at [https://geoip.nekudo.com/](https://geoip.nekudo.com/).

## License

Copyright 2016 Kevin Smith

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
