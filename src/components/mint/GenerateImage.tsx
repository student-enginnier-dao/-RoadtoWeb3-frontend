import { useState } from "react";
import { MintFormWrapper } from "./MintFormWrapper";

export const GenerateImage = () => {
  const [isProcessing] = useState(false);

  const loadMap = async () => {};

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
      </div>
    </MintFormWrapper>
  );
};

export default GenerateImage;
