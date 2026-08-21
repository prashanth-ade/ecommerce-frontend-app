import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import "./ProductDetails.css";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import products from "../../data/products";


const ProductDetails = () => {
  const { id } = useParams();

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

    const {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    } = useContext(WishlistContext);

    const isInWishlist = wishlistItems.some(
  (item) => item.id === product?.id
);


const handleWishlist = () => {
  if (isInWishlist) {
    removeFromWishlist(product.id);
  } else {
    addToWishlist(product);
  }
};



  // Temporary product data
//   const products = [
//     {
//       id: 1,
//       name: "Classic Black Jacket",
//       category: "Men",
//       price: 2499,
//       oldPrice: 3499,
//       image:
//         "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
//       description:
//         "A stylish and comfortable black jacket designed for everyday fashion. Perfect for casual and modern looks.",
//     },
//     {
//       id: 2,
//       name: "Premium Casual Shirt",
//       category: "Men",
//       price: 1299,
//       oldPrice: 1799,
//       image:
//         "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=800&q=80",
//       description:
//         "Premium quality casual shirt with a modern fit and comfortable fabric.",
//     },
//     {
//       id: 3,
//       name: "Women's Fashion Dress",
//       category: "Women",
//       price: 1999,
//       oldPrice: 2799,
//       image:
//         "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
//       description:
//         "Elegant fashion dress designed for a stylish and modern appearance.",
//     },
//     {
//       id: 4,
//       name: "Stylish Sneakers",
//       category: "Accessories",
//       price: 2999,
//       oldPrice: 3999,
//       image:
//         "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
//       description:
//         "Comfortable and stylish sneakers suitable for everyday fashion.",
//     },
//   ];

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return <h2>Product Not Found</h2>;
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