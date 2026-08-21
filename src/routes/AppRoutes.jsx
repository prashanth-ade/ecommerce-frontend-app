import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/home/Home";
import Products from "../pages/products/Products";
import Cart from "../pages/cart/Cart";
import Wishlist from "../pages/wishlist/Wishlist";
import Login from "../pages/auth/Login";
import ProductDetails from "../pages/products/ProductDetails";
import Checkout from "../pages/checkout/Checkout";
import OrderSuccess from "../pages/orders/OrderSuccess";
import Register from "../pages/auth/Register";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import Orders from "../pages/orders/Orders";
import Profile from "../pages/profile/Profile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} ></Route>
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="checkout" element={ 
            <ProtectedRoute>
                <Checkout />
            </ProtectedRoute> } />
        <Route path="orders" element={
            <ProtectedRoute>
                <Orders />
            </ProtectedRoute>
        } />
        <Route path="profile" element={
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
        } />
        <Route path="order-success" element={<OrderSuccess />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;