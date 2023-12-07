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
} from "@chakra-ui/react";
import { useCart } from "../../context/CartProvider";
import CartItem from "../cart/CartItem";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useStripe } from "../../context/StripeProvider";
import axios from "axios";

interface CartDrawerProps {
  isOpenCartDrawer: boolean;
  onCloseCartDrawer: () => void;
}

const CartDrawer = ({
  isOpenCartDrawer,
  onCloseCartDrawer,
}: CartDrawerProps) => {
  const { cart } = useCart();
  const { user } = useAuth();
  const { setClientSecret } = useStripe();

  const handleSubmitOrder = async () => {
    if (cart.length === 0) {
      onCloseCartDrawer();
      return;
    }
    if (user) {
      const jwt = user.jwt;
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/orders`,
          { items: cart },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        setClientSecret(response.data.stripeClientSecret);
      } catch (err) {
        console.error(err);
      }
    }
    onCloseCartDrawer();
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
            <Link to="/checkout">
              <Button
                colorScheme="orange"
                size="lg"
                onClick={handleSubmitOrder}
              >
                Checkout
              </Button>
            </Link>
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
