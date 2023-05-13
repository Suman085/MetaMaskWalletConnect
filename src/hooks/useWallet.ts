import React from "react";
import { isWalletAvailable } from "../utils";
import { ethers } from "ethers";

const useWallet = (rpcUrl: string) => {
  if (!rpcUrl) throw "Provide rpc url";
  const [address, setAddress] = React.useState("");
  const [chainId, setChainId] = React.useState("");
  const [balance, setBalance] = React.useState("");
  const [error, setError] = React.useState("");

  const isWalletConnected = () => {
    return Boolean(address);
  };

  const handleAccountsChanged = (accounts: unknown) => {
    if (accounts instanceof Array) {
      if (accounts && accounts.length > 0) {
        setAddress(accounts[0]);
      } else {
        setAddress("");
        setChainId("");
        setBalance("");
      }
    }
  };

  /**
   *
   * query to get currently connected accounts
   */
  const getConnectedAccounts = async () => {
    if (!isWalletAvailable()) return;

    const accounts = (await window.ethereum?.request({
      method: "eth_accounts",
    })) as string[];
    setAddress(accounts[0]);
  };

  /**
   * handle change if user changes account from metamask app
   */
  React.useEffect(() => {
    if (isWalletAvailable()) {
      getConnectedAccounts();
      window.ethereum?.on("accountsChanged", handleAccountsChanged);
    }
    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  /**
   * try connect metamask and get accounts
   */
  const getAccounts = async () => {
    if (!isWalletAvailable()) {
      setError("MetaMask Wallet not present. Please install and retry");
      return;
    }
    try {
      const accounts: string[] = (await window.ethereum?.request({
        method: "eth_requestAccounts",
      })) as string[];
      if (accounts?.length > 0) {
        setAddress(accounts[0]);
      } else {
        setError("Not connected");
      }
    } catch (e) {
      setError(`Something went wrong ${e}`);
    }
  };

  /**
   * getChainId and balance of the wallet
   */
  const getWalletInfo = async () => {
    if (!isWalletAvailable()) return;
    try {
      const provider = new ethers.JsonRpcProvider(rpcUrl);
      const { chainId } = await provider.getNetwork();
      const balance = await provider.getBalance(address);
      setChainId(chainId.toString());
      setBalance(ethers.formatEther(balance));
    } catch (e) {
      setError(`Something went wrong ${e}`);
    }
  };

  const disconnect = () => {
    //todo implement
  };

  return {
    getAccounts,
    getWalletInfo,
    disconnect,
    address,
    chainId,
    balance,
    isWalletConnected,
    error,
  };
};
export default useWallet;
