export default class UserLocation {
  constructor({
    cacheTtl = 604800, // 7 days
    fallback = 'exact', // If IP-based geolocation fails
    specificity = 'general',
  } = {}) {
    this.coords = {
      latitude: null,
      longitude: null,
      accuracy: null, // in meters
    };
    let promise;
    this.opt = { cacheTtl, fallback, specificity };

    console.log(this.opt);

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
      fetch('https://geoip.nekudo.com/api/', {})
        .then((response) => {
          if (response.ok) {
            response.json()
              .then((json) => {
                // Convert Maxmind's accuracy in kilometers to this lib's standard in meters
                this.coords.accuracy = json.location.accuracy_radius * 1000;
                this.coords.latitude = json.location.latitude;
                this.coords.longitude = json.location.longitude;
                resolve(this.coords);
              }
            );
          } else {
            reject(`${response.statusText})`);
          }
        })
        .catch((err) => {
          reject(`${err.message}`);
        });
    });

    return promise;
  }
}
