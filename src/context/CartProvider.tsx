import {
  ReactNode,
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { Product } from "../types/product";
import { OrderItem } from "../types/order";

interface Props {
  children?: ReactNode;
}

interface CartContextValue {
  cart: OrderItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  decrementQuantity: (product: Product) => void;
  setCart: Dispatch<SetStateAction<OrderItem[]>>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<OrderItem[]>([]);

  const addToCart = (product: Product) => {
    const existingCartItem = cart.find(
      (item) => item.product.id === product.id
    );

    if (existingCartItem) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.product.id === existingCartItem.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { product, quantity: 1 }]);
    }
  };

  const decrementQuantity = (product: Product) => {
    const existingCartItem = cart.find(
      (item) => item.product.id === product.id
    );

    if (existingCartItem) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const removeFromCart = (product: Product) => {
    const existingCartItem = cart.find(
      (item) => item.product.id === product.id
    );

    if (existingCartItem) {
      setCart((prevCart) =>
        prevCart.filter((item) => item.product.id !== product.id)
      );
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, decrementQuantity, setCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
