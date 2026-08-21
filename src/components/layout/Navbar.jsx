import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import { WishlistContext } from "../../context/WishlistContext";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {

    const { cartCount } = useContext(CartContext);

    const {wishlistCount } = useContext(WishlistContext);

    const { user, logout } = useContext(AuthContext);

  return (
    <header className="navbar">
      <div className="navbar-top">
        <div className="logo">
          <Link to="/">WEBTECHYS</Link>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search for  products..."
          />
          <button>
            <FaSearch />
          </button>
        </div>

        <div className="navbar-icons">

          <Link to="/wishlist" className="wishlist-icon">
            <FaHeart />
            <span>{wishlistCount}</span>
          </Link>

          <Link to="/cart" className="cart-icon">
            <FaShoppingCart />
            <span>{cartCount}</span>
          </Link>

            {user ? (
            <div className="user-menu">
                <Link to="/profile" className="user-name">
                Hi, {user.name}
                </Link>

                <Link to="/orders" className="orders-link">
                My Orders
                </Link>

                <button
                className="logout-btn"
                onClick={logout}
                >
                Logout
                </button>
            </div>
            ) : (
            <Link to="/login" className="user-icon">
                <FaUser />
            </Link>
            )}

        </div>
      </div>

      <nav className="navbar-bottom">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/products">Categories</Link>
        <Link to="/">Offers</Link>
        <Link to="/">Contact</Link>
      </nav>
    </header>
  );
};

export default Navbar;