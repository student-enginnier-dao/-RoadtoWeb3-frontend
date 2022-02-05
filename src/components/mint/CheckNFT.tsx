import { useShowMetaData } from "@/hooks/mintHooks";
import { ShowNFTByMeta } from "../ShowNFTByMeta";
import { MintFormWrapper } from "./MintFormWrapper";

export const CheckNFT = () => {
  const data = useShowMetaData();
  return (
    <MintFormWrapper step={4}>
      <h2 className="grow-0 p-2 font-anton text-4xl text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
        Step 4: Check Your NFT👀
      </h2>
      <div className="flex grow justify-center items-center">
        <div className="overflow-hidden rounded-lg">
          <ShowNFTByMeta {...data} />
        </div>
      </div>
    </MintFormWrapper>
  );
};
