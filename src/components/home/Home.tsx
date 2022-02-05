import { ShowNFTByMeta } from "../ShowNFTByMeta";
import { HomeButton } from "./HomeButton";

export const Home = () => {
  return (
    <div className="flex relative flex-col gap-2 justify-center items-center p-2 h-full sm:flex-row md:gap-10 home-container ">
      <div className="overflow-hidden relative mt-16 w-5/6 rounded-lg drop-shadow-lg sm:w-2/3 sm:max-w-xs max-h-1/3">
        <ShowNFTByMeta
          {...{
            title: "Kiyomizudera",
            imagePath:
              "https://eloquent-nightingale-76e334.netlify.app//title-image.webp",
            color: "#0c4a6e",
            lng: 135.7848,
            lat: 34.995,
          }}
        />
      </div>
      <section className="flex relative flex-col gap-2 px-6 mb-8 drop-shadow">
        <h1 className="font-anton text-5xl text-white sm:text-4xl md:text-6xl text">
          Non-Fungible Travel
        </h1>
        <p className="text-2xl font-semibold text-gray-200">
          {"Let's engrave your travel memories on the blockchain!"}
        </p>
        <HomeButton />
      </section>
    </div>
  );
};
