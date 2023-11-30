import {
  Card,
  CardBody,
  Button,
  Image,
  Box,
  Heading,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Product } from "../../types/product";
import { useCart } from "../../context/CartProvider";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <Card maxW="sm" my={2}>
      <CardBody background="orange.200" borderRadius="lg">
        <Image
          src={product.imgSrc}
          alt={product.description}
          borderRadius="lg"
          border="1px solid teal"
          h="xs"
          w="xs"
        />
        <Flex mt="3" align="center" justify="space-between">
          <Box>
            <Heading size="md">{product.name}</Heading>
            <Text color="cyan.800" fontSize="lg" fontWeight="bold">
              ${product.price}
            </Text>
          </Box>

          <Button
            size="sm"
            colorScheme="orange"
            onClick={() => addToCart(product)}
          >
            +
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
