import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrdersByEmail } from "../../services/orders";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Temporary email for testing
  // Later we will get this from logged-in user
  const customerEmail = "customer@gmail.com";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getOrdersByEmail(customerEmail);

        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Unable to load your orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="orders-page">
        <div className="orders-loading">
          <h2>Loading Orders...</h2>
          <p>Please wait while we fetch your orders.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-page">
        <div className="orders-error">
          <h2>Something went wrong</h2>
          <p>{error}</p>

          <button onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <div className="orders-header">
          <h1>My Orders</h1>
          <p>View your order history and order details.</p>
        </div>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <h2>No Orders Found</h2>
            <p>You haven't placed any orders yet.</p>

            <Link to="/products" className="shop-now-btn">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div className="order-card" key={order.id}>
                <div className="order-top">
                  <div>
                    <h3>
                      Order #{order.id}
                    </h3>

                    <p>
                      Date:{" "}
                      {order.orderDate
                        ? new Date(order.orderDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>

                  <div className="order-status">
                    <span>{order.status || "PLACED"}</span>
                  </div>
                </div>

                <div className="order-customer">
                  <p>
                    <strong>Customer:</strong>{" "}
                    {order.customerName || "N/A"}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    {order.email || "N/A"}
                  </p>

                  <p>
                    <strong>Payment:</strong>{" "}
                    {order.paymentMethod || "N/A"}
                  </p>
                </div>

                <div className="order-items">
                  <h4>Products</h4>

                  {order.items && order.items.length > 0 ? (
                    order.items.map((item) => (
                      <div
                        className="order-item"
                        key={item.id || item.productId}
                      >
                        <div className="order-item-info">
                          <h5>
                            {item.productName || "Product"}
                          </h5>

                          <p>
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        <div className="order-item-price">
                          ₹
                          {(
                            Number(item.price || 0) *
                            Number(item.quantity || 0)
                          ).toLocaleString()}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No product details available.</p>
                  )}
                </div>

                <div className="order-bottom">
                  <div>
                    <strong>Total Amount</strong>
                  </div>

                  <div className="order-total">
                    ₹
                    {Number(
                      order.totalAmount || 0
                    ).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;