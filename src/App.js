import "./App.css";
import AddProduct from "./pages/AddProduct";
import AddOrder from "./pages/AddOrder";
import AdminSignUpPage from "./pages/AdminSignUpPage";
import RecipientSignUpPage from "./pages/RecipientSignUpPage";
import VolunteersPage from "./pages/VolunteersPage";
import ProductsPage from "./pages/ProductsPage";
import OrdersPage from "./pages/OrdersPage";
import RecipientsPage from "./pages/RecipientsPage";

import { ChakraProvider } from "@chakra-ui/react";
function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <AdminSignUpPage />
        <RecipientSignUpPage />
        <AddProduct />
        <AddOrder />
        <VolunteersPage />
        <ProductsPage />
        <OrdersPage />
        <RecipientsPage />
      </div>
    </ChakraProvider>
  );
}

export default App;
