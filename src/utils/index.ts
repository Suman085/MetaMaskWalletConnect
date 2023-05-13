export const isWalletAvailable = () => {
  return (
    typeof window !== "undefined" && typeof window.ethereum !== "undefined"
  );
};
