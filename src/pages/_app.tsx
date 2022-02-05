import { Header } from "@/components/header/Header";
import { Web3Provider } from "@/components/Web3Provider";
import "mapbox-gl/dist/mapbox-gl.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Web3Provider>
        <Header />
        <Component {...pageProps} />
      </Web3Provider>
    </RecoilRoot>
  );
}

export default MyApp;
