"use client";
import AppLayout from "@/components/AppLayout";
import ConverterCard from "@/components/ConverterCard";
import { Stack, Button, Box, VStack } from "@chakra-ui/react";
import Link from "next/link";

export default function CurrencyConverter() {
  return (
    <Stack
      textAlign={"center"}
      align={"center"}
      justify="center"
      mx="1rem"
      spacing={{ base: 8, md: 10 }}
    >
      <VStack spacing="2rem">
        <ConverterCard mt={{ base: 8, md: 12 }} />
        <Button as={Link} variant={"solid"} href={"/"} width="full">
          Back to my wallet
        </Button>
      </VStack>
    </Stack>
  );
}
