import { useAuth } from "../../context/AuthProvider";
import OrderHistoryItem from "./OrderHistoryItem";

const OrderHistory = () => {
  const { user } = useAuth();
  return (
    <div>
      {user?.orders.map((order) => (
        <OrderHistoryItem order={order} key={order.id} />
      ))}
    </div>
  );
};

export default OrderHistory;
