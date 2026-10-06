import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./orderDetails.css";

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const foundOrder = savedOrders.find(
      (item) => item.id === id
    );

    setOrder(foundOrder);
  }, [id]);

  if (!order) {
    return (
      <div className="order-not-found">

        <div className="order-not-found-icon">
          📦
        </div>

        <h2>
          Order Not Found
        </h2>

        <p>
          We couldn't find the order you're looking for.
        </p>

        <Link to="/orders">
          Back to Orders
        </Link>

      </div>
    );
  }

  const isDelivered =
    order.status === "Delivered";

  const isOnTheWay =
    order.status === "On the way";

  return (
    <div className="order-details-page">

      <div className="order-details-container">

        {/* BREADCRUMB */}

        <div className="order-details-breadcrumb">

          <Link to="/">
            Home
          </Link>

          <span>/</span>

          <Link to="/orders">
            Orders
          </Link>

          <span>/</span>

          <span>
            #{order.id}
          </span>

        </div>


        {/* HEADER */}

        <div className="order-details-heading">

          <div>

            <span>
              ORDER DETAILS
            </span>

            <h1>
              Order #{order.id}
            </h1>

            <p>
              Placed on {order.date}
            </p>

          </div>

          <span
            className={`details-status ${
              isDelivered
                ? "details-delivered"
                : isOnTheWay
                ? "details-onway"
                : "details-placed"
            }`}
          >
            {order.status}
          </span>

        </div>


        <div className="order-details-layout">

          {/* LEFT */}

          <div className="order-details-left">

            {/* TRACKING */}

            <section className="tracking-card">

              <div className="tracking-heading">

                <div>

                  <span>
                    LIVE TRACKING
                  </span>

                  <h2>
                    Track Your Order
                  </h2>

                </div>

                <div className="tracking-icon">
                  🚚
                </div>

              </div>


              <div className="tracking-timeline">

                <div
                  className={
                    order.status === "Order Placed" ||
                    isOnTheWay ||
                    isDelivered
                      ? "timeline-step completed"
                      : "timeline-step"
                  }
                >

                  <div className="timeline-dot">
                    ✓
                  </div>

                  <div>
                    <strong>
                      Order Placed
                    </strong>

                    <span>
                      Your order has been received
                    </span>
                  </div>

                </div>


                <div
                  className={
                    isOnTheWay || isDelivered
                      ? "timeline-line active"
                      : "timeline-line"
                  }
                ></div>


                <div
                  className={
                    isOnTheWay || isDelivered
                      ? "timeline-step completed"
                      : "timeline-step"
                  }
                >

                  <div className="timeline-dot">
                    {isOnTheWay || isDelivered
                      ? "✓"
                      : "2"}
                  </div>

                  <div>
                    <strong>
                      Preparing
                    </strong>

                    <span>
                      Restaurant is preparing your food
                    </span>
                  </div>

                </div>


                <div
                  className={
                    isDelivered
                      ? "timeline-line active"
                      : "timeline-line"
                  }
                ></div>


                <div
                  className={
                    isDelivered
                      ? "timeline-step completed"
                      : "timeline-step"
                  }
                >

                  <div className="timeline-dot">
                    {isDelivered ? "✓" : "3"}
                  </div>

                  <div>
                    <strong>
                      On the Way
                    </strong>

                    <span>
                      Delivery partner is heading to you
                    </span>
                  </div>

                </div>


                <div
                  className={
                    isDelivered
                      ? "timeline-line active"
                      : "timeline-line"
                  }
                ></div>


                <div
                  className={
                    isDelivered
                      ? "timeline-step completed"
                      : "timeline-step"
                  }
                >

                  <div className="timeline-dot">
                    {isDelivered ? "✓" : "4"}
                  </div>

                  <div>
                    <strong>
                      Delivered
                    </strong>

                    <span>
                      Enjoy your delicious meal!
                    </span>
                  </div>

                </div>

              </div>

            </section>


            {/* RESTAURANT */}

            <section className="order-restaurant-card">

              <div className="details-card-title">
                <h2>
                  Restaurant
                </h2>
              </div>

              <div className="details-restaurant-content">

                <div className="details-restaurant-icon">
                  🍴
                </div>

                <div>

                  <h3>
                    {order.restaurant}
                  </h3>

                  <p>
                    FoodEase Partner Restaurant
                  </p>

                </div>

              </div>

            </section>


            {/* ITEMS */}

            <section className="details-items-card">

              <div className="details-card-title">

                <h2>
                  Ordered Items
                </h2>

                <span>
                  {order.items.length} items
                </span>

              </div>


              <div className="details-items-list">

                {order.items.map(
                  (item, index) => (

                    <div
                      className="details-food-item"
                      key={`${item.name}-${index}`}
                    >

                      <div className="details-food-icon">
                        🍽️
                      </div>

                      <div className="details-food-info">

                        <h3>
                          {item.name}
                        </h3>

                        <span>
                          ₹{item.price} ×{" "}
                          {item.quantity}
                        </span>

                      </div>

                      <strong>
                        ₹
                        {item.price *
                          item.quantity}
                      </strong>

                    </div>

                  )
                )}

              </div>

            </section>


            {/* DELIVERY */}

            <section className="delivery-card">

              <div className="details-card-title">

                <h2>
                  Delivery Address
                </h2>

              </div>


              <div className="delivery-content">

                <div className="delivery-icon">
                  📍
                </div>

                <div>

                  <h3>
                    {order.customer?.name ||
                      "Customer"}
                  </h3>

                  <p>
                    {order.customer?.address ||
                      "Delivery address saved during checkout"}
                  </p>

                  <p>
                    {order.customer?.city || ""}
                    {" "}
                    {order.customer?.pincode || ""}
                  </p>

                  {order.customer?.phone && (
                    <span>
                      📞 {order.customer.phone}
                    </span>
                  )}

                </div>

              </div>

            </section>

          </div>


          {/* RIGHT SUMMARY */}

          <aside className="order-details-summary">

            <h2>
              Payment Summary
            </h2>


            <div className="details-payment-method">

              <span>
                Payment Method
              </span>

              <strong>
                {order.payment}
              </strong>

            </div>


            <div className="details-summary-divider"></div>


            <div className="details-summary-row">

              <span>
                Item Total
              </span>

              <strong>
                ₹
                {order.items.reduce(
                  (total, item) =>
                    total +
                    item.price *
                      item.quantity,
                  0
                )}
              </strong>

            </div>


            <div className="details-summary-row">

              <span>
                Delivery Fee
              </span>

              <strong>
                ₹40
              </strong>

            </div>


            <div className="details-summary-row">

              <span>
                Taxes
              </span>

              <strong>
                ₹
                {Math.round(
                  order.total * 0.05
                )}
              </strong>

            </div>


            <div className="details-summary-divider"></div>


            <div className="details-grand-total">

              <span>
                Total Paid
              </span>

              <strong>
                ₹{order.total}
              </strong>

            </div>


            <div className="order-safe-box">
              🔒
              <div>
                <strong>
                  Secure Order
                </strong>

                <span>
                  Your order information is safe
                  with FoodEase.
                </span>
              </div>
            </div>


            <Link
              to="/orders"
              className="back-orders-btn"
            >
              ← Back to Orders
            </Link>


            <Link
              to="/restaurants"
              className="order-again-btn"
            >
              Order Again
              <span>→</span>
            </Link>

          </aside>

        </div>

      </div>

    </div>
  );
}

export default OrderDetails;