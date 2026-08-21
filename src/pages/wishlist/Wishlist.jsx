import { useContext } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "../../context/WishlistContext";
import { CartContext } from "../../context/CartContext";
import "./Wishlist.css";

const Wishlist = () => {
  const {
    wishlistItems,
    removeFromWishlist,
  } = useContext(WishlistContext);

  const { addToCart } = useContext(CartContext);

  if (wishlistItems.length === 0) {
    return (
      <div className="empty-wishlist">
        <h1>Your Wishlist is Empty</h1>

        <p>
          Save your favourite fashion products here.
        </p>

        <Link to="/products">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <h1>My Wishlist</h1>

      <div className="wishlist-grid">
        {wishlistItems.map((item) => (
          <div
            className="wishlist-card"
            key={item.id}
          >
            <Link to={`/products/${item.id}`}>
              <img
                src={item.image}
                alt={item.name}
              />
            </Link>

            <div className="wishlist-info">
              <p>{item.category}</p>

              <h3>{item.name}</h3>

              <strong>₹{item.price}</strong>

              <button
                className="wishlist-cart-btn"
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </button>

              <button
                className="wishlist-remove-btn"
                onClick={() =>
                  removeFromWishlist(item.id)
                }
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;