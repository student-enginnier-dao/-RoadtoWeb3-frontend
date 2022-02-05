import { useIsOpenMint } from "@/hooks/mintHooks";
import { useWeb3 } from "@/hooks/useWeb3";
import React from "react";

export const HomeButton = () => {
  const {
    isInitializing,
    isConnected,
    isTargetChain,
    switchToTargetChain,
    connectWallet,
  } = useWeb3();
  const setIsOpenMint = useIsOpenMint()[1];

  if (isInitializing) {
    return (
      <button className="home-button " disabled>
        Now Loading...
      </button>
    );
  } else if (isConnected && isTargetChain) {
    return (
      <button className=" home-button" onClick={() => setIsOpenMint(true)}>
        {"Let's Mint!!"}
      </button>
    );
  } else if (isConnected && !isTargetChain) {
    return (
      <button className="home-button" onClick={switchToTargetChain}>
        Switch To Polygon
      </button>
    );
  } else if (!isConnected) {
    return (
      <button className="home-button" onClick={connectWallet}>
        Connect To MetaMask
      </button>
    );
  } else {
    return (
      <button className="text-red-500 home-button" disabled>
        MetaMask Not Found
      </button>
    );
  }
};
