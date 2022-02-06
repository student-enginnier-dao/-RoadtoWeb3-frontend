import { useMintMeta, useSelectedImagePath } from "@/hooks/mintHooks";
import { MdAddAPhoto } from "react-icons/md";
import { MintFormWrapper } from "./MintFormWrapper";

export const SelectImage = () => {
  const setNftMeta = useMintMeta()[1];
  const imagePath = useSelectedImagePath();
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files &&
      e.target.files[0] &&
      setNftMeta({ image: e.target.files[0] });
  };
  return (
    <MintFormWrapper step={1}>
      <h2 className="grow-0 p-2 font-anton text-4xl text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
        Step 1: Shot Your Image📷
      </h2>
      <div className="flex flex-col grow px-2 rounded-lg sm:flex-row">
        <p className="text-xl sm:w-1/2">
          In this step, we take images for use in NFT. Press the button on the
          right to take a picture.
        </p>
        <div className="overflow-hidden relative h-2/3 sm:w-1/2">
          <div
            className={`flex flex-col justify-center items-center w-full h-full rounded-lg ${
              imagePath ? "" : "bg-gray-100"
            }`}
          >
            {imagePath ? (
              <img
                src={imagePath}
                alt="selected Image"
                className="max-w-full max-h-full rounded-lg drop-shadow"
              />
            ) : (
              <>
                <div className="flex z-10 text-lg font-bold text-gray-600">
                  Click to Shot Image
                </div>
                <MdAddAPhoto className="w-16 h-16 text-gray-400 " />
              </>
            )}
            <input
              type="file"
              className="absolute inset-0 opacity-0"
              accept="image/*"
              onChange={onFileChange}
            />
          </div>
        </div>
      </div>
    </MintFormWrapper>
  );
};
