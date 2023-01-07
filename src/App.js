import "./App.css";
import { Outlet } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import OrdersPage from "./pages/OrdersPage";
import RecipientsPage from "./pages/RecipientsPage";
import LoginPage from "./pages/LoginPage";
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
      path: "/login",
      element: wrapChakraProvider(<LoginPage />),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
