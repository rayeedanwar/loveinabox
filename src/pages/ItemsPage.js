import Table from "../components/TableWrapper";
import AddItem from "../components/AddItem";
import Layout from "../components/Layout";
import { useLoaderData } from "react-router-dom";

export default function ProductsPage() {
  const { data } = useLoaderData();

  return (
    <Layout title="Here be yer products">
      <AddItem />
      <Table data={data} />
    </Layout>
  );
}
