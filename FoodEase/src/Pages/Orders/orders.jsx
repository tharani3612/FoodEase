import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders);
  }, []);

  const getStatusClass = (status) => {
    if (status === "Delivered") {
      return "status-delivered";
    }

    if (status === "On the way") {
      return "status-onway";
    }

    return "status-placed";
  };

  return (
    <div className="orders-page">
      <div className="orders-container">

        {/* BREADCRUMB */}
        <div className="orders-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Orders</span>
        </div>

        {/* HEADING HERO */}
        <div className="orders-heading">
          <div className="orders-heading-info">
            <span>YOUR ORDERS</span>
            <h1>Order History</h1>
            <p>Track and manage all your FoodEase orders seamlessly.</p>
          </div>

          <Link to="/restaurants" className="order-food-btn">
            Order Food <span>+</span>
          </Link>
        </div>

        {orders.length === 0 ? (

          /* EMPTY ORDERS STATE */
          <div className="empty-orders">
            <div className="empty-orders-icon">📦</div>
            <h2>No orders yet</h2>
            <p>
              You haven't placed any orders yet. Start exploring delicious food from top restaurants!
            </p>
            <Link to="/restaurants" className="browse-restaurants-btn">
              Browse Restaurants
            </Link>
          </div>

        ) : (

          /* ORDERS LIST CONTENT */
          <div className="orders-content">
            <div className="orders-count">
              <h2>Recent Orders</h2>
              <span>
                {orders.length} {orders.length === 1 ? "order" : "orders"}
              </span>
            </div>

            <div className="orders-list">
              {orders.map((order) => (
                <div className="order-card" key={order.id}>

                  {/* ORDER TOP */}
                  <div className="order-card-top">
                    <div>
                      <span className="order-label">ORDER ID</span>
                      <h3>#{order.id}</h3>
                    </div>

                    <span
                      className={`order-status ${getStatusClass(
                        order.status
                      )}`}
                    >
                      ● {order.status}
                    </span>
                  </div>

                  {/* RESTAURANT INFO */}
                  <div className="order-restaurant">
                    <div className="restaurant-order-icon">🍴</div>
                    <div>
                      <h3>{order.restaurant}</h3>
                      <p>Ordered on {order.date}</p>
                    </div>
                  </div>

                  {/* ITEMS LIST */}
                  <div className="order-items">
                    {order.items.map((item, index) => (
                      <div
                        className="order-item"
                        key={`${item.name}-${index}`}
                      >
                        <div className="order-item-detail">
                          <span className="order-item-qty">
                            {item.quantity}x
                          </span>
                          <span className="order-item-name">
                            {item.name}
                          </span>
                        </div>
                        <span className="order-item-price">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* BOTTOM INFO & ACTION */}
                  <div className="order-card-bottom">
                    <div className="order-meta-group">
                      <div className="order-payment">
                        <span>Payment</span>
                        <strong>{order.payment}</strong>
                      </div>

                      <div className="order-total">
                        <span>Total Paid</span>
                        <strong>₹{order.total}</strong>
                      </div>
                    </div>

                    <Link
                      to={`/orders/${order.id}`}
                      className="view-order-btn"
                    >
                      View Details <span>→</span>
                    </Link>
                  </div>

                </div>
              ))}
            </div>
          </div>

        )}

      </div>
    </div>
  );
}

export default Orders;