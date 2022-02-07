import { HomeButton } from "./HomeButton";

export const Home = () => {
  return (
    <div className="flex relative flex-col gap-2 justify-center items-center p-2 h-full sm:flex-row md:gap-10 home-container ">
      <div className="overflow-hidden relative mt-16 w-5/6 rounded-lg drop-shadow-lg sm:w-2/3 sm:max-w-xs max-h-1/3">
        <iframe
          src="https://gateway.pinata.cloud/ipfs/QmU6MhSKyXhmo8gQNVeLg4Fzd3c2qVeDHGX9UGHXaHPQW5"
          className="aspect-[5/8] w-full max-h-full bg-gray-200"
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
