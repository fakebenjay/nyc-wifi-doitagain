class Here {
  constructor(latitude, longitude) {
    this.latitude = latitude
    this.longitude = longitude
  }

  static whereAmI() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve(new Here (
            position.coords.latitude,
            position.coords.longitude
          ))
        });
      } else {
        reject("Geolocation is not supported by this browser.")
      }
    })
  }
}
