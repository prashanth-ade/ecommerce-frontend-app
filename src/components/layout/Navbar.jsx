import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaShoppingBag,
  FaHeart,
  FaUser,
} from "react-icons/fa";

import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logout } = useContext(AuthContext);

  const { cartItems } = useContext(CartContext);

  const { wishlistItems } =
    useContext(WishlistContext);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const wishlistCount = wishlistItems.length;

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* LOGO */}

        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
        >
          WEBTECHYS
        </Link>

        {/* MOBILE MENU BUTTON */}

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* NAVIGATION */}

        <nav
          className={`navbar-links ${
            menuOpen ? "active" : ""
          }`}
        >
          <NavLink
            to="/"
            end
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            onClick={closeMenu}
          >
            Products
          </NavLink>

          <div className="category-dropdown">
            <button
              className="category-menu-btn"
              type="button"
            >
              Categories ▼
            </button>

            <div className="category-dropdown-menu">
              <Link to="/products">
                All
              </Link>

              <Link to="/products?category=Men">
                Men
              </Link>

              <Link to="/products?category=Women">
                Women
              </Link>

              <Link to="/products?category=Kids">
                Kids
              </Link>

              <Link to="/products?category=Electronics">
                Electronics
              </Link>

              <Link to="/products?category=Mobiles">
                Mobiles
              </Link>

              <Link to="/products?category=Furniture">
                Furniture
              </Link>

              <Link to="/products?category=Kitchen">
                Kitchen
              </Link>
            </div>
          </div>

          <NavLink
              to="/contact"
              onClick={closeMenu}
            >
              Contact Us
            </NavLink>

          {/* WISHLIST */}

          <NavLink
            to="/wishlist"
            className="nav-icon"
            onClick={closeMenu}
          >
            <FaHeart />

            {wishlistCount > 0 && (
              <span className="nav-count">
                {wishlistCount}
              </span>
            )}

            <span className="mobile-link-text">
              Wishlist
            </span>
          </NavLink>

          {/* CART */}

          <NavLink
            to="/cart"
            className="nav-icon"
            onClick={closeMenu}
          >
            <FaShoppingBag />

            {cartCount > 0 && (
              <span className="nav-count">
                {cartCount}
              </span>
            )}

            <span className="mobile-link-text">
              Cart
            </span>
          </NavLink>

          {/* USER */}

          {user ? (
            <>
              <NavLink
                to="/profile"
                className="user-name"
                onClick={closeMenu}
              >
                <FaUser />
                Hi, {user.name}
              </NavLink>

              <NavLink
                to="/orders"
                className="orders-link"
                onClick={closeMenu}
              >
                My Orders
              </NavLink>

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="user-icon"
              onClick={closeMenu}
            >
              <FaUser />

              <span className="mobile-link-text">
                Login
              </span>
            </NavLink>
          )}
        </nav>

      </div>
    </header>
  );
};

export default Navbar;