import restaurants from "../Data/restaurants";
import foods from "../Data/foods";

/* =========================
   GET ALL RESTAURANTS
========================= */

export const getRestaurants = () => {
  return restaurants;
};


/* =========================
   GET SINGLE RESTAURANT
========================= */

export const getRestaurantById = (id) => {
  return restaurants.find(
    (restaurant) => restaurant.id === Number(id)
  );
};


/* =========================
   GET ALL FOODS
========================= */

export const getFoods = () => {
  return foods;
};


/* =========================
   GET FOOD BY ID
========================= */

export const getFoodById = (id) => {
  return foods.find(
    (food) => food.id === Number(id)
  );
};


/* =========================
   GET FOODS BY RESTAURANT
========================= */

export const getFoodsByRestaurant = (restaurantId) => {
  return foods.filter(
    (food) => food.restaurantId === Number(restaurantId)
  );
};


/* =========================
   SEARCH RESTAURANTS
========================= */

export const searchRestaurants = (searchText) => {
  const search = searchText.toLowerCase();

  return restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(search) ||
    restaurant.cuisine.toLowerCase().includes(search)
  );
};


/* =========================
   SEARCH FOODS
========================= */

export const searchFoods = (searchText) => {
  const search = searchText.toLowerCase();

  return foods.filter((food) =>
    food.name.toLowerCase().includes(search) ||
    food.category.toLowerCase().includes(search)
  );
};