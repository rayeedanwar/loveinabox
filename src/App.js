import "./App.css";
import AddProduct from "./pages/AddProduct";
import AddOrder from "./pages/AddOrder";
import AdminSignUpPage from "./pages/AdminSignUpPage";
import RecipientSignUpPage from "./pages/RecipientSignUpPage";

function App() {
  return (
    <div className="App">
      <AdminSignUpPage />
      <RecipientSignUpPage />
      <AddProduct />
      <AddOrder />
    </div>
  );
}

export default App;
