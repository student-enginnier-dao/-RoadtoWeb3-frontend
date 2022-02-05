import { getLocation } from "@/util/mint";
import { MintFormWrapper } from "./MintFormWrapper";

export const GetLocation = () => {
  const onClick = async () => {
    try {
      const pos = await getLocation();
      console.log(pos);
    } catch (e) {
      window && window.alert("Failed to acquire location information.");
      console.error(e);
    }
  };
  return (
    <MintFormWrapper step={2}>
      <h2 className="grow-0 p-2 font-anton text-4xl text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
        Step 2: Get Your Location🧭
      </h2>
      <div className="flex flex-col grow px-2 rounded-lg sm:flex-row">
        <p className="text-xl sm:w-1/2">
          In this step, we obtain the location information to be used for NFT.
          Please press the button on the right to allow our program to get your
          location information.
        </p>
        <div className="relative mt-2 h-2/3 sm:w-1/2">
          <button className="home-button" onClick={onClick}>
            Get Your Location
          </button>
        </div>
      </div>
    </MintFormWrapper>
  );
};
