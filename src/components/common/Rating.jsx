import { FaStar, FaRegStar } from "react-icons/fa";
import "./Rating.css";

const Rating = ({ rating = 0, reviews = 0 }) => {
  return (
    <div className="rating">
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((star) =>
          star <= Math.round(rating) ? (
            <FaStar key={star} />
          ) : (
            <FaRegStar key={star} />
          )
        )}
      </div>

      <span className="rating-number">
        {rating}
      </span>

      <span className="review-count">
        ({reviews})
      </span>
    </div>
  );
};

export default Rating;