import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import loginFoodImage from "../../assets/images/login-food.png";

import "./register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: ""
    });

    setShowPassword(false);
    setShowConfirmPassword(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const existingUser = localStorage.getItem("foodEaseUser");

    if (existingUser) {
      const user = JSON.parse(existingUser);

      if (
        user.email.toLowerCase() ===
        formData.email.toLowerCase()
      ) {
        alert("This email is already registered. Please login.");
        navigate("/login");
        return;
      }
    }

    const userData = {
      name: formData.name,
      email: formData.email.toLowerCase(),
      phone: formData.phone,
      password: formData.password
    };

    localStorage.setItem(
      "foodEaseUser",
      JSON.stringify(userData)
    );

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");

    alert("Account created successfully!");

    navigate("/login");
  };

  return (
    <div className="register-page">

      <div className="register-container">

        {/* ================= LEFT IMAGE ================= */}

        <div className="register-visual">

          <img
            src={loginFoodImage}
            alt="FoodEase"
            className="register-visual-image"
          />

        </div>


        {/* ================= RIGHT SECTION ================= */}

        <div className="register-form-section">

          <div className="register-form-container">

            {/* DECORATION */}

            <div className="register-decoration">

              <span>✦</span>

              <span>
                Fresh Food
              </span>

              <span>
                Fresh Start!
              </span>

            </div>


            {/* HEADER */}

            <div className="register-form-header">

              <span className="register-label">
                GET STARTED
              </span>

              <h1>
                Create <span>Account!</span>
              </h1>

              <p>
                Join FoodEase and start your delicious
                journey with us.
              </p>

            </div>


            {/* FORM */}

            <form
              className="register-form"
              onSubmit={handleSubmit}
              autoComplete="off"
            >

              {/* ================= NAME ================= */}

              <div className="register-input-field">

                <div className="register-input-icon">
                  👤
                </div>

                <div className="register-input-content">

                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="off"
                    required
                  />

                </div>

              </div>


              {/* ================= EMAIL ================= */}

              <div className="register-input-field">

                <div className="register-input-icon">
                  ✉
                </div>

                <div className="register-input-content">

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


              {/* ================= PHONE ================= */}

              <div className="register-input-field">

                <div className="register-input-icon">
                  ☎
                </div>

                <div className="register-input-content">

                  <label>
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10 digit phone number"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    autoComplete="off"
                    required
                  />

                </div>

              </div>


              {/* ================= PASSWORD ================= */}

              <div className="register-input-field">

                <div className="register-input-icon">
                  🔒
                </div>

                <div className="register-input-content">

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
                    placeholder="Minimum 6 characters"
                    autoComplete="new-password"
                    required
                  />

                </div>

                <button
                  type="button"
                  className="register-toggle-password"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  👁
                </button>

              </div>


              {/* ================= CONFIRM PASSWORD ================= */}

              <div className="register-input-field">

                <div className="register-input-icon">
                  🔐
                </div>

                <div className="register-input-content">

                  <label>
                    Confirm Password
                  </label>

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    required
                  />

                </div>

                <button
                  type="button"
                  className="register-toggle-password"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  👁
                </button>

              </div>


              {/* ================= TERMS ================= */}

              <label className="register-terms">

                <input
                  type="checkbox"
                  required
                />

                <span>
                  I agree to the FoodEase{" "}
                  <a
                    href="#terms"
                    onClick={(e) =>
                      e.preventDefault()
                    }
                  >
                    Terms & Conditions
                  </a>
                </span>

              </label>


              {/* ================= CREATE ACCOUNT ================= */}

              <button
                type="submit"
                className="register-submit-btn"
              >

                <span>
                  Create Account
                </span>

                <span className="register-arrow">
                  →
                </span>

              </button>

            </form>


            {/* ================= LOGIN CARD ================= */}

            <div className="register-login-card">

              <div className="register-login-icon">
                ↪
              </div>

              <div className="register-login-content">

                <span>
                  Already have an account?
                </span>

                <Link to="/login">
                  Login Now →
                </Link>

              </div>

            </div>


            {/* ================= BACK HOME ================= */}

            <Link
              to="/home"
              className="register-home-link"
            >
              ← Back to FoodEase
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;