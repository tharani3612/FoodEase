import "./foodCard.css";

function FoodCard({
  food,
  onAddToCart,
  onAddToWishlist,
  isWishlisted = false,
}) {
  return (
    <div className="food-card">

      {/* Food Image */}
      <div className="food-card-image">

        <img
          src={food.image}
          alt={food.name}
        />

        {/* Popular Badge */}
        {food.isPopular && (
          <span className="popular-badge">
            Popular
          </span>
        )}

        {/* Wishlist Button */}
        <button
          className={`food-wishlist-btn ${
            isWishlisted ? "active" : ""
          }`}
          onClick={() => onAddToWishlist(food)}
          aria-label={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          {isWishlisted ? "♥" : "♡"}
        </button>

      </div>

      {/* Food Content */}
      <div className="food-card-content">

        <div className="food-card-header">

          <h3>{food.name}</h3>

          <span className="food-rating">
            ⭐ {food.rating}
          </span>

        </div>

        <p className="food-description">
          {food.description}
        </p>

        <div className="food-card-bottom">

          <span className="food-price">
            ₹{food.price}
          </span>

          <button
            className="add-food-btn"
            onClick={() => onAddToCart(food)}
          >
            + Add
          </button>

        </div>

      </div>

    </div>
  );
}

export default FoodCard;