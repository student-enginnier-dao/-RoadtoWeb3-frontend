import pinataSDK from "@pinata/sdk";
import formidable from "formidable";

const pinata = pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_SECRET_API_KEY
);
export default async (req, res) => {
  try {
    if (!req.method === "POST") throw new Error("must be post");
    const { files } = await new Promise((resolve, reject) => {
      const form = new formidable.IncomingForm();
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });
    const pinataPromises = Object.entries(files).map(async ([id, file]) => {
      const pinataResult = await pinata.pinFromFS(file.filepath);
      return { [id]: pinataResult };
    });
    const pinataResults = await Promise.all(pinataPromises);
    const result = Object.assign({}, ...pinataResults);
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500);
    res.send("some error happened");
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
