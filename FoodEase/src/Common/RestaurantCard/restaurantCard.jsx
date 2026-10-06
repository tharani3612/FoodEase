import { useState } from "react";
import { Link } from "react-router-dom";
import "./restaurantCard.css";

function RestaurantCard({ restaurant }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleImageError = (e) => {
    e.target.src =
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80";
  };

  const toggleFavorite = (e) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="restaurant-card">
      <div className="restaurant-card-image">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          onError={handleImageError}
          loading="lazy"
        />

        {restaurant.offer && (
          <span className="restaurant-offer">
            🏷️ {restaurant.offer}
          </span>
        )}

        <button
          className={`restaurant-favorite ${isFavorite ? "active" : ""}`}
          onClick={toggleFavorite}
          title={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          {isFavorite ? "❤️" : "♡"}
        </button>
      </div>

      <div className="restaurant-card-content">
        <div className="restaurant-card-top">
          <h3>{restaurant.name}</h3>

          <span className="restaurant-rating">
            ⭐ {restaurant.rating}
          </span>
        </div>

        <p className="restaurant-cuisine">{restaurant.cuisine}</p>

        {restaurant.location && (
          <div className="restaurant-location-info">
            📍 {restaurant.location}
          </div>
        )}

        <div className="restaurant-details">
          <span>🛵 {restaurant.deliveryTime}</span>
          <span className="dot">•</span>
          <span>₹{restaurant.priceForTwo} for two</span>
        </div>

        <Link
          to={`/restaurant/${restaurant.id}`}
          className="restaurant-view-btn"
        >
          <span>View Restaurant</span>
          <span className="arrow">→</span>
        </Link>
      </div>
    </div>
  );
}

export default RestaurantCard;