import { Web3ContextInterface } from "@/types/web3Types";
import {
  checkIsTargetChain,
  convertAccounts,
  getChainId,
  switchChain,
} from "@/util";
import * as ethers from "ethers";
import React, { createContext, useEffect, useState } from "react";

declare let window: any;
type Interface = Web3ContextInterface;

const getDefaultContextValue = (): Web3ContextInterface => ({
  isInitializing: true,
  provider: null,
  connectWallet: async () => {},
  accounts: [],
  chainId: null,
  isTargetChain: false,
  isConnected: false,
  error: "",
  switchToTargetChain: async () => {},
});

export const Web3Context = createContext(getDefaultContextValue());

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [provider, setProvider] = useState<Interface["provider"]>(null);
  const [accounts, setAccounts] = useState<Interface["accounts"]>([]);
  const [chainId, setChainId] = useState<Interface["chainId"]>(null);
  const [error, setError] = useState<Interface["error"]>("");
  const [isInitializing, setIsInitializing] =
    useState<Interface["isInitializing"]>(true);
  const [isConnected, setIsConnected] =
    useState<Interface["isConnected"]>(false);
  const [isTargetChain, setIsTargetChain] =
    useState<Interface["isTargetChain"]>(false);

  const connectWallet = (): Promise<void> =>
    initWeb3({ isRequestAccount: true });

  const initWeb3 = async ({ isRequestAccount = false } = {}) => {
    const { ethereum } = process.browser && window;
    try {
      setIsInitializing(true);
      if (ethereum) {
        resetWeb3();
        const _provider = new ethers.providers.Web3Provider(ethereum);
        setProvider(_provider);

        const accountIds = (await ethereum.request({
          method: isRequestAccount ? "eth_requestAccounts" : "eth_accounts",
        })) as string[];
        const _accounts = await convertAccounts(accountIds);
        setAccounts(_accounts);

        const _chainId = await getChainId(_provider);
        handleChainChanged(_chainId);

        ethereum.on("accountsChanged", handleAccountsChanged);
        ethereum.on("chainChanged", handleChainChanged);
      }
    } catch (e) {
      console.error(e);
      setError(String(e));
    } finally {
      setIsInitializing(false);
    }
  };
  const resetWeb3 = () => {
    const { ethereum } = process.browser && window;
    if (!ethereum) {
      ethereum.removeListener("accountsChanged", handleAccountsChanged);
      ethereum.removeListener("chainChanged", handleChainChanged);
    }
  };

  const switchToTargetChain = async () => {
    try {
      setIsInitializing(true);
      provider && (await switchChain({ provider, autoAddChain: true }));
    } catch (e) {
      setError(String(e));
    } finally {
      setIsInitializing(false);
    }
  };

  const handleAccountsChanged = async (accountIds: string[]) => {
    try {
      if (provider) {
        const _accounts = await convertAccounts(accountIds);
        setAccounts(_accounts);
      }
    } catch (e) {
      console.error(e);
      setError(String(e));
    }
  };

  const handleChainChanged = (_chainId: string) => {
    setChainId(_chainId);
    setIsTargetChain(checkIsTargetChain(_chainId));
  };

  useEffect(() => {
    initWeb3();
    return resetWeb3;
  }, []);
  useEffect(() => {
    setIsConnected(!!accounts[0]);
  }, [accounts]);
  return (
    <Web3Context.Provider
      value={{
        provider,
        accounts,
        chainId,
        error,
        isInitializing,
        isTargetChain,
        isConnected,
        connectWallet,
        switchToTargetChain,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
