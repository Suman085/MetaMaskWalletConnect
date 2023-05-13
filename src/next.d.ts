import { MetaMaskInpageProvider } from "@metamask/providers";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}
