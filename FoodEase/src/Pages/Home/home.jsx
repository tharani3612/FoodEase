import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  const categories = [
    {
      name: "Pizza",
      count: "120+ Items",
      img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "Burgers",
      count: "90+ Items",
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "Noodles",
      count: "80+ Items",
      img: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "Indian",
      count: "150+ Items",
      img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "Desserts",
      count: "70+ Items",
      img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "Drinks",
      count: "60+ Items",
      img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=300&q=80",
    },
  ];

  const restaurants = [
    {
      id: 1,
      name: "Pizza Palace",
      rating: "4.8",
      cuisine: "Italian • Pizza • Fast Food",
      time: "25-30 min",
      price: "₹200 for two",
      img: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      name: "Burger House",
      rating: "4.7",
      cuisine: "Burgers • American • Fast Food",
      time: "20-25 min",
      price: "₹250 for two",
      img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      name: "Spice Kitchen",
      rating: "4.9",
      cuisine: "Indian • Biryani • South Indian",
      time: "30-35 min",
      price: "₹300 for two",
      img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-tag">
            <span>🍴</span> Delicious food, delivered fast
          </span>

          <h1>
            Your Favorite Food,
            <br />
            <span>Delivered To Your Door.</span>
          </h1>

          <p>
            Discover the best restaurants around you and enjoy delicious meals
            delivered fresh and fast to your doorstep.
          </p>

          <div className="hero-buttons">
            <Link to="/restaurants" className="primary-btn">
              Explore Restaurants
            </Link>

            <Link to="/restaurants" className="secondary-btn">
              Order Now
            </Link>
          </div>

          <div className="hero-info">
            <div>
              <strong>500+</strong>
              <span>Restaurants</span>
            </div>
            <div className="stat-divider"></div>
            <div>
              <strong>10K+</strong>
              <span>Happy Customers</span>
            </div>
            <div className="stat-divider"></div>
            <div>
              <strong>30 min</strong>
              <span>Fast Delivery</span>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <div className="image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
              alt="Delicious Food Spread"
              className="main-hero-img"
            />
          </div>

          <div className="floating-card rating-card">
            <div className="icon-badge star-bg">⭐</div>
            <div>
              <strong>4.9</strong>
              <small>Food Rating</small>
            </div>
          </div>

          <div className="floating-card delivery-card">
            <div className="icon-badge delivery-bg">🚴</div>
            <div>
              <strong>30 min</strong>
              <small>Fast Delivery</small>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-heading">
          <div>
            <span>EXPLORE</span>
            <h2>What are you craving?</h2>
          </div>

          <Link to="/restaurants" className="view-all-link">
            View All <span>→</span>
          </Link>
        </div>

        <div className="category-grid">
          {categories.map((cat, idx) => (
            <div className="category-card" key={idx}>
              <div className="category-img-container">
                <img src={cat.img} alt={cat.name} />
              </div>
              <h3>{cat.name}</h3>
              <p>{cat.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Restaurants */}
      <section className="restaurants-section">
        <div className="restaurants-container">
          <div className="section-heading">
            <div>
              <span>TOP PICKS</span>
              <h2>Popular Restaurants</h2>
            </div>

            <Link to="/restaurants" className="view-all-link">
              View All <span>→</span>
            </Link>
          </div>

          <div className="restaurant-grid">
            {restaurants.map((res) => (
              <div className="restaurant-card" key={res.id}>
                <div className="restaurant-image">
                  <img src={res.img} alt={res.name} />
                  <span className="rating-badge">⭐ {res.rating}</span>
                </div>

                <div className="restaurant-content">
                  <div className="restaurant-title">
                    <h3>{res.name}</h3>
                  </div>

                  <p className="cuisine-text">{res.cuisine}</p>

                  <div className="restaurant-meta">
                    <span>🛵 {res.time}</span>
                    <span>{res.price}</span>
                  </div>

                  <Link to={`/restaurant/${res.id}`} className="card-link">
                    View Restaurant <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-wrapper">
        <div className="cta-section">
          <div className="cta-content">
            <span>HUNGRY?</span>
            <h2>
              Good food is just
              <br />
              a few clicks away.
            </h2>
            <p>
              Order your favorite meals from the best restaurants around you right now.
            </p>
            <Link to="/restaurants" className="cta-btn">
              Start Ordering →
            </Link>
          </div>

          <div className="cta-image-box">
            <img
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=80"
              alt="Fresh Pizza"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;