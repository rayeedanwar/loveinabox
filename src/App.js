import "./App.css";
import { Outlet } from "react-router-dom";
import VolunteersPage from "./pages/VolunteersPage";
import ProductsPage from "./pages/ProductsPage";
import OrdersPage from "./pages/OrdersPage";
import RecipientsPage from "./pages/RecipientsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./components/Navbar";

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
          path: "/volunteers",
          element: <VolunteersPage />,
        },
        {
          path: "/recipients",
          element: <RecipientsPage />,
        },
        {
          path: "/orders",
          element: <OrdersPage />,
        },
        {
          path: "/products",
          element: <ProductsPage />,
        },
      ],
    },
    {
      path: "/recipients",
      element: <RecipientsPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
