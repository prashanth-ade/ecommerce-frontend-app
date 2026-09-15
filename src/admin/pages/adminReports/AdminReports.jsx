import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import products from "../../../data/products";
import "./AdminReports.css";

const AdminReports = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [productList, setProductList] = useState([]);

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

    const storedProducts = JSON.parse(
      localStorage.getItem("allproduct") || "null"
    );

    setOrders(
      Array.isArray(storedOrders)
        ? storedOrders.filter(Boolean)
        : []
    );

    setProductList(
      Array.isArray(storedProducts)
        ? storedProducts
        : products
    );
  }, [navigate]);

  /* Basic calculations */

  const totalRevenue = orders.reduce(
    (total, order) =>
      total + Number(order.total || 0),
    0
  );

  const totalOrders = orders.length;

  const totalProducts = productList.length;

  const customerEmails = new Set();

  orders.forEach((order) => {
    if (order.customer?.email) {
      customerEmails.add(order.customer.email);
    }
  });

  const totalCustomers = customerEmails.size;

  const averageOrderValue =
    totalOrders > 0
      ? Math.round(totalRevenue / totalOrders)
      : 0;

  /* Order status */

  const getOrderStatusCount = (status) => {
    return orders.filter(
      (order) => order.status === status
    ).length;
  };

  const pendingOrders =
    getOrderStatusCount("Pending");

  const processingOrders =
    getOrderStatusCount("Processing");

  const shippedOrders =
    getOrderStatusCount("Shipped");

  const deliveredOrders =
    getOrderStatusCount("Delivered");

  const cancelledOrders =
    getOrderStatusCount("Cancelled");

  /* Category sales */

  const categorySales = {};

  orders.forEach((order) => {
    if (!Array.isArray(order.items)) return;

    order.items.forEach((item) => {
      const category = item.category || "Other";

      if (!categorySales[category]) {
        categorySales[category] = {
          orders: 0,
          revenue: 0,
        };
      }

      categorySales[category].orders += 1;

      categorySales[category].revenue +=
        Number(item.price || 0) *
        Number(item.quantity || 1);
    });
  });

  return (
    <div className="admin-reports-page">

      {/* Header */}

      <div className="reports-header">

        <div>
          <h1>Reports & Analytics</h1>
          <p>View your ecommerce business performance</p>
        </div>

        <button
          className="reports-dashboard-btn"
          onClick={() =>
            navigate("/admin/dashboard")
          }
        >
          Dashboard
        </button>

      </div>

      {/* Main Statistics */}

      <div className="report-stats">

        <div className="report-stat-card">
          <h3>Total Revenue</h3>
          <strong>₹{totalRevenue}</strong>
        </div>

        <div className="report-stat-card">
          <h3>Total Orders</h3>
          <strong>{totalOrders}</strong>
        </div>

        <div className="report-stat-card">
          <h3>Total Customers</h3>
          <strong>{totalCustomers}</strong>
        </div>

        <div className="report-stat-card">
          <h3>Total Products</h3>
          <strong>{totalProducts}</strong>
        </div>

        <div className="report-stat-card">
          <h3>Average Order Value</h3>
          <strong>₹{averageOrderValue}</strong>
        </div>

      </div>

      {/* Order Status */}

      <div className="report-section">

        <h2>Order Status</h2>

        <div className="status-grid">

          <div className="status-card">
            <span>Pending</span>
            <strong>{pendingOrders}</strong>
          </div>

          <div className="status-card">
            <span>Processing</span>
            <strong>{processingOrders}</strong>
          </div>

          <div className="status-card">
            <span>Shipped</span>
            <strong>{shippedOrders}</strong>
          </div>

          <div className="status-card">
            <span>Delivered</span>
            <strong>{deliveredOrders}</strong>
          </div>

          <div className="status-card">
            <span>Cancelled</span>
            <strong>{cancelledOrders}</strong>
          </div>

        </div>

      </div>

      {/* Category Sales */}

      <div className="report-section">

        <h2>Category-wise Sales</h2>

        {Object.keys(categorySales).length > 0 ? (

          <div className="category-table-container">

            <table className="category-table">

              <thead>
                <tr>
                  <th>Category</th>
                  <th>Items Sold</th>
                  <th>Revenue</th>
                </tr>
              </thead>

              <tbody>

                {Object.entries(categorySales).map(
                  ([category, data]) => (
                    <tr key={category}>

                      <td>{category}</td>

                      <td>{data.orders}</td>

                      <td>₹{data.revenue}</td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        ) : (

          <div className="no-report-data">
            No sales data available
          </div>

        )}

      </div>

    </div>
  );
};

export default AdminReports;