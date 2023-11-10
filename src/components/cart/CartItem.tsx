import {
  Flex,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
} from "@chakra-ui/react";
import { OrderItem } from "../../types/order";
import { useCart } from "../../context/CartProvider";

interface CartItemProps {
  item: OrderItem;
}

const CartItem = ({ item }: CartItemProps) => {
  const { addToCart, decrementQuantity, removeFromCart } = useCart();

  return (
    <Flex
      align="center"
      justify="space-between"
      gap={8}
      borderBottom="1px solid black"
      p={4}
    >
      <Text fontSize="lg">{item.product.name}</Text>
      <Flex>
        <NumberInput min={1} defaultValue={item.quantity} size="sm" maxW={16}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper onClick={() => addToCart(item.product)} />
            <NumberDecrementStepper
              onClick={() => {
                if (item.quantity > 1) decrementQuantity(item.product);
              }}
            />
          </NumberInputStepper>
        </NumberInput>
        <Button
          size="sm"
          colorScheme="cyan"
          ml={6}
          onClick={() => removeFromCart(item.product)}
        >
          Remove
        </Button>
      </Flex>
      <Text>${item.product.price * item.quantity}</Text>
    </Flex>
  );
};

export default CartItem;
