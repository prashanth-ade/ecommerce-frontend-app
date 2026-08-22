import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import "./ProductDetails.css";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import Loader from "../../components/common/Loader";
// import products from "../../data/products";
import { getProductById } from "../../services/products";
import NotFound from "../notFound/notFound";


const ProductDetails = () => {
  const { id } = useParams();

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);


  const [error, setError] = useState("");
  const [product, setProduct] = useState("");
  const[loading, setLoading] = useState(true);

    const {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    } = useContext(WishlistContext);

    const isInWishlist = wishlistItems.some(
  (item) => item.id === product?.id
);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  
  useEffect(() => {
  const fetchProduct = async () => {
    try {
      setLoading(true);

      const data = await getProductById(id);

      setProduct(data);
    } catch (error) {
      setError("Failed to load product details.");
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
}, [id]);

  if (loading) {
    return (
      <Loader text="Loading product details..." />
    );
  }

  if (error) {
    return (
      <div className="product-error">
        <h2>Something went wrong</h2>

        <p>{error}</p>
      </div>
    );
  }

  if (!product) {
    return <NotFound />;
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="product-details-page">
      <div className="product-details-container">

        {/* Product Image */}
        <div className="details-image-section">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

        {/* Product Information */}
        <div className="details-info-section">
          <p className="details-category">
            {product.category}
          </p>

          <h1>{product.name}</h1>

          <div className="details-rating">
            ★★★★★ <span>(24 Reviews)</span>
          </div>

          <div className="details-price">
            <span className="details-current-price">
              ₹{product.price}
            </span>

            <span className="details-old-price">
              ₹{product.oldPrice}
            </span>

            <span className="discount">
              Save ₹{product.oldPrice - product.price}
            </span>
          </div>

          <p className="details-description">
            {product.description}
          </p>

          {/* Size */}
          <div className="product-option">
            <h3>Select Size</h3>

            <div className="size-options">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className={
                    selectedSize === size
                      ? "selected-option"
                      : ""
                  }
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="product-option">
            <h3>Select Color</h3>

            <div className="color-options">
              {["Black", "White", "Blue", "Red"].map(
                (color) => (
                  <button
                    key={color}
                    className={
                      selectedColor === color
                        ? "selected-color"
                        : ""
                    }
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Quantity */}
          <div className="product-option">
            <h3>Quantity</h3>

            <div className="quantity-control">
              <button onClick={decreaseQuantity}>−</button>

              <span>{quantity}</span>

              <button onClick={increaseQuantity}>+</button>
            </div>
          </div>

          {/* Buttons */}
          <div className="details-buttons">
            <button
                className="details-cart-btn"
                onClick={() =>
                    addToCart(
                    {
                        ...product,
                        selectedSize,
                        selectedColor,
                    },
                    quantity
                    )
                }
                >
                Add to Cart
            </button>

            <button
                className={`details-wishlist-btn ${
                    isInWishlist ? "active-wishlist" : ""
                }`}
                onClick={handleWishlist}
                >
                {isInWishlist ? "♥ Added to Wishlist" : "♡ Wishlist"}
            </button>
          </div>

          <div className="product-extra-info">
            <p>🚚 Free delivery on orders above ₹999</p>
            <p>↩ Easy 7-day returns</p>
            <p>🔒 Secure payment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;