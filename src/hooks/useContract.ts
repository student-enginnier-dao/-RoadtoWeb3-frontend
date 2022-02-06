import { NftContract, NftContract__factory } from "@/util/contracts";
import { useEffect, useState } from "react";
import { useWeb3 } from "./useWeb3";

export const useContract = () => {
  const [contract, setContract] = useState<NftContract | null>(null);
  const { provider } = useWeb3();

  useEffect(() => {
    if (provider && process.env.NEXT_PUBLIC_CONTRACT_ADDRESS) {
      const singerOrProvider = provider.getSigner();
      const _contract = NftContract__factory.connect(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        singerOrProvider
      );
      setContract(_contract);
    }
  }, [provider]);
  return contract;
};
