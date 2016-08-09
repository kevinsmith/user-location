export default class UserLocation {
  constructor({
    apiKey = null,
    cacheTtl = 604800, // 7 days
    fallback = 'exact', // If IP-based geolocation fails
    specificity = 'general',
  }) {
    this.coords = {
      latitude: null,
      longitude: null,
      accuracy: null,
    };
    this.opt = { apiKey, cacheTtl, fallback, specificity };
    let promise;

    console.log(this.opt);

    if (
      this.opt.apiKey === null &&
      (this.opt.specificity === 'general' || this.opt.fallback === 'general')
    ) {
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

  getGeneral() {
    const promise = new Promise((resolve, reject) => {
      fetch(`https://geoip.maplasso.com/api/?key=${this.opt.apiKey}`, {})
        .then((response) => {
          if (response.ok) {
            response.json().then((json) => {
              this.coords.latitude = json.data.attributes.location.latitude;
              this.coords.longitude = json.data.attributes.location.longitude;
              resolve(this.coords);
            });
          } else {
            reject(`${response.statusText})`);
          }
        },
        (err) => {
          reject(`${err.message}`);
        });
    });

    return promise;
  }
}
