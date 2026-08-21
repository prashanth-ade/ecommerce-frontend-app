import { Link, useLocation } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  const location = useLocation();

  const order = location.state;

  if (!order) {
    return (
      <div className="order-error">
        <h1>No Order Found</h1>

        <Link to="/products">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="order-success-page">
      <div className="order-success-card">
        <div className="success-icon">✓</div>

        <h1>Order Placed Successfully!</h1>

        <p className="thank-you-message">
          Thank you for shopping with us.
        </p>

        <div className="order-id">
          <span>Order ID</span>
          <strong>{order.orderId}</strong>
        </div>

        <div className="success-details">
          <div className="success-section">
            <h3>Delivery Address</h3>

            <p>{order.customer.fullName}</p>
            <p>{order.customer.address}</p>
            <p>
              {order.customer.city},{" "}
              {order.customer.state}
            </p>
            <p>{order.customer.pincode}</p>
            <p>Phone: {order.customer.phone}</p>
          </div>

          <div className="success-section">
            <h3>Payment Method</h3>

            <p>
              {order.customer.paymentMethod === "cod"
                ? "Cash on Delivery"
                : "Online Payment"}
            </p>

            <h3 className="order-total-heading">
              Total Amount
            </h3>

            <strong className="success-total">
              ₹{order.total}
            </strong>
          </div>
        </div>

        <div className="success-products">
          <h3>Order Items</h3>

          {order.items.map((item) => (
            <div
              className="success-product"
              key={item.id}
            >
              <img
                src={item.image}
                alt={item.name}
              />

              <div>
                <h4>{item.name}</h4>
                <p>Quantity: {item.quantity}</p>
              </div>

              <strong>
                ₹{item.price * item.quantity}
              </strong>
            </div>
          ))}
        </div>

        <Link
          to="/products"
          className="continue-shopping-btn"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;