import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Heart,
  Trash2,
  ShoppingBag,
  Star,
  ArrowRight
} from "lucide-react";

import "./wishlist.css";

function Wishlist() {
  const [wishlistItems, setWishlistItems] =
    useState([]);


  /* =========================================
     GET USER WISHLIST KEY
  ========================================= */

  const getWishlistKey = () => {
    const userEmail =
      localStorage.getItem("userEmail");

    if (!userEmail) {
      return null;
    }

    return `foodEaseWishlist_${userEmail}`;
  };


  /* =========================================
     LOAD WISHLIST
  ========================================= */

  useEffect(() => {

    const wishlistKey =
      getWishlistKey();

    if (!wishlistKey) {
      setWishlistItems([]);
      return;
    }

    const savedWishlist =
      localStorage.getItem(
        wishlistKey
      );

    if (!savedWishlist) {
      setWishlistItems([]);
      return;
    }

    try {

      const parsedWishlist =
        JSON.parse(savedWishlist);

      if (Array.isArray(parsedWishlist)) {
        setWishlistItems(
          parsedWishlist
        );
      } else {
        setWishlistItems([]);
      }

    } catch (error) {

      console.log(
        "Wishlist error:",
        error
      );

      setWishlistItems([]);

    }

  }, []);


  /* =========================================
     SAVE WISHLIST
  ========================================= */

  const saveWishlist = (
    updatedWishlist
  ) => {

    const wishlistKey =
      getWishlistKey();

    if (!wishlistKey) {
      return;
    }

    if (
      updatedWishlist.length === 0
    ) {

      localStorage.removeItem(
        wishlistKey
      );

    } else {

      localStorage.setItem(
        wishlistKey,
        JSON.stringify(
          updatedWishlist
        )
      );

    }

    setWishlistItems(
      updatedWishlist
    );
  };


  /* =========================================
     REMOVE
  ========================================= */

  const removeFromWishlist = (
    id
  ) => {

    const updatedWishlist =
      wishlistItems.filter(
        (item) =>
          item.id !== id
      );

    saveWishlist(
      updatedWishlist
    );

  };


  /* =========================================
     ADD TO CART
  ========================================= */

  const addToCart = (food) => {

    const userEmail =
      localStorage.getItem(
        "userEmail"
      );

    if (!userEmail) {
      alert(
        "Please login before adding items to cart."
      );
      return;
    }

    const cartKey =
      `foodEaseCart_${userEmail}`;

    const existingCart =
      JSON.parse(
        localStorage.getItem(
          cartKey
        )
      ) || [];


    const existingItem =
      existingCart.find(
        (item) =>
          item.id === food.id
      );


    let updatedCart;


    if (existingItem) {

      updatedCart =
        existingCart.map(
          (item) =>
            item.id === food.id
              ? {
                  ...item,
                  quantity:
                    Number(
                      item.quantity || 0
                    ) + 1
                }
              : item
        );

    } else {

      updatedCart = [
        ...existingCart,
        {
          ...food,
          quantity: 1
        }
      ];

    }


    localStorage.setItem(
      cartKey,
      JSON.stringify(
        updatedCart
      )
    );


    alert(
      `${food.name} added to cart!`
    );

  };


  /* =========================================
     MOVE ALL TO CART
  ========================================= */

  const moveAllToCart = () => {

    const userEmail =
      localStorage.getItem(
        "userEmail"
      );

    if (!userEmail) {
      alert(
        "Please login before adding items to cart."
      );
      return;
    }

    const cartKey =
      `foodEaseCart_${userEmail}`;

    const existingCart =
      JSON.parse(
        localStorage.getItem(
          cartKey
        )
      ) || [];


    let updatedCart = [
      ...existingCart
    ];


    wishlistItems.forEach(
      (food) => {

        const existingItem =
          updatedCart.find(
            (item) =>
              item.id === food.id
          );


        if (existingItem) {

          existingItem.quantity =
            Number(
              existingItem.quantity || 0
            ) + 1;

        } else {

          updatedCart.push({
            ...food,
            quantity: 1
          });

        }

      }
    );


    localStorage.setItem(
      cartKey,
      JSON.stringify(
        updatedCart
      )
    );


    clearWishlist();

    alert(
      "All wishlist items added to cart!"
    );

  };


  /* =========================================
     CLEAR WISHLIST
  ========================================= */

  const clearWishlist = () => {

    const wishlistKey =
      getWishlistKey();

    if (wishlistKey) {
      localStorage.removeItem(
        wishlistKey
      );
    }

    setWishlistItems([]);

  };


  return (

    <div className="wishlist-page">

      <div className="wishlist-container">


        {/* BREADCRUMB */}

        <div className="wishlist-breadcrumb">

          <Link to="/home">
            Home
          </Link>

          <span>
            /
          </span>

          <span className="active">
            Wishlist
          </span>

        </div>


        {/* HEADING */}

        <div className="wishlist-heading">

          <div>

            <span className="sub-tag">
              YOUR FAVORITES
            </span>

            <h1>
              My Wishlist
            </h1>

            <p>
              Save your favorite food for later
              and order anytime
            </p>

          </div>


          {wishlistItems.length > 0 && (

            <div className="wishlist-header-actions">

              <button
                className="move-all-btn"
                onClick={
                  moveAllToCart
                }
              >

                <ShoppingBag
                  size={15}
                />

                Move All to Cart

              </button>


              <button
                className="clear-wishlist-btn"
                onClick={
                  clearWishlist
                }
              >

                <Trash2
                  size={15}
                />

                Clear Wishlist

              </button>

            </div>

          )}

        </div>


        {/* EMPTY */}

        {wishlistItems.length === 0 ? (

          <div className="empty-wishlist">

            <div className="empty-wishlist-icon">

              <Heart
                size={38}
                strokeWidth={1.8}
              />

            </div>

            <h2>
              Your wishlist is empty
            </h2>

            <p>
              Save your favorite dishes here
              and order them whenever you want.
            </p>

            <Link
              to="/restaurants"
              className="explore-food-btn"
            >

              Explore Food

              <ArrowRight
                size={16}
              />

            </Link>

          </div>

        ) : (


          /* WISHLIST */

          <div className="wishlist-content">


            <div className="wishlist-top">

              <h2>
                Saved Items
              </h2>

              <span className="items-count-badge">

                {wishlistItems.length}{" "}

                {wishlistItems.length === 1
                  ? "item"
                  : "items"}

              </span>

            </div>


            <div className="wishlist-grid">

              {wishlistItems.map(
                (item) => (

                  <div
                    className="wishlist-card"
                    key={item.id}
                  >


                    {/* IMAGE */}

                    <div className="wishlist-image">

                      <img
                        src={item.image}
                        alt={item.name}
                      />


                      {/* REMOVE */}

                      <button
                        className="wishlist-remove"
                        onClick={() =>
                          removeFromWishlist(
                            item.id
                          )
                        }
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


                          {/* VEG */}

                          <span
                            className={
                              `veg-icon ${
                                item.isVeg
                                  ? "veg"
                                  : "non-veg"
                              }`
                            }
                          >

                            <span className="dot"></span>

                          </span>


                          <h3>
                            {item.name}
                          </h3>

                        </div>


                        {/* RATING */}

                        <span className="rating-tag">

                          <Star
                            size={11}
                            fill="#fff"
                            color="#fff"
                          />

                          {item.rating ||
                            "4.2"}

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
                          onClick={() =>
                            addToCart(
                              item
                            )
                          }
                        >
                          + Add to Cart
                        </button>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default Wishlist;