import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./cart.css";

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCartItems(savedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1
          }
        : item
    );

    updateCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(
      (item) => item.id !== id
    );

    updateCart(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);

    localStorage.removeItem("cart");
  };

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const deliveryFee = cartItems.length > 0 ? 40 : 0;

  const tax = Math.round(subtotal * 0.05);

  const total = subtotal + deliveryFee + tax;

  return (
    <div className="cart-page">

      <div className="cart-container">

        {/* Breadcrumb */}

        <div className="cart-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Cart</span>
        </div>


        {/* Heading */}

        <div className="cart-heading">

          <div>
            <span>YOUR ORDER</span>

            <h1>
              Shopping Cart
            </h1>

            <p>
              {cartItems.length}{" "}
              {cartItems.length === 1
                ? "item"
                : "items"}{" "}
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


        {cartItems.length === 0 ? (

          /* EMPTY CART */

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

            {/* ITEMS */}

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

                    <div className="cart-item-image">

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                    </div>


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


                    <div className="cart-item-actions">

                      <div className="quantity-control">

                        <button
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
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                        >
                          +
                        </button>

                      </div>

                      <strong>
                        ₹{item.price * item.quantity}
                      </strong>

                      <button
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

              <Link
                to="/restaurants"
                className="continue-shopping"
              >
                ← Continue Shopping
              </Link>

            </div>


            {/* SUMMARY */}

            <aside className="cart-summary">

              <div className="summary-header">
                <h2>
                  Order Summary
                </h2>
              </div>

              <div className="summary-row">
                <span>
                  Subtotal
                </span>

                <strong>
                  ₹{subtotal}
                </strong>
              </div>

              <div className="summary-row">
                <span>
                  Delivery Fee
                </span>

                <strong>
                  ₹{deliveryFee}
                </strong>
              </div>

              <div className="summary-row">
                <span>
                  Taxes
                </span>

                <strong>
                  ₹{tax}
                </strong>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total">
                <span>
                  Total
                </span>

                <strong>
                  ₹{total}
                </strong>
              </div>

              <button
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