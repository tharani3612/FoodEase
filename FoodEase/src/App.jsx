import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import Header from "./Common/Header/header";
import Footer from "./Common/Footer/footer";
import ProtectedRoute from "./Common/ProtectedRoute/protectedRoute";

import Home from "./Pages/Home/home";
import Restaurants from "./Pages/Restaurants/restaurants";
import RestaurantDetails from "./Pages/RestaurantDetails/restaurantDetails";
import Cart from "./Pages/Cart/cart";
import Wishlist from "./Pages/Wishlist/wishlist";
import Checkout from "./Pages/Checkout/checkout";
import Orders from "./Pages/Orders/orders";
import OrderDetails from "./Pages/OrderDetails/orderDetails";
import Login from "./Pages/Login/login";
import Register from "./Pages/Register/register";
import NotFound from "./Pages/NotFound/notFound";

function AppContent() {
  const location = useLocation();

  const hideHeaderFooter =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {!hideHeaderFooter && <Header />}

      <main>
        <Routes>

          {/* =========================
              AUTHENTICATION PAGES
          ========================= */}

          <Route
            path="/"
            element={<Login />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />


          {/* =========================
              PROTECTED PAGES
          ========================= */}

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/restaurants"
            element={
              <ProtectedRoute>
                <Restaurants />
              </ProtectedRoute>
            }
          />

          <Route
            path="/restaurant/:id"
            element={
              <ProtectedRoute>
                <RestaurantDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders/:id"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />


          {/* =========================
              404 PAGE
          ========================= */}

          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>
      </main>

      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;