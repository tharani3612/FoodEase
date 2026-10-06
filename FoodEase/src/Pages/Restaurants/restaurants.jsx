import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import RestaurantCard from "../../Common/RestaurantCard/restaurantCard";
import { getRestaurants } from "../../Services/foodApi";

import "./restaurants.css";

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");

  useEffect(() => {
    const data = getRestaurants();
    setRestaurants(data || []);
  }, []);

  const cuisines = [
    "All",
    "Italian",
    "Burgers",
    "Indian",
    "North Indian",
    "Healthy",
    "Desserts"
  ];

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const name = restaurant.name ? restaurant.name.toLowerCase() : "";
    
    const cuisine = Array.isArray(restaurant.cuisine)
      ? restaurant.cuisine.join(" ").toLowerCase()
      : restaurant.cuisine
      ? restaurant.cuisine.toLowerCase()
      : "";

    const searchLower = search.trim().toLowerCase();

    const searchMatch =
      !searchLower ||
      name.includes(searchLower) ||
      cuisine.includes(searchLower);

    const cuisineMatch =
      selectedCuisine === "All" ||
      cuisine.includes(selectedCuisine.toLowerCase());

    const ratingMatch =
      selectedRating === "All" ||
      Number(restaurant.rating || 0) >= Number(selectedRating);

    return searchMatch && cuisineMatch && ratingMatch;
  });

  return (
    <div className="restaurants-page">

      {/* Page Hero */}
      <section className="restaurants-hero">

        <div className="restaurants-hero-content">

          <span className="hero-badge">✨ DISCOVER GOOD FOOD</span>

          <h1>
            Find Your
            <br />
            <strong>Favorite Restaurant</strong>
          </h1>

          <p>
            Explore the best restaurants around you and discover
            delicious meals delivered right to your doorstep.
          </p>

          <div className="restaurant-search">

            <span className="search-icon">🔍</span>

            <input
              type="text"
              placeholder="Search restaurants or cuisines..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button className="clear-btn" onClick={() => setSearch("")}>
                ✕
              </button>
            )}

          </div>

        </div>

        {/* Hero Food Image with Badge */}
        <div className="restaurants-hero-food-wrapper">
          <div className="restaurants-hero-food">
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"
              alt="Delicious Pizza"
            />
          </div>
          <div className="hero-offer-badge">
            ⚡ <span>Fast Delivery</span>
          </div>
        </div>

      </section>


      {/* Main Content */}

      <section className="restaurants-content">

        {/* Breadcrumb */}

        <div className="restaurant-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Restaurants</span>
        </div>


        {/* Heading */}

        <div className="restaurants-heading">

          <div>
            <span>EXPLORE</span>

            <h2>
              Restaurants Near You
            </h2>

            <p>
              <strong>{filteredRestaurants.length}</strong> restaurants available
            </p>
          </div>

        </div>


        {/* Filters */}

        <div className="restaurant-filters">

          <div className="filter-group">

            <label>Cuisine</label>

            <div className="filter-buttons">

              {cuisines.map((cuisine) => (
                <button
                  key={cuisine}
                  className={
                    selectedCuisine === cuisine
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setSelectedCuisine(cuisine)
                  }
                >
                  {cuisine}
                </button>
              ))}

            </div>

          </div>


          <div className="rating-filter">

            <label>Rating</label>

            <select
              value={selectedRating}
              onChange={(e) =>
                setSelectedRating(e.target.value)
              }
            >
              <option value="All">
                All Ratings
              </option>

              <option value="4.5">
                ⭐ 4.5+
              </option>

              <option value="4.7">
                ⭐ 4.7+
              </option>

              <option value="4.8">
                ⭐ 4.8+
              </option>
            </select>

          </div>

        </div>


        {/* Restaurant Grid */}

        {filteredRestaurants.length > 0 ? (

          <div className="restaurants-grid">

            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
              />
            ))}

          </div>

        ) : (

          <div className="no-restaurants">

            <div>
              🔍
            </div>

            <h3>
              No restaurants found
            </h3>

            <p>
              Try searching for another restaurant or cuisine.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setSelectedCuisine("All");
                setSelectedRating("All");
              }}
            >
              Clear Filters
            </button>

          </div>

        )}

      </section>

    </div>
  );
}

export default Restaurants;