import axios from "axios";
import { useEffect, useState } from "react";
import Table from "../components/TableWrapper";
import AddRecipient from "../components/AddRecipient";
import Layout from "../components/Layout";

const baseURL = `${process.env.REACT_APP_API_URL}/households`;

export default function RecipientsPage() {
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    // this axios call can be a hook?
    // potensh better testing, maybe even with pact
    axios
      .get(baseURL)
      .then((response) => {
        if (response.data.length > 0) setRecipients(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Layout title="Here be yer recipients">
      <AddRecipient />
      <Table data={recipients} />
    </Layout>
  );
}
