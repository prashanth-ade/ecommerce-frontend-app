import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <HelmetProvider>
                <App />
              </HelmetProvider>
                <ToastContainer
                  position="top-right"
                  autoClose={2500}
                  hideProgressBar={false}
                  newestOnTop
                  closeOnClick
                  pauseOnHover
                  draggable
                />
              
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);