import { Home } from "@/components/home/Home";
import { Mint } from "@/components/mint/Mint";

const Page = (): JSX.Element => {
  return (
    <div className="w-full h-full">
      <Home />
      <Mint />
    </div>
  );
};

export default Page;
