import axios from "axios";
import { useEffect, useState } from "react";
import Table from "../components/TableWrapper";
import AddProduct from "../components/AddProduct";
import Layout from "../components/Layout";

const baseURL = `${process.env.REACT_APP_API_URL}/products`;

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
      <AddProduct />
      <Table data={products} />
    </Layout>
  );
}
