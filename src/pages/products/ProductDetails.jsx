import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import "./ProductDetails.css";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import Loader from "../../components/common/Loader";
// import products from "../../data/products";
import { getProductById } from "../../services/products";
import NotFound from "../notFound/notFound";
import Rating from "../../components/common/Rating";
import ReviewForm from "./ReviewForm";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);


  const [error, setError] = useState("");
  const [product, setProduct] = useState("");
  const[loading, setLoading] = useState(true);

  const [userReviews, setUserReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const { user } = useContext(AuthContext);

  const handleAddReview = (newReview) => {
    const reviewWithUser = {
      ...newReview,
      name: user.name,
      userId: user.id,
    };

    setUserReviews([
      reviewWithUser,
    ]);
  };

  const handleDeleteReview = (reviewId) => {
    setUserReviews((previousReviews) =>
      previousReviews.filter(
        (review) => review.id !== reviewId
      )
    );;
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
  };

  const handleUpdateReview = (updatedReview) => {
  setUserReviews((previousReviews) =>
    previousReviews.map((review) =>
      review.id === updatedReview.id
        ? {
            ...review,
            ...updatedReview,
          }
        : review
    )
  );

  setEditingReview(null);
};

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
            <Rating
              rating={product.rating}
              reviews={product.reviews}
            />
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

          <section className="reviews-section">
  <h2>Customer Reviews</h2>

  <div className="review-summary">
    <div className="average-rating">
      <h3>{product.rating} / 5</h3>

      <Rating
        rating={product.rating}
        reviews={product.reviews}
      />

      <p>
        Based on {product.reviews} customer reviews
      </p>
    </div>
  </div>

  <div className="review-list">

    <div className="review-item">
      <div className="review-header">
        <h4>Rahul Kumar</h4>

        <span>★★★★★</span>
      </div>

      <p>
        Great product! The quality is very good
        and delivery was fast.
      </p>
    </div>

    <div className="review-item">
      <div className="review-header">
        <h4>Anjali Sharma</h4>

        <span>★★★★☆</span>
      </div>

      <p>
        Good product and value for money.
        I am happy with my purchase.
      </p>
    </div>

    <div className="review-item">
      <div className="review-header">
        <h4>Vikram Reddy</h4>

        <span>★★★★★</span>
      </div>

      <p>
        Excellent quality. I would definitely
        recommend this product.
      </p>
    </div>
  </div>

  

  {user ? (
  userReviews.length === 0 || editingReview ? (
    <ReviewForm
      onAddReview={handleAddReview}
      editingReview={editingReview}
      onUpdateReview={handleUpdateReview}
    />
  ) : (
    <div className="already-reviewed">
      <p>
        You have already reviewed this product.
      </p>
    </div>
  )
) : (
  <div className="login-review-message">
    <p>
      Please login to write a review.
    </p>

    <Link to="/login">
      Login Now
    </Link>
  </div>
)}

{userReviews.map((review) => (
  <div
    className="review-item"
    key={review.id}
  >
    <div className="review-header">
      <div>
        <h4>{review.name}</h4>

        <small>{review.date}</small>
      </div>

      <span>
        {"★".repeat(review.rating)}
        {"☆".repeat(5 - review.rating)}
      </span>
    </div>

    <h5>{review.title}</h5>

    <p>{review.message}</p>

    {user && review.userId === user.id && (
      <div className="review-actions">
        <button
          onClick={() =>
            handleEditReview(review)
          }
        >
          Edit
        </button>

        <button
          className="delete-review-btn"
          onClick={() =>
            handleDeleteReview(review.id)
          }
        >
          Delete
        </button>
      </div>
    )}
  </div>
))}

</section>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;