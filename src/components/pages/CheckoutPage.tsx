import { Box, Flex } from "@chakra-ui/react";
import NavBar from "../layout/NavBar";
import CheckoutForm from "../forms/CheckoutForm";
import { useAuth } from "../../context/AuthProvider";
import { useCart } from "../../context/CartProvider";

const CheckoutPage = () => {
  const { user } = useAuth();
  const { cart } = useCart();
  return (
    <Box w="100%">
      <NavBar />
      {user && cart.length !== 0 ? (
        <CheckoutForm />
      ) : !user ? (
        <Flex justify="center" mt={16} fontSize="xl">
          You must login before checking out.
        </Flex>
      ) : (
        <Flex justify="center" mt={16} fontSize="xl">
          Add items to cart before checking out.
        </Flex>
      )}
    </Box>
  );
};

export default CheckoutPage;
