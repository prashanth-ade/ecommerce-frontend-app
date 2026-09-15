import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./AdminReviews.css";

const AdminReviews = () => {
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn");

    if (adminLoggedIn !== "true") {
      toast.error("Please login as admin");
      navigate("/admin/login");
      return;
    }

    const storedReviews = JSON.parse(
      localStorage.getItem("reviews") || "[]"
    );

    setReviews(Array.isArray(storedReviews) ? storedReviews.filter(Boolean) : []);
  }, [navigate]);

  const updateReviewStatus = (id, status) => {
    const updatedReviews = reviews.map((review) =>
      review.id === id
        ? { ...review, status }
        : review
    );

    setReviews(updatedReviews);

    localStorage.setItem(
      "reviews",
      JSON.stringify(updatedReviews)
    );

    toast.success(`Review ${status.toLowerCase()}`);
  };

  const deleteReview = (id) => {
    const updatedReviews = reviews.filter(
      (review) => review.id !== id
    );

    setReviews(updatedReviews);

    localStorage.setItem(
      "reviews",
      JSON.stringify(updatedReviews)
    );

    toast.success("Review deleted successfully");
  };

  const filteredReviews =
    filter === "All"
      ? reviews
      : reviews.filter(
          (review) => review.status === filter
        );

  const totalReviews = reviews.length;

  const approvedReviews = reviews.filter(
    (review) => review.status === "Approved"
  ).length;

  const pendingReviews = reviews.filter(
    (review) => review.status === "Pending"
  ).length;

  return (
    <div className="admin-reviews-page">

      <div className="reviews-header">
        <div>
          <h1>Reviews Management</h1>
          <p>Manage customer product reviews</p>
        </div>

        <button
          className="reviews-dashboard-btn"
          onClick={() => navigate("/admin/dashboard")}
        >
          Dashboard
        </button>
      </div>

      {/* Statistics */}

      <div className="review-stats">

        <div className="review-stat-card">
          <h3>Total Reviews</h3>
          <strong>{totalReviews}</strong>
        </div>

        <div className="review-stat-card">
          <h3>Approved</h3>
          <strong>{approvedReviews}</strong>
        </div>

        <div className="review-stat-card">
          <h3>Pending</h3>
          <strong>{pendingReviews}</strong>
        </div>

      </div>

      {/* Filter */}

      <div className="review-filter">

        <label>Filter Reviews:</label>

        <select
          value={filter}
          onChange={(event) =>
            setFilter(event.target.value)
          }
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

      </div>

      {/* Reviews */}

      <div className="reviews-container">

        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div
              className="review-card"
              key={review.id}
            >

              <div className="review-top">

                <div>
                  <h3>{review.productName}</h3>

                  <p className="review-customer">
                    By: {review.customerName}
                  </p>
                </div>

                <span
                  className={`review-status ${review.status?.toLowerCase()}`}
                >
                  {review.status}
                </span>

              </div>

              <div className="review-rating">
                {"★".repeat(Number(review.rating || 0))}
                {"☆".repeat(
                  5 - Number(review.rating || 0)
                )}
              </div>

              <p className="review-comment">
                {review.comment}
              </p>

              <div className="review-actions">

                {review.status !== "Approved" && (
                  <button
                    className="approve-btn"
                    onClick={() =>
                      updateReviewStatus(
                        review.id,
                        "Approved"
                      )
                    }
                  >
                    Approve
                  </button>
                )}

                {review.status !== "Rejected" && (
                  <button
                    className="reject-btn"
                    onClick={() =>
                      updateReviewStatus(
                        review.id,
                        "Rejected"
                      )
                    }
                  >
                    Reject
                  </button>
                )}

                <button
                  className="delete-review-btn"
                  onClick={() =>
                    deleteReview(review.id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>
          ))
        ) : (
          <div className="no-reviews">
            No reviews found
          </div>
        )}

      </div>

    </div>
  );
};

export default AdminReviews;