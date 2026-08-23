import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

import "./ReviewForm.css";

const ReviewForm = ({
    onAddReview,
    editingReview,
    onUpdateReview,
    }) => {

  const [rating, setRating] = useState(
  editingReview?.rating || 0
);

const [hoverRating, setHoverRating] = useState(0);

const [title, setTitle] = useState(
  editingReview?.title || ""
);

const [message, setMessage] = useState(
  editingReview?.message || ""
);

useEffect(() => {
  if (editingReview) {
    setRating(editingReview.rating);
    setTitle(editingReview.title);
    setMessage(editingReview.message);
  }
}, [editingReview]);

  const handleSubmit = (event) => {
  event.preventDefault();

  if (rating === 0) {
    toast.error("Please select a rating!");
    return;
  }

  if (!title.trim() || !message.trim()) {
    toast.error("Please fill all fields!");
    return;
  }

  const reviewData = {
    id: editingReview?.id || Date.now(),
    rating,
    title: title.trim(),
    message: message.trim(),
    date: new Date().toLocaleDateString(),
  };

  if (editingReview) {
    onUpdateReview(reviewData);
    toast.success("Review updated successfully!");
  } else {
    onAddReview(reviewData);
    toast.success("Review submitted successfully!");
  }

  setRating(0);
  setTitle("");
  setMessage("");
};

  return (
    <form
      className="review-form"
      onSubmit={handleSubmit}
    >
      <h3>Write a Review</h3>

      {/* STAR RATING */}

      <div className="review-rating-input">
        <label>Your Rating</label>

        <div className="star-selector">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={
                star <= (hoverRating || rating)
                  ? "selected-star"
                  : "empty-star"
              }
              onClick={() => setRating(star)}
              onMouseEnter={() =>
                setHoverRating(star)
              }
              onMouseLeave={() =>
                setHoverRating(0)
              }
            />
          ))}
        </div>
      </div>

      {/* REVIEW TITLE */}

      <div className="review-input-group">
        <label>Review Title</label>

        <input
          type="text"
          placeholder="Example: Great product!"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
        />
      </div>

      {/* REVIEW MESSAGE */}

      <div className="review-input-group">
        <label>Your Review</label>

        <textarea
          rows="5"
          placeholder="Share your experience with this product..."
          value={message}
          onChange={(event) =>
            setMessage(event.target.value)
          }
        />
      </div>

      <button type="submit">
        {editingReview
            ? "Update Review"
            : "Submit Review"}
        </button>
    </form>
  );
};

export default ReviewForm;