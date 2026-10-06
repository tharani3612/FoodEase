import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-icon">🍴</span>
            <span>Food<span>Ease</span></span>
          </Link>

          <p>
            Delicious food from your favorite restaurants,
            delivered fresh and fast to your doorstep.
          </p>

          <div className="footer-socials">
            <a href="#" aria-label="Instagram">◎</a>
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Twitter">𝕏</a>
          </div>
        </div>

        <div className="footer-column">
          <h3>FoodEase</h3>

          <Link to="/home">Home</Link>
          <Link to="/restaurants">Restaurants</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/orders">My Orders</Link>
        </div>

        <div className="footer-column">
          <h3>Support</h3>

          <a href="#">Help Center</a>
          <a href="#">Contact Us</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
        </div>

        <div className="footer-column">
          <h3>Download App</h3>

          <p className="download-text">
            Get the FoodEase app for a faster ordering experience.
          </p>

          <div className="app-buttons">
            <a href="#" className="app-button">
              <span></span>
              <div>
                <small>Download on the</small>
                <strong>App Store</strong>
              </div>
            </a>

            <a href="#" className="app-button">
              <span>▶</span>
              <div>
                <small>GET IT ON</small>
                <strong>Google Play</strong>
              </div>
            </a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 FoodEase. All rights reserved.</p>

        <p>
          Made with ❤️ for food lovers
        </p>
      </div>
    </footer>
  );
}

export default Footer;