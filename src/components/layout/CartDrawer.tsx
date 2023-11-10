import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Text,
  Flex,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useCart } from "../../context/CartProvider";
import CartItem from "../cart/CartItem";
import { useAuth } from "../../context/AuthProvider";

interface CartDrawerProps {
  isOpenCartDrawer: boolean;
  onCloseCartDrawer: () => void;
}

const CartDrawer = ({
  isOpenCartDrawer,
  onCloseCartDrawer,
}: CartDrawerProps) => {
  const { cart, setCart } = useCart();
  const { user } = useAuth();
  const toast = useToast();

  const handleSubmitOrder = async () => {
    if (user) {
      try {
        const jwt = user.jwt;
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/orders`,
          { items: cart },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        user.orders.push(response.data);
        toast({
          title: "Order Submitted",
          description: "Your order has been submitted.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        onCloseCartDrawer();
        setCart([]);
      } catch (err) {
        toast({
          title: "Error Submitting Order",
          description: "There was an error submitting your order.  Try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } else {
      toast({
        title: "Login Required",
        description: "Login to place an order.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Drawer
      isOpen={isOpenCartDrawer}
      placement="right"
      onClose={onCloseCartDrawer}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton size="lg" />
        <DrawerHeader fontSize="3xl">Cart</DrawerHeader>
        <DrawerBody mx="auto">
          {cart.map((item) => (
            <CartItem item={item} key={item.product.id} />
          ))}
        </DrawerBody>
        <DrawerFooter>
          <Flex justify="space-between" gap={12}>
            <Button colorScheme="orange" size="lg" onClick={handleSubmitOrder}>
              Submit Order
            </Button>
            <Text fontSize="lg" fontWeight="bold" p={2}>
              Total: $
              {cart
                .map((item) => {
                  return item.product.price * item.quantity;
                })
                .reduce((total, acc) => total + acc, 0)}
            </Text>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
