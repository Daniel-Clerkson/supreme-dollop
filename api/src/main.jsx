import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CartProvider } from "./components/Cart/CartFunctionality";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </CartProvider>
);
