import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface Props {
  children?: ReactNode;
}

interface StripeContextValue {
  clientSecret: string;
  setClientSecret: Dispatch<SetStateAction<string>>;
}

const StripeContext = createContext<StripeContextValue | undefined>(undefined);

export const StripeProvider = ({ children }: Props) => {
  const [clientSecret, setClientSecret] = useState("");

  return (
    <StripeContext.Provider value={{ clientSecret, setClientSecret }}>
      {children}
    </StripeContext.Provider>
  );
};

export const useStripe = () => {
  const context = useContext(StripeContext);
  if (!context) {
    throw new Error("useStripe must be used within a StripeProvider");
  }
  return context;
};
