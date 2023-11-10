import { ReactNode, createContext, useContext, useState } from "react";
import { User } from "../types/user";
import { useCart } from "./CartProvider";

interface Props {
  children?: ReactNode;
}

interface AuthContextValue {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const { setCart } = useCart();

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    setCart([]);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
