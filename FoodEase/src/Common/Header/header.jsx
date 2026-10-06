import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  ShoppingBag,
  UtensilsCrossed,
  Menu,
  X
} from "lucide-react";

import "./header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const location = useLocation();


  /* =========================================
     CLOSE MOBILE MENU WHEN PAGE CHANGES
  ========================================= */

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);


  /* =========================================
     HEADER SCROLL EFFECT
  ========================================= */

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);


  /* =========================================
     GET CART COUNT
  ========================================= */

  useEffect(() => {

    const updateCartCount = () => {

      const userEmail =
        localStorage.getItem("userEmail");

      // User login pannala
      if (!userEmail) {
        setCartCount(0);
        return;
      }

      // Current user's cart
      const cartKey =
        `foodEaseCart_${userEmail}`;

      const savedCart =
        localStorage.getItem(cartKey);

      if (!savedCart) {
        setCartCount(0);
        return;
      }

      try {

        const cart =
          JSON.parse(savedCart);

        if (!Array.isArray(cart)) {
          setCartCount(0);
          return;
        }

        // Total quantity calculate
        const totalItems = cart.reduce(
          (total, item) =>
            total +
            Number(item.quantity || 0),
          0
        );

        setCartCount(totalItems);

      } catch (error) {

        console.log(
          "Cart count error:",
          error
        );

        setCartCount(0);
      }
    };


    // Initial count
    updateCartCount();


    // Update when localStorage changes
    window.addEventListener(
      "storage",
      updateCartCount
    );


    return () => {
      window.removeEventListener(
        "storage",
        updateCartCount
      );
    };

  }, [location]);


  /* =========================================
     TOGGLE MOBILE MENU
  ========================================= */

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };


  return (

    <header
      className={`header ${
        scrolled ? "scrolled" : ""
      }`}
    >

      <div className="header-container">


        {/* =================================
            LOGO
        ================================= */}

        <Link
          to="/home"
          className="logo"
        >

          <span className="logo-icon">

            <UtensilsCrossed
              size={22}
              color="#e85d2a"
            />

          </span>

          <span className="logo-text">

            Food
            <span>Ease</span>

          </span>

        </Link>


        {/* =================================
            NAVIGATION LINKS
        ================================= */}

        <nav
          className={`nav-links ${
            menuOpen ? "open" : ""
          }`}
        >

          <NavLink
            to="/home"
            end
          >
            Home
          </NavLink>

          <NavLink
            to="/restaurants"
          >
            Restaurants
          </NavLink>

          <NavLink
            to="/wishlist"
          >
            Wishlist
          </NavLink>

          <NavLink
            to="/orders"
          >
            Orders
          </NavLink>

        </nav>


        {/* =================================
            HEADER ACTIONS
        ================================= */}

        <div className="header-actions">


          {/* CART */}

          <Link
            to="/cart"
            className="hdr-btn hdr-cart-btn"
            aria-label="View Cart"
          >

            <ShoppingBag
              size={18}
            />

            <span className="cart-text">
              Cart
            </span>


            {/* ONLY SHOW BADGE IF ITEMS EXIST */}

            {cartCount > 0 && (

              <span className="cart-badge">
                {cartCount}
              </span>

            )}

          </Link>


          {/* AUTH BUTTONS */}

          <div className="auth-buttons">

            <Link
              to="/login"
              className="hdr-btn hdr-login-btn"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="hdr-btn hdr-signup-btn"
            >
              Sign Up
            </Link>

          </div>


          {/* MOBILE TOGGLE */}

          <button
            className="mobile-toggle"
            onClick={toggleMenu}
            aria-label="Toggle Navigation"
          >

            {menuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}

          </button>

        </div>

      </div>

    </header>
  );
}

export default Header;