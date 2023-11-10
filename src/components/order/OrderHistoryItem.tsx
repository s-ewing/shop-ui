import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Order } from "../../types/order";

interface OrderHistoryItemProps {
  order: Order;
}

const OrderHistoryItem = ({ order }: OrderHistoryItemProps) => {
  const dateTime = new Date(order.timePlaced);
  const formattedTime = dateTime.toLocaleDateString();

  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Order {order.id}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Stack spacing={4}>
            <Box as="span" textAlign="left">
              <Text fontSize="md" fontWeight="bold">
                Status
              </Text>
              {order.orderStatus}
            </Box>
            <Box as="span" textAlign="left">
              <Text fontSize="md" fontWeight="bold">
                Date Placed
              </Text>
              {formattedTime}
            </Box>
            <Box as="span" textAlign="left">
              <Text fontSize="md" fontWeight="bold">
                Summary
              </Text>
              {order.items.map((item) => (
                <Flex justify="space-between" key={item.product.id}>
                  <Text>{item.product.name}</Text>
                  <Text>x{item.quantity}</Text>
                  <Text>${item.quantity * item.product.price}</Text>
                </Flex>
              ))}
            </Box>
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default OrderHistoryItem;
