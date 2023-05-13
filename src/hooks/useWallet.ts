import React from "react";
import { isWalletAvailable } from "../utils";
import { ethers } from "ethers";

const useWallet = () => {
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

  const getConnectedAccounts = async () => {
    if (!isWalletAvailable()) return;

    const accounts = (await window.ethereum?.request({
      method: "eth_accounts",
    })) as string[];
    setAddress(accounts[0]);
  };

  React.useEffect(() => {
    if (isWalletAvailable()) {
      getConnectedAccounts();
      window.ethereum?.on("accountsChanged", handleAccountsChanged);
    }
    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  const getAccounts = async () => {
    if (!isWalletAvailable()) return;
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

  const getWalletInfo = async () => {
    if (!isWalletAvailable()) return;
    try {
      const provider = new ethers.JsonRpcProvider(
        "https://data-seed-prebsc-1-s1.binance.org:8545"
      );
      const { chainId } = await provider.getNetwork();
      const balance = await provider.getBalance(address);
      setChainId(chainId.toString());
      setBalance(ethers.formatEther(balance));
    } catch (e) {
      console.log(e);
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