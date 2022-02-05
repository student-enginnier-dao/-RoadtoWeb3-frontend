export const getLocation = (): Promise<GeolocationPosition> =>
  new Promise((resolve, reject) => {
    if (window) {
      window.navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject("window not found");
    }
  });
