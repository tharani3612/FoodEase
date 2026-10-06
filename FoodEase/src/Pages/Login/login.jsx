import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import loginFoodImage from "../../assets/images/login-food.png";

import "./login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);

  /* =========================================
     RESET FORM WHEN PAGE OPENS
  ========================================= */

  useEffect(() => {
    setFormData({
      email: "",
      password: "",
      rememberMe: false
    });

    setShowPassword(false);
  }, []);


  /* =========================================
     HANDLE INPUT
  ========================================= */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };


  /* =========================================
     LOGIN
  ========================================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    // Empty fields
    if (!formData.email || !formData.password) {
      alert("Please enter email and password.");
      return;
    }

    // Get registered user
    const savedUser = localStorage.getItem("foodEaseUser");

    // No registered user
    if (!savedUser) {
      alert("No account found. Please register first.");

      navigate("/register");

      return;
    }

    // Convert JSON string to object
    const user = JSON.parse(savedUser);

    // Email match
    const emailMatch =
      user.email.toLowerCase() ===
      formData.email.toLowerCase();

    // Password match
    const passwordMatch =
      user.password === formData.password;


    /* =========================================
       LOGIN SUCCESS
    ========================================= */

    if (emailMatch && passwordMatch) {

      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      localStorage.setItem(
        "userEmail",
        user.email
      );


      // Remember Me
      if (formData.rememberMe) {

        localStorage.setItem(
          "rememberMe",
          "true"
        );

      } else {

        localStorage.removeItem(
          "rememberMe"
        );

      }


      alert(
        `Welcome back, ${user.name}!`
      );

      navigate("/home");

      return;
    }


    /* =========================================
       LOGIN ERRORS
    ========================================= */

    if (!emailMatch) {

      alert(
        "Email does not match. Please check your registered email."
      );

      return;
    }


    if (!passwordMatch) {

      alert(
        "Incorrect password. Please try again."
      );

      return;
    }
  };


  return (

    <div className="login-page">

      <div className="login-container">


        {/* =================================
            LEFT IMAGE
        ================================= */}

        <div className="login-visual">

          <img
            src={loginFoodImage}
            alt="FoodEase"
            className="login-visual-image"
          />

        </div>


        {/* =================================
            RIGHT LOGIN SECTION
        ================================= */}

        <div className="login-form-section">

          <div className="login-form-container">


            {/* =================================
                TOP DECORATION
            ================================= */}

            <div className="login-decoration">

              <span>
                ✦
              </span>

              <span>
                Good Food
              </span>

              <span>
                Good Mood!
              </span>

            </div>


            {/* =================================
                HEADER
            ================================= */}

            <div className="login-form-header">

              <span className="login-label">
                WELCOME BACK
              </span>

              <h1>
                Welcome <span>Back!</span>
              </h1>

              <p>
                Login to your FoodEase account and continue
                your delicious journey.
              </p>

            </div>


            {/* =================================
                LOGIN FORM
            ================================= */}

            <form
              className="login-form"
              onSubmit={handleSubmit}
              autoComplete="off"
            >


              {/* ================================
                  EMAIL
              ================================= */}

              <div className="input-field">

                <div className="input-icon">
                  ✉
                </div>

                <div className="input-content">

                  <label>
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    autoComplete="off"
                    required
                  />

                </div>

              </div>


              {/* ================================
                  PASSWORD
              ================================= */}

              <div className="input-field">

                <div className="input-icon">
                  🔒
                </div>

                <div className="input-content">

                  <label>
                    Password
                  </label>

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="new-password"
                    required
                  />

                </div>


                <button
                  type="button"
                  className="toggle-password"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label="Toggle password visibility"
                >

                  {showPassword
                    ? "👁"
                    : "👁"}

                </button>

              </div>


              {/* ================================
                  OPTIONS
              ================================= */}

              <div className="form-options">


                {/* REMEMBER ME */}

                <label className="remember-me">

                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />

                  <span>
                    Remember me
                  </span>

                </label>


                {/* FORGOT PASSWORD */}

                <button
                  type="button"
                  className="forgot-link"
                  onClick={() =>
                    alert(
                      "Password reset feature will be added later."
                    )
                  }
                >

                  Forgot password?

                </button>

              </div>


              {/* ================================
                  LOGIN BUTTON
              ================================= */}

              <button
                type="submit"
                className="login-btn"
              >

                <span>
                  Login
                </span>

                <span className="login-arrow">
                  →
                </span>

              </button>

            </form>


            {/* =================================
                DIVIDER
            ================================= */}

            <div className="divider">

              <span>
                OR
              </span>

            </div>


            {/* =================================
                SOCIAL LOGIN
            ================================= */}

            <div className="social-buttons">


              {/* GOOGLE */}

              <a
                href="https://accounts.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
              >

                <span className="google-icon">
                  G
                </span>

                <span>
                  Continue with Google
                </span>

              </a>


              {/* FACEBOOK */}

              <a
                href="https://www.facebook.com/login/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
              >

                <span className="fb-icon">
                  f
                </span>

                <span>
                  Continue with Facebook
                </span>

              </a>

            </div>


            {/* =================================
                REGISTER CARD
            ================================= */}

            <div className="register-card">

              <div className="register-card-icon">
                👤
              </div>

              <div className="register-card-content">

                <span>
                  Don't have an account?
                </span>

                <Link to="/register">
                  Register Now →
                </Link>

              </div>

            </div>


            {/* =================================
                BACK HOME
            ================================= */}

            <Link
              to="/home"
              className="back-home"
            >
              ← Back to FoodEase
            </Link>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Login;