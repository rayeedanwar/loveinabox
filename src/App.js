import "./App.css";
import { Outlet } from "react-router-dom";
import ItemsPage from "./pages/ItemsPage";
import OrdersPage from "./pages/OrdersPage";
import RecipientsPage from "./pages/RecipientsPage";
import HouseholdDetailsPage from "./pages/HouseholdDetailsPage";
import LoginPage from "./pages/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./components/Navbar";
import AddOrderPage from "./pages/AddOrderPage";
import axios from "axios";

const wrapChakraProvider = (component) => (
  <ChakraProvider>{component}</ChakraProvider>
);

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: wrapChakraProvider(
        <div className="App">
          <Navbar />
          <Outlet />
        </div>
      ),
      errorElement: wrapChakraProvider(<ErrorPage />),
      children: [
        {
          path: "/recipients",
          element: <RecipientsPage />,
          loader: async () => {
            return axios
              .get(`${process.env.REACT_APP_API_URL}/households`)
              .catch((error) => {
                console.log(error);
              });
          },
        },
        {
          path: "/orders",
          element: <OrdersPage />,
          loader: async () => {
            return axios
              .get(`${process.env.REACT_APP_API_URL}/orders`)
              .catch((error) => {
                console.log(error);
              });
          },
        },
        {
          path: "/items",
          element: <ItemsPage />,
          loader: async () => {
            return axios
              .get(`${process.env.REACT_APP_API_URL}/items`)
              .catch((error) => {
                console.log(error);
              });
          },
        },
        { path: "/households/:householdId", element: <HouseholdDetailsPage /> },
        {
          path: "/households/:householdId/orders/new",
          element: <AddOrderPage />,
          loader: async () => {
            return axios
              .get(`${process.env.REACT_APP_API_URL}/items`)

              .catch((error) => {
                console.log(error);
              });
          },
        },
      ],
    },
    {
      path: "/login",
      element: wrapChakraProvider(<LoginPage />),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
