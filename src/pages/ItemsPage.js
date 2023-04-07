import Table from "../components/TableWrapper";
import AddItem from "../components/AddItem";
import Layout from "../components/Layout";
import { useLoaderData } from "react-router-dom";

export default function ItemsPage() {
  const { data } = useLoaderData();
  const dataTransform = (itemData) => {
    return itemData.map(
      ({
        name,
        description,
        frequency,
        count,
        // itemId to be added when updating items
        // itemId
      }) => {
        return {
          name,
          description,
          "Frequency (weeks)": frequency,
          "Remaining stock": count,
        };
      }
    );
  };

  return (
    <Layout title="Items">
      <AddItem />
      <Table data={data} dataTransform={dataTransform} />
    </Layout>
  );
}
