
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Heart,
  Trash2,
  ShoppingBag,
  Star,
  ArrowRight,
} from "lucide-react";

import "./wishlist.css";

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  // =========================================
  // USER WISHLIST KEY
  // =========================================

  const userEmail = localStorage.getItem("userEmail");

  const wishlistKey = userEmail
    ? `foodEaseWishlist_${userEmail}`
    : null;

  const cartKey = userEmail
    ? `foodEaseCart_${userEmail}`
    : null;

  // =========================================
  // LOAD WISHLIST
  // =========================================

  const loadWishlist = () => {
    if (!wishlistKey) {
      setWishlistItems([]);
      return;
    }

    try {
      const savedWishlist = JSON.parse(
        localStorage.getItem(wishlistKey) || "[]"
      );

      setWishlistItems(
        Array.isArray(savedWishlist) ? savedWishlist : []
      );
    } catch (error) {
      console.error("Wishlist loading error:", error);
      setWishlistItems([]);
    }
  };

  useEffect(() => {
    loadWishlist();

    // Refresh when wishlist changes in another component
    const handleWishlistUpdate = () => {
      loadWishlist();
    };

    window.addEventListener(
      "foodEase-wishlist-updated",
      handleWishlistUpdate
    );

    window.addEventListener("storage", handleWishlistUpdate);

    return () => {
      window.removeEventListener(
        "foodEase-wishlist-updated",
        handleWishlistUpdate
      );

      window.removeEventListener("storage", handleWishlistUpdate);
    };
  }, [wishlistKey]);

  // =========================================
  // SAVE WISHLIST
  // =========================================

  const saveWishlist = (updatedWishlist) => {
    if (!wishlistKey) {
      alert("Please login to use your wishlist.");
      return;
    }

    try {
      localStorage.setItem(
        wishlistKey,
        JSON.stringify(updatedWishlist)
      );

      setWishlistItems(updatedWishlist);

      window.dispatchEvent(
        new Event("foodEase-wishlist-updated")
      );
    } catch (error) {
      console.error("Wishlist save error:", error);
      alert("Unable to update wishlist. Please try again.");
    }
  };

  // =========================================
  // REMOVE FROM WISHLIST
  // =========================================

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlistItems.filter(
      (item) => String(item.id) !== String(id)
    );

    saveWishlist(updatedWishlist);
  };

  // =========================================
  // CLEAR WISHLIST
  // =========================================

  const clearWishlist = () => {
    if (!wishlistKey) return;

    localStorage.removeItem(wishlistKey);
    setWishlistItems([]);

    window.dispatchEvent(
      new Event("foodEase-wishlist-updated")
    );
  };

  // =========================================
  // ADD ITEM TO CART
  // =========================================

  const addToCart = (food) => {
    if (!userEmail || !cartKey) {
      alert("Please login before adding items to cart.");
      return;
    }

    try {
      const existingCart = JSON.parse(
        localStorage.getItem(cartKey) || "[]"
      );

      const cart = Array.isArray(existingCart)
        ? existingCart
        : [];

      const existingItem = cart.find(
        (item) => String(item.id) === String(food.id)
      );

      let updatedCart;

      if (existingItem) {
        updatedCart = cart.map((item) =>
          String(item.id) === String(food.id)
            ? {
                ...item,
                quantity: Number(item.quantity || 0) + 1,
              }
            : item
        );
      } else {
        updatedCart = [
          ...cart,
          {
            ...food,
            quantity: 1,
          },
        ];
      }

      localStorage.setItem(
        cartKey,
        JSON.stringify(updatedCart)
      );

      window.dispatchEvent(new Event("savore-cart-updated"));

      alert(`${food.name} added to cart!`);
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("Unable to add item to cart.");
    }
  };

  // =========================================
  // MOVE ALL TO CART
  // =========================================

  const moveAllToCart = () => {
    if (!userEmail || !cartKey) {
      alert("Please login before adding items to cart.");
      return;
    }

    if (wishlistItems.length === 0) return;

    try {
      const existingCart = JSON.parse(
        localStorage.getItem(cartKey) || "[]"
      );

      const updatedCart = Array.isArray(existingCart)
        ? [...existingCart]
        : [];

      wishlistItems.forEach((food) => {
        const existingIndex = updatedCart.findIndex(
          (item) => String(item.id) === String(food.id)
        );

        if (existingIndex !== -1) {
          updatedCart[existingIndex] = {
            ...updatedCart[existingIndex],
            quantity:
              Number(updatedCart[existingIndex].quantity || 0) + 1,
          };
        } else {
          updatedCart.push({
            ...food,
            quantity: 1,
          });
        }
      });

      localStorage.setItem(
        cartKey,
        JSON.stringify(updatedCart)
      );

      window.dispatchEvent(new Event("savore-cart-updated"));

      clearWishlist();

      alert("All wishlist items added to cart!");
    } catch (error) {
      console.error("Move all to cart error:", error);
      alert("Unable to move wishlist items to cart.");
    }
  };

  // =========================================
  // STATUS CLASS
  // =========================================

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">

        {/* BREADCRUMB */}

        <div className="wishlist-breadcrumb">
          <Link to="/home">Home</Link>
          <span>/</span>
          <span className="active">Wishlist</span>
        </div>

        {/* HEADING */}

        <div className="wishlist-heading">
          <div>
            <span className="sub-tag">
              YOUR FAVORITES
            </span>

            <h1>My Wishlist</h1>

            <p>
              Save your favorite food for later
              and order anytime
            </p>
          </div>

          {wishlistItems.length > 0 && (
            <div className="wishlist-header-actions">

              <button
                className="move-all-btn"
                onClick={moveAllToCart}
                type="button"
              >
                <ShoppingBag size={15} />
                Move All to Cart
              </button>

              <button
                className="clear-wishlist-btn"
                onClick={clearWishlist}
                type="button"
              >
                <Trash2 size={15} />
                Clear Wishlist
              </button>

            </div>
          )}
        </div>

        {/* EMPTY WISHLIST */}

        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist">

            <div className="empty-wishlist-icon">
              <Heart size={38} strokeWidth={1.8} />
            </div>

            <h2>Your wishlist is empty</h2>

            <p>
              Save your favorite dishes here
              and order them whenever you want.
            </p>

            <Link
              to="/restaurants"
              className="explore-food-btn"
            >
              Explore Food
              <ArrowRight size={16} />
            </Link>

          </div>
        ) : (

          /* WISHLIST ITEMS */

          <div className="wishlist-content">

            <div className="wishlist-top">
              <h2>Saved Items</h2>

              <span className="items-count-badge">
                {wishlistItems.length}{" "}
                {wishlistItems.length === 1 ? "item" : "items"}
              </span>
            </div>

            <div className="wishlist-grid">

              {wishlistItems.map((item, index) => (
                <div
                  className="wishlist-card"
                  key={`${item.id}-${index}`}
                >

                  {/* IMAGE */}

                  <div className="wishlist-image">

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <button
                      className="wishlist-remove"
                      type="button"
                      onClick={() => removeFromWishlist(item.id)}
                      aria-label="Remove from wishlist"
                    >
                      <Heart
                        size={18}
                        fill="#e85d2a"
                        color="#e85d2a"
                      />
                    </button>

                    {item.isPopular && (
                      <span className="wishlist-popular">
                        Popular
                      </span>
                    )}

                  </div>

                  {/* CONTENT */}

                  <div className="wishlist-card-content">

                    <div className="wishlist-title-row">

                      <div className="item-title-wrap">

                        <span
                          className={`veg-icon ${
                            item.isVeg ? "veg" : "non-veg"
                          }`}
                        >
                          <span className="dot"></span>
                        </span>

                        <h3>{item.name}</h3>

                      </div>

                      <span className="rating-tag">
                        <Star
                          size={11}
                          fill="#fff"
                          color="#fff"
                        />
                        {item.rating || "4.2"}
                      </span>

                    </div>

                    {/* DESCRIPTION */}

                    <p className="wishlist-description">
                      {item.description ||
                        item.restaurantName ||
                        "Delicious food from FoodEase"}
                    </p>

                    {/* BOTTOM */}

                    <div className="wishlist-bottom">

                      <strong>
                        ₹{item.price}
                      </strong>

                      <button
                        className="wishlist-cart-btn"
                        type="button"
                        onClick={() => addToCart(item)}
                      >
                        + Add to Cart
                      </button>

                    </div>

                  </div>
                </div>
              ))}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Wishlist;
