import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import NavBar from "../layout/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Order, OrderStatus } from "../../types/order";

const CheckoutResultPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get("session_id");
  const [newOrder, setNewOrder] = useState<Order | null>(null);
  const [isBadRequest, setIsBadRequest] = useState(false);

  useEffect(() => {
    const getOrderWithPaymentStatus = async (sessionId: String) => {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/orders`,
          { sessionId }
        );
        setNewOrder(response.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          setIsBadRequest(true);
        }
      }
    };
    if (sessionId) {
      getOrderWithPaymentStatus(sessionId);
    }
  }, []);

  return (
    <Box w="100%">
      <NavBar />
      {newOrder ? (
        newOrder.orderStatus === OrderStatus.PAID ? (
          <Flex align="center" justify="center" fontSize="2xl" mt={16}>
            Your order has been placed. Login to view order history in your
            profile.
          </Flex>
        ) : (
          <Flex align="center" justify="center" fontSize="2xl" mt={16}>
            Failed to place order. Try again.
          </Flex>
        )
      ) : !isBadRequest ? (
        <Flex justify="center" mt={16}>
          <Spinner color="orange" size="xl" />
        </Flex>
      ) : (
        <Flex justify="center" mt={16} fontSize="xl">
          Could not find order. Try placing your order again.
        </Flex>
      )}
    </Box>
  );
};

export default CheckoutResultPage;
