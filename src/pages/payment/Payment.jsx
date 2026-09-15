import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import OrderSuccess from "../orders/OrderSuccess";
import "./Payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    amount = 0,
    orderData,
  } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("card");

  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCardData({
      ...cardData,
      [name]: value,
    });
  };

  const handlePayment = (event) => {
  event.preventDefault();

  if (
    paymentMethod === "card" &&
    (
      !cardData.cardNumber ||
      !cardData.expiry ||
      !cardData.cvv ||
      !cardData.name
    )
  ) {
    toast.error("Please fill all payment details");
    return;
  }

  toast.success("Payment successful!");

  const updatedOrder = {
    ...orderData,
    paymentMethod:
      paymentMethod === "card"
        ? "Credit / Debit Card"
        : "UPI",
    paymentStatus: "Paid",
    paymentId: `PAY-${Date.now()}`,
  };

  const existingOrders =
    JSON.parse(localStorage.getItem("orders")) || [];

  const validOrders = existingOrders.filter(
    (order) => order !== null
  );

  localStorage.setItem(
    "orders",
    JSON.stringify([
      ...validOrders,
      updatedOrder,
    ])
  );

  navigate("/order-success", {
    state: updatedOrder,
  });
};

  return (
    <div className="payment-page">

      <div className="payment-container">

        <h1>Payment</h1>

        <div className="payment-amount">
          <span>Amount to Pay</span>
          <strong>₹{amount}</strong>
        </div>

        <div className="payment-methods">

          <h2>Select Payment Method</h2>

          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === "card"}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />
            Credit / Debit Card
          </label>

          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />
            UPI
          </label>

        </div>

        {paymentMethod === "card" && (

          <form
            className="payment-form"
            onSubmit={handlePayment}
          >

            <div className="form-group">

              <label>Card Holder Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter card holder name"
                value={cardData.name}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>Card Number</label>

              <input
                type="text"
                name="cardNumber"
                placeholder="Enter card number"
                maxLength="16"
                value={cardData.cardNumber}
                onChange={handleChange}
              />

            </div>

            <div className="payment-row">

              <div className="form-group">

                <label>Expiry</label>

                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  value={cardData.expiry}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label>CVV</label>

                <input
                  type="password"
                  name="cvv"
                  placeholder="CVV"
                  maxLength="3"
                  value={cardData.cvv}
                  onChange={handleChange}
                />

              </div>

            </div>

            <button
              type="submit"
              className="pay-button"
            >
              Pay ₹{amount}
            </button>

          </form>

        )}

        {paymentMethod === "upi" && (

          <form
            className="payment-form"
            onSubmit={handlePayment}
          >

            <div className="form-group">

              <label>UPI ID</label>

              <input
                type="text"
                name="upi"
                placeholder="example@upi"
              />

            </div>

            <button
              type="submit"
              className="pay-button"
            >
              Pay ₹{amount}
            </button>

          </form>

        )}

      </div>

    </div>
  );
};

export default Payment;