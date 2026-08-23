import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import "./ProductCard.css";
import Rating from "../common/Rating";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const {
    wishlistItems,
    toggleWishlist,
  } = useContext(WishlistContext);

  const isWishlisted = wishlistItems.some(
    (item) => item.id === product.id
  );

  return (
    <div className="product-card">
      <div className="product-card-image">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
          />
          
        </Link>
       

        <button
          type="button"
          className={`product-card-wishlist ${
            isWishlisted ? "active" : ""
          }`}
          onClick={() => toggleWishlist(product)}
        >
          {isWishlisted ? "♥" : "♡"}
        </button>
      </div>

      <div className="product-card-content">
        <p>{product.category}</p>

        <Link to={`/products/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>
         <Rating
          rating={product.rating}
          reviews={product.reviews}
        />

        <div className="product-card-price">
          <strong>₹{product.price}</strong>

          {product.oldPrice && (
            <span>₹{product.oldPrice}</span>
          )}
        </div>

        <button
          className="product-card-cart-btn"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;