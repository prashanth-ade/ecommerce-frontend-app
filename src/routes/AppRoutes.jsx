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
import NotFound from "../pages/notFound/notFound";
import Contact from "../pages/contactUs/Contact";
import Payment from "../pages/payment/Payment";

import AdminLogin from "../admin/pages/adminLogin/AdminLogin";
import AdminDashboard from "../admin/pages/adminDashboard/AdminDashboard";
import AdminProducts from "../admin/pages/adminProducts/AdminProducts";
import AdminInventory from "../admin/pages/adminInventory/AdminInventory";
import AdminOrders from "../admin/pages/adminOrders/AdminOrders";
import AdminCustomers from "../admin/pages/adminCustomers/AdminCustomers";
import AdminReviews from "../admin/pages/adminReviews/AdminReviews";
import AdminReports from "../admin/pages/adminReports/AdminReports";
import AdminSettings from "../admin/pages/adminSettings/AdminSettings";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} ></Route>
        <Route path="contact" element={<Contact />} />
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
        <Route path="*" element={<NotFound /> } />
        <Route
          path="/payment"
          element={<Payment />}
        />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/products" element= {<AdminProducts />} />
      <Route path="/admin/inventory" element= {<AdminInventory />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
      <Route path="admin/customers" element={<AdminCustomers />} />
      <Route path="admin/reviews" element={<AdminReviews />} />
      <Route path="admin/reports" element={<AdminReports />} />
      <Route path="admin/settings" element={<AdminSettings />} />

    </Routes>
  );
};

export default AppRoutes;