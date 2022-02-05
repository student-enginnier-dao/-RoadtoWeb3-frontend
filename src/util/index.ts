import { Account, ChainParameters } from "@/types/web3Types";
import * as ethers from "ethers";

export const convertAccounts = (accounts: string[]): Promise<Account[]> => {
  const convertPromises = accounts.map(async (id): Promise<Account> => {
    const provider = new ethers.providers.InfuraProvider(
      "homestead",
      process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
    );
    const ethName = await provider.lookupAddress(id);
    const avatar = ethName && (await provider.getAvatar(ethName));

    return { id, ethName, avatar };
  });
  return Promise.all(convertPromises);
};

export const getChainId = (
  provider: ethers.providers.Web3Provider
): Promise<string> => provider.send("eth_chainId", []);

export const checkIsTargetChain = (chainId: string) =>
  chainId === process.env.NEXT_PUBLIC_TARGET_CHAIN_ID;

export const switchChain = async ({
  provider,
  autoAddChain = false,
  chainId = process.env.NEXT_PUBLIC_TARGET_CHAIN_ID || "",
}: {
  provider: ethers.providers.Web3Provider;
  autoAddChain?: boolean;
  chainId?: string;
}) => {
  if (provider) {
    if (autoAddChain) {
      const chainParameter = chainParameters[chainId];
      if (!chainParameter) new Error("chain parameter not found");
      await provider.send("wallet_addEthereumChain", [chainParameter]);
    }
    await provider.send("wallet_switchEthereumChain", [{ chainId }]);
  }
};

export const chainParameters: ChainParameters = {
  "0x89": {
    chainId: "0x89",
    blockExplorerUrls: ["https://polygonscan.com/"],
    chainName: "Polygon Mainnet",
    iconUrls: [],
    nativeCurrency: {
      decimals: 18,
      name: "MATIC",
      symbol: "MATIC",
    },
    rpcUrls: ["https://polygon-rpc.com/"],
  },
  "0x13881": {
    chainId: "0x13881",
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    chainName: "Matic Mumbai",
    iconUrls: [],
    nativeCurrency: {
      decimals: 18,
      name: "MATIC",
      symbol: "MATIC",
    },
    rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
  },
};
