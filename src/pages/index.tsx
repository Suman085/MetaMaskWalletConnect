"use client";
import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  VStack,
  Alert,
  AlertIcon,
  Box,
  AlertTitle,
  AlertDescription,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import useWallet from "@/hooks/useWallet";

export const WALLET_RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;

export default function Wallet() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const {
    getAccounts,
    isWalletConnected,
    address,
    chainId,
    balance,
    error,
    getWalletInfo,
  } = useWallet(WALLET_RPC_URL as string);
  console.log(error);
  React.useEffect(() => {
    if (address) {
      getWalletInfo();
    }
  }, [address, getWalletInfo]);

  const disconnect = () => {
    onOpen();
  };
  return (
    <VStack>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              How to disconnect?
            </AlertDialogHeader>

            <AlertDialogBody>
              You can disconnect the account connection via your metamask app
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                colorScheme="red"
                onClick={onClose}
                ml={3}
              >
                Got IT!
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <TableContainer my="5rem" w="100%">
        <Table variant="simple" colorScheme="gray">
          <TableCaption>Your wallet details</TableCaption>
          <Thead>
            <Tr>
              <Th>KEY</Th>
              <Th>VALUE</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td width="30%">Wallet Address:</Td>
              <Td width="70%">{address || "-"}</Td>
            </Tr>
            <Tr>
              <Td>ChainId</Td>
              <Td>{chainId || "-"}</Td>
            </Tr>
            <Tr>
              <Td>Balance</Td>
              <Td>{balance || "-"}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      {error && (
        <Alert status="error" w="50%">
          <AlertIcon />
          <Box>
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Box>
        </Alert>
      )}
      {!isWalletConnected() ? (
        <VStack spacing={"1rem"} w="50%">
          <Alert status="warning">
            <AlertIcon />
            <Box>
              <AlertTitle>Info!</AlertTitle>
              <AlertDescription>
                You are not connected to your wallet. Click on the button below
                to connect to your wallet
              </AlertDescription>
            </Box>
          </Alert>
          <Button onClick={getAccounts}>Connect</Button>
        </VStack>
      ) : (
        <Button onClick={disconnect}>Disconnect</Button>
      )}
    </VStack>
  );
}
