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

const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <ProductListing />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sell",
        element: <Sell />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/my-products",
        element: <MyProducts />,
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
