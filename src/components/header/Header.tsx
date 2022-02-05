import Link from "next/link";
import { HeaderAccount } from "./HeaderAccount";

export const Header = () => {
  return (
    <header className="flex fixed z-10 items-center px-2 w-full h-16 sm:px-8 sm:h-24">
      <Link href="/" passHref>
        <a>
          <h1 className="font-anton text-5xl text-white">NFTravel</h1>
        </a>
      </Link>
      <div className="grow"></div>
      <HeaderAccount />
    </header>
  );
};
