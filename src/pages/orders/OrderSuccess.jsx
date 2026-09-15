
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

        {/* Order ID */}

        <div className="order-id">
          <span>Order ID</span>

          <strong>
            {order.id
              ? `ORD-${order.id}`
              : "Order Confirmed"}
          </strong>
        </div>

        <div className="success-details">

          {/* Delivery Address */}

          <div className="success-section">

            <h3>Delivery Address</h3>

            <p>{order.customerName}</p>

            <p>{order.address}</p>

            <p>
              Email: {order.email}
            </p>

            <p>
              Phone: {order.phone}
            </p>

          </div>

          {/* Payment Details */}

          <div className="success-section">

            <h3>Payment Method</h3>

            <p>
              {order.paymentMethod === "COD"
                ? "Cash on Delivery"
                : "Online Payment"}
            </p>

            <h3 className="order-total-heading">
              Total Amount
            </h3>

            <strong className="success-total">
              ₹{order.totalAmount}
            </strong>

          </div>

        </div>

        {/* Order Items */}

        <div className="success-products">

          <h3>Order Items</h3>

          {order.items && order.items.length > 0 ? (
            order.items.map((item) => (

              <div
                className="success-product"
                key={item.id || item.productId}
              >

                <div>
                  <h4>
                    {item.productName}
                  </h4>

                  <p>
                    Quantity: {item.quantity}
                  </p>
                </div>

                <strong>
                  ₹{item.price * item.quantity}
                </strong>

              </div>

            ))
          ) : (
            <p>No order items found.</p>
          )}

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

