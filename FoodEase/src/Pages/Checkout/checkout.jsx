import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payment: "UPI"
  });

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCartItems(savedCart);
  }, []);

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const deliveryFee = cartItems.length > 0 ? 40 : 0;

  const tax = Math.round(subtotal * 0.05);

  const total = subtotal + deliveryFee + tax;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      navigate("/restaurants");
      return;
    }

    const orderId =
      "FE" + Math.floor(1000 + Math.random() * 9000);

    const newOrder = {
      id: orderId,
      restaurant:
        cartItems[0]?.restaurantName || "FoodEase Restaurant",
      items: cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: total,
      status: "Order Placed",
      date: new Date().toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric"
        }
      ),
      payment: formData.payment,
      customer: {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode
      }
    };

    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    localStorage.setItem(
      "orders",
      JSON.stringify([
        newOrder,
        ...existingOrders
      ])
    );

    localStorage.removeItem("cart");

    alert(
      `Order placed successfully! Order ID: ${orderId}`
    );

    navigate(`/orders/${orderId}`);
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-empty">

          <div className="checkout-empty-icon">
            🛒
          </div>

          <h2>
            Your cart is empty
          </h2>

          <p>
            Add some delicious food before
            proceeding to checkout.
          </p>

          <Link
            to="/restaurants"
            className="checkout-browse-btn"
          >
            Browse Restaurants
          </Link>

        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">

      <div className="checkout-container">

        {/* BREADCRUMB */}

        <div className="checkout-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/cart">Cart</Link>
          <span>/</span>
          <span>Checkout</span>
        </div>


        {/* HEADING */}

        <div className="checkout-heading">
          <span>FINAL STEP</span>

          <h1>
            Checkout
          </h1>

          <p>
            Enter your details and place your order.
          </p>
        </div>


        <form
          className="checkout-layout"
          onSubmit={handleSubmit}
        >

          {/* LEFT */}

          <div className="checkout-left">

            {/* DELIVERY DETAILS */}

            <section className="checkout-section">

              <div className="checkout-section-heading">
                <div className="checkout-number">
                  01
                </div>

                <div>
                  <h2>
                    Delivery Details
                  </h2>

                  <p>
                    Where should we deliver your order?
                  </p>
                </div>
              </div>


              <div className="checkout-form-grid">

                <div className="checkout-field">

                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />

                </div>


                <div className="checkout-field">

                  <label>
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    pattern="[0-9]{10}"
                    required
                  />

                </div>


                <div className="checkout-field full-width">

                  <label>
                    Delivery Address
                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House No, Street, Area"
                    rows="3"
                    required
                  />

                </div>


                <div className="checkout-field">

                  <label>
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    required
                  />

                </div>


                <div className="checkout-field">

                  <label>
                    Pincode
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="6 digit pincode"
                    pattern="[0-9]{6}"
                    required
                  />

                </div>

              </div>

            </section>


            {/* PAYMENT */}

            <section className="checkout-section">

              <div className="checkout-section-heading">

                <div className="checkout-number">
                  02
                </div>

                <div>
                  <h2>
                    Payment Method
                  </h2>

                  <p>
                    Choose how you want to pay.
                  </p>
                </div>

              </div>


              <div className="payment-options">

                <label
                  className={
                    formData.payment === "UPI"
                      ? "payment-option active"
                      : "payment-option"
                  }
                >

                  <input
                    type="radio"
                    name="payment"
                    value="UPI"
                    checked={formData.payment === "UPI"}
                    onChange={handleChange}
                  />

                  <span className="payment-icon">
                    📱
                  </span>

                  <span className="payment-info">
                    <strong>
                      UPI
                    </strong>

                    <small>
                      Google Pay, PhonePe, Paytm
                    </small>
                  </span>

                  <span className="payment-check">
                    ✓
                  </span>

                </label>


                <label
                  className={
                    formData.payment === "Card"
                      ? "payment-option active"
                      : "payment-option"
                  }
                >

                  <input
                    type="radio"
                    name="payment"
                    value="Card"
                    checked={formData.payment === "Card"}
                    onChange={handleChange}
                  />

                  <span className="payment-icon">
                    💳
                  </span>

                  <span className="payment-info">
                    <strong>
                      Credit / Debit Card
                    </strong>

                    <small>
                      Visa, Mastercard, RuPay
                    </small>
                  </span>

                  <span className="payment-check">
                    ✓
                  </span>

                </label>


                <label
                  className={
                    formData.payment === "Cash on Delivery"
                      ? "payment-option active"
                      : "payment-option"
                  }
                >

                  <input
                    type="radio"
                    name="payment"
                    value="Cash on Delivery"
                    checked={
                      formData.payment === "Cash on Delivery"
                    }
                    onChange={handleChange}
                  />

                  <span className="payment-icon">
                    💵
                  </span>

                  <span className="payment-info">
                    <strong>
                      Cash on Delivery
                    </strong>

                    <small>
                      Pay when your order arrives
                    </small>
                  </span>

                  <span className="payment-check">
                    ✓
                  </span>

                </label>

              </div>

            </section>


            {/* SAFETY */}

            <div className="checkout-security">
              🔒 Your payment and personal information
              are secure with FoodEase.
            </div>

          </div>


          {/* RIGHT - SUMMARY */}

          <aside className="checkout-summary">

            <div className="checkout-summary-heading">

              <h2>
                Order Summary
              </h2>

              <span>
                {cartItems.length} items
              </span>

            </div>


            <div className="checkout-items">

              {cartItems.map((item) => (

                <div
                  className="checkout-item"
                  key={item.id}
                >

                  <div className="checkout-item-image">

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                  </div>

                  <div className="checkout-item-info">

                    <h3>
                      {item.name}
                    </h3>

                    <span>
                      Qty: {item.quantity}
                    </span>

                  </div>

                  <strong>
                    ₹{item.price * item.quantity}
                  </strong>

                </div>

              ))}

            </div>


            <div className="checkout-summary-divider"></div>


            <div className="checkout-price-row">
              <span>
                Subtotal
              </span>

              <strong>
                ₹{subtotal}
              </strong>
            </div>


            <div className="checkout-price-row">
              <span>
                Delivery Fee
              </span>

              <strong>
                ₹{deliveryFee}
              </strong>
            </div>


            <div className="checkout-price-row">
              <span>
                Taxes
              </span>

              <strong>
                ₹{tax}
              </strong>
            </div>


            <div className="checkout-total">

              <span>
                Total Amount
              </span>

              <strong>
                ₹{total}
              </strong>

            </div>


            <button
              type="submit"
              className="place-order-btn"
            >
              Place Order
              <span>→</span>
            </button>


            <Link
              to="/cart"
              className="back-cart-link"
            >
              ← Back to Cart
            </Link>

          </aside>

        </form>

      </div>

    </div>
  );
}

export default Checkout;