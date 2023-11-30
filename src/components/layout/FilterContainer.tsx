import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface FilterContainerProps {
  children: ReactNode;
}

const FilterContainer = ({ children }: FilterContainerProps) => {
  return (
    <Flex
      w="100%"
      align="center"
      justify="space-evenly"
      background="whiteAlpha.900"
      p={4}
      wrap="wrap"
    >
      {children}
    </Flex>
  );
};

export default FilterContainer;
