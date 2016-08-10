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
export default class UserLocation {
  constructor({
    cacheTtl = 604800, // 7 days
    fallback = false, // If 'specificity' fails
    specificity = 'general',
  } = {}) {
    this.coords = {
      latitude: null,
      longitude: null,
      accuracy: null, // in meters
    };

    this.opt = { cacheTtl, fallback, specificity };

    let fallbackPromise;
    let originalPromise;

    if (specificity === 'exact') {
      originalPromise = this.getExact();
    } else if (specificity === 'general') {
      originalPromise = this.getGeneral();
    } else {
      throw new Error('Invalid configuration value for location specificity.');
    }

    return originalPromise
      .then(() => originalPromise)
      .catch(() => {
        if (fallback === 'exact') {
          fallbackPromise = this.getExact();
        } else if (fallback === 'general') {
          fallbackPromise = this.getGeneral();
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
  getExact() {
    const promise = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.coords.latitude = pos.coords.latitude;
          this.coords.longitude = pos.coords.longitude;
          this.coords.accuracy = pos.coords.accuracy;
          resolve(this.coords);
        },
        (err) => {
          reject(`${err.message} (error code: ${err.code})`);
        }
      );
    });

    return promise;
  }

  /**
   * Get location using Nekudo's IP address lookup service
   *
   * @return {Promise} - Promise wrapped around Fetch response
   */
  getGeneral() {
    const promise = new Promise((resolve, reject) => {
      fetch('https://geoip.nekudo.com/api/', {})
        .then((response) => {
          if (response.ok) {
            response.json()
              .then((json) => {
                if (json.type === 'error') {
                  reject(json.msg);
                } else {
                  // Convert Maxmind's accuracy in kilometers to this lib's standard in meters
                  this.coords.accuracy = json.location.accuracy_radius * 1000;
                  this.coords.latitude = json.location.latitude;
                  this.coords.longitude = json.location.longitude;
                  resolve(this.coords);
                }
              }
            );
          } else {
            reject(response.statusText);
          }
        })
        .catch((err) => {
          reject(err.message);
        });
    });

    return promise;
  }
}
