import { Box, BoxProps } from "@chakra-ui/react";
import Nav from "../NavBar";

const AppLayout = ({
  children,
  ...rest
}: BoxProps & { children: React.ReactNode }) => {
  return (
    <Box {...rest}>
      <Nav />
      {children}
    </Box>
  );
};

export default AppLayout;
