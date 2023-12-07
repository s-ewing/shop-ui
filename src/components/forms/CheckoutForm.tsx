import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { Box } from "@chakra-ui/react";
import { loadStripe } from "@stripe/stripe-js";
import { useStripe } from "../../context/StripeProvider";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const { clientSecret } = useStripe();
  const options = { clientSecret };
  return (
    <Box id="checkout" mt={16}>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </Box>
  );
};

export default CheckoutForm;
