import { ReactNode } from "react";
import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  HStack,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";

const NavLink = ({
  children,
  active,
  ...rest
}: { children: ReactNode; active: boolean } & LinkProps) => (
  <Box
    color={active ? "orange.400" : ""}
    fontWeight={active ? "semibold" : "medium"}
  >
    <Link {...rest}>{children}</Link>
  </Box>
);

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing="2rem">
            <NavLink href="/" active={router.pathname === "/"}>
              Wallet
            </NavLink>
            <NavLink
              href="/converter"
              active={router.pathname === "/converter"}
            >
              Currency converter
            </NavLink>
          </HStack>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
