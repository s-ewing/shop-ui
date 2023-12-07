import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { CartProvider } from "./context/CartProvider.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { StripeProvider } from "./context/StripeProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <CartProvider>
        <AuthProvider>
          <StripeProvider>
            <App />
          </StripeProvider>
        </AuthProvider>
      </CartProvider>
    </ChakraProvider>
  </React.StrictMode>
);
