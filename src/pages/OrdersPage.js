import Table from "../components/TableWrapper";
import Layout from "../components/Layout";
import { useLoaderData } from "react-router-dom";

export default function OrdersPage() {
  const { data } = useLoaderData();

  return (
    <Layout title="Here be yer orders">
      <Table data={data} />
    </Layout>
  );
}
