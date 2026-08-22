import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* BRAND SECTION */}

        <div className="footer-section">
          <h2 className="footer-logo">
            WEBTECHYS     
          </h2>

          <p className="footer-description">
            Discover the latest fashion trends and
            shop stylish clothing, footwear, and
            accessories for every occasion.
          </p>

          <div className="social-links">
            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>

            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>

            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>

            <a href="#" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}

        <div className="footer-section">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/products">Shop</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Cart</Link>
        </div>

        {/* CUSTOMER SERVICE */}

        <div className="footer-section">
          <h3>Customer Service</h3>

          <Link to="/profile">My Account</Link>
          <Link to="/orders">My Orders</Link>
          <Link to="/products">Shipping Info</Link>
          <Link to="/products">Returns & Refunds</Link>
        </div>

        {/* CONTACT */}

        <div className="footer-section">
          <h3>Contact Us</h3>

          <p>📍 Hyderabad, India</p>

          <p>📞 +91 98765 43210</p>

          <p>✉ support@fashion.com</p>
        </div>

      </div>

      {/* FOOTER BOTTOM */}

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} WEBTECHYS.
          All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;