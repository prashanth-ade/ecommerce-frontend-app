import { useState } from "react";
import { toast } from "react-toastify";
import coupons from "../../data/coupens";
import "./CouponBox.css";

const CouponBox = ({ cartTotal, onApplyCoupon, appliedCoupon }) => {
  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();

    if (!code) {
      toast.error("Please enter a coupon code");
      return;
    }

    const coupon = coupons.find(
      (item) => item.code === code
    );

    if (!coupon) {
      toast.error("Invalid coupon code");
      return;
    }

    let discount = 0;

    if (coupon.type === "percentage") {
      discount = (cartTotal * coupon.value) / 100;
    }

    if (coupon.type === "fixed") {
      discount = coupon.value;
    }

    discount = Math.min(discount, cartTotal);

    onApplyCoupon({
      ...coupon,
      discount,
    });

    setCouponCode("");

    toast.success(
      `${coupon.code} coupon applied successfully!`
    );
  };

  return (
    <div className="coupon-box">
      <h3>Apply Coupon</h3>

      {appliedCoupon ? (
        <div className="applied-coupon">
          <div>
            <strong>{appliedCoupon.code}</strong>

            <p>{appliedCoupon.description}</p>
          </div>

          <button
            type="button"
            onClick={() => onApplyCoupon(null)}
          >
            Remove
          </button>
        </div>
      ) : (
        <div className="coupon-input">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(event) =>
              setCouponCode(event.target.value)
            }
          />

          <button
            type="button"
            onClick={handleApplyCoupon}
          >
            Apply
          </button>
        </div>
      )}

      <div className="available-coupons">
        <p>Available Coupons:</p>

        <span>SAVE10</span>
        <span>SAVE20</span>
        <span>FLAT500</span>
      </div>
    </div>
  );
};

export default CouponBox;