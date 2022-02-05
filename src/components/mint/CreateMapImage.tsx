import { useMintMeta } from "@/hooks/mintHooks";
import { HexColorPicker } from "react-colorful";
import { MintFormWrapper } from "./MintFormWrapper";

export const CreateMapImage = () => {
  const [metaData, setMetaData] = useMintMeta();
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMetaData({ title: e.target.value });
  return (
    <MintFormWrapper step={3}>
      <h2 className="grow-0 p-2 font-anton text-4xl text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
        Step 3: Create Your Card🔧
      </h2>
      <div className="flex flex-col grow gap-4 px-2 rounded-lg">
        <p className="text-xl">{`Enter the information for your NFT.`}</p>
        <div className="flex flex-col gap-2 max-w-lg">
          <label className="font-anton text-3xl">Your NFT Title</label>
          <input
            placeholder="Type Your NFT Title"
            className="p-2 font-anton text-xl text-gray-900 rounded-lg"
            value={metaData.title}
            onChange={onTitleChange}
          />
          <label className="font-anton text-3xl">Choose BackGround Color</label>
          <HexColorPicker
            color={metaData.color}
            onChange={(color) => setMetaData({ color })}
          />
        </div>
      </div>
    </MintFormWrapper>
  );
};
