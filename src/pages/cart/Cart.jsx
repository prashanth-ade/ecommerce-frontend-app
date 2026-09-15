import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import CouponBox from "../../components/cart/CouponBox";
import coupons from "../../data/coupens";
import "./Cart.css";
import SEO from "../../components/SEO/SEO";

const Cart = () => {

  // const [appliedCoupon, setAppliedCoupon] = useState(null);

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotal,
    
  } = useContext(CartContext);

  const navigate = useNavigate();

  const handleApplyCoupon = () => {
  const enteredCode = couponCode.trim().toUpperCase();

  const coupon = coupons.find(
    (item) => item.code === enteredCode
  );

  if (!coupon) {
    setAppliedCoupon(null);
    setDiscount(0);
    setCouponMessage("Invalid coupon code");
    return;
  }

  if (cartTotal < coupon.minOrder) {
    setAppliedCoupon(null);
    setDiscount(0);

    setCouponMessage(
      `Minimum order value is ₹${coupon.minOrder}`
    );

    return;
  }

  let calculatedDiscount = 0;

  if (coupon.type === "percentage") {
    calculatedDiscount =
      (cartTotal * coupon.value) / 100;

    calculatedDiscount = Math.min(
      calculatedDiscount,
      coupon.maxDiscount
    );
  } else if (coupon.type === "flat") {
    calculatedDiscount = coupon.value;
  }

  calculatedDiscount = Math.min(
    calculatedDiscount,
    cartTotal
  );

  setAppliedCoupon(coupon);
  setDiscount(calculatedDiscount);

  setCouponMessage(
    `Coupon ${coupon.code} applied successfully!`
  );
};

  const handleCheckout = () => {
    navigate("/checkout", {
        state: {
          appliedCoupon,
          discount,
          finalTotal,
        },
      });
  };

  

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h1>Your Cart is Empty</h1>
        <p>Add some fashion products to your cart.</p>

        <Link to="/products">
          Continue Shopping
        </Link>
      </div>
    );
  }

    // const discount = appliedCoupon
    //   ? appliedCoupon.discount
    //   : 0;

    // const finalTotal = Math.max(
    //   cartTotal - discount,
    //   0
    // );

    const finalTotal = Math.max(
  cartTotal - discount,
  0
);

  return (
    <div className="cart-page">

      <SEO
        title="Shopping Cart | Fashion Store"
        description="Review your selected products and proceed to checkout."
        keywords="shopping cart, ecommerce cart, fashion store cart"
      />

      <h1>Shopping Cart</h1>

      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img
                src={item.image}
                alt={item.name}
              />

              <div className="cart-item-info">
                <h3>{item.name}</h3>

                <p>₹{item.price}</p>

                {item.selectedSize && (
                  <p>Size: {item.selectedSize}</p>
                )}

                {item.selectedColor && (
                  <p>Color: {item.selectedColor}</p>
                )}

                <div className="cart-quantity">
                  <button
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item-right">
                <h3>
                  ₹{item.price * item.quantity}
                </h3>

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

           {/* <CouponBox
          cartTotal={cartTotal}
          appliedCoupon={appliedCoupon}
          onApplyCoupon={setAppliedCoupon}
        /> */}
        </div>

  <div className="coupon-section">

  <h3>Have a Coupon?</h3>

  <div className="coupon-input">

    <input
      type="text"
      placeholder="Enter coupon code"
      value={couponCode}
      onChange={(e) => setCouponCode(e.target.value)}
    />

    <button onClick={handleApplyCoupon}>
      Apply
    </button>

  </div>

  {couponMessage && (
    <p className="coupon-message">
      {couponMessage}
    </p>
  )}

</div>

       

        <div className="cart-summary">
          <h2>Order Summary</h2>

  <div className="summary-row">
  <span>Subtotal</span>
  <span>₹{cartTotal}</span>
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
    ₹{finalTotal}
  </strong>
</div>

        <button
          type="button"
          className="checkout-btn"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;