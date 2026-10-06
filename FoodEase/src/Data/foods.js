const foods = [
  // Pizza Palace
  {
    id: 1,
    restaurantId: 1,
    name: "Classic Margherita Pizza",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    description: "Fresh mozzarella, rich tomato sauce and organic basil leaves.",
    price: 249,
    category: "Pizza",
    isPopular: true
  },
  {
    id: 2,
    restaurantId: 1,
    name: "Chicken Pepperoni Pizza",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    description: "Loaded with chicken pepperoni and extra melted mozzarella cheese.",
    price: 349,
    category: "Pizza",
    isPopular: true
  },

  // Burger House
  {
    id: 3,
    restaurantId: 2,
    name: "Classic Chicken Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    description: "Crispy chicken patty with fresh lettuce, onions and mayo.",
    price: 189,
    category: "Burgers",
    isPopular: true
  },
  {
    id: 4,
    restaurantId: 2,
    name: "Double Cheese Supreme Burger",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    description: "Double chicken patty topped with cheddar cheese and barbecue sauce.",
    price: 269,
    category: "Burgers",
    isPopular: false
  },

  // Spice Kitchen
  {
    id: 5,
    restaurantId: 3,
    name: "Hyderabadi Chicken Biryani",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    description: "Aromatic basmati rice cooked with tender chicken and authentic spices.",
    price: 299,
    category: "Biryani",
    isPopular: true
  },
  {
    id: 6,
    restaurantId: 3,
    name: "Paneer Butter Masala",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    description: "Soft paneer cubes cooked in a creamy tomato gravy.",
    price: 229,
    category: "Indian",
    isPopular: false
  },

  // Tandoori Tales
  {
    id: 7,
    restaurantId: 4,
    name: "Smoky Tandoori Chicken",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    description: "Juicy chicken marinated in yogurt and Indian spices, grilled to perfection.",
    price: 329,
    category: "Tandoor",
    isPopular: true
  },

  // Green Bowl
  {
    id: 8,
    restaurantId: 5,
    name: "Fresh Veggie Protein Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    description: "Quinoa, avocado, fresh veggies, and olive oil dressing.",
    price: 199,
    category: "Healthy",
    isPopular: false
  },

  // Sweet Cravings
  {
    id: 9,
    restaurantId: 6,
    name: "Molten Chocolate Lava Cake",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    description: "Warm chocolate cake with a gooey dark chocolate center.",
    price: 159,
    category: "Desserts",
    isPopular: true
  },

  // Dragon Wok
  {
    id: 10,
    restaurantId: 7,
    name: "Hakka Noodles with Manchurian",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    description: "Stir-fried noodles served with spicy vegetable Manchurian gravy.",
    price: 279,
    category: "Chinese",
    isPopular: true
  },

  // Urban Brew Cafe
  {
    id: 11,
    restaurantId: 9,
    name: "Iced Caramel Macchiato",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    description: "Rich espresso combined with vanilla syrup, milk, and caramel drizzle.",
    price: 180,
    category: "Cafe",
    isPopular: true
  }
];

export default foods;