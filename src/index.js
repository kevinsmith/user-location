export default class UserLocation {
  constructor({
    apiKey = null,
    cacheTtl = 604800, // 7 days
    fallback = 'exact', // If IP-based geolocation fails
    specificity = 'general',
  }) {
    let coordsLoaded = false;

    const coords = {
      latitude: null,
      longitude: null,
      accuracy: null,
    };

    if (apiKey === null && (specificity === 'general' || fallback === 'general')) {
      throw new Error('An API key must be included when using GeoCarrot\'s GeoIP lookup.');
    }

    const promise = new Promise((resolve, reject) => {
      if (coordsLoaded) {
        resolve(coords);
      } else if (specificity === 'exact') {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            coordsLoaded = true;
            coords.latitude = pos.coords.latitude;
            coords.longitude = pos.coords.longitude;
            coords.accuracy = pos.coords.accuracy;
            resolve(coords);
          },
          (err) => {
            reject(`${err.message} (error code: ${err.code})`);
          }
        );
      } else if (specificity === 'general') {
        // Use GeoIP lookup to get general area
      } else {
        throw new Error('Invalid configuration value for location specificity.');
      }
    });

    console.log(apiKey, cacheTtl, fallback);

    return promise;
  }
}
