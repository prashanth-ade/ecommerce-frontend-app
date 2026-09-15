import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./AdminOrders.css";

const AdminOrders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const adminLoggedIn =
      localStorage.getItem("adminLoggedIn");

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
  }, [navigate]);

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.orderId === orderId
        ? {
            ...order,
            status: newStatus,
          }
        : order
    );

    setOrders(updatedOrders);

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );

    toast.success("Order status updated");
  };

  const deleteOrder = (orderId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmed) {
      return;
    }

    const updatedOrders = orders.filter(
      (order) => order.orderId !== orderId
    );

    setOrders(updatedOrders);

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );

    toast.success("Order deleted successfully");
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "status-pending";

      case "Processing":
        return "status-processing";

      case "Shipped":
        return "status-shipped";

      case "Delivered":
        return "status-delivered";

      case "Cancelled":
        return "status-cancelled";

      default:
        return "status-default";
    }
  };

  return (
    <div className="admin-orders-page">

      {/* Header */}

      <div className="orders-header">

        <div>
          <h1>Order Management</h1>
          <p>Manage customer orders</p>
        </div>

        <button
          className="orders-dashboard-btn"
          onClick={() =>
            navigate("/admin/dashboard")
          }
        >
          Dashboard
        </button>

      </div>

      {/* Order Statistics */}

      <div className="order-stats">

        <div className="order-stat-card">
          <h3>Total Orders</h3>
          <strong>{orders.length}</strong>
        </div>

        <div className="order-stat-card">
          <h3>Pending</h3>
          <strong>
            {
              orders.filter(
                (order) => order.status === "Pending"
              ).length
            }
          </strong>
        </div>

        <div className="order-stat-card">
          <h3>Processing</h3>
          <strong>
            {
              orders.filter(
                (order) => order.status === "Processing"
              ).length
            }
          </strong>
        </div>

        <div className="order-stat-card">
          <h3>Delivered</h3>
          <strong>
            {
              orders.filter(
                (order) => order.status === "Delivered"
              ).length
            }
          </strong>
        </div>

      </div>

      {/* Orders */}

      <div className="orders-container">

        {orders.length === 0 ? (

          <div className="no-orders">
            <h2>No Orders Found</h2>
            <p>
              Customer orders will appear here.
            </p>
          </div>

        ) : (

          <div className="orders-table-wrapper">

            <table className="admin-orders-table">

              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {orders.map((order) => (

                  <tr key={order.orderId}>

                    <td>
                      <strong>
                        {order.orderId}
                      </strong>
                    </td>

                    <td>
                      {order.date || "N/A"}
                    </td>

                    <td>
                      <div className="customer-info">

                        <strong>
                          {order.customer?.fullName ||
                            "N/A"}
                        </strong>

                        <span>
                          {order.customer?.email ||
                            "N/A"}
                        </span>

                      </div>
                    </td>

                    <td>
                      {order.items?.length || 0}
                    </td>

                    <td>
                      <strong>
                        ₹{order.total || 0}
                      </strong>
                    </td>

                    <td>
                      <div className="payment-info">

                        <span>
                          {order.paymentMethod ||
                            "COD"}
                        </span>

                        <small>
                          {order.paymentStatus ||
                            "Pending"}
                        </small>

                      </div>
                    </td>

                    <td>

                      <select
                        value={
                          order.status ||
                          "Pending"
                        }
                        className={`order-status-select ${getStatusClass(
                          order.status
                        )}`}
                        onChange={(event) =>
                          updateOrderStatus(
                            order.orderId,
                            event.target.value
                          )
                        }
                      >

                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Processing">
                          Processing
                        </option>

                        <option value="Shipped">
                          Shipped
                        </option>

                        <option value="Delivered">
                          Delivered
                        </option>

                        <option value="Cancelled">
                          Cancelled
                        </option>

                      </select>

                    </td>

                    <td>

                      <button
                        className="delete-order-btn"
                        onClick={() =>
                          deleteOrder(
                            order.orderId
                          )
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
};

export default AdminOrders;