import AppContainer from "./components/layout/AppContainer";
import LandingPage from "./components/pages/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CheckoutPage from "./components/pages/CheckoutPage";
import CheckoutResultPage from "./components/pages/CheckoutResultPage";

function App() {
  return (
    <AppContainer>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="/checkout-status" element={<CheckoutResultPage />} />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;
