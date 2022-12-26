import axios from "axios";
import { useEffect, useState } from "react";
import Table from "../components/Table";

const baseURL = "http://localhost:3000/recipients/orders";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // this axios call can be a hook?
    // potensh better testing, maybe even with pact
    axios
      .get(baseURL)
      .then((response) => {
        if (response.data.length > 0) setOrders(response.data); // products array would ideally be a grid of pictures or maybe not needed until viewing each order
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Here be yer orders</h1>
      <Table data={orders} />
    </div>
  );
}
