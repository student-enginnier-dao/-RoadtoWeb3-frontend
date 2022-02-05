import { ethers } from "ethers";

export interface Account {
  id: string;
  ethName: string | null;
  avatar: string | null;
}

export interface Web3ContextInterface {
  provider: ethers.providers.Web3Provider | null;
  accounts: Account[];
  chainId: string | null;
  isInitializing: boolean;
  isTargetChain: boolean;
  isConnected: boolean;
  error: string;
  connectWallet: () => Promise<void>;
  switchToTargetChain: () => Promise<void>;
}

export interface ChainParameters {
  [chainId: string]: ChainParameter;
}

export interface ChainParameter {
  chainId: string;
  blockExplorerUrls: string[];
  chainName: string;
  iconUrls: string[];
  nativeCurrency: {
    decimals: number;
    name: string;
    symbol: string;
  };
  rpcUrls: string[];
}
