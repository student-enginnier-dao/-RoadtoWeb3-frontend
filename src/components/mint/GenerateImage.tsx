import {
  useCardUrl,
  useCradBlob,
  useMintMeta,
  useShowMetaData,
} from "@/hooks/mintHooks";
import imageCompression from "browser-image-compression";
import { useState } from "react";
import { MintFormWrapper } from "./MintFormWrapper";

export const GenerateImage = () => {
  const [mintData] = useMintMeta();
  const showData = useShowMetaData();
  const [isProcessing, setIsProcessing] = useState(false);
  const setCardBlob = useCradBlob()[1];
  const cardUrl = useCardUrl();

  const loadMap = async () => {
    setIsProcessing(true);
    try {
      const { image } = mintData;
      if (image && !cardUrl) {
        const compressedImage = await imageCompression(image, {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 630,
        });
        const dataURL = await new Promise((resolve) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(compressedImage);
          fileReader.onload = function () {
            resolve(this.result);
          };
        });
        const postData = { ...showData, imagePath: dataURL };
        const response = await fetch("/api/generateImage", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });
        const cardBlob = await response.blob();
        setCardBlob(cardBlob);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <MintFormWrapper step={5}>
      <h2 className="grow-0 p-2 font-anton text-4xl text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
        Step 6. Create static NFT card images
      </h2>
      <div className="flex flex-col grow gap-2 px-4">
        <p className="text-xl">
          It mainly generates images to be used when HTML cannot be embedded,
          such as spreading on SNS. It may take some time to generate the image,
          so please wait until you can press the Next button.
        </p>
        <button
          className="home-button"
          onClick={loadMap}
          disabled={isProcessing}
        >
          Start Generate
        </button>
        <div className="aspect-[120/63] flex justify-center items-center w-full bg-gray-50 rounded-lg">
          {cardUrl && <img src={cardUrl} />}
          {isProcessing && (
            <p className="font-anton text-2xl text-gray-900 loading-dot">
              Now Loading
            </p>
          )}
        </div>
      </div>
    </MintFormWrapper>
  );
};

export default GenerateImage;
