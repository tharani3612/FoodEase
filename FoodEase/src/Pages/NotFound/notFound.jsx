import { Link } from "react-router-dom";
import "./notFound.css";

function NotFound() {
  return (
    <div className="not-found-page">

      <div className="not-found-content">

        <div className="not-found-number">
          404
        </div>

        <h1>
          Oops! Page Not Found
        </h1>

        <p>
          The page you're looking for doesn't exist
          or may have been moved.
        </p>

        <Link
          to="/home"
          className="not-found-btn"
        >
          ← Back to Home
        </Link>

      </div>

    </div>
  );
}

export default NotFound;