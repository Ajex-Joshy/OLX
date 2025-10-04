import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body.jsx";
import Login from "./pages/Login.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import ProductListing from "./pages/ProductListing.jsx";
import Sell from "./pages/Sell.jsx";
import Cart from "./pages/Cart.jsx";
import MyProducts from "./pages/MyProducts.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <ProductListing />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sell",
        element: (
          <ProtectedRoute>
            <Sell />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-products",
        element: (
          <ProtectedRoute>
            <MyProducts />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRoute}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>
);
