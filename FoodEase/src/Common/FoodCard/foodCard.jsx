
import "./foodCard.css";

function FoodCard({
  food,
  onAddToCart,
  onAddToWishlist,
  isWishlisted = false,
}) {
  return (
    <div className="food-card">

      {/* FOOD IMAGE */}

      <div className="food-card-image">

        <img
          src={food.image}
          alt={food.name}
          loading="lazy"
        />

        {/* POPULAR BADGE */}

        {food.isPopular && (
          <span className="popular-badge">
            Popular
          </span>
        )}

        {/* WISHLIST BUTTON */}

        <button
          type="button"
          className={`food-wishlist-btn ${
            isWishlisted ? "active" : ""
          }`}
          onClick={() => onAddToWishlist?.(food)}
          aria-label={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          aria-pressed={isWishlisted}
        >
          {isWishlisted ? "♥" : "♡"}
        </button>

      </div>

      {/* FOOD CONTENT */}

      <div className="food-card-content">

        <div className="food-card-header">

          <h3>{food.name}</h3>

          <span className="food-rating">
            ⭐ {food.rating || "4.2"}
          </span>

        </div>

        <p className="food-description">
          {food.description || "Delicious food from FoodEase"}
        </p>

        {/* PRICE AND CART */}

        <div className="food-card-bottom">

          <span className="food-price">
            ₹{food.price}
          </span>

          <button
            type="button"
            className="add-food-btn"
            onClick={() => onAddToCart?.(food)}
          >
            + Add
          </button>

        </div>

      </div>

    </div>
  );
}

export default FoodCard;
