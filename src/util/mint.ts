export const getLocation = (): Promise<GeolocationPosition> =>
  new Promise((resolve, reject) => {
    if (window) {
      window.navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject("window not found");
    }
  });

export const uploadFiles = async (files: {
  [id in string]: Blob;
}) => {
  const formData = new FormData();
  for (const [id, file] of Object.entries(files)) formData.append(id, file);
  const res = await fetch("/api/uploadToIpfs", {
    method: "POST",
    body: formData,
  });
  const result = (await res.json()) as {
    [id in string]: { IpfsHash: string; PinSize: number };
  };
  return result;
};
