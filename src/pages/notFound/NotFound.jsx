import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1>404</h1>

        <h2>Oops! Page Not Found</h2>

        <p>
          The page you are looking for does not
          exist or may have been moved.
        </p>

        <Link to="/" className="not-found-btn">
          <FaArrowLeft />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;