import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders);
  }, []);

  if (orders.length === 0) {
    return (
      <div className="empty-orders">
        <h1>No Orders Yet</h1>

        <p>
          You have not placed any orders yet.
        </p>

        <Link to="/products">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      <div className="orders-container">
        {orders
          .slice()
          .reverse()
          .map((order) => (
            <div
              className="order-card"
              key={order.orderId}
            >
              <div className="order-header">
                <div>
                  <p>Order ID</p>
                  <strong>{order.orderId}</strong>
                </div>

                <div>
                  <p>Order Date</p>
                  <strong>{order.date}</strong>
                </div>

                <div>
                  <p>Status</p>
                  <span className="order-status">
                    {order.status}
                  </span>
                </div>

                <div>
                  <p>Total</p>
                  <strong>₹{order.total}</strong>
                </div>
              </div>

              <div className="order-items">
                {order.items.map((item) => (
                  <div
                    className="order-item"
                    key={item.id}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div className="order-item-info">
                      <h3>{item.name}</h3>

                      <p>
                        Quantity: {item.quantity}
                      </p>

                      {item.selectedSize && (
                        <p>
                          Size: {item.selectedSize}
                        </p>
                      )}

                      {item.selectedColor && (
                        <p>
                          Color: {item.selectedColor}
                        </p>
                      )}
                    </div>

                    <strong>
                      ₹{item.price * item.quantity}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Orders;