
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./cart.css";

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  // =========================================
  // USER CART KEY
  // =========================================

  const userEmail = localStorage.getItem("userEmail");

  const cartKey = userEmail
    ? `foodEaseCart_${userEmail}`
    : null;

  // =========================================
  // LOAD CART ITEMS
  // =========================================

  useEffect(() => {
    if (!cartKey) {
      setCartItems([]);
      return;
    }

    try {
      const savedCart = JSON.parse(
        localStorage.getItem(cartKey) || "[]"
      );

      setCartItems(
        Array.isArray(savedCart) ? savedCart : []
      );
    } catch (error) {
      console.error("Cart loading error:", error);
      setCartItems([]);
    }
  }, [cartKey]);

  // =========================================
  // UPDATE CART
  // =========================================

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);

    if (cartKey) {
      localStorage.setItem(
        cartKey,
        JSON.stringify(updatedCart)
      );
    }
  };

  // =========================================
  // INCREASE QUANTITY
  // =========================================

  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: Number(item.quantity || 0) + 1,
          }
        : item
    );

    updateCart(updatedCart);
  };

  // =========================================
  // DECREASE QUANTITY
  // =========================================

  const decreaseQuantity = (id) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Number(item.quantity || 0) - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  // =========================================
  // REMOVE ITEM
  // =========================================

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(
      (item) => item.id !== id
    );

    updateCart(updatedCart);
  };

  // =========================================
  // CLEAR CART
  // =========================================

  const clearCart = () => {
    setCartItems([]);

    if (cartKey) {
      localStorage.removeItem(cartKey);
    }
  };

  // =========================================
  // PRICE CALCULATION
  // =========================================

  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  const deliveryFee = cartItems.length > 0 ? 40 : 0;

  const tax = Math.round(subtotal * 0.05);

  const total = subtotal + deliveryFee + tax;

  // =========================================
  // CART PAGE
  // =========================================

  return (
    <div className="cart-page">

      <div className="cart-container">

        {/* BREADCRUMB */}

        <div className="cart-breadcrumb">

          <Link to="/home">
            Home
          </Link>

          <span>/</span>

          <span>
            Cart
          </span>

        </div>

        {/* HEADING */}

        <div className="cart-heading">

          <div>

            <span>
              YOUR ORDER
            </span>

            <h1>
              Shopping Cart
            </h1>

            <p>
              {cartItems.length}{" "}
              {cartItems.length === 1 ? "item" : "items"}{" "}
              in your cart
            </p>

          </div>

          {cartItems.length > 0 && (

            <button
              className="clear-cart-btn"
              onClick={clearCart}
            >
              Clear Cart
            </button>

          )}

        </div>

        {/* EMPTY CART */}

        {cartItems.length === 0 ? (

          <div className="empty-cart">

            <div className="empty-cart-icon">
              🛒
            </div>

            <h2>
              Your cart is empty
            </h2>

            <p>
              Looks like you haven't added anything
              to your cart yet.
            </p>

            <Link
              to="/restaurants"
              className="browse-food-btn"
            >
              Explore Restaurants
            </Link>

          </div>

        ) : (

          /* CART CONTENT */

          <div className="cart-layout">

            {/* ITEMS SECTION */}

            <div className="cart-items-section">

              <div className="cart-items-header">

                <h2>
                  Your Items
                </h2>

                <span>
                  {cartItems.length} items
                </span>

              </div>

              <div className="cart-items">

                {cartItems.map((item) => (

                  <div
                    className="cart-item"
                    key={item.id}
                  >

                    {/* IMAGE */}

                    <div className="cart-item-image">

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                    </div>

                    {/* ITEM INFO */}

                    <div className="cart-item-info">

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        {item.restaurantName}
                      </p>

                      <span className="cart-item-price">
                        ₹{item.price}
                      </span>

                    </div>

                    {/* ACTIONS */}

                    <div className="cart-item-actions">

                      <div className="quantity-control">

                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                        >
                          −
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                        >
                          +
                        </button>

                      </div>

                      <strong>
                        ₹
                        {Number(item.price || 0) *
                          Number(item.quantity || 0)}
                      </strong>

                      <button
                        type="button"
                        className="remove-item"
                        onClick={() =>
                          removeItem(item.id)
                        }
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                ))}

              </div>

              {/* CONTINUE SHOPPING */}

              <Link
                to="/restaurants"
                className="continue-shopping"
              >
                ← Continue Shopping
              </Link>

            </div>

            {/* ORDER SUMMARY */}

            <aside className="cart-summary">

              <div className="summary-header">

                <h2>
                  Order Summary
                </h2>

              </div>

              {/* SUBTOTAL */}

              <div className="summary-row">

                <span>
                  Subtotal
                </span>

                <strong>
                  ₹{subtotal}
                </strong>

              </div>

              {/* DELIVERY */}

              <div className="summary-row">

                <span>
                  Delivery Fee
                </span>

                <strong>
                  ₹{deliveryFee}
                </strong>

              </div>

              {/* TAX */}

              <div className="summary-row">

                <span>
                  Taxes
                </span>

                <strong>
                  ₹{tax}
                </strong>

              </div>

              <div className="summary-divider"></div>

              {/* TOTAL */}

              <div className="summary-total">

                <span>
                  Total
                </span>

                <strong>
                  ₹{total}
                </strong>

              </div>

              {/* CHECKOUT BUTTON */}

              <button
                type="button"
                className="checkout-btn"
                onClick={() =>
                  navigate("/checkout")
                }
              >
                Proceed to Checkout
                <span>→</span>
              </button>

              <div className="secure-payment">
                🔒 Secure & Safe Checkout
              </div>

            </aside>

          </div>

        )}

      </div>

    </div>
  );
}

export default Cart;
