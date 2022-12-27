import axios from "axios";
import { useEffect, useState } from "react";
import Table from "../components/Table";
import Layout from "./Layout";

const baseURL = "http://localhost:3000/products";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // this axios call can be a hook?
    // potensh better testing, maybe even with pact
    axios
      .get(baseURL)
      .then((response) => {
        if (response.data.length > 0) setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Layout title="Here be yer products">
      <Table data={products} />
    </Layout>
  );
}
