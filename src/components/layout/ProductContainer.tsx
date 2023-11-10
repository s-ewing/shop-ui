import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ProductContainerProps {
  children: ReactNode;
}

const ProductContainer = ({ children }: ProductContainerProps) => {
  return (
    <Flex
      w="100%"
      align="center"
      justify="center"
      wrap="wrap"
      background="cyan.800"
    >
      {children}
    </Flex>
  );
};

export default ProductContainer;
