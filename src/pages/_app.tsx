import AppLayout from "@/components/AppLayout";
import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";

const theme = extendTheme({
  components: {
    Button: {
      basStyle: {
        rounded: "full",
        px: 6,
      },
      variants: {
        solid: {
          bg: "orange.400",
          _hover: { bg: "orange.500", color: "white" },
        },
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </ChakraProvider>
  );
}
