import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import FoodCard from "../../Common/FoodCard/foodCard";

import {
  getRestaurantById,
  getFoodsByRestaurant
} from "../../Services/foodApi";

import "./restaurantDetails.css";

function RestaurantDetails() {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [foods, setFoods] = useState([]);
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [wishlistItems, setWishlistItems] =
    useState([]);


  /* =========================================
     LOAD RESTAURANT + FOOD
  ========================================= */

  useEffect(() => {
    const restaurantData =
      getRestaurantById(id);

    const foodData =
      getFoodsByRestaurant(id);

    setRestaurant(restaurantData);
    setFoods(foodData);
  }, [id]);


  /* =========================================
     LOAD USER WISHLIST
  ========================================= */

  useEffect(() => {
    const userEmail =
      localStorage.getItem("userEmail");

    if (!userEmail) {
      setWishlistItems([]);
      return;
    }

    const wishlistKey =
      `foodEaseWishlist_${userEmail}`;

    const savedWishlist =
      localStorage.getItem(wishlistKey);

    if (!savedWishlist) {
      setWishlistItems([]);
      return;
    }

    try {
      const parsedWishlist =
        JSON.parse(savedWishlist);

      if (Array.isArray(parsedWishlist)) {
        setWishlistItems(parsedWishlist);
      } else {
        setWishlistItems([]);
      }
    } catch (error) {
      console.log(
        "Wishlist loading error:",
        error
      );

      setWishlistItems([]);
    }
  }, []);


  /* =========================================
     CATEGORIES
  ========================================= */

  const categories = [
    "All",
    ...new Set(
      foods.map((food) => food.category)
    )
  ];


  /* =========================================
     FILTER FOOD
  ========================================= */

  const filteredFoods =
    selectedCategory === "All"
      ? foods
      : foods.filter(
          (food) =>
            food.category ===
            selectedCategory
        );


  /* =========================================
     ADD TO CART
  ========================================= */

  const handleAddToCart = (food) => {
    const userEmail =
      localStorage.getItem("userEmail");

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
        localStorage.getItem(cartKey)
      ) || [];

    const existingItem =
      existingCart.find(
        (item) => item.id === food.id
      );

    let updatedCart;

    if (existingItem) {
      updatedCart =
        existingCart.map((item) =>
          item.id === food.id
            ? {
                ...item,
                quantity:
                  Number(item.quantity || 0) + 1
              }
            : item
        );
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...food,
          quantity: 1,
          restaurantId:
            restaurant.id,
          restaurantName:
            restaurant.name
        }
      ];
    }

    localStorage.setItem(
      cartKey,
      JSON.stringify(updatedCart)
    );

    alert(
      `${food.name} added to cart!`
    );
  };


  /* =========================================
     ADD / REMOVE WISHLIST
  ========================================= */

  const handleAddToWishlist = (food) => {
    const userEmail =
      localStorage.getItem("userEmail");

    if (!userEmail) {
      alert(
        "Please login before adding items to wishlist."
      );
      return;
    }

    const wishlistKey =
      `foodEaseWishlist_${userEmail}`;

    const existingWishlist =
      JSON.parse(
        localStorage.getItem(
          wishlistKey
        )
      ) || [];

    const alreadyExists =
      existingWishlist.some(
        (item) => item.id === food.id
      );


    /* REMOVE */

    if (alreadyExists) {
      const updatedWishlist =
        existingWishlist.filter(
          (item) =>
            item.id !== food.id
        );

      localStorage.setItem(
        wishlistKey,
        JSON.stringify(
          updatedWishlist
        )
      );

      setWishlistItems(
        updatedWishlist
      );

      alert(
        `${food.name} removed from wishlist!`
      );

      return;
    }


    /* ADD */

    const wishlistFood = {
      ...food,
      restaurantId:
        restaurant.id,
      restaurantName:
        restaurant.name
    };

    const updatedWishlist = [
      ...existingWishlist,
      wishlistFood
    ];

    localStorage.setItem(
      wishlistKey,
      JSON.stringify(
        updatedWishlist
      )
    );

    setWishlistItems(
      updatedWishlist
    );

    alert(
      `${food.name} added to wishlist!`
    );
  };


  /* =========================================
     RESTAURANT LIKE
  ========================================= */

  const handleRestaurantWishlist = () => {
    const userEmail =
      localStorage.getItem("userEmail");

    if (!userEmail) {
      alert(
        "Please login before adding to wishlist."
      );
      return;
    }

    const wishlistKey =
      `foodEaseWishlist_${userEmail}`;

    const existingWishlist =
      JSON.parse(
        localStorage.getItem(
          wishlistKey
        )
      ) || [];

    const restaurantItem = {
      id: `restaurant-${restaurant.id}`,
      name: restaurant.name,
      image: restaurant.image,
      cuisine: restaurant.cuisine,
      restaurantName:
        restaurant.name,
      restaurantId:
        restaurant.id,
      type: "restaurant"
    };

    const exists =
      existingWishlist.some(
        (item) =>
          item.id ===
          restaurantItem.id
      );

    if (exists) {
      const updatedWishlist =
        existingWishlist.filter(
          (item) =>
            item.id !==
            restaurantItem.id
        );

      localStorage.setItem(
        wishlistKey,
        JSON.stringify(
          updatedWishlist
        )
      );

      setWishlistItems(
        updatedWishlist
      );

      return;
    }

    const updatedWishlist = [
      ...existingWishlist,
      restaurantItem
    ];

    localStorage.setItem(
      wishlistKey,
      JSON.stringify(
        updatedWishlist
      )
    );

    setWishlistItems(
      updatedWishlist
    );

    alert(
      `${restaurant.name} added to wishlist!`
    );
  };


  /* =========================================
     CHECK RESTAURANT WISHLIST
  ========================================= */

  const restaurantIsWishlisted =
    wishlistItems.some(
      (item) =>
        item.id ===
        `restaurant-${restaurant?.id}`
    );


  /* =========================================
     RESTAURANT NOT FOUND
  ========================================= */

  if (!restaurant) {
    return (
      <div className="restaurant-not-found">

        <div className="not-found-icon">
          🍽️
        </div>

        <h2>
          Restaurant Not Found
        </h2>

        <p>
          Sorry, we couldn't find the
          restaurant you're looking for.
        </p>

        <Link to="/restaurants">
          Back to Restaurants
        </Link>

      </div>
    );
  }


  return (
    <div className="restaurant-details-page">

      <div className="details-container">


        {/* =================================
            BREADCRUMB
        ================================= */}

        <div className="details-breadcrumb">

          <Link to="/home">
            Home
          </Link>

          <span>/</span>

          <Link to="/restaurants">
            Restaurants
          </Link>

          <span>/</span>

          <span>
            {restaurant.name}
          </span>

        </div>


        {/* =================================
            RESTAURANT INFO
        ================================= */}

        <section className="restaurant-info">

          <div className="restaurant-cover">

            <img
              src={restaurant.image}
              alt={restaurant.name}
            />

          </div>


          <div className="restaurant-info-content">

            <div className="restaurant-info-heading">

              <div>

                <span className="restaurant-label">
                  RESTAURANT
                </span>

                <h1>
                  {restaurant.name}
                </h1>

                <p>
                  {restaurant.cuisine}
                </p>

              </div>


              {/* RESTAURANT WISHLIST */}

              <button
                className={
                  restaurantIsWishlisted
                    ? "restaurant-like liked"
                    : "restaurant-like"
                }
                onClick={
                  handleRestaurantWishlist
                }
                aria-label="Add restaurant to wishlist"
              >
                {restaurantIsWishlisted
                  ? "♥"
                  : "♡"}
              </button>

            </div>


            {/* STATS */}

            <div className="restaurant-stats">

              <div>

                <strong>
                  ⭐ {restaurant.rating}
                </strong>

                <span>
                  Rating
                </span>

              </div>

              <div>

                <strong>
                  🛵 {restaurant.deliveryTime}
                </strong>

                <span>
                  Delivery
                </span>

              </div>

              <div>

                <strong>
                  ₹{restaurant.priceForTwo}
                </strong>

                <span>
                  For two
                </span>

              </div>

            </div>


            {/* LOCATION */}

            <div className="restaurant-location">
              📍 {restaurant.location}
            </div>


            {/* OFFER */}

            {restaurant.offer && (
              <div className="restaurant-offer-box">

                🎉{" "}
                <strong>
                  {restaurant.offer}
                </strong>

                <span>
                  {" "}
                  on selected items
                </span>

              </div>
            )}

          </div>

        </section>


        {/* =================================
            MENU
        ================================= */}

        <section className="restaurant-menu">

          <div className="menu-heading">

            <div>

              <span>
                MENU
              </span>

              <h2>
                Explore Our Food
              </h2>

              <p>
                Freshly prepared favorites from{" "}
                {restaurant.name}
              </p>

            </div>

          </div>


          {/* CATEGORIES */}

          <div className="food-categories">

            {categories.map(
              (category) => (

                <button
                  key={category}
                  className={
                    selectedCategory ===
                    category
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setSelectedCategory(
                      category
                    )
                  }
                >
                  {category}
                </button>

              )
            )}

          </div>


          {/* FOOD GRID */}

          {filteredFoods.length > 0 ? (

            <div className="food-grid">

              {filteredFoods.map(
                (food) => (

                  <FoodCard
                    key={food.id}
                    food={food}
                    onAddToCart={
                      handleAddToCart
                    }
                    onAddToWishlist={
                      handleAddToWishlist
                    }
                    isWishlisted={
                      wishlistItems.some(
                        (item) =>
                          item.id ===
                          food.id
                      )
                    }
                  />

                )
              )}

            </div>

          ) : (

            <div className="no-food">

              <span>
                🍽️
              </span>

              <h3>
                No food items found
              </h3>

              <p>
                Try selecting another category.
              </p>

            </div>

          )}

        </section>

      </div>

    </div>
  );
}

export default RestaurantDetails;