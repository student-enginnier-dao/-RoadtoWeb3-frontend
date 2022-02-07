import { useCradBlob, useMintMeta, useShowMetaData } from "@/hooks/mintHooks";
import { useContract } from "@/hooks/useContract";
import { createNFTHTML } from "@/util/createNftHtml";
import { uploadFiles } from "@/util/mint";
import imageCompression from "browser-image-compression";
import { ethers } from "ethers";
import { useState } from "react";
import { MintFormWrapper } from "./MintFormWrapper";

export const UploadAndMint = () => {
  const showData = useShowMetaData();
  const [mintData] = useMintMeta();
  const [cardBlob] = useCradBlob();
  const [isNizi, setIsNizi] = useState(false);
  const [result, setResult] = useState<string>("");
  const contract = useContract();
  const [status, setStatus] = useState<string | null>(null);
  const mintProcess = async () => {
    try {
      if (cardBlob && contract) {
        setStatus("uploading image to IPFS");
        const uploadResult = await upload();
        if (!uploadResult) throw new Error("upload error");
        setStatus("uploading metadata to IPFS");

        const uploadedMetaResult = await uploadMetadata(uploadResult);
        setStatus("Carving it into the blockchain.");
        console.log(uploadedMetaResult);
        const mintResult = isNizi
          ? await mintNizi(uploadedMetaResult)
          : await mint(uploadedMetaResult);
        mintResult &&
          setResult(
            `${process.env.NEXT_PUBLIC_OPENSEA_URI}/${mintResult.hash}`
          );

        setStatus("DONE!!");
      }
    } catch (e) {
      console.error(e);
      setStatus("some error happened");
    }
  };
  const mint = async (uploadedMetaResult: any) => {
    if (contract) {
      await contract.choice(false);
      const result = await contract.onlymint(
        `ipfs://${uploadedMetaResult.IpfsHash}`
      );
      return result;
    }
  };
  const mintNizi = async (uploadedMetaResult: any) => {
    if (contract) {
      await contract.choice(true);
      await contract.deposit({ value: ethers.utils.parseEther("0.1") });
      const result = await contract.secondmint(
        `ipfs://${uploadedMetaResult.IpfsHash}`
      );
      return result;
    }
  };
  const upload = async () => {
    const { image } = mintData;
    if (cardBlob && image) {
      const compressedImage = await imageCompression(image, {
        maxSizeMB: 0.5,
        fileType: "image/webp",
        initialQuality: 0.75,
      });
      const dataURL = await new Promise<string>((resolve) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(compressedImage);
        fileReader.onload = function () {
          resolve(String(this.result));
        };
      });

      const htmlText = createNFTHTML({ ...showData, imagePath: dataURL });
      const htmlBlob = new Blob([htmlText], { type: "text/html" });
      const result = await uploadFiles({ card: cardBlob, html: htmlBlob });
      return result;
    }
  };
  const uploadMetadata = async (uploadResult: any) => {
    const nftMetaData = {
      image: `ipfs://${uploadResult.card.IpfsHash}`,
      external_url: "https://roadto-web3-frontend.vercel.app/",
      name: `${mintData.title} ~NFTravel~`,
      description: `NFTravel titled ${mintData.title}.
      The photo was taken at ${showData.lat} degrees latitude ${showData.lng} degrees longitude`,
      background_color: mintData.color.slice(1),
      animation_url: `https://gateway.pinata.cloud/ipfs/${uploadResult.html.IpfsHash}`,
      attributes: [
        {
          display_type: "date",
          trait_type: "Date of shooting",
          value: Date.now(),
        },
        {
          display_type: "number",
          trait_type: "Latitude ",
          value: showData.lat,
        },
        {
          display_type: "number",
          trait_type: "Longitude",
          value: showData.lng,
        },
      ],
    };
    const json = JSON.stringify(nftMetaData);
    const jsonBlob = new Blob([json], { type: "application/json" });
    const result = await uploadFiles({ json: jsonBlob });
    return result.json;
  };

  return (
    <MintFormWrapper step={6}>
      <h2 className="grow-0 p-2 font-anton text-4xl text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
        Step 6: Mint!!!!
      </h2>
      <p className="mx-2 text-2xl">
        Last step. Mint by clicking on the button below. You will be asked to
        sign twice (or three times if you have enabled resale), which is normal.
      </p>
      <button
        className="p-2 mx-4 mt-16 font-anton text-4xl bg-gradient-to-r from-cyan-500 via-pink-500 to-blue-500 rounded-lg"
        onClick={mintProcess}
        disabled={Boolean(status)}
      >
        {status ? (
          <span className={`${status !== "DONE!!" && "loading-dot"}`}>
            {status}
          </span>
        ) : (
          "Start Mint Process!!!"
        )}
      </button>
      <div className="flex items-center mx-auto text-xl form-check">
        <input
          type="checkbox"
          className="w-5 h-5"
          onChange={(e) => setIsNizi(e.target.checked)}
          disabled={Boolean(status)}
        />
        <label>Whether to allow resale (there is a fee)</label>
      </div>
      {result && (
        <p className="mx-4 text-xl text-center">
          Mint Process All Done!! You can see your NFT on
          <a href={result} className="text-red-500">
            this opensea link.
          </a>
          (It will take some time for OpenSea to reflect the results.)
        </p>
      )}
    </MintFormWrapper>
  );
};
