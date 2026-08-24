import { Link } from "react-router-dom";
import "./Home.css";
import products from "../../data/products";
import ProductCard from "../../components/products/ProductCard";
import { getAllProducts } from "../../services/products";

const Home = () => {

    const featuredProducts = products.slice(0, 5);

  const categories = [
    {
      name: "Men",
      image:
        "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Women",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Kids",
      image:
        "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Accessories",
      image:
        "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=500&q=80",
    },
  ];

//   const products = [
//     {
//       id: 1,
//       name: "Classic Black Jacket",
//       price: 2499,
//       oldPrice: 3499,
//       image:
//         "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80",
//     },
//     {
//       id: 2,
//       name: "Premium Casual Shirt",
//       price: 1299,
//       oldPrice: 1799,
//       image:
//         "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=500&q=80",
//     },
//     {
//       id: 3,
//       name: "Women's Fashion Dress",
//       price: 1999,
//       oldPrice: 2799,
//       image:
//         "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=500&q=80",
//     },
//     {
//       id: 4,
//       name: "Stylish Sneakers",
//       price: 2999,
//       oldPrice: 3999,
//       image:
//         "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80",
//     },
//   ];

  getAllProducts();

  return (
    <div className="home-page">
      {/* Top Offer */}
      <div className="offer-bar">
        <p>🔥 Summer Sale - Up to 50% OFF | Free Shipping on Orders Above ₹999</p>
      </div>

      {/* Hero Section */}
      <section className="fashion-hero">
        <div className="hero-overlay">
          <div className="fashion-hero-content">
            <span className="hero-subtitle">NEW COLLECTION 2026</span>

            <h1>
              Discover Your
              <span> Perfect Style</span>
            </h1>

            <p>
              Explore the latest fashion trends for men, women and kids.
              Upgrade your wardrobe with styles made for you.
            </p>

            <div className="hero-buttons">
              <Link to="/products" className="primary-btn">
                Shop Now
              </Link>

              <Link to="/products" className="secondary-btn">
                Explore Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="section-heading">
          <p>SHOP BY CATEGORY</p>
          <h2>Find Your Style</h2>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <Link
              to="/products"
              className="category-card"
              key={category.name}
            >
              <img src={category.image} alt={category.name} />

              <div className="category-overlay">
                <h3>{category.name}</h3>
                <span>Shop Now →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products-section">
        <div className="section-heading">
            <h2>Featured Products</h2>
            <p>Discover our latest fashion collection.</p>
        </div>

        <div className="products-grid">
            {featuredProducts.map((product) => (
            <ProductCard
                key={product.id}
                product={product}
            />
            ))}
        </div>
        </section>

        {/* FEATURED CATEGORIES */}

<section className="featured-categories">
  <div className="section-header">
    <p>EXPLORE OUR COLLECTIONS</p>

    <h2>Shop by Category</h2>

    <span>
      Discover products from your favorite categories
    </span>
  </div>

  <div className="categories-grid">

    <Link
      to="/products?category=Men"
      className="category-card"
    >
      <div className="category-image">
        <img
          src="https://images.unsplash.com/photo-1516826957135-700dedea698c"
          alt="Men"
        />
      </div>

      <h3>Men</h3>
      <p>Explore Collection →</p>
    </Link>

    <Link
      to="/products?category=Women"
      className="category-card"
    >
      <div className="category-image">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d"
          alt="Women"
        />
      </div>

      <h3>Women</h3>
      <p>Explore Collection →</p>
    </Link>

    <Link
      to="/products?category=Kids"
      className="category-card"
    >
      <div className="category-image">
        <img
          src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9"
          alt="Kids"
        />
      </div>

      <h3>Kids</h3>
      <p>Explore Collection →</p>
    </Link>

    <Link
      to="/products?category=Electronics"
      className="category-card"
    >
      <div className="category-image">
        <img
          src="https://images.unsplash.com/photo-1498049794561-7780e7231661"
          alt="Electronics"
        />
      </div>

      <h3>Electronics</h3>
      <p>Explore Collection →</p>
    </Link>

    <Link
      to="/products?category=Mobiles"
      className="category-card"
    >
      <div className="category-image">
        <img
          src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa"
          alt="Mobiles"
        />
      </div>

      <h3>Mobiles</h3>
      <p>Explore Collection →</p>
    </Link>

    <Link
      to="/products?category=Furniture"
      className="category-card"
    >
      <div className="category-image">
        <img
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc"
          alt="Furniture"
        />
      </div>

      <h3>Furniture</h3>
      <p>Explore Collection →</p>
    </Link>

    <Link
      to="/products?category=Kitchen"
      className="category-card"
    >
      <div className="category-image">
        <img
          src="https://images.unsplash.com/photo-1556911220-bff31c812dba"
          alt="Kitchen"
        />
      </div>

      <h3>Kitchen</h3>
      <p>Explore Collection →</p>
    </Link>

  </div>
</section>

      {/* Offer Banner */}
      <section className="fashion-offer">
        <div className="fashion-offer-content">
          <p>LIMITED TIME OFFER</p>

          <h2>Get Up To 50% OFF</h2>

          <h3>On Selected Fashion Collections</h3>

          <Link to="/products" className="primary-btn">
            Shop The Sale
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits-section">
        <div className="benefit">
          <div className="benefit-icon">🚚</div>
          <h3>Free Shipping</h3>
          <p>On orders above ₹999</p>
        </div>

        <div className="benefit">
          <div className="benefit-icon">↩</div>
          <h3>Easy Returns</h3>
          <p>Simple and hassle-free returns</p>
        </div>

        <div className="benefit">
          <div className="benefit-icon">🔒</div>
          <h3>Secure Payment</h3>
          <p>Your payment information is safe</p>
        </div>

        <div className="benefit">
          <div className="benefit-icon">💬</div>
          <h3>Customer Support</h3>
          <p>We're here to help you</p>
        </div>
      </section>
    </div>
  );
};

export default Home;