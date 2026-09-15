import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { createOrder } from "../../services/orders"
import { toast } from "react-toastify";
import "./Checkout.css";

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);

  const navigate = useNavigate();
  const location = useLocation();

  const {
    appliedCoupon,
    discount = 0,
    finalTotal,
  } = location.state || {};

  const checkoutTotal =
    finalTotal !== undefined
      ? finalTotal
      : Math.max(cartTotal - discount, 0);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "cod",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    try {
      setLoading(true);

      /*
       * Create the order object for Spring Boot.
       */
      const orderData = {
        customerName: formData.fullName,
        email: formData.email,
        phone: formData.phone,

        address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,

        totalAmount: Number(checkoutTotal),

        paymentMethod:
          formData.paymentMethod === "cod"
            ? "COD"
            : "ONLINE",

        items: cartItems.map((item) => ({
          productId: item.id,
          productName: item.name,
          price: Number(item.price),
          quantity: Number(item.quantity),
        })),
      };

      /*
       * For online payment, first save the order information
       * and then navigate to the payment page.
       */
      if (formData.paymentMethod === "online") {
        navigate("/payment", {
          state: {
            amount: checkoutTotal,
            orderData,
            coupon: appliedCoupon?.code || null,
            discount,
          },
        });

        return;
      }

      /*
       * COD:
       * Send the order directly to Spring Boot.
       */
      const savedOrder = await createOrder(orderData);

      console.log("Order saved successfully:", savedOrder);

      clearCart();

      toast.success("Order placed successfully!");

      /*
       * Navigate to order success page.
       */
      navigate("/order-success", {
        state: savedOrder,
      });

    } catch (error) {
      console.error("Order placement failed:", error);

      toast.error(
        "Failed to place order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">

      <div className="checkout-header">
        <h1>Checkout</h1>
        <p>Complete your order details</p>
      </div>

      <div className="checkout-container">

        {/* Shipping Form */}

        <form
          className="checkout-form"
          onSubmit={handleSubmit}
        >
          <h2>Shipping Details</h2>

          <div className="form-row">

            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="form-group">
            <label>Phone Number</label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Delivery Address</label>

            <textarea
              name="address"
              placeholder="Enter your full address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">

            <div className="form-group">
              <label>City</label>

              <input
                type="text"
                name="city"
                placeholder="Enter city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>State</label>

              <input
                type="text"
                name="state"
                placeholder="Enter state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="form-group">
            <label>Pincode</label>

            <input
              type="text"
              name="pincode"
              placeholder="Enter pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
          </div>

          {/* Payment Method */}

          <div className="payment-section">

            <h2>Payment Method</h2>

            <label className="payment-option">

              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={
                  formData.paymentMethod === "cod"
                }
                onChange={handleChange}
              />

              Cash on Delivery

            </label>

            <label className="payment-option">

              <input
                type="radio"
                name="paymentMethod"
                value="online"
                checked={
                  formData.paymentMethod === "online"
                }
                onChange={handleChange}
              />

              Online Payment

            </label>

          </div>

          <button
            type="submit"
            className="place-order-btn"
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : "Place Order"}
          </button>

        </form>

        {/* Order Summary */}

        <div className="checkout-summary">

          <h2>Order Summary</h2>

          <div className="checkout-products">

            {cartItems.map((item) => (

              <div
                className="checkout-product"
                key={item.id}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div>
                  <h4>{item.name}</h4>

                  <p>
                    Qty: {item.quantity}
                  </p>
                </div>

                <strong>
                  ₹{item.price * item.quantity}
                </strong>

              </div>

            ))}

          </div>

          <hr />

          <div className="summary-row">

            <span>Subtotal</span>

            <span>
              ₹{cartTotal}
            </span>

          </div>

          {appliedCoupon && (

            <div className="summary-row discount-row">

              <span>
                Discount ({appliedCoupon.code})
              </span>

              <span>
                - ₹{discount}
              </span>

            </div>

          )}

          <div className="summary-total">

            <span>Total</span>

            <strong>
              ₹{checkoutTotal}
            </strong>

          </div>

          <div className="checkout-row">

            <span>Delivery</span>

            <span>Free</span>

          </div>

          <hr />

          <div className="checkout-total">

            <strong>Total</strong>

            <strong>
              ₹{checkoutTotal}
            </strong>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Checkout;