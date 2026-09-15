import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn");

    if (adminLoggedIn !== "true") {
      toast.error("Please login as admin");
      navigate("/admin/login");
      return;
    }

    const storedOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    const validOrders = Array.isArray(storedOrders)
      ? storedOrders.filter(Boolean)
      : [];

    setOrders(validOrders);

    const storedProducts = JSON.parse(
      localStorage.getItem("products") || "[]"
    );

    setProducts(
      Array.isArray(storedProducts) ? storedProducts : []
    );
  }, [navigate]);

  const totalRevenue = orders.reduce(
    (total, order) => total + Number(order.total || 0),
    0
  );

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");

    toast.success("Admin logged out");

    navigate("/admin/login");
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage your ecommerce store</p>
        </div>

        <button
          className="admin-logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <div className="dashboard-card-icon">📦</div>
          <div>
            <h3>Total Products</h3>
            <strong>{products.length}</strong>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-icon">🛒</div>
          <div>
            <h3>Total Orders</h3>
            <strong>{orders.length}</strong>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-icon">👥</div>
          <div>
            <h3>Total Customers</h3>
            <strong>
              {
                new Set(
                  orders.map(
                    (order) => order.customer?.email
                  )
                ).size
              }
            </strong>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-icon">💰</div>
          <div>
            <h3>Total Revenue</h3>
            <strong>₹{totalRevenue}</strong>
          </div>
        </div>

      </div>

      <div className="admin-sections">

        <div className="admin-section">
          <h2>Quick Actions</h2>

          <div className="quick-actions">

            <button onClick={() => navigate("/admin/inventory")}>
                Manage Inventory
            </button>

            <button onClick={() => navigate("/admin/products")}>
              Manage Products
            </button>

            <button onClick={() => navigate("/admin/orders")}>
              Manage Orders
            </button>

            <button onClick={() => navigate("/admin/customers")}>
              Manage Customers
            </button>

            <button onClick={() => navigate("/admin/reviews")}>
              Products Reviews
            </button>

            <button onClick={() => navigate("/admin/reports")}>
              View Reports
            </button>

          </div>
        </div>

        <div className="admin-section">
          <h2>Recent Orders</h2>

          {orders.length === 0 ? (
            <p className="no-orders">
              No orders available
            </p>
          ) : (
            <div className="orders-table-container">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.slice(-5).reverse().map((order) => (
                    <tr key={order.orderId}>
                      <td>{order.orderId}</td>

                      <td>
                        {order.customer?.fullName || "N/A"}
                      </td>

                      <td>
                        ₹{order.total || 0}
                      </td>

                      <td>
                        {order.status || "Pending"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;