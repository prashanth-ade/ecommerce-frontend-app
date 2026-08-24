import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import CouponBox from "../../components/cart/CouponBox";
import "./Cart.css";

const Cart = () => {

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotal,
    
  } = useContext(CartContext);

  const navigate = useNavigate();

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

    const discount = appliedCoupon
      ? appliedCoupon.discount
      : 0;

    const finalTotal = Math.max(
      cartTotal - discount,
      0
    );

  return (
    <div className="cart-page">
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

           <CouponBox
          cartTotal={cartTotal}
          appliedCoupon={appliedCoupon}
          onApplyCoupon={setAppliedCoupon}
        />
        </div>

       

        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{cartTotal}</span>
          </div>

          

          <div className="summary-row">
            <span>Delivery</span>
            <span>Free</span>
          </div>

          <hr />

          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>₹{cartTotal}</span>
          </div>

          {appliedCoupon && (
            <div className="cart-summary-row discount-row">
              <span>
                Discount ({appliedCoupon.code})
              </span>

              <span>- ₹{discount}</span>
            </div>
          )}

          <div className="cart-summary-row total-row">
            <span>Total</span>
            <span>₹{finalTotal}</span>
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