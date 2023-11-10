import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface AppContainerProps {
  children: ReactNode;
}

const AppContainer = ({ children }: AppContainerProps) => {
  return (
    <Flex w="85vw" mx="auto" justify="center" align="center" direction="column">
      {children}
    </Flex>
  );
};

export default AppContainer;
