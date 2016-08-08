export default class UserLocation {
  constructor({
    apiKey,
    cacheTtl = 604800, // 7 days
    fallback = 'exact', // If IP-based geolocation fails
    specificity = 'general',
  }) {
    let coords = {};

    if (specificity === 'exact') {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          console.log(pos.coords);
        },
        (err) => {
          throw new Error(`${err.message} (error code: ${err.code})`);
        }
      );
    } else if (specificity === 'general') {
      // Use GeoIP lookup to get general area
    } else {
      throw new Error('Invalid configuration value for location specificity.');
    }

    coords = 'something';

    console.log(apiKey, cacheTtl, fallback, coords);

    return coords;
  }
}
